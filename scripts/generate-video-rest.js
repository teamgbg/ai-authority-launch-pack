/**
 * Veo 3 Video Generation Script (REST API)
 * Generates a video using Gemini's Veo 3 model with image references
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

async function uploadImage(imagePath, displayName) {
  console.log(`📤 Uploading ${displayName}...`);

  const imageBuffer = await fs.readFile(imagePath);
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const response = await fetch(`${BASE_URL}/files?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: {
        displayName: displayName,
        mimeType: mimeType,
        data: imageBuffer.toString('base64')
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Upload failed: ${error}`);
  }

  const data = await response.json();
  console.log(`✅ Uploaded: ${data.file.name}`);
  return data.file.name; // Returns URI like 'files/abc123'
}

async function generateVideo() {
  try {
    console.log('🎬 Starting Veo 3 video generation...\n');

    // Upload reference images
    const stageImagePath = path.join(__dirname, '../public/images/anna/Anna 1.png');
    const podcastImagePath = path.join(__dirname, '../public/images/anna/Anna 2.jpg');

    const stageFileUri = await uploadImage(stageImagePath, 'anna-stage');
    const podcastFileUri = await uploadImage(podcastImagePath, 'anna-podcast');

    console.log('\n📝 Creating video generation request...');

    const prompt = `A professional female expert in her late 30s/early 40s commanding a modern conference stage, speaking passionately about event marketing and communication, warm professional lighting, confident gestures. Camera smoothly transitions to her as a guest on a modern video podcast with contemporary backdrop, engaging in dynamic conversation with host, professional studio setup. Cinematic, empowering, polished. 8 seconds.`;

    // Generate video using Veo 3
    const response = await fetch(`${BASE_URL}/models/veo-3.0-generate-001:generateVideos?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        referenceImages: [
          { fileUri: stageFileUri },
          { fileUri: podcastFileUri }
        ],
        config: {
          aspectRatio: '16:9',
          duration: 8
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Video generation failed: ${error}`);
    }

    const operation = await response.json();
    console.log('✅ Video generation started!');
    console.log('📋 Operation:', operation.name);

    // Poll for completion
    console.log('\n⏳ Waiting for video generation (this may take 1-2 minutes)...\n');

    let videoReady = false;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (!videoReady && attempts < maxAttempts) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

      const statusResponse = await fetch(`${BASE_URL}/${operation.name}?key=${API_KEY}`);

      if (!statusResponse.ok) {
        console.log(`⚠️  Status check failed, retrying...`);
        continue;
      }

      const status = await statusResponse.json();

      if (status.done) {
        videoReady = true;

        if (status.error) {
          throw new Error(`Video generation error: ${JSON.stringify(status.error)}`);
        }

        console.log('✅ Video generation complete!\n');

        // Download video
        const videoUri = status.response.generatedVideos[0].video.uri;
        console.log('📥 Downloading video...');

        const videoResponse = await fetch(videoUri);
        const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

        // Save video
        const outputPath = path.join(__dirname, '../public/videos/hero-background.mp4');
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, videoBuffer);

        console.log('✅ Video saved to:', outputPath);
        console.log('📊 Size:', (videoBuffer.length / 1024 / 1024).toFixed(2), 'MB');

        return outputPath;
      } else {
        process.stdout.write(`⏳ Still generating... (${attempts * 5}s elapsed)\r`);
      }
    }

    if (!videoReady) {
      throw new Error('Video generation timed out');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.message.includes('404')) {
      console.error('\n⚠️  Veo 3 model not available with your API key.');
      console.error('💡 Make sure:');
      console.error('   1. Video generation is enabled in Google AI Studio');
      console.error('   2. Your API key has access to Veo models');
      console.error('   3. You\'re using the correct API endpoint');
    }

    throw error;
  }
}

// Run
console.log('🚀 Veo 3 Video Generator\n');
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
