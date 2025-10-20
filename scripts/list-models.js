import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('📋 Fetching available models...\n');

    const models = await genAI.listModels();

    console.log(`Found ${models.length} models:\n`);

    for (const model of models) {
      console.log(`📌 ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Description: ${model.description}`);
      console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listModels();
