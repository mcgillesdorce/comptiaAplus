// audit-all.js — extract every question with its prompt, choices, and correct answer
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'questions', 'index.ts');
const raw = fs.readFileSync(file, 'utf8');

// Match only question-level IDs (not choice ids like "a","b","c","d")
const questionIdRegex = /id:\s*"((?:ex2|nc|cc|ps|pd|wn|ic|ia|tn|pm|tp|ext)\d*[-_][^"]+)"/g;

const positions = [];
let m;
while ((m = questionIdRegex.exec(raw)) !== null) {
  positions.push({ id: m[1], pos: m.index });
}

console.log('Total questions:', positions.length);
console.log('');

for (let i = 0; i < positions.length; i++) {
  const start = positions[i].pos;
  const end = i + 1 < positions.length ? positions[i + 1].pos : raw.length;
  const block = raw.substring(start, end);

  const promptMatch = block.match(/prompt:\s*"((?:[^"\\]|\\.)*)"/);
  const prompt = promptMatch ? promptMatch[1] : '(no prompt)';

  const choiceRegex = /\{ id: "([a-d])", text: "((?:[^"\\]|\\.)*)", correct: (true|false) \}/g;
  const correctAnswers = [];
  let cm;
  while ((cm = choiceRegex.exec(block)) !== null) {
    if (cm[3] === 'true') {
      correctAnswers.push(`${cm[1]}) ${cm[2]}`);
    }
  }

  console.log(`[${positions[i].id}]`);
  console.log(`  Q: ${prompt.substring(0, 120)}`);
  console.log(`  A: ${correctAnswers.join(' | ')}`);
  console.log('');
}
