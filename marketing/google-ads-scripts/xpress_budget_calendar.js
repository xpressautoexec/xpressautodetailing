/**
 * Xpress Budget Calendar v3 (Google Ads Script, account 336-085-6566). Runs daily 4-5 AM MT.
 * REPLACES the old Budget Calendar code (paste over it; do not run both).
 *
 * 1. CREDIT WINDOW Oct 29 - Nov 27 2026 (30 days) (Omar, in chat 2026-10-29: CA$1,750 ad credit, flat $60/day):
 *    fixed daily budgets below, total $60.00/day incl. Detailing PMax call test $20/day (calls are what convert).
 *    RV stays season-paused. Paint Correction & Ceramic stays ON through Nov 27 (overrides its Nov $0 month).
 * 2. AIRDRIE WEEK Oct 29 - Nov 4: Fleet & Commercial targets only a 12 km radius around Airdrie.
 *    Its current locations are backed up to the Sheet tab Geo_Backup and restored automatically on Nov 5.
 *    Ads labelled "Xpress Airdrie week" are paused on Nov 5.
 * 3. Outside the window: the monthly plan (Oct amended 2026-10-22), budget = plan / days in month.
 *    $0 month -> pause + label "Xpress season-paused"; >$0 -> re-enable only campaigns with that label.
 * Never touches campaigns not listed here. Skips any shared budget. Logs every change + a daily HEARTBEAT
 * row to the monitor Sheet tab Budget_Log. Preview mode makes no changes and writes nothing.
 */
var PLAN = {"G | Search | Brand": [100, 100, 100, 150, 150, 150, 150, 150, 150, 150, 100, 100], "G | Search | Auto Detailing": [500, 500, 500, 750, 900, 900, 900, 900, 750, 1200, 500, 500], "G | Search | Headlight Restoration": [200, 200, 200, 200, 250, 250, 250, 250, 200, 500, 200, 200], "G | Search | Paint Correction & Ceramic": [0, 0, 0, 300, 600, 600, 600, 600, 300, 150, 0, 0], "G | Search | RV Detailing & Restoration": [0, 0, 0, 700, 1000, 1000, 1000, 1000, 600, 0, 0, 0], "G | Search | Fleet & Commercial": [250, 250, 250, 150, 250, 250, 250, 250, 250, 250, 250, 250], "G | Search | Training": [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]}; // monthly CAD, Jan..Dec

var CREDIT = {
  start: '2026-10-29', end: '2026-11-27',
  search: {                                      // CAD per day
    'G | Search | Brand': 1.00,
    'G | Search | Auto Detailing': 11.00,
    'G | Search | Headlight Restoration': 7.00,
    'G | Search | Paint Correction & Ceramic': 7.00,
    'G | Search | RV Detailing & Restoration': 0,  // season-paused
    'G | Search | Fleet & Commercial': 8.50,
    'G | Search | Training': 5.50
  },
  pmax: { 'Detailing': 20.00 }                   // total with Search = 60.00
};
var AIRDRIE = { campaign: 'G | Search | Fleet & Commercial', start: '2026-10-29', end: '2026-11-04',
                lat: 51.2917, lng: -114.0144, radiusKm: 12, adLabel: 'Xpress Airdrie week' };

var LABEL = 'Xpress season-paused';
var SHEET_ID = '1BrFf1irduFl0Iz_AXr7NQ62C1Llfaa-FT80p4JLKp1c';
var SHEET_NAME = 'Xpress Ads Monitor (data log)';

