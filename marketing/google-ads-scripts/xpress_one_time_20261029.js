/**
 * XPRESS ONE-TIME 2026-10-29 (Google Ads Script, account 336-085-6566)
 * 1. Applies the approved edits (xpress_apply_20261029)
 * 2. Copies every negative keyword to the Sheet tab "Negatives" (read-only)
 * 3. Copies everything in the Performance Max campaigns to the Sheet tab "PMax_Audit" (read-only)
 * PREVIEW = shows what would happen, changes nothing. RUN = does it. Running twice is safe.
 */
var APPLY = (function () {
/**
 * Xpress Apply 2026-10-29 (Google Ads Script, account 336-085-6566). One-time run by Omar.
 * Applies everything approved and still pending, plus the Oct 29 chat instructions:
 *   A. R-20261027-2  RV Detailing & Restoration paused + label "Xpress season-paused"
 *   B. R-20261027-1  Detailing PMax re-enabled for the call test (budget is set daily by Budget Calendar v3)
 *   C. R-20261022-1..5, R-20261027-3, -4  phrase negatives (skips any that already exist)
 *   D. R-20261022-7  new Brand responsive search ad (old Brand ads stay on)
 *   E. R-20261027-5 + Oct 29 "fix the calls": call asset 587-500-4523 (all hours) on every Search campaign
 *      that lacks one, and a call-first ad in Auto - Mobile Detailing, Headlights - Restoration,
 *      Paint - Ceramic Coating
 *   F. Oct 29: new ad group "Auto - Winter Packages" (Deep Clean & Seal) with 8 keywords + 1 ad
 *   G. Oct 29: Airdrie fleet ad in Fleet - Washing & Detailing, labelled "Xpress Airdrie week"
 *      (Budget Calendar v3 switches Fleet geo to Airdrie Oct 29 - Nov 4 and pauses this ad on Nov 5)
 * Auto ads point to /detailing, the page current Auto ad clicks land on (Lovable analytics: 215 views Oct 15-29).
 * Not in this script (do by hand in Google Ads): call conversion minimum length 45 s; website form test.
 *
 * HOW TO RUN: paste into Tools > Bulk actions > Scripts > + New. Click Preview, read the log.
 * Then set DRY_RUN = false and click Run. Running it twice is safe: everything checks before creating.
 */
var DRY_RUN = false; // Preview never changes anything; Run applies
var SITE = 'https://xpressautodetail.ca';
var PHONE = '587-500-4523';
var SEASON_LABEL = 'Xpress season-paused', AIRDRIE_LABEL = 'Xpress Airdrie week';

var ALL = ['G | Search | Brand', 'G | Search | Auto Detailing', 'G | Search | Headlight Restoration',
  'G | Search | Paint Correction & Ceramic', 'G | Search | RV Detailing & Restoration',
  'G | Search | Fleet & Commercial', 'G | Search | Training'];
var NEG = {
  '*': ['slick and surge', 'karvix'],
  '*exceptRV': ['storage', 'repair shop'],
  'G | Search | RV Detailing & Restoration': ['indoor rv storage', 'rv storage near me', 'rv storage lot', 'first choice rv storage', 'ecco rv storage'],
  'G | Search | Auto Detailing': ['car wash', 'carwash', 'hand wash', 'cheap', 'cheapest', 'interior cleaner', 'diy', 'how to'],
  'G | Search | Headlight Restoration': ['diy', 'how to', 'kit', 'toothpaste', 'headlight cleaner'],
  'G | Search | Paint Correction & Ceramic': ['paint repair', 'paint damage repair', 'body shop']
};

var ADS = [
  { key: 'D Brand', campaign: 'G | Search | Brand', adGroup: 'Brand - Xpress', url: SITE + '/',
    h: ['Xpress Auto & RV Detailing', 'Mobile Detailing in Calgary', 'We Come To You', 'Call For A Booking',
        'Book Online Today', 'Cars, Trucks, RVs And Fleets', 'Ceramic Coating & Correction', 'Headlight Restoration',
        'Detailing Courses In Calgary', 'Learn To Detail With Xpress', 'Own Water And Power On Site',
        'Calgary, Airdrie, Cochrane', 'Xpress Pass Monthly Plans', 'Gift Cards Available', 'Read Our Google Reviews'],
    d: ['Mobile detailing for cars, trucks, RVs and fleets. Our vans carry their own water + power.',
        'Detailing courses in Calgary: learn paint correction and ceramic coating hands-on.',
        'Serving Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County.',
        'Call us or book online. We work wherever you park: home, office or job site.'] },
  { key: 'E Auto call', campaign: 'G | Search | Auto Detailing', adGroup: 'Auto - Mobile Detailing', url: SITE + '/detailing',
    h: ['Call For Mobile Detailing', 'Mobile Car Detailing Calgary', 'We Come To Your Driveway', 'Call Now For This Week',
        'Talk To A Detailer Today', 'Interior Detailing Packages', 'Own Water And Power On Site', 'Calgary, Airdrie, Cochrane',
        'Book Online Or Call Us', 'Quotes Over The Phone'],
    d: ['Tap Call to talk to a detailer. We quote over the phone and book a time that suits you.',
        'Mobile car detailing at your home or office. Our vans bring their own water and power.',
        'Packages from a quick upkeep to a full-day Correct & Coat. Call or book online.'] },
  { key: 'E Headlight call', campaign: 'G | Search | Headlight Restoration', adGroup: 'Headlights - Restoration', url: SITE + '/headlight-restoration',
    h: ['Headlight Restoration Calgary', 'Call About Cloudy Headlights', 'Clear Headlights For Winter', 'Yellow Headlights Restored',
        'Mobile, Done In Your Driveway', 'Brighter Night Driving', 'Call Now For A Quote', 'Fog Lights Can Be Added'],
    d: ['Cloudy or yellow headlights restored at your home or office. Call for a quick quote.',
        'Darker winter commutes need clear lenses. Mobile service across Calgary and area.',
        'Tap Call to talk to us. Book a standalone visit or add it to any detail.'] },
  { key: 'E Paint call', campaign: 'G | Search | Paint Correction & Ceramic', adGroup: 'Paint - Ceramic Coating', url: SITE + '/ceramic-paint-correction',
    h: ['Ceramic Coating Calgary', 'Paint Correction Calgary', 'Call For A Coating Quote', '1-Step And 2-Step Correction',
        '1-Year And 5-Year Coatings', 'Correct & Coat Package', 'Talk To A Paint Specialist', 'Swirls And Scratches Reduced'],
    d: ['Machine paint correction and ceramic coatings, 1-year to 5-year. Call for a quote.',
        'Correct & Coat: 1-step correction plus a 1-year ceramic coating, registered.',
        'Tap Call to talk through your paint, or book online at a time that suits you.'] },
  { key: 'F Winter', campaign: 'G | Search | Auto Detailing', adGroup: 'Auto - Winter Packages', url: SITE + '/detailing', newGroup: true, cpc: 2.00,
    kw: ['winter car detailing', 'winter car detailing calgary', 'winter detail package', 'salt stain removal car',
         'car salt removal', 'winter car protection', 'winter interior detailing', 'salt stains car seats'],
    h: ['Winter Car Detailing Calgary', 'Salt Stain Removal', 'Deep Clean & Seal Package', 'Deep Clean & Seal From $379',
        'Ceramic Sealant On All Paint', 'Mobile, We Come To You', 'Call For A Booking', 'Salt Off Carpets And Mats',
        'Leather Cleaned & Conditioned', 'Protect Your Paint This Winter', 'Book Your Winter Detail'],
    d: ['Deep Clean & Seal: deep interior extraction, salt stain removal and ceramic spray sealant.',
        'For a Calgary winter car: salt on the carpets, spills in the back, paint unprotected.',
        'Mobile service across Calgary and area. Our vans bring their own water and power.',
        'Call us or book online. Sedans from $379; SUVs, minivans and trucks priced by size.'] },
  { key: 'G Airdrie', campaign: 'G | Search | Fleet & Commercial', adGroup: 'Fleet - Washing & Detailing', url: SITE + '/fleet', label: AIRDRIE_LABEL,
    h: ['Fleet Washing In Airdrie', 'Airdrie Fleet Detailing', 'Work Trucks Cleaned On Site', 'Call For A Fleet Quote',
        'We Come To Your Airdrie Yard', 'Vans, Trucks And Equipment', 'Own Water And Power On Site', 'Scheduled Fleet Programs'],
    d: ['Fleet washing and detailing at your Airdrie yard. We bring our own water and power.',
        'Vans, pickups and work trucks cleaned on a schedule that suits your crew. Call for a quote',
        'Serving Airdrie businesses this week. Tap Call to talk to us about your fleet.'] }
];

var live;
function main() {
  live = !DRY_RUN && !AdsApp.getExecutionInfo().isPreview();
  Logger.log(live ? 'LIVE RUN' : 'DRY RUN: nothing will change');
  if (!checkText()) return;
  var camps = {}, it = AdsApp.campaigns().get();
  while (it.hasNext()) { var c = it.next(); if (ALL.indexOf(c.getName()) !== -1) camps[c.getName()] = c; }
  var missing = ALL.filter(function (n) { return !camps[n]; });
  if (missing.length) { Logger.log('ABORT: campaigns not found: ' + missing.join(', ')); return; }
  ensureLabel(SEASON_LABEL); ensureLabel(AIRDRIE_LABEL);

  // A. RV season pause
  var rv = camps['G | Search | RV Detailing & Restoration'];
  if (rv.isEnabled()) { Logger.log('A. RV: ENABLED -> PAUSED + ' + SEASON_LABEL); if (live) { rv.pause(); rv.applyLabel(SEASON_LABEL); } }
  else Logger.log('A. RV already paused');

  // B. PMax Detailing on
  var pit = AdsApp.performanceMaxCampaigns().withCondition("Name = 'Detailing'").get();
  if (pit.hasNext()) { var p = pit.next(); if (!p.isEnabled()) { Logger.log('B. PMax Detailing: PAUSED -> ENABLED'); if (live) p.enable(); } else Logger.log('B. PMax Detailing already on'); }
  else Logger.log('B. WARNING: PMax "Detailing" not found');

  // C. Negatives
  ALL.forEach(function (n) {
    var list = NEG['*'].concat(n.indexOf('RV') === -1 ? NEG['*exceptRV'] : [], NEG[n] || []);
    var have = {}, ni = camps[n].negativeKeywords().get();
    while (ni.hasNext()) have[ni.next().getText().replace(/["\[\]+]/g, '').toLowerCase()] = true;
    list.forEach(function (w) {
      if (have[w]) return;
      Logger.log('C. ' + n + ': add negative "' + w + '"');
      if (live) camps[n].createNegativeKeyword('"' + w + '"');
    });
  });

  // E. Call asset on every Search campaign
  var phone = null;
  try { ALL.forEach(function (n) {
    if (camps[n].extensions().phoneNumbers().get().hasNext()) { Logger.log('E. ' + n + ': call asset already on'); return; }
    Logger.log('E. ' + n + ': add call asset ' + PHONE + ' (all hours)');
    if (!live) return;
    if (!phone) {
      var op = AdsApp.extensions().newPhoneNumberBuilder().withCountry('CA').withPhoneNumber(PHONE).withCallOnly(false).build();
      if (!op.isSuccessful()) { Logger.log('E. could not create call asset: ' + op.getErrors().join('; ') + ' -> add it by hand'); return; }
      phone = op.getResult();
    }
    camps[n].addPhoneNumber(phone);
  }); } catch (e) { Logger.log('E. Call assets could not be added by script (' + e + '). Add ' + PHONE + ' as a call asset at account level by hand: Ads > Assets > + > Call.'); }

  // D, E, F, G. Ads (and the winter ad group)
  ADS.forEach(function (a) { addAd(camps[a.campaign], a); });
  Logger.log('Done. Next: paste Budget Calendar v3 over the old Budget Calendar, Run it once, keep it scheduled daily 4-5 AM.');
}

function checkText() {
  var ok = true;
  ADS.forEach(function (a) {
    a.h.forEach(function (t) { if (t.length > 30) { ok = false; Logger.log('ABORT: headline too long (' + t.length + '): ' + t); } });
    a.d.forEach(function (t) { if (t.length > 90) { ok = false; Logger.log('ABORT: description too long (' + t.length + '): ' + t); } });
  });
  return ok;
}

function ensureLabel(n) { if (live && !AdsApp.labels().withCondition("Name = '" + n + "'").get().hasNext()) AdsApp.createLabel(n); }

function findGroup(c, name) { var g = c.adGroups().withCondition("Name = '" + name.replace(/'/g, "\\'") + "'").get(); return g.hasNext() ? g.next() : null; }

function addAd(c, a) {
  var g = findGroup(c, a.adGroup);
  if (!g && a.newGroup) {
    Logger.log(a.key + ': create ad group "' + a.adGroup + '" (default CPC $' + a.cpc.toFixed(2) + ') with ' + a.kw.length + ' phrase keywords');
    if (!live) return Logger.log(a.key + ': + 1 responsive search ad (' + a.h.length + ' headlines)');
    var gop = c.newAdGroupBuilder().withName(a.adGroup).withCpc(a.cpc).withStatus('ENABLED').build();
    if (!gop.isSuccessful()) return Logger.log(a.key + ': ad group failed: ' + gop.getErrors().join('; '));
    g = gop.getResult();
    a.kw.forEach(function (k) { g.newKeywordBuilder().withText('"' + k + '"').build(); });
  }
  if (!g) return Logger.log(a.key + ': WARNING ad group "' + a.adGroup + '" not found, ad skipped');
  var first = a.h[0], ai = g.ads().withCondition('Type = RESPONSIVE_SEARCH_AD').withCondition('Status != REMOVED').get();
  while (ai.hasNext()) {
    var ex = ai.next().asType().responsiveSearchAd();
    if (ex.getHeadlines().some(function (x) { return x.text === first; })) return Logger.log(a.key + ': ad already exists, skipped');
  }
  Logger.log(a.key + ': add responsive search ad in "' + a.adGroup + '" -> ' + a.url);
  if (!live) return;
  var op = g.newAd().responsiveSearchAdBuilder()
    .withHeadlines(a.h.map(function (t) { return { text: t }; }))
    .withDescriptions(a.d.map(function (t) { return { text: t }; }))
    .withFinalUrl(a.url).build();
  if (!op.isSuccessful()) return Logger.log(a.key + ': ad failed: ' + op.getErrors().join('; '));
  if (a.label) op.getResult().applyLabel(a.label);
}

return main;
})();
var EXPORT_NEG = (function () {
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

return main;
})();
var EXPORT_PMAX = (function () {
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

return main;
})();

function main() {
  Logger.log('===== 1. APPLY APPROVED EDITS ====='); try { APPLY(); } catch (e) { Logger.log('Apply stopped: ' + e); }
  Logger.log('===== 2. EXPORT NEGATIVES ====='); try { EXPORT_NEG(); } catch (e) { Logger.log('Negatives export failed: ' + e); }
  Logger.log('===== 3. EXPORT PMAX ====='); try { EXPORT_PMAX(); } catch (e) { Logger.log('PMax export failed: ' + e); }
}
