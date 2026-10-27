/**
 * Xpress Fixes 2026-10-27 (Google Ads Script, account 336-085-6566). One-time run.
 * Approved by Omar in chat 2026-10-27 ("Approve all"): R-20261027-1 to -4.
 *   R-1  Re-enable Performance Max "Detailing" at $20/day (14-day call test; it produced 30 calls Sep 15 - Oct 15).
 *   R-2  Pause "G | Search | RV Detailing & Restoration" (label "Xpress season-paused") and set the October
 *        budgets from Omar's 2026-10-22 amendment: Auto 1200/31, Headlight 500/31.
 *        ALSO paste the updated xpress_budget_calendar.js, or tomorrow's 4-5 AM run undoes this.
 *   R-3  Auto Detailing phrase negatives: car wash, carwash, hand wash, cheap, cheapest, at home, interior cleaner.
 *   R-4  All 7 Search campaigns phrase negatives: storage, repair shop, paint damage repair.
 * Run Preview first and read the log. Safety: aborts before any change unless all 7 Search campaigns and the
 * "Detailing" PMax campaign are found exactly once. Re-running is safe (existing negatives are skipped).
 */
var SEARCH = ['G | Search | Brand', 'G | Search | Auto Detailing', 'G | Search | Headlight Restoration',
  'G | Search | Paint Correction & Ceramic', 'G | Search | RV Detailing & Restoration',
  'G | Search | Fleet & Commercial', 'G | Search | Training'];
var LABEL = 'Xpress season-paused';
var OCT_BUDGET = { 'G | Search | Auto Detailing': 1200, 'G | Search | Headlight Restoration': 500 };
var PMAX_NAME = 'Detailing', PMAX_DAILY = 20;
var AUTO_NEG = ['car wash', 'carwash', 'hand wash', 'cheap', 'cheapest', 'at home', 'interior cleaner'];
var ALL_NEG = ['storage', 'repair shop', 'paint damage repair'];

function main() {
  var camps = {};
  var it = AdsApp.campaigns().get();
  while (it.hasNext()) { var c = it.next(); if (SEARCH.indexOf(c.getName()) >= 0) { camps[c.getName()] = (camps[c.getName()] || []).concat([c]); } }
  var pm = [], pit = AdsApp.performanceMaxCampaigns().get();
  while (pit.hasNext()) { var p = pit.next(); if (p.getName() === PMAX_NAME) pm.push(p); }
  var missing = SEARCH.filter(function (n) { return !camps[n] || camps[n].length !== 1; });
  if (missing.length || pm.length !== 1) {
    Logger.log('ABORT, no changes made. Not found exactly once: ' + missing.join(', ') + (pm.length !== 1 ? ' | PMax "' + PMAX_NAME + '" x' + pm.length : ''));
    return;
  }
  var tz = AdsApp.currentAccount().getTimeZone(), now = new Date();
  var days = new Date(+Utilities.formatDate(now, tz, 'yyyy'), +Utilities.formatDate(now, tz, 'M'), 0).getDate();

  // R-1
  var d = pm[0], db = d.getBudget(), dcur = db.getAmount();
  if (Math.abs(dcur - PMAX_DAILY) >= 0.01) db.setAmount(PMAX_DAILY);
  var dwas = d.isEnabled() ? 'enabled' : 'paused'; d.enable();
  Logger.log('R-1 PMax Detailing | budget ' + dcur + ' -> ' + PMAX_DAILY + '/day | ' + dwas + ' -> ENABLED');

  // R-2
  if (!AdsApp.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) AdsApp.createLabel(LABEL, 'Paused by Xpress Budget Calendar for the season');
  var rv = camps['G | Search | RV Detailing & Restoration'][0];
  if (rv.isEnabled()) { rv.pause(); }
  if (!rv.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) rv.applyLabel(LABEL);
  Logger.log('R-2 RV | PAUSED, labelled ' + LABEL);
  Object.keys(OCT_BUDGET).forEach(function (n) {
    var b = camps[n][0].getBudget(), cur = b.getAmount(), t = Math.round(OCT_BUDGET[n] / days * 100) / 100;
    if (Math.abs(cur - t) >= 0.01) b.setAmount(t);
    Logger.log('R-2 ' + n + ' | budget ' + cur + ' -> ' + t + '/day (' + OCT_BUDGET[n] + '/mo)');
  });

  // R-3, R-4
  addNegs(camps['G | Search | Auto Detailing'][0], AUTO_NEG, 'R-3');
  SEARCH.forEach(function (n) { addNegs(camps[n][0], ALL_NEG, 'R-4'); });
  Logger.log('Done.');
}

function addNegs(c, words, tag) {
  var have = {}, nit = c.negativeKeywords().get();
  while (nit.hasNext()) have[nit.next().getText().toLowerCase()] = true;
  words.forEach(function (w) {
    var kw = '"' + w + '"';
    if (have[kw]) { Logger.log(tag + ' ' + c.getName() + ' | already has ' + kw); return; }
    c.createNegativeKeyword(kw);
    Logger.log(tag + ' ' + c.getName() + ' | added negative ' + kw);
  });
}