function main() {
  var tz = AdsApp.currentAccount().getTimeZone(), now = new Date();
  var today = Utilities.formatDate(now, tz, 'yyyy-MM-dd'), stamp = Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
  var m = parseInt(Utilities.formatDate(now, tz, 'M'), 10) - 1, y = parseInt(Utilities.formatDate(now, tz, 'yyyy'), 10);
  var days = new Date(y, m + 1, 0).getDate();
  var preview = AdsApp.getExecutionInfo().isPreview(), log = [];
  var inCredit = today >= CREDIT.start && today <= CREDIT.end;
  if (!preview && !AdsApp.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) AdsApp.createLabel(LABEL, 'Paused by Xpress Budget Calendar for the season');
  Logger.log(today + (inCredit ? ' | CREDIT WINDOW ($60/day)' : ' | monthly plan') + (preview ? ' | PREVIEW' : ''));

  var it = AdsApp.campaigns().get();
  while (it.hasNext()) {
    var c = it.next(), name = c.getName();
    if (!PLAN[name]) continue;
    var monthly = PLAN[name][m];
    var target = inCredit ? CREDIT.search[name] : Math.round(monthly / days * 100) / 100;
    var labeled = c.labels().withCondition("Name = '" + LABEL + "'").get().hasNext();
    if (!target) {
      if (c.isEnabled()) { if (!preview) { c.pause(); c.applyLabel(LABEL); } log.push([stamp, name, 'PAUSED for season', 'enabled', 'paused', monthly]); }
      continue;
    }
    var b = c.getBudget();
    if (b.isExplicitlyShared()) { log.push([stamp, name, 'SKIPPED: shared budget', b.getAmount(), target, monthly]); continue; }
    var cur = b.getAmount();
    if (Math.abs(cur - target) >= 0.01) { if (!preview) b.setAmount(target); log.push([stamp, name, inCredit ? 'Budget (credit)' : 'Budget', cur, target, monthly]); }
    if (c.isPaused() && labeled) { if (!preview) { c.enable(); c.removeLabel(LABEL); } log.push([stamp, name, 'RE-ENABLED for season', 'paused', 'enabled', monthly]); }
  }

  if (inCredit) {
    var pit = AdsApp.performanceMaxCampaigns().get();
    while (pit.hasNext()) {
      var p = pit.next(), pn = p.getName(), pt = CREDIT.pmax[pn];
      if (pt === undefined) continue;
      var pb = p.getBudget(), pc = pb.getAmount();
      if (Math.abs(pc - pt) >= 0.01) { if (!preview) pb.setAmount(pt); log.push([stamp, 'PMax ' + pn, 'Budget (credit)', pc, pt, '']); }
      if (!p.isEnabled()) { if (!preview) p.enable(); log.push([stamp, 'PMax ' + pn, 'ENABLED (call test)', 'paused', 'enabled', '']); }
    }
  } else if (today > CREDIT.end) {
    Logger.log('Credit window over: Detailing PMax left as it is. Decide in chat whether it stays on.');
  }

  var ss = openSheet();
  airdrie(today, stamp, preview, log, ss);

  log.forEach(function (r) { Logger.log(r.join(' | ')); });
  if (!log.length) Logger.log('No changes needed today.');
  if (preview || !ss) return;
  var s = ss.getSheetByName('Budget_Log');
  if (!s) { s = ss.insertSheet('Budget_Log'); s.appendRow(['date_time', 'campaign', 'change', 'before', 'after', 'monthly_plan']); s.setFrozenRows(1); }
  log.push([stamp, '(all)', 'HEARTBEAT', '', (log.length) + ' changes', inCredit ? 'credit window' : 'plan']);
  s.getRange(s.getLastRow() + 1, 1, log.length, 6).setValues(log);
}

function openSheet() {
  try { return SpreadsheetApp.openById(SHEET_ID); } catch (e) {
    var f = DriveApp.getFilesByName(SHEET_NAME);
    if (f.hasNext()) return SpreadsheetApp.open(f.next());
    Logger.log('WARNING: monitor Sheet not reachable; Budget_Log and Geo_Backup not written.');
    return null;
  }
}

function isAirdrie(px) {
  return Math.abs(px.getLatitude() - AIRDRIE.lat) < 0.001 && Math.abs(px.getLongitude() - AIRDRIE.lng) < 0.001;
}

