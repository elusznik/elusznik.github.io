import fs from 'fs';
import path from 'path';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/models';
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'models');

async function fetchModels() {
  try {
    console.log('Fetching models from OpenRouter...');
    const response = await fetch(OPENROUTER_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

function isFreeModel(model) {
  const isFreeInName = model.id.includes(':free');
  const isZeroCost =
    parseFloat(model.pricing.prompt) === 0 &&
    parseFloat(model.pricing.completion) === 0;
  
  return isFreeInName || isZeroCost;
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function generateMarkdownFiles(models) {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  let count = 0;
  for (const model of models) {
    if (isFreeModel(model)) {
      const filename = `${sanitizeFilename(model.id)}.md`;
      const filePath = path.join(CONTENT_DIR, filename);
      
      const title = model.name || model.id;
      // Handle multiline descriptions and escape quotes
      let description = model.description || `Free access to ${title} via OpenRouter.`;
      description = description.replace(/\n/g, ' ').replace(/"/g, '\\"').trim();
      
      const link = `https://openrouter.ai/models/${model.id}`;
      const dateUpdated = new Date().toISOString().split('T')[0];
      const contextLength = model.context_length || model.top_provider?.context_length || 0;
      
      // Format context length (e.g., 128000 -> 128k)
      const contextDisplay = contextLength > 0 
        ? (contextLength >= 1000 ? `${Math.round(contextLength / 1000)}k` : contextLength) 
        : 'Unknown';

      const content = `---
title: "${title} (${model.id})"
description: "${description}"
free_tier_details: "Free access via OpenRouter. Context: ${contextDisplay} tokens."
link: "${link}"
date_updated: ${dateUpdated}
category: "OpenRouter"
handle: "${model.id}"
tags: ["openrouter", "free", "llm"]
---
`;

      fs.writeFileSync(filePath, content);
      console.log(`Generated: ${filename} (Context: ${contextDisplay})`);
      count++;
    }
  }
  console.log(`\nSuccessfully generated ${count} free model files.`);
}

async function main() {
  const models = await fetchModels();
  if (models.length > 0) {
    await generateMarkdownFiles(models);
  } else {
    console.log('No models found.');
  }
}

main();
