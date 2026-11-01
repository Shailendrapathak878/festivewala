import fs from 'fs';

const logPath = 'C:/Users/abhis/.gemini/antigravity/brain/63fca421-aaed-4c0a-b95f-26ad7a8666c1/.system_generated/steps/7736/output.txt';
const text = fs.readFileSync(logPath, 'utf8');
const match = text.match(/data:image\/png;base64,([^"\\]+)/);

if (match) {
  const buf = Buffer.from(match[1], 'base64');
  const outPath = 'C:/Users/abhis/.gemini/antigravity/brain/63fca421-aaed-4c0a-b95f-26ad7a8666c1/sig-05-exported-png-canvas.png';
  fs.writeFileSync(outPath, buf);
  console.log('Successfully saved exported PNG canvas! Size:', buf.length, 'bytes');
} else {
  console.log('No base64 image match found in output');
}