function airdrie(today, stamp, preview, log, ss) {
  var cIt = AdsApp.campaigns().withCondition("Name = '" + AIRDRIE.campaign.replace(/'/g, "\\'") + "'").get();
  if (!cIt.hasNext()) { Logger.log('Airdrie: campaign not found, skipped.'); return; }
  var c = cIt.next(), t = c.targeting();
  var pxs = [], locs = [], hasAirdrie = false;
  var pi = t.targetedProximities().get(); while (pi.hasNext()) { var px = pi.next(); if (isAirdrie(px)) hasAirdrie = true; else pxs.push(px); }
  var li = t.targetedLocations().get(); while (li.hasNext()) locs.push(li.next());
  var inWeek = today >= AIRDRIE.start && today <= AIRDRIE.end;

  if (inWeek && !hasAirdrie) {
    if (!ss) { Logger.log('Airdrie: Sheet not reachable, so no backup possible. Geo NOT changed.'); return; }
    var rows = locs.map(function (l) { return [stamp, 'location', l.getId(), l.getName(), '', '', '', l.getBidModifier(), 'removed']; })
      .concat(pxs.map(function (p) { return [stamp, 'proximity', '', '', p.getLatitude(), p.getLongitude(), p.getRadius() + ' ' + p.getRadiusUnits(), p.getBidModifier(), 'removed']; }));
    log.push([stamp, AIRDRIE.campaign, 'GEO -> Airdrie ' + AIRDRIE.radiusKm + ' km only', locs.length + ' locations, ' + pxs.length + ' radius targets', 'Airdrie', '']);
    if (preview) { rows.forEach(function (r) { Logger.log('Would back up: ' + r.join(' | ')); }); return; }
    var g = ss.getSheetByName('Geo_Backup');
    if (!g) { g = ss.insertSheet('Geo_Backup'); g.appendRow(['date_time', 'type', 'location_id', 'name', 'lat', 'lng', 'radius', 'bid_modifier', 'state']); }
    if (rows.length) g.getRange(g.getLastRow() + 1, 1, rows.length, 9).setValues(rows);
    c.addProximity(AIRDRIE.lat, AIRDRIE.lng, AIRDRIE.radiusKm, 'KILOMETERS');
    locs.forEach(function (l) { l.remove(); });
    pxs.forEach(function (p) { p.remove(); });
  }

  if (!inWeek && today > AIRDRIE.end && hasAirdrie) {
    var gs = ss && ss.getSheetByName('Geo_Backup');
    if (!gs) { Logger.log('Airdrie: no Geo_Backup tab; restore locations by hand.'); return; }
    var data = gs.getDataRange().getValues(), restored = 0;
    for (var i = 1; i < data.length; i++) {
      if (data[i][8] !== 'removed') continue;
      if (!preview) {
        if (data[i][1] === 'location') c.addLocation(Number(data[i][2]), Number(data[i][7]) || 1);
        else { var r = String(data[i][6]).split(' '); c.addProximity(Number(data[i][4]), Number(data[i][5]), Number(r[0]), r[1] || 'KILOMETERS'); }
        gs.getRange(i + 1, 9).setValue('restored ' + today);
      }
      restored++;
    }
    if (!preview) { var pj = t.targetedProximities().get(); while (pj.hasNext()) { var q = pj.next(); if (isAirdrie(q)) q.remove(); } }
    log.push([stamp, AIRDRIE.campaign, 'GEO restored after Airdrie week', 'Airdrie only', restored + ' targets restored', '']);
    if (AdsApp.labels().withCondition("Name = '" + AIRDRIE.adLabel + "'").get().hasNext()) {
      var ai = c.ads().withCondition("LabelNames CONTAINS_ANY ['" + AIRDRIE.adLabel + "']").withCondition('Status = ENABLED').get();
      while (ai.hasNext()) { var ad = ai.next(); if (!preview) ad.pause(); log.push([stamp, AIRDRIE.campaign, 'Airdrie ad paused', ad.getId(), 'paused', '']); }
    }
  }
}
