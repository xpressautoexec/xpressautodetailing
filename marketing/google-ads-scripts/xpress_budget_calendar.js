/**
 * Xpress Budget Calendar (Google Ads Script, account 336-085-6566). Runs daily 4–5 AM MT.
 * Sets each Search campaign's daily budget to the approved monthly plan / days in month.
 * Month plan = $0  -> pauses the campaign and labels it "Xpress season-paused".
 * Month plan > $0  -> re-enables ONLY campaigns this script paused (have that label). Never launches anything else.
 * Never touches campaigns not listed here (e.g. Performance Max). Logs every change to the monitor Sheet tab Budget_Log.
 * Plan source: Ads System v0.2 Recommended + owner 2026-10-15: Fleet $250/mo in winter (from idle Meta share).
 * Owner 2026-10-22: RV off for the rest of Oct (season over); its $750 Oct plan moved to Auto (+450) and Headlight (+300).
 */
var PLAN = {"G | Search | Brand": [100, 100, 100, 150, 150, 150, 150, 150, 150, 150, 100, 100], "G | Search | Auto Detailing": [500, 500, 500, 750, 900, 900, 900, 900, 750, 1200, 500, 500], "G | Search | Headlight Restoration": [200, 200, 200, 200, 250, 250, 250, 250, 200, 500, 200, 200], "G | Search | Paint Correction & Ceramic": [0, 0, 0, 300, 600, 600, 600, 600, 300, 150, 0, 0], "G | Search | RV Detailing & Restoration": [0, 0, 0, 700, 1000, 1000, 1000, 1000, 600, 0, 0, 0], "G | Search | Fleet & Commercial": [250, 250, 250, 150, 250, 250, 250, 250, 250, 250, 250, 250], "G | Search | Training": [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]}; // monthly CAD, Jan..Dec
var LABEL = 'Xpress season-paused';
var SHEET_NAME = 'Xpress Ads Monitor (data log)';
function main() {
  var tz = AdsApp.currentAccount().getTimeZone(), now = new Date();
  var m = parseInt(Utilities.formatDate(now, tz, 'M'), 10) - 1, y = parseInt(Utilities.formatDate(now, tz, 'yyyy'), 10);
  var days = new Date(y, m + 1, 0).getDate();
  if (!AdsApp.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) AdsApp.createLabel(LABEL, 'Paused by Xpress Budget Calendar for the season');
  var log = [], stamp = Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm'), preview = AdsApp.getExecutionInfo().isPreview();
  var it = AdsApp.campaigns().get();
  while (it.hasNext()) {
    var c = it.next(), name = c.getName();
    if (!PLAN[name]) continue;
    var monthly = PLAN[name][m], target = Math.round(monthly / days * 100) / 100;
    var labeled = c.labels().withCondition("Name = '" + LABEL + "'").get().hasNext();
    if (monthly === 0) {
      if (c.isEnabled()) { c.pause(); c.applyLabel(LABEL); log.push([stamp, name, 'PAUSED for season', 'enabled', 'paused', monthly]); }
      continue;
    }
    var b = c.getBudget(), cur = b.getAmount();
    if (Math.abs(cur - target) >= 0.05) { b.setAmount(target); log.push([stamp, name, 'Budget', cur, target, monthly]); }
    if (c.isPaused() && labeled) { c.enable(); c.removeLabel(LABEL); log.push([stamp, name, 'RE-ENABLED for season', 'paused', 'enabled', monthly]); }
  }
  log.forEach(function (r) { Logger.log(r.join(' | ')); });
  if (!log.length) Logger.log('No changes: budgets already match ' + Utilities.formatDate(now, tz, 'MMM yyyy') + ' plan.');
  if (preview) return;
  var f = DriveApp.getFilesByName(SHEET_NAME);
  if (f.hasNext()) {
    var ss = SpreadsheetApp.open(f.next()), s = ss.getSheetByName('Budget_Log');
    if (!s) { s = ss.insertSheet('Budget_Log'); s.appendRow(['date_time', 'campaign', 'change', 'before', 'after', 'monthly_plan']); s.setFrozenRows(1); }
    if (log.length) s.getRange(s.getLastRow() + 1, 1, log.length, 6).setValues(log);
  }
}
