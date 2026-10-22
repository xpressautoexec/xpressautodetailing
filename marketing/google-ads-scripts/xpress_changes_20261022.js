/**
 * Xpress one-time changes, approved by Omar in chat 2026-10-22 (account 336-085-6566).
 * Run ONCE: Preview first, check the log, then Run. Safe to re-run: skips anything already there.
 *   R-20261022-1  Auto Detailing: car wash negatives
 *   R-20261022-2  Headlight Restoration: DIY negatives
 *   R-20261022-3  Paint Correction & Ceramic: repair negatives
 *   R-20261022-4  RV Detailing & Restoration: storage negatives (campaign is paused, kept for spring)
 *   R-20261022-5  All Search campaigns: competitor negatives
 *   R-20261022-7  Brand: one new responsive search ad (old ads left on; Google picks the better one)
 * Budgets and the RV pause are NOT here: the Xpress Budget Calendar script does those.
 */
var NEG = {
  'G | Search | Auto Detailing': ['"hand car wash"', '"car hand wash"', '"full service car wash"', '"detail car wash"', '"carwash"'],
  'G | Search | Headlight Restoration': ['"best way to clean"', '"how to clean"', '"without removing"', '"diy"'],
  'G | Search | Paint Correction & Ceramic': ['"touch up"', '"paint repair"', '"repair shop"'],
  'G | Search | RV Detailing & Restoration': ['"indoor rv storage"', '"store an rv"']
};
var COMPETITORS = ['"slick and surge"', '"karvix"'];
var BRAND = 'G | Search | Brand';
var HEADLINES = [
  'Xpress Auto & RV Detailing', 'Xpress Auto Detail Calgary', 'Official Site - Xpress',
  'We Come to You in Calgary', 'Call 587-500-4523', 'Book Online with Xpress',
  'Interior & Exterior Detailing', 'Headlight Restoration', 'Ceramic Coating & Correction',
  'Fleet & Commercial Detailing', 'Serving Airdrie & Cochrane', 'Chestermere & Okotoks Too',
  'Detailing Courses Available', 'Xpress Pass Monthly Plans', 'Mobile Auto Detailing'
];
var DESCRIPTIONS = [
  'Xpress Auto & RV Detailing: mobile detailing across Calgary and area. Book online today.',
  'Interior, exterior, headlights, ceramic coating and fleet care. Call 587-500-4523.',
  'Want to learn the trade? Ask about Xpress detailing courses and hands-on training.',
  'Serving Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.'
];

function main() {
  HEADLINES.forEach(function (h) { if (h.length > 30) throw 'Headline too long: ' + h; });
  DESCRIPTIONS.forEach(function (d) { if (d.length > 90) throw 'Description too long: ' + d; });
  var it = AdsApp.campaigns().withCondition("Name STARTS_WITH 'G | Search |'").get();
  while (it.hasNext()) {
    var c = it.next(), name = c.getName();
    var have = {}, n = c.negativeKeywords().get();
    while (n.hasNext()) have[n.next().getText().toLowerCase()] = true;
    (NEG[name] || []).concat(COMPETITORS).forEach(function (k) {
      if (have[k]) return;
      c.createNegativeKeyword(k);
      Logger.log(name + ' | negative added ' + k);
    });
    if (name === BRAND) addBrandAd(c);
  }
}

function addBrandAd(c) {
  var ag = c.adGroups().withCondition("Status = ENABLED").get();
  if (!ag.hasNext()) { Logger.log('Brand: no enabled ad group, ad not added'); return; }
  var g = ag.next(), url = null, ads = g.ads().withCondition("Type = RESPONSIVE_SEARCH_AD").get();
  while (ads.hasNext()) {
    var a = ads.next();
    if (a.asType().responsiveSearchAd().getHeadlines().some(function (h) { return h.text === HEADLINES[0]; }) &&
        a.asType().responsiveSearchAd().getHeadlines().length === HEADLINES.length) { Logger.log('Brand: new ad already exists'); return; }
    if (!url) url = a.urls().getFinalUrl();
  }
  if (!url) { Logger.log('Brand: no existing ad to copy the final URL from, ad not added'); return; }
  var b = g.newAd().responsiveSearchAdBuilder().withFinalUrl(url).withPath1('Calgary').withPath2('Detailing');
  HEADLINES.forEach(function (h, i) { b = i === 0 ? b.addHeadline(h, 'HEADLINE_1') : b.addHeadline(h); });
  DESCRIPTIONS.forEach(function (d) { b = b.addDescription(d); });
  var op = b.build();
  Logger.log('Brand | new ad in ' + g.getName() + ' -> ' + url + ' | ' + (op.isSuccessful() ? 'OK' : 'FAILED ' + op.getErrors().join('; ')));
}
