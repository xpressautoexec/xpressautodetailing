/**
 * Xpress Winter Switch, Auto Detailing (Google Ads Script, account 336-085-6566).
 * R-20261022-9, approved by Omar in chat 2026-10-22. Prepared by Claude 2026-10-29. Omar runs it; Claude makes no changes.
 *
 * MODE 'WINTER' (run on or after Nov 1): inside "G | Search | Auto Detailing" only
 *   1. Pauses the exterior ad groups listed in EXTERIOR_AD_GROUPS and labels them "Xpress winter-paused".
 *   2. In the ad groups that stay on, pauses ads whose headlines/descriptions sell exterior work
 *      (EXTERIOR_WORDS) and labels them, but never pauses the last enabled ad in an ad group.
 *   3. Removes exterior image assets from the campaign (any image whose asset name does not contain
 *      an INTERIOR_IMAGE_WORDS word), logging each asset id so it can be re-added on Apr 1.
 * MODE 'SUMMER' (run on or after Apr 1): re-enables ONLY ad groups and ads carrying "Xpress winter-paused"
 *   and removes the label. Images listed in the winter log must be re-added by hand (scripts cannot re-link
 *   every image type reliably).
 *
 * Safety: DRY_RUN = true by default. Run with Preview first, read the log, then set DRY_RUN = false and Run.
 * Aborts if the campaign is not found exactly once. Touches no other campaign, no budgets, no keywords.
 */
var MODE = 'WINTER';            // 'WINTER' or 'SUMMER'
var DRY_RUN = true;             // set to false only after checking the Preview log
var CAMPAIGN = 'G | Search | Auto Detailing';
var LABEL = 'Xpress winter-paused';
// Exterior-led ad group(s). Check this list before the live run; edit if your exterior groups differ.
var EXTERIOR_AD_GROUPS = ['Auto - Complete Detail'];
// Never touched by the winter switch (winter package ads sell the sealant on purpose).
var KEEP_AD_GROUPS = ['Auto - Winter Packages'];
var EXTERIOR_WORDS = ['exterior', 'wash', 'wax', 'shine', 'polish', 'paint', 'ceramic', 'sealant', 'clay'];
var INTERIOR_IMAGE_WORDS = ['interior', 'cabin', 'seat', 'carpet', 'upholstery', 'dash'];

function main() {
  var preview = AdsApp.getExecutionInfo().isPreview(), live = !DRY_RUN && !preview;
  var cIt = AdsApp.campaigns().withCondition("Name = '" + CAMPAIGN.replace(/'/g, "\\'") + "'").get();
  if (cIt.totalNumEntities() !== 1) { Logger.log('ABORT: campaign "' + CAMPAIGN + '" found ' + cIt.totalNumEntities() + ' times. No changes.'); return; }
  var campaign = cIt.next();
  if (live && !AdsApp.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) AdsApp.createLabel(LABEL, 'Paused by Xpress winter switch; re-enabled Apr 1');
  Logger.log('Mode ' + MODE + (live ? ' | LIVE' : ' | DRY RUN (no changes)'));
  if (MODE === 'WINTER') winter(campaign, live); else if (MODE === 'SUMMER') summer(campaign, live); else Logger.log('ABORT: unknown MODE');
}

function hasWord(text, words) { text = (text || '').toLowerCase(); return words.some(function (w) { return text.indexOf(w) !== -1; }); }

function adText(ad) {
  var parts = [];
  try { var r = ad.asType().responsiveSearchAd();
    r.getHeadlines().forEach(function (h) { parts.push(h.text); });
    r.getDescriptions().forEach(function (d) { parts.push(d.text); }); } catch (e) { parts.push(ad.getHeadline ? ad.getHeadline() : ''); }
  return parts.join(' | ');
}

function winter(campaign, live) {
  var gIt = campaign.adGroups().withCondition('Status = ENABLED').get();
  while (gIt.hasNext()) {
    var g = gIt.next(), name = g.getName();
    if (KEEP_AD_GROUPS.indexOf(name) !== -1) { Logger.log('Ad group "' + name + '": kept as is (winter package)'); continue; }
    if (EXTERIOR_AD_GROUPS.indexOf(name) !== -1) {
      Logger.log('Ad group "' + name + '": ENABLED -> PAUSED (exterior)');
      if (live) { g.pause(); g.applyLabel(LABEL); }
      continue;
    }
    var ads = [], aIt = g.ads().withCondition('Status = ENABLED').get();
    while (aIt.hasNext()) ads.push(aIt.next());
    var ext = ads.filter(function (a) { return hasWord(adText(a), EXTERIOR_WORDS); });
    if (ext.length && ext.length === ads.length) { ext = ext.slice(1); Logger.log('Ad group "' + name + '": every ad mentions exterior work; keeping one on. Write an interior-only ad here.'); }
    ext.forEach(function (a) {
      Logger.log('Ad ' + a.getId() + ' in "' + name + '": ENABLED -> PAUSED (exterior copy)');
      if (live) { a.pause(); a.applyLabel(LABEL); }
    });
  }
  var iIt = campaign.extensions().images().get(), kept = 0;
  while (iIt.hasNext()) {
    var img = iIt.next(), nm = img.getName ? img.getName() : '';
    if (hasWord(nm, INTERIOR_IMAGE_WORDS)) { kept++; continue; }
    Logger.log('Image asset ' + img.getId() + ' "' + nm + '": REMOVE from campaign (re-add Apr 1)');
    if (live) campaign.removeImage(img);
  }
  Logger.log('Interior images kept: ' + kept);
}

function summer(campaign, live) {
  if (!AdsApp.labels().withCondition("Name = '" + LABEL + "'").get().hasNext()) { Logger.log('No "' + LABEL + '" label found: nothing to re-enable.'); return; }
  var gIt = campaign.adGroups().withCondition("LabelNames CONTAINS_ANY ['" + LABEL + "']").get();
  while (gIt.hasNext()) { var g = gIt.next(); Logger.log('Ad group "' + g.getName() + '": PAUSED -> ENABLED'); if (live) { g.enable(); g.removeLabel(LABEL); } }
  var aIt = campaign.ads().withCondition("LabelNames CONTAINS_ANY ['" + LABEL + "']").get();
  while (aIt.hasNext()) { var a = aIt.next(); Logger.log('Ad ' + a.getId() + ': PAUSED -> ENABLED'); if (live) { a.enable(); a.removeLabel(LABEL); } }
  Logger.log('Re-add the exterior images listed in the Nov 1 run log by hand.');
}
