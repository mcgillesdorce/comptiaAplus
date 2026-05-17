const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'questions', 'index.ts');
let d = fs.readFileSync(file, 'utf8');

// 1. Flip correct flags: TPM false, HSM true
const oldChoices = '{ id: "b", text: "TPM", correct: true },\r\n      { id: "c", text: "Secure boot", correct: false },\r\n      { id: "d", text: "HSM", correct: false },';
const newChoices = '{ id: "b", text: "TPM", correct: false },\r\n      { id: "c", text: "Secure boot", correct: false },\r\n      { id: "d", text: "HSM", correct: true },';

if (!d.includes(oldChoices)) {
  // Try LF variant
  const oldLF = '{ id: "b", text: "TPM", correct: true },\n      { id: "c", text: "Secure boot", correct: false },\n      { id: "d", text: "HSM", correct: false },';
  const newLF = '{ id: "b", text: "TPM", correct: false },\n      { id: "c", text: "Secure boot", correct: false },\n      { id: "d", text: "HSM", correct: true },';
  if (!d.includes(oldLF)) {
    console.error('ERROR: choices string not found');
    process.exit(1);
  }
  d = d.replace(oldLF, newLF);
  console.log('Choices fixed (LF)');
} else {
  d = d.replace(oldChoices, newChoices);
  console.log('Choices fixed (CRLF)');
}

// 2. Fix triggerPhrase
const oldTrigger = 'triggerPhrase: "Chip on motherboard for cryptographic keys and operations = TPM"';
const newTrigger = 'triggerPhrase: "Physical device that expedites crypto operations AND manages keys = HSM"';
if (d.includes(oldTrigger)) {
  d = d.replace(oldTrigger, newTrigger);
  console.log('triggerPhrase fixed');
} else {
  console.log('triggerPhrase not found - may already be correct');
}

// 3. Find and replace the explanation (search by unique substring)
const expMarker = 'A TPM (Trusted Platform Module) is a dedicated microprocessor chip embedded on the motherboard';
const idx = d.indexOf(expMarker);
if (idx === -1) {
  console.log('Explanation marker not found - skipping explanation update');
} else {
  // Find the closing quote of this explanation
  const expStart = d.lastIndexOf('explanation: "', idx);
  const expEnd = d.indexOf('",', idx) + 2;
  const newExp = 'explanation: "An HSM (Hardware Security Module) is a dedicated physical device that both accelerates (expedites) cryptographic operations in hardware and securely generates, stores, and manages cryptographic keys. HSMs are used in enterprise environments for PKI, payment processing, and certificate authorities. A TPM (Trusted Platform Module) is a chip soldered to the motherboard that stores keys and supports platform integrity checks (BitLocker, Secure Boot) -- it does not primarily expedite or accelerate crypto operations. Secure Boot is a UEFI firmware feature, not a device. Boot options are firmware settings.",';
  d = d.substring(0, expStart) + newExp + d.substring(expEnd);
  console.log('Explanation fixed');
}

fs.writeFileSync(file, d, 'utf8');
console.log('Done. Lines: ' + d.split('\n').length);
