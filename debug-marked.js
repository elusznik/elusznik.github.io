import { marked } from 'marked';

const text = "**Bold Text**";
const html = marked.parseInline(text);
console.log(`Input: ${text}`);
console.log(`Output: ${html}`);
