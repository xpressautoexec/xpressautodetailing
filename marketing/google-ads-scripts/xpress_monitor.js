/**
 * Xpress Ads Monitor — daily data logger (Google Ads Script, account 336-085-6566).
 * Runs daily ~6:00 AM MT. READ-ONLY on the ad account: it never changes campaigns.
 * Writes yesterday's data into the Google Sheet "Xpress Ads Monitor (data log)" in this account's Drive
 * (created on first run). On the first run it also backfills the last 30 days.
 * Claude's 7:30 AM daily check reads this Sheet.
 */
var SHEET_NAME = 'Xpress Ads Monitor (data log)';
var TABS = {
  Daily_Campaign: ['date', 'campaign', 'type', 'status', 'budget_per_day', 'impressions', 'clicks', 'cost', 'conversions', 'conv_value',
    'ctr', 'avg_cpc', 'search_is', 'top_is', 'abs_top_is', 'lost_is_budget', 'lost_is_rank', 'phone_calls', 'phone_impressions'],
  Conversions: ['date', 'campaign', 'conversion_action', 'conversions'],
  Calls: ['date', 'start_time', 'campaign', 'duration_sec', 'status', 'caller_area_code', 'type'],
  Search_Terms: ['date', 'campaign', 'ad_group', 'search_term', 'match_type', 'status', 'impressions', 'clicks', 'cost', 'conversions'],
  Keywords: ['week_of', 'campaign', 'ad_group', 'keyword', 'match', 'status', 'quality_score', 'expected_ctr', 'ad_relevance', 'landing_page', 'impr_7d', 'clicks_7d', 'cost_7d', 'conv_7d', 'search_is_7d', 'top_is_7d'],
  Ads: ['week_of', 'campaign', 'ad_group', 'ad_id', 'status', 'approval', 'ad_strength', 'impr_7d', 'clicks_7d', 'conv_7d'],
  Change_History: ['date_time', 'user', 'client', 'resource', 'operation', 'campaign', 'changed_fields'],
  Run_Log: ['run_time', 'mode', 'rows_written', 'notes']
};

