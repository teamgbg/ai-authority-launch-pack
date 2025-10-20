"""
Veo 3 Video Generation Script (Python)
Generates a video using Gemini's Veo 3 model with image references
"""

import os
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env file
script_dir = Path(__file__).parent
project_root = script_dir.parent
load_dotenv(project_root / '.env')

# Load API key from environment
API_KEY = os.getenv('GOOGLE_GEMINI_API_KEY')
if not API_KEY:
    raise ValueError("GOOGLE_GEMINI_API_KEY environment variable not set")

# Initialize client
client = genai.Client(api_key=API_KEY)

def generate_video():
    print("[*] Starting Veo 3 video generation...\n")

    # Get script directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent

    # Image paths
    stage_image_path = project_root / "public" / "images" / "anna" / "Anna 1.png"
    podcast_image_path = project_root / "public" / "images" / "anna" / "Anna 2.jpg"

    # Check if images exist
    if not stage_image_path.exists():
        raise FileNotFoundError(f"Stage image not found: {stage_image_path}")
    if not podcast_image_path.exists():
        raise FileNotFoundError(f"Podcast image not found: {podcast_image_path}")

    print(f"[+] Uploading stage image: {stage_image_path.name}")
    stage_file = client.files.upload(file=str(stage_image_path))
    print(f"[+] Uploaded: {stage_file.name}")

    print(f"[+] Uploading podcast image: {podcast_image_path.name}")
    podcast_file = client.files.upload(file=str(podcast_image_path))
    print(f"[+] Uploaded: {podcast_file.name}")

    # Prompt
    prompt = """A professional female expert in her late 30s/early 40s commanding a modern conference stage, speaking passionately about event marketing and communication, warm professional lighting, confident gestures. Camera smoothly transitions to her as a guest on a modern video podcast with contemporary backdrop, engaging in dynamic conversation with host, professional studio setup. Cinematic, empowering, polished. 8 seconds."""

    print(f"\n[*] Prompt: {prompt}\n")
    print("[*] Generating video with Veo 3...")
    print("[*] This may take 1-2 minutes...\n")

    # Generate video with reference images
    # Try using image parameter with multiple images
    operation = client.models.generate_videos(
        model='veo-3.0-generate-001',
        prompt=prompt,
        image={
            'reference_images': [
                {'file_uri': stage_file.uri},
                {'file_uri': podcast_file.uri}
            ]
        }
    )

    print(f"[+] Video generation started!")
    print(f"[*] Operation: {operation.name}\n")

    # Poll for completion
    attempts = 0
    max_attempts = 60  # 5 minutes max

    while not operation.done and attempts < max_attempts:
        attempts += 1
        time.sleep(5)  # Wait 5 seconds

        # Refresh operation status
        operation = client.operations.get(name=operation.name)

        elapsed = attempts * 5
        print(f"[*] Still generating... ({elapsed}s elapsed)", end='\r')

    print()  # New line after progress

    if not operation.done:
        raise TimeoutError("Video generation timed out after 5 minutes")

    if operation.error:
        raise RuntimeError(f"Video generation error: {operation.error}")

    print("[+] Video generation complete!\n")

    # Get the generated video
    video = operation.response.generated_videos[0]

    print("[*] Downloading video...")

    # Download video bytes
    video_data = client.files.download(name=video.video.uri)

    # Save video
    output_dir = project_root / "public" / "videos"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "hero-background.mp4"

    with open(output_path, 'wb') as f:
        f.write(video_data)

    file_size_mb = len(video_data) / (1024 * 1024)

    print(f"[+] Video saved to: {output_path}")
    print(f"[*] Size: {file_size_mb:.2f} MB")

    return str(output_path)

if __name__ == "__main__":
    print("*** Veo 3 Video Generator (Python) ***\n")
    print(f"[*] API Key: {'Present' if API_KEY else 'Missing'}\n")

    try:
        output = generate_video()
        print(f"\n[+] Done! Video saved to: {output}")
    except Exception as e:
        print(f"\n[!] Error: {e}")

        if "404" in str(e) or "not found" in str(e).lower():
            print("\n[!] Veo 3 model not available.")
            print("[*] Make sure:")
            print("   1. Video generation is enabled in Google AI Studio")
            print("   2. Your API key has access to Veo models")

        exit(1)
