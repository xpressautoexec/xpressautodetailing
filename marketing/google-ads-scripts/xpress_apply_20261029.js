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
var DRY_RUN = true;
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