function main() {
  var ss = getSheet();
  var mode = sheet(ss, 'Daily_Campaign').getLastRow() <= 1 ? 'BACKFILL_30' : 'DAILY';
  var range = mode === 'BACKFILL_30' ? 'LAST_30_DAYS' : 'YESTERDAY';
  var n = 0, notes = [];
  var y = Utilities.formatDate(new Date(Date.now() - 864e5), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');
  if (mode === 'DAILY' && alreadyLogged(ss, y)) { log(ss, 'SKIP', 0, 'Already logged ' + y); return; }

  n += write(ss, 'Daily_Campaign', rows(
    "SELECT segments.date, campaign.name, campaign.advertising_channel_type, campaign.status, campaign_budget.amount_micros, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.conversions_value, metrics.ctr, metrics.average_cpc, metrics.search_impression_share, metrics.search_top_impression_share, metrics.search_absolute_top_impression_share, metrics.search_budget_lost_impression_share, metrics.search_rank_lost_impression_share, metrics.phone_calls, metrics.phone_impressions FROM campaign WHERE segments.date DURING " + range + " AND metrics.impressions > 0",
    function (r) { var c = r.campaign, m = r.metrics; return [r.segments.date, c.name, c.advertisingChannelType, c.status, mic(r.campaignBudget.amountMicros), num(m.impressions), num(m.clicks), mic(m.costMicros), num(m.conversions), num(m.conversionsValue), num(m.ctr), mic(m.averageCpc), num(m.searchImpressionShare), num(m.searchTopImpressionShare), num(m.searchAbsoluteTopImpressionShare), num(m.searchBudgetLostImpressionShare), num(m.searchRankLostImpressionShare), num(m.phoneCalls), num(m.phoneImpressions)]; }));

  n += write(ss, 'Conversions', rows(
    "SELECT segments.date, campaign.name, segments.conversion_action_name, metrics.conversions FROM campaign WHERE segments.date DURING " + range + " AND metrics.conversions > 0",
    function (r) { return [r.segments.date, r.campaign.name, r.segments.conversionActionName, num(r.metrics.conversions)]; }));

  try {
    n += write(ss, 'Calls', rows(
      "SELECT call_view.start_call_date_time, campaign.name, call_view.call_duration_seconds, call_view.call_status, call_view.caller_area_code, call_view.type FROM call_view WHERE call_view.start_call_date_time DURING " + range,
      function (r) { var v = r.callView; return [String(v.startCallDateTime).slice(0, 10), v.startCallDateTime, r.campaign.name, num(v.callDurationSeconds), v.callStatus, v.callerAreaCode, v.type]; }));
  } catch (e) { notes.push('calls: ' + e.message); }

  n += write(ss, 'Search_Terms', rows(
    "SELECT segments.date, campaign.name, ad_group.name, search_term_view.search_term, segments.search_term_match_type, search_term_view.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE segments.date DURING " + range + " AND metrics.impressions > 0",
    function (r) { var m = r.metrics; return [r.segments.date, r.campaign.name, r.adGroup.name, r.searchTermView.searchTerm, r.segments.searchTermMatchType, r.searchTermView.status, num(m.impressions), num(m.clicks), mic(m.costMicros), num(m.conversions)]; }));

  // Weekly snapshots (Mondays, and on the first run)
  var dow = Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'u');
  if (dow === '1' || mode === 'BACKFILL_30') {
    var wk = Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');
    n += write(ss, 'Keywords', rows(
      "SELECT campaign.name, ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ad_group_criterion.quality_info.quality_score, ad_group_criterion.quality_info.search_predicted_ctr, ad_group_criterion.quality_info.creative_quality_score, ad_group_criterion.quality_info.post_click_quality_score, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.search_impression_share, metrics.search_top_impression_share FROM keyword_view WHERE segments.date DURING LAST_7_DAYS AND campaign.status != 'REMOVED'",
      function (r) { var k = r.adGroupCriterion, q = k.qualityInfo || {}, m = r.metrics; return [wk, r.campaign.name, r.adGroup.name, k.keyword.text, k.keyword.matchType, k.status, q.qualityScore || '', q.searchPredictedCtr || '', q.creativeQualityScore || '', q.postClickQualityScore || '', num(m.impressions), num(m.clicks), mic(m.costMicros), num(m.conversions), num(m.searchImpressionShare), num(m.searchTopImpressionShare)]; }));
    n += write(ss, 'Ads', rows(
      "SELECT campaign.name, ad_group.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.policy_summary.approval_status, ad_group_ad.ad_strength, metrics.impressions, metrics.clicks, metrics.conversions FROM ad_group_ad WHERE segments.date DURING LAST_7_DAYS AND campaign.status != 'REMOVED'",
      function (r) { var a = r.adGroupAd, m = r.metrics; return [wk, r.campaign.name, r.adGroup.name, a.ad.id, a.status, (a.policySummary || {}).approvalStatus, a.adStrength, num(m.impressions), num(m.clicks), num(m.conversions)]; }));
  }

  try {
    var since = Utilities.formatDate(new Date(Date.now() - (mode === 'BACKFILL_30' ? 29 : 1) * 864e5), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');
    n += write(ss, 'Change_History', rows(
      "SELECT change_event.change_date_time, change_event.user_email, change_event.client_type, change_event.change_resource_type, change_event.resource_change_operation, campaign.name, change_event.changed_fields FROM change_event WHERE change_event.change_date_time >= '" + since + "' ORDER BY change_event.change_date_time DESC LIMIT 1000",
      function (r) { var c = r.changeEvent; return [c.changeDateTime, c.userEmail, c.clientType, c.changeResourceType, c.resourceChangeOperation, (r.campaign || {}).name || '', String(c.changedFields || '')]; }));
  } catch (e) { notes.push('change history: ' + e.message); }

  log(ss, mode, n, notes.join(' | '));
  Logger.log('Wrote ' + n + ' rows (' + mode + '). Sheet: ' + ss.getUrl());
}

function getSheet() {
  var it = DriveApp.getFilesByName(SHEET_NAME), ss;
  if (it.hasNext()) ss = SpreadsheetApp.open(it.next());
  else { ss = SpreadsheetApp.create(SHEET_NAME); Logger.log('Created sheet ' + ss.getUrl()); }
  Object.keys(TABS).forEach(function (t) {
    var s = ss.getSheetByName(t);
    if (!s) { s = ss.insertSheet(t); s.appendRow(TABS[t]); s.setFrozenRows(1); }
  });
  var d = ss.getSheetByName('Sheet1'); if (d && ss.getSheets().length > 1) ss.deleteSheet(d);
  return ss;
}
function sheet(ss, t) { return ss.getSheetByName(t); }
function rows(q, f) { var out = [], it = AdsApp.search(q); while (it.hasNext()) out.push(f(it.next())); return out; }
function write(ss, t, data) {
  if (!data.length) return 0;
  var s = sheet(ss, t); s.getRange(s.getLastRow() + 1, 1, data.length, data[0].length).setValues(data); return data.length;
}
function alreadyLogged(ss, d) {
  var log = sheet(ss, 'Run_Log').getDataRange().getValues();
  return log.some(function (r) { return r[1] === 'DAILY' && String(r[0]).slice(0, 10) === Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd'); });
}
function log(ss, mode, n, notes) {
  sheet(ss, 'Run_Log').appendRow([Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd HH:mm'), mode, n, notes || '']);
}
function num(v) { return v === undefined || v === null ? 0 : Number(v); }
function mic(v) { return v === undefined || v === null ? 0 : Math.round(Number(v) / 10000) / 100; }
