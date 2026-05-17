// scripts/fix-ext7-tags.js
// Fixes invalid WeaknessTag values in ext7 questions

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'questions', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

const fixes = [
  // ext7-q02: storage-interfaces -> sata-interface, motherboard-components -> motherboard-id
  ['"storage-interfaces", "motherboard-components"', '"sata-interface", "motherboard-id"'],
  // ext7-q03: remove invalid windows-settings
  ['"laptop-display", "windows-settings"', '"laptop-display"'],
  // ext7-q04: remove invalid network-speeds
  ['"fiber-connectors", "cat-ratings", "network-speeds"', '"fiber-connectors", "cat-ratings"'],
  // ext7-q05: wifi-channels -> wireless-channels, wireless-standards -> wifi-80211-standards
  ['"wireless-standards", "wifi-channels"', '"wifi-80211-standards", "wireless-channels", "wifi-frequency"'],
  // ext7-q06: ip-addressing, ipv6 -> internet-conn-types, dns-records
  ['"ip-addressing", "ipv6"', '"internet-conn-types", "dns-records"'],
];

let changed = 0;
for (const [from, to] of fixes) {
  if (content.includes(from)) {
    content = content.replace(from, to);
    changed++;
    console.log(`Fixed: ${from} -> ${to}`);
  } else {
    console.warn(`NOT FOUND: ${from}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Done. ${changed}/${fixes.length} fixes applied.`);
