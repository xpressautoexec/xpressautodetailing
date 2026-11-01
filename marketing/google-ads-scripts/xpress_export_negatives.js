/**
 * Xpress Export Negatives (Google Ads Script, account 336-085-6566). READ-ONLY: changes nothing in Google Ads.
 * Writes every negative keyword (campaign level, ad group level and shared negative lists) to the
 * monitor Sheet tab "Negatives", and flags any negative that blocks one of the campaign's own keywords.
 * Run it once AFTER xpress_apply_20261029. Claude then reviews the tab and sends Omar a remove/keep list;
 * nothing is removed without Omar's yes.
 */
var SHEET_ID = '1BrFf1irduFl0Iz_AXr7NQ62C1Llfaa-FT80p4JLKp1c';

function clean(t) { return t.replace(/["\[\]+]/g, '').toLowerCase().trim(); }
function blocks(neg, kw) { return (' ' + kw + ' ').indexOf(' ' + neg + ' ') !== -1; }

function main() {
  var tz = AdsApp.currentAccount().getTimeZone(), stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm');
  var rows = [], kws = {};
  var cIt = AdsApp.campaigns().withCondition("Status != REMOVED").get();
  while (cIt.hasNext()) {
    var c = cIt.next(), cn = c.getName();
    kws[cn] = [];
    var kIt = c.keywords().withCondition('Status = ENABLED').get();
    while (kIt.hasNext()) kws[cn].push(clean(kIt.next().getText()));
    var nIt = c.negativeKeywords().get();
    while (nIt.hasNext()) { var n = nIt.next(); rows.push([stamp, cn, 'campaign', '', n.getText(), n.getMatchType(), conflict(clean(n.getText()), kws[cn])]); }
    var gIt = c.adGroups().withCondition("Status != REMOVED").get();
    while (gIt.hasNext()) {
      var g = gIt.next(), gn = g.getName(), gk = [];
      var gkIt = g.keywords().withCondition('Status = ENABLED').get();
      while (gkIt.hasNext()) gk.push(clean(gkIt.next().getText()));
      var gnIt = g.negativeKeywords().get();
      while (gnIt.hasNext()) { var gnn = gnIt.next(); rows.push([stamp, cn, 'ad group', gn, gnn.getText(), gnn.getMatchType(), conflict(clean(gnn.getText()), gk)]); }
    }
  }
  var lIt = AdsApp.negativeKeywordLists().get();
  while (lIt.hasNext()) {
    var l = lIt.next(), attached = [], acIt = l.campaigns().get();
    while (acIt.hasNext()) attached.push(acIt.next().getName());
    var lnIt = l.negativeKeywords().get();
    while (lnIt.hasNext()) {
      var ln = lnIt.next(), hits = [];
      attached.forEach(function (cn) { var h = conflict(clean(ln.getText()), kws[cn] || []); if (h) hits.push(cn + ': ' + h); });
      rows.push([stamp, attached.join(', ') || '(not attached)', 'shared list: ' + l.getName(), '', ln.getText(), ln.getMatchType(), hits.join(' | ')]);
    }
  }
  Logger.log(rows.length + ' negatives found');
  rows.forEach(function (r) { if (r[6]) Logger.log('CONFLICT: ' + r.join(' | ')); });
  if (AdsApp.getExecutionInfo().isPreview()) { Logger.log('Preview: Sheet not written. Click Run to write the Negatives tab.'); return; }
  var ss = SpreadsheetApp.openById(SHEET_ID), s = ss.getSheetByName('Negatives');
  if (s) s.clear(); else s = ss.insertSheet('Negatives');
  s.appendRow(['exported', 'campaign', 'level', 'ad_group', 'negative', 'match', 'blocks_own_keyword']);
  if (rows.length) s.getRange(2, 1, rows.length, 7).setValues(rows);
  s.setFrozenRows(1);
}

function conflict(neg, list) {
  var hit = list.filter(function (k) { return blocks(neg, k); });
  return hit.length ? 'BLOCKS: ' + hit.slice(0, 5).join('; ') : '';
}
