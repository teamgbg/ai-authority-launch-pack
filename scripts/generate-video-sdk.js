/**
 * Veo 3 Video Generation Script (using SDK)
 * Generates a video using Gemini's Veo 3 model with image references
 */

import 'dotenv/config';
import { GoogleGenAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

async function generateVideo() {
  try {
    console.log('🎬 Starting Veo 3 video generation...\n');

    const ai = new GoogleGenAI(API_KEY);

    // Upload reference images
    console.log('📤 Uploading stage image...');
    const stageImagePath = path.join(__dirname, '../public/images/anna/Anna 1.png');
    const stageImage = await ai.files.upload({
      file: stageImagePath,
      displayName: 'anna-stage'
    });
    console.log('✅ Stage image uploaded:', stageImage.uri);

    console.log('📤 Uploading podcast image...');
    const podcastImagePath = path.join(__dirname, '../public/images/anna/Anna 2.jpg');
    const podcastImage = await ai.files.upload({
      file: podcastImagePath,
      displayName: 'anna-podcast'
    });
    console.log('✅ Podcast image uploaded:', podcastImage.uri);

    const prompt = `A professional female expert in her late 30s/early 40s commanding a modern conference stage, speaking passionately about event marketing and communication, warm professional lighting, confident gestures. Camera smoothly transitions to her as a guest on a modern video podcast with contemporary backdrop, engaging in dynamic conversation with host, professional studio setup. Cinematic, empowering, polished. 8 seconds.`;

    console.log('\n🎥 Generating video with Veo 3...');
    console.log('⏳ This may take 1-2 minutes...\n');

    // Generate video
    let operation = await ai.models.generateVideos({
      model: 'veo-3.0-generate-001',
      prompt: prompt,
      referenceImages: [
        { uri: stageImage.uri, mimeType: stageImage.mimeType },
        { uri: podcastImage.uri, mimeType: podcastImage.mimeType }
      ]
    });

    console.log('✅ Video generation started!');
    console.log('📋 Operation:', operation.name);

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 60;

    while (!operation.done && attempts < maxAttempts) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

      // Refresh operation status
      operation = await ai.operations.getVideosOperation({ operation });

      process.stdout.write(`⏳ Still generating... (${attempts * 5}s elapsed)\r`);
    }

    if (!operation.done) {
      throw new Error('Video generation timed out');
    }

    if (operation.error) {
      throw new Error(`Video generation error: ${JSON.stringify(operation.error)}`);
    }

    console.log('\n✅ Video generation complete!\n');

    // Download video
    const video = operation.response.generatedVideos[0];
    console.log('📥 Downloading video...');

    await ai.files.download(video.video, null);

    // Save video
    const outputPath = path.join(__dirname, '../public/videos/hero-background.mp4');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, video.video.videoBytes);

    console.log('✅ Video saved to:', outputPath);
    console.log('📊 Size:', (video.video.videoBytes.length / 1024 / 1024).toFixed(2), 'MB');

    return outputPath;

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.message.includes('404') || error.message.includes('not found')) {
      console.error('\n⚠️  Veo 3 model not available.');
      console.error('💡 Make sure:');
      console.error('   1. Video generation is enabled in Google AI Studio');
      console.error('   2. Your API key has access to Veo models');
    }

    throw error;
  }
}

// Run
console.log('🚀 Veo 3 Video Generator (SDK)\n');
console.log('🔑 API Key:', API_KEY ? 'Present' : 'Missing');
console.log('');

generateVideo()
  .then(() => {
    console.log('\n🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
