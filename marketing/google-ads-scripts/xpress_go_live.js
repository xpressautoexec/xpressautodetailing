/**
 * Xpress GO LIVE (Google Ads Script, account 336-085-6566). Approved by Omar in chat 2026-10-15 18:49 MT ("go live").
 * 1. Sets the 7 G | Search campaigns' daily budgets to the October plan (monthly / 31).
 * 2. Enables the 7 G | Search campaigns.
 * 3. Pauses Performance Max "Detailing" and "RV Lead Gen". Windshield PPF PMax is NOT touched.
 * Safety: aborts before any change unless exactly 7 Search campaigns and exactly 2 PMax campaigns match.
 * Campaigns with a $0 plan this month stay paused (none in October).
 */
var PLAN = {"G | Search | Brand": [100, 100, 100, 150, 150, 150, 150, 150, 150, 150, 100, 100], "G | Search | Auto Detailing": [500, 500, 500, 750, 900, 900, 900, 900, 750, 750, 500, 500], "G | Search | Headlight Restoration": [200, 200, 200, 200, 250, 250, 250, 250, 200, 200, 200, 200], "G | Search | Paint Correction & Ceramic": [0, 0, 0, 300, 600, 600, 600, 600, 300, 150, 0, 0], "G | Search | RV Detailing & Restoration": [0, 0, 0, 700, 1000, 1000, 1000, 1000, 600, 750, 0, 0], "G | Search | Fleet & Commercial": [250, 250, 250, 150, 250, 250, 250, 250, 250, 250, 250, 250], "G | Search | Training": [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]};
function isPmaxToPause(name) { return name === 'Detailing' || /rv lead gen/i.test(name); }
function main() {
  var tz = AdsApp.currentAccount().getTimeZone(), now = new Date();
  var m = parseInt(Utilities.formatDate(now, tz, 'M'), 10) - 1, y = parseInt(Utilities.formatDate(now, tz, 'yyyy'), 10);
  var days = new Date(y, m + 1, 0).getDate();
  var search = [], pmax = [], others = [];
  var it = AdsApp.campaigns().get();
  while (it.hasNext()) { var c = it.next(); if (PLAN[c.getName()]) search.push(c); }
  var pit = AdsApp.performanceMaxCampaigns().get();
  while (pit.hasNext()) { var p = pit.next(); (isPmaxToPause(p.getName()) ? pmax : others).push(p); }
  Logger.log('Search campaigns found: ' + search.length + ' | PMax to pause: ' + pmax.map(function (p) { return p.getName(); }).join(', ') +
             ' | PMax left alone: ' + others.map(function (p) { return p.getName() + ' (' + (p.isEnabled() ? 'enabled' : 'paused') + ')'; }).join(', '));
  if (search.length !== 7 || pmax.length !== 2) { Logger.log('ABORT: expected 7 Search and 2 PMax campaigns. No changes made.'); return; }
  var total = 0;
  search.forEach(function (c) {
    var name = c.getName(), monthly = PLAN[name][m], target = Math.round(monthly / days * 100) / 100, b = c.getBudget(), cur = b.getAmount();
    if (monthly === 0) { Logger.log(name + ' | $0 plan this month: stays paused'); return; }
    if (Math.abs(cur - target) >= 0.01) b.setAmount(target);
    var was = c.isEnabled() ? 'enabled' : 'paused';
    c.enable(); total += target;
    Logger.log(name + ' | budget ' + cur + ' -> ' + target + '/day (' + monthly + '/mo) | ' + was + ' -> ENABLED');
  });
  pmax.forEach(function (p) { var was = p.isEnabled() ? 'enabled' : 'paused'; p.pause(); Logger.log('PMax ' + p.getName() + ' | ' + was + ' -> PAUSED'); });
  Logger.log('Search daily total: $' + total.toFixed(2));
}
