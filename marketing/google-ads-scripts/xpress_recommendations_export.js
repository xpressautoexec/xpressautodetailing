/**
 * Xpress Recommendations Export (Google Ads Script, account 336-085-6566).
 * READ-ONLY: it never applies or dismisses a recommendation and never changes the account.
 * Copies Google's optimization score (account + each campaign) and every open recommendation
 * from the Recommendations page into the monitor Sheet "Xpress Ads Monitor (data log)":
 *   tab Optimization     - account and campaign scores, with the date of the export
 *   tab Recommendations  - one row per open recommendation, with Google's estimated impact
 * Claude reads both tabs and sends Omar an accept / dismiss list. Nothing is applied without Omar's yes.
 * Run it once now; it can also be scheduled daily (any time after 6 AM) so the score is tracked.
 */
var SHEET_ID = '1BrFf1irduFl0Iz_AXr7NQ62C1Llfaa-FT80p4JLKp1c';

function main() {
  var tz = AdsApp.currentAccount().getTimeZone();
  var stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm');
  var scores = [], recs = [], byName = {};

  // 1. Optimization score: account, then each campaign
  tryQ('SELECT customer.descriptive_name, customer.optimization_score, customer.optimization_score_weight FROM customer', function (r) {
    scores.push([stamp, 'ACCOUNT', r.customer.descriptiveName, '', pct(r.customer.optimizationScore), num(r.customer.optimizationScoreWeight)]);
  });
  tryQ("SELECT campaign.resource_name, campaign.name, campaign.status, campaign.advertising_channel_type, campaign.optimization_score " +
       "FROM campaign WHERE campaign.status != 'REMOVED'", function (r) {
    byName[r.campaign.resourceName] = r.campaign.name;
    scores.push([stamp, 'CAMPAIGN', r.campaign.name, r.campaign.status + ' / ' + r.campaign.advertisingChannelType, pct(r.campaign.optimizationScore), '']);
  });

  // 2. Open recommendations with Google's estimated impact
  var idx = {};
  tryQ('SELECT recommendation.resource_name, recommendation.type, recommendation.campaign, recommendation.ad_group, ' +
       'recommendation.impact.base_metrics.impressions, recommendation.impact.base_metrics.clicks, ' +
       'recommendation.impact.base_metrics.cost_micros, recommendation.impact.base_metrics.conversions, ' +
       'recommendation.impact.potential_metrics.impressions, recommendation.impact.potential_metrics.clicks, ' +
       'recommendation.impact.potential_metrics.cost_micros, recommendation.impact.potential_metrics.conversions ' +
       'FROM recommendation WHERE recommendation.dismissed = FALSE', function (r) {
    var x = r.recommendation, b = (x.impact || {}).baseMetrics || {}, p = (x.impact || {}).potentialMetrics || {};
    var row = [stamp, x.type, byName[x.campaign] || (x.campaign ? x.campaign : '(account)'), x.adGroup || '', '',
      diff(p.impressions, b.impressions), diff(p.clicks, b.clicks), diffMic(p.costMicros, b.costMicros), diff(p.conversions, b.conversions),
      x.resourceName];
    idx[x.resourceName] = row;
    recs.push(row);
  });

  // 3. Details for the common types (each query on its own, so one unsupported field never stops the export)
  detail('recommendation.campaign_budget_recommendation.current_budget_amount_micros, recommendation.campaign_budget_recommendation.recommended_budget_amount_micros',
    function (x) { var c = x.campaignBudgetRecommendation || {}; return c.recommendedBudgetAmountMicros ? 'Budget $' + mic(c.currentBudgetAmountMicros) + ' -> $' + mic(c.recommendedBudgetAmountMicros) + '/day' : ''; }, idx);
  detail('recommendation.keyword_recommendation.keyword.text, recommendation.keyword_recommendation.keyword.match_type',
    function (x) { var k = (x.keywordRecommendation || {}).keyword; return k ? 'Add keyword "' + k.text + '" (' + k.matchType + ')' : ''; }, idx);
  detail('recommendation.keyword_match_type_recommendation.keyword.text, recommendation.keyword_match_type_recommendation.recommended_match_type',
    function (x) { var k = x.keywordMatchTypeRecommendation; return k && k.keyword ? 'Change "' + k.keyword.text + '" to ' + k.recommendedMatchType : ''; }, idx);
  detail('recommendation.use_broad_match_keyword_recommendation.keyword',
    function (x) { var k = (x.useBroadMatchKeywordRecommendation || {}).keyword; return k ? 'Broad match for: ' + k.map(function (z) { return z.text; }).slice(0, 10).join(', ') : ''; }, idx);
  detail('recommendation.target_cpa_opt_in_recommendation.recommended_target_cpa_micros',
    function (x) { var t = x.targetCpaOptInRecommendation; return t && t.recommendedTargetCpaMicros ? 'Target CPA $' + mic(t.recommendedTargetCpaMicros) : ''; }, idx);
  detail('recommendation.maximize_conversions_opt_in_recommendation.recommended_budget_amount_micros',
    function (x) { var t = x.maximizeConversionsOptInRecommendation; return t && t.recommendedBudgetAmountMicros ? 'Maximize conversions, budget $' + mic(t.recommendedBudgetAmountMicros) + '/day' : ''; }, idx);

  Logger.log('Optimization rows: ' + scores.length + ', open recommendations: ' + recs.length);
  scores.slice(0, 15).forEach(function (s) { Logger.log(s.join(' | ')); });
  recs.slice(0, 40).forEach(function (s) { Logger.log(s.slice(1, 9).join(' | ')); });
  if (AdsApp.getExecutionInfo().isPreview()) { Logger.log('Preview: Sheet not written. Click Run to write the Optimization and Recommendations tabs.'); return; }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  append(ss, 'Optimization', ['exported', 'level', 'name', 'status_type', 'optimization_score_pct', 'account_weight'], scores);
  replace(ss, 'Recommendations', ['exported', 'type', 'campaign', 'ad_group', 'detail', 'impr_change', 'clicks_change', 'cost_change', 'conv_change', 'resource_name'], recs);
}

