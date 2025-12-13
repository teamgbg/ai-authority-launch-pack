import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const GENERATION_PROMPT = `You are a professional brand copywriter. Based on the conversation provided, extract the key information and create a compelling Personal Brand One-Pager.

IMPORTANT: Look for a profile photo URL in the conversation. It will appear between ---PROFILE_PHOTO--- and ---END_PROFILE_PHOTO--- markers if one was found from their website.

Return your response as a JSON object with the following structure:
{
  "name": "Their full name",
  "title": "Their professional title/role",
  "photo": "URL of profile photo if found between ---PROFILE_PHOTO--- markers, otherwise null",
  "email": "Their email address",
  "website": "Their website URL (if provided)",
  "phone": "Their phone number (if provided)",
  "linkedin": "Their LinkedIn URL (if provided)",
  "expertise": "2-3 sentences about their area of expertise",
  "uniqueValue": "2-3 sentences about what makes them unique",
  "services": ["Array of 3-5 main services or offerings they provide"],
  "idealClient": "1-2 sentences describing their ideal client",
  "toneOfVoice": "1-2 sentences describing their brand voice (for internal reference, not displayed)",
  "headline": "A compelling headline for their brand (5-10 words)",
  "subheadline": "A supporting subheadline (10-15 words)",
  "keyPoints": ["Array of 6 key highlights or credentials"],
  "results": ["Array of 2-3 impressive statistics or achievements (e.g., '200+ Clients Served', '15 Years Experience', 'Featured in Forbes')"],
  "testimonials": [{"quote": "Brief testimonial quote", "author": "Client Name & Title"}],
  "callToAction": "A clear call to action statement"
}

Guidelines:
- Extract contact information exactly as provided (email, website, phone, LinkedIn)
- IMPORTANT: If you see ---PROFILE_PHOTO---[URL]---END_PROFILE_PHOTO--- in the conversation, extract that URL and use it for the "photo" field
- If no photo was found, set photo to null
- Make the headline powerful and benefit-focused
- Keep all text concise and punchy
- Services should be clear, client-focused offerings
- Results should be impressive numbers or credentials that build credibility
- Testimonials should be 1-2 sentences max, include author attribution
- The key points should be specific achievements, credentials, or unique selling points
- Use their stated tone of voice in the copy
- Make the CTA clear and action-oriented
- If any optional fields weren't provided in the conversation, omit them or use null
- Return ONLY valid JSON, no additional text`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Convert conversation to context for the AI
    const conversationContext = messages
      .map((msg: Message) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    // Call OpenAI to generate structured one-pager content
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini-2025-08-07",
      messages: [
        { role: "system", content: GENERATION_PROMPT },
        {
          role: "user",
          content: `Here is the conversation with the client:\n\n${conversationContext}\n\nPlease generate their Personal Brand One-Pager as JSON.`,
        },
      ],
      max_completion_tokens: 1000,
      reasoning_effort: "low",
      response_format: { type: "json_object" },
    });

    const generatedContent = response.choices[0]?.message?.content || "{}";
    const onePagerData = JSON.parse(generatedContent);

    return NextResponse.json({
      success: true,
      data: onePagerData,
    });
  } catch (error) {
    console.error("Error generating one-pager:", error);
    return NextResponse.json(
      { error: "Failed to generate one-pager" },
      { status: 500 }
    );
  }
}
