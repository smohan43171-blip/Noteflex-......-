// services/customization.js — stub for future user CSS/JS skins and background images

/**
 * Load a user-defined skin from settings.
 * TODO: support uploading a background image as a skin.
 * TODO: support loading user CSS/JS skin bundles.
 * @param {string} skinId
 */
export async function loadUserSkin(skinId) {
  console.log('TODO: loadUserSkin', skinId);
  return null;
}

/**
 * Save a background image as a custom skin.
 * @param {string} imageUri
 * @param {string} skinName
 */
export async function saveImageAsSkin(imageUri, skinName) {
  console.log('TODO: saveImageAsSkin', skinName);
}