function detail(fields, fmt, idx) {
  tryQ('SELECT recommendation.resource_name, ' + fields + ' FROM recommendation WHERE recommendation.dismissed = FALSE', function (r) {
    var row = idx[r.recommendation.resourceName], t = fmt(r.recommendation);
    if (row && t) row[4] = row[4] ? row[4] + ' | ' + t : t;
  });
}
function tryQ(q, fn) {
  try { var it = AdsApp.search(q); while (it.hasNext()) fn(it.next()); }
  catch (e) { Logger.log('Skipped a query (' + String(e).slice(0, 160) + ')'); }
}
function append(ss, name, head, data) {
  var s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(head); s.setFrozenRows(1); }
  if (data.length) s.getRange(s.getLastRow() + 1, 1, data.length, head.length).setValues(data);
}
function replace(ss, name, head, data) {
  var s = ss.getSheetByName(name);
  if (s) s.clear(); else s = ss.insertSheet(name);
  s.appendRow(head); s.setFrozenRows(1);
  if (data.length) s.getRange(2, 1, data.length, head.length).setValues(data);
}
function num(v) { return v === undefined || v === null ? 0 : Number(v); }
function mic(v) { return (num(v) / 1e6).toFixed(2); }
function pct(v) { return v === undefined || v === null ? '' : Math.round(Number(v) * 1000) / 10; }
function diff(p, b) { return p === undefined && b === undefined ? '' : Math.round((num(p) - num(b)) * 10) / 10; }
function diffMic(p, b) { return p === undefined && b === undefined ? '' : Math.round((num(p) - num(b)) / 1e4) / 100; }
