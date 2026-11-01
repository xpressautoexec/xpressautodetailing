/**
 * Xpress Export PMax (Google Ads Script, account 336-085-6566). READ-ONLY: changes nothing in Google Ads.
 * Copies everything inside the Performance Max campaigns (settings, asset groups, every headline,
 * long headline, description, business name, image, logo, video, search theme, audience signal,
 * sitelink, callout, structured snippet, call asset, negative keyword, location target) with Google's
 * performance label for each asset, into the monitor Sheet tab "PMax_Audit".
 * Claude audits that tab and writes the edit script for Omar to approve.
 */
var SHEET_ID = '1BrFf1irduFl0Iz_AXr7NQ62C1Llfaa-FT80p4JLKp1c';
var PMAX = "campaign.advertising_channel_type = 'PERFORMANCE_MAX'";

function g(o, path) { return path.split('.').reduce(function (x, k) { return x == null ? x : x[k]; }, o); }
function q(query, fn) {
  try { var it = AdsApp.search(query); while (it.hasNext()) fn(it.next()); }
  catch (e) { rows.push(['ERROR', '', '', '', String(e).slice(0, 300), query.slice(0, 120), '', '']); }
}
var rows = [];

function main() {
  // 1. Campaign settings
  q("SELECT campaign.name, campaign.status, campaign.bidding_strategy_type, campaign.maximize_conversions.target_cpa_micros, " +
    "campaign.maximize_conversion_value.target_roas, campaign.url_expansion_opt_out, campaign_budget.amount_micros, " +
    "metrics.cost_micros, metrics.conversions, metrics.clicks, metrics.impressions FROM campaign WHERE " + PMAX +
    " AND segments.date DURING LAST_30_DAYS", function (r) {
    rows.push(['setting', g(r, 'campaign.name'), '', 'status / bidding', g(r, 'campaign.status') + ' | ' + g(r, 'campaign.biddingStrategyType') +
      ' | tCPA ' + (g(r, 'campaign.maximizeConversions.targetCpaMicros') || 0) / 1e6 + ' | final URL expansion ' + (g(r, 'campaign.urlExpansionOptOut') ? 'OFF' : 'ON') +
      ' | budget ' + (g(r, 'campaignBudget.amountMicros') || 0) / 1e6, '', '',
      '30d: ' + g(r, 'metrics.impressions') + ' impr, ' + g(r, 'metrics.clicks') + ' clicks, $' + ((g(r, 'metrics.costMicros') || 0) / 1e6).toFixed(2) + ', ' + g(r, 'metrics.conversions') + ' conv']);
  });
  // 2. Asset groups
  q("SELECT campaign.name, asset_group.name, asset_group.status, asset_group.ad_strength, asset_group.final_urls, " +
    "asset_group.final_mobile_urls, asset_group.path1, asset_group.path2 FROM asset_group WHERE " + PMAX + " AND asset_group.status != 'REMOVED'", function (r) {
    rows.push(['asset group', g(r, 'campaign.name'), g(r, 'assetGroup.name'), 'final URL / paths',
      (g(r, 'assetGroup.finalUrls') || []).join(' ') + ' | /' + (g(r, 'assetGroup.path1') || '') + '/' + (g(r, 'assetGroup.path2') || ''),
      g(r, 'assetGroup.status'), g(r, 'assetGroup.adStrength'), '']);
  });
  // 3. Every asset in every asset group
  q("SELECT campaign.name, asset_group.name, asset_group_asset.field_type, asset_group_asset.status, asset_group_asset.performance_label, " +
    "asset.id, asset.name, asset.type, asset.text_asset.text, asset.image_asset.full_size.url, asset.youtube_video_asset.youtube_video_id " +
    "FROM asset_group_asset WHERE " + PMAX + " AND asset_group_asset.status != 'REMOVED'", function (r) {
    var text = g(r, 'asset.textAsset.text') || g(r, 'asset.imageAsset.fullSize.url') ||
      (g(r, 'asset.youtubeVideoAsset.youtubeVideoId') ? 'https://youtu.be/' + g(r, 'asset.youtubeVideoAsset.youtubeVideoId') : '') || g(r, 'asset.name');
    rows.push(['asset', g(r, 'campaign.name'), g(r, 'assetGroup.name'), g(r, 'assetGroupAsset.fieldType'), text,
      g(r, 'assetGroupAsset.status'), g(r, 'assetGroupAsset.performanceLabel'), 'asset ' + g(r, 'asset.id') + (g(r, 'asset.name') ? ' ' + g(r, 'asset.name') : '')]);
  });
  // 4. Signals: search themes and audiences
  q("SELECT campaign.name, asset_group.name, asset_group_signal.search_theme.text, asset_group_signal.audience.audience " +
    "FROM asset_group_signal WHERE " + PMAX, function (r) {
    var t = g(r, 'assetGroupSignal.searchTheme.text');
    rows.push(['signal', g(r, 'campaign.name'), g(r, 'assetGroup.name'), t ? 'search theme' : 'audience', t || g(r, 'assetGroupSignal.audience.audience'), '', '', '']);
  });
  // 5. Campaign-level assets (sitelinks, callouts, snippets, calls)
  q("SELECT campaign.name, campaign_asset.field_type, campaign_asset.status, asset.sitelink_asset.link_text, asset.sitelink_asset.description1, " +
    "asset.sitelink_asset.description2, asset.final_urls, asset.callout_asset.callout_text, asset.structured_snippet_asset.header, " +
    "asset.structured_snippet_asset.values, asset.call_asset.phone_number FROM campaign_asset WHERE " + PMAX + " AND campaign_asset.status != 'REMOVED'", function (r) {
    var t = g(r, 'asset.sitelinkAsset.linkText') ? g(r, 'asset.sitelinkAsset.linkText') + ' | ' + (g(r, 'asset.sitelinkAsset.description1') || '') + ' | ' + (g(r, 'asset.sitelinkAsset.description2') || '') + ' | ' + (g(r, 'asset.finalUrls') || []).join(' ')
      : g(r, 'asset.calloutAsset.calloutText') || (g(r, 'asset.structuredSnippetAsset.header') ? g(r, 'asset.structuredSnippetAsset.header') + ': ' + (g(r, 'asset.structuredSnippetAsset.values') || []).join(', ') : '') || g(r, 'asset.callAsset.phoneNumber') || '';
    rows.push(['campaign asset', g(r, 'campaign.name'), '', g(r, 'campaignAsset.fieldType'), t, g(r, 'campaignAsset.status'), '', '']);
  });
  // 6. Account-level assets that also serve on PMax
  q("SELECT customer_asset.field_type, customer_asset.status, asset.sitelink_asset.link_text, asset.callout_asset.callout_text, " +
    "asset.call_asset.phone_number, asset.final_urls FROM customer_asset WHERE customer_asset.status != 'REMOVED'", function (r) {
    rows.push(['account asset', '(all campaigns)', '', g(r, 'customerAsset.fieldType'),
      g(r, 'asset.sitelinkAsset.linkText') || g(r, 'asset.calloutAsset.calloutText') || g(r, 'asset.callAsset.phoneNumber') || '', g(r, 'customerAsset.status'), '', (g(r, 'asset.finalUrls') || []).join(' ')]);
  });
  // 7. Targeting and negatives
  q("SELECT campaign.name, campaign_criterion.type, campaign_criterion.negative, campaign_criterion.location.geo_target_constant, " +
    "campaign_criterion.proximity.radius, campaign_criterion.proximity.address.city_name, campaign_criterion.keyword.text, " +
    "campaign_criterion.language.language_constant FROM campaign_criterion WHERE " + PMAX, function (r) {
    var t = g(r, 'campaignCriterion.keyword.text') || g(r, 'campaignCriterion.location.geoTargetConstant') ||
      (g(r, 'campaignCriterion.proximity.radius') ? g(r, 'campaignCriterion.proximity.radius') + ' around ' + (g(r, 'campaignCriterion.proximity.address.cityName') || '?') : '') ||
      g(r, 'campaignCriterion.language.languageConstant') || '';
    rows.push(['targeting', g(r, 'campaign.name'), '', g(r, 'campaignCriterion.type') + (g(r, 'campaignCriterion.negative') ? ' (negative)' : ''), t, '', '', '']);
  });

  Logger.log(rows.length + ' rows');
  rows.slice(0, 40).forEach(function (x) { Logger.log(x.join(' | ')); });
  if (AdsApp.getExecutionInfo().isPreview()) { Logger.log('Preview: Sheet not written. Click Run to write the PMax_Audit tab.'); return; }
  var ss = SpreadsheetApp.openById(SHEET_ID), s = ss.getSheetByName('PMax_Audit');
  if (s) s.clear(); else s = ss.insertSheet('PMax_Audit');
  s.appendRow(['section', 'campaign', 'asset_group', 'field', 'text_or_value', 'status', 'performance', 'detail']);
  if (rows.length) s.getRange(2, 1, rows.length, 8).setValues(rows.map(function (x) { return x.map(function (v) { return v == null ? '' : v; }); }));
  s.setFrozenRows(1);
}
