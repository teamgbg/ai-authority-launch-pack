/**
 * Veo 3.1 Video Generation Script
 * Generates a video using Gemini's Veo 3.1 model with image reference
 */

import 'dotenv/config';
import { GoogleAIFileManager, GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Script started...');
console.log('📁 __dirname:', __dirname);
console.log('🔑 API Key present:', !!process.env.GOOGLE_GEMINI_API_KEY);

// Initialize Gemini AI and File Manager
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_GEMINI_API_KEY);

async function generateVideo() {
  try {
    console.log('🎬 Starting Veo 3.1 video generation...');

    // Define the prompt
    const prompt = `A professional female expert in her late 30s/early 40s commanding a modern conference stage, speaking passionately about event marketing and communication, warm professional lighting, confident gestures. Camera smoothly transitions to her as a guest on a modern video podcast with contemporary backdrop, engaging in dynamic conversation with host, professional studio setup. Cinematic, empowering, polished. 8 seconds.`;

    console.log('📝 Prompt:', prompt);

    // Veo 3.1 model
    const model = genAI.getGenerativeModel({ model: 'veo-3.1-generate-preview' });

    // Read reference images (Anna presenting + Anna on podcast)
    const stageImagePath = path.join(__dirname, '../public/images/anna/Anna 1.png');
    const podcastImagePath = path.join(__dirname, '../public/images/anna/Anna 2.jpg');

    let stageImageBase64 = null;
    let podcastImageBase64 = null;

    try {
      const stageBuffer = await fs.readFile(stageImagePath);
      stageImageBase64 = stageBuffer.toString('base64');
      console.log('✅ Stage reference image loaded (Anna 1.png)');
    } catch (err) {
      console.log('⚠️  Stage image not found');
    }

    try {
      const podcastBuffer = await fs.readFile(podcastImagePath);
      podcastImageBase64 = podcastBuffer.toString('base64');
      console.log('✅ Podcast reference image loaded (Anna 2.jpg)');
    } catch (err) {
      console.log('⚠️  Podcast image not found');
    }

    // Build the request parts
    const parts = [
      { text: prompt }
    ];

    // Add reference images if available
    if (stageImageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: stageImageBase64
        }
      });
    }

    if (podcastImageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: podcastImageBase64
        }
      });
    }

    // Generate video
    console.log('🎥 Generating video with Veo 3.1...');
    console.log('⏳ This may take 1-2 minutes...');

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        temperature: 0.7,
        // Note: Veo 3.1 video parameters might be set in the model config or prompt
        // The API will use default 8 seconds if not specified elsewhere
      }
    });

    const response = result.response;

    // Check if video was generated
    if (response && response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];

      // Look for video data in the response
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('video/')) {
          const videoData = part.inlineData.data;
          const videoBuffer = Buffer.from(videoData, 'base64');

          // Save video
          const outputPath = path.join(__dirname, '../public/videos/hero-background.mp4');
          await fs.mkdir(path.dirname(outputPath), { recursive: true });
          await fs.writeFile(outputPath, videoBuffer);

          console.log('✅ Video generated successfully!');
          console.log('📁 Saved to:', outputPath);
          console.log('📊 Size:', (videoBuffer.length / 1024 / 1024).toFixed(2), 'MB');

          return outputPath;
        }
      }
    }

    // If we get here, check if there's a file URI or other response
    console.log('📋 Response:', JSON.stringify(response, null, 2));

    throw new Error('No video data found in response');

  } catch (error) {
    console.error('❌ Error generating video:', error.message);

    if (error.message.includes('404') || error.message.includes('not found')) {
      console.error('⚠️  Model not available. Veo 3.1 might not be enabled for your API key yet.');
      console.error('💡 Try:');
      console.error('   1. Check if Veo 3.1 is enabled in your Google AI Studio');
      console.error('   2. Verify you\'re using the correct model name');
      console.error('   3. Check API quotas and billing');
    }

    throw error;
  }
}

// Run if called directly
const isMainModule = import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

console.log('🔍 Checking if main module...');
console.log('   import.meta.url:', import.meta.url);
console.log('   process.argv[1]:', process.argv[1]);
console.log('   isMainModule:', isMainModule);

if (isMainModule || process.argv[1].includes('generate-video.js')) {
  console.log('✅ Running as main module, starting generation...');
  generateVideo()
    .then(() => {
      console.log('🎉 Video generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    });
}

export { generateVideo };
