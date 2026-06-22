const fs = require('fs');
const path = require('path');

const appRoot = path.relative(
  path.resolve(__dirname, '../node_modules/expo-router'),
  path.resolve(__dirname, '../app')
);

const ctxFiles = ['_ctx.js', '_ctx.ios.js', '_ctx.android.js'];
for (const file of ctxFiles) {
  const filePath = path.resolve(__dirname, '../node_modules/expo-router', file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content
    .replace(/process\.env\.EXPO_ROUTER_APP_ROOT/g, JSON.stringify('./' + appRoot.replace(/\\/g, '/')))
    .replace(/process\.env\.EXPO_ROUTER_IMPORT_MODE/g, JSON.stringify('sync'));
  fs.writeFileSync(filePath, content);
  console.log(`Patched: ${file}`);
}

const createURLPath = path.resolve(__dirname, '../node_modules/expo-linking/build/createURL.js');
if (fs.existsSync(createURLPath)) {
  let content = fs.readFileSync(createURLPath, 'utf-8');
  const original = 'return removeScheme(Constants.linkingUri).replace(/\\/--($|\\/.*$)/, \'\');';
  const patched = 'return Constants.linkingUri ? removeScheme(Constants.linkingUri).replace(/\\/--($|\\/.*$)/, \'\') : null;';
  if (content.includes(original)) {
    content = content.replace(original, patched);
    fs.writeFileSync(createURLPath, content);
    console.log('Patched: expo-linking/build/createURL.js');
  } else {
    console.log('Skip (already patched or changed): expo-linking/build/createURL.js');
  }
}
