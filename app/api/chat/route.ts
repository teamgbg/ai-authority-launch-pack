import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are a warm, professional brand consultant helping established female experts (ages 45-60) create their Personal Brand One-Pager.

Your goal is to naturally collect the following information through conversation (IN THIS ORDER):

PHASE 1 - Essential Contact & Context (Ask these FIRST):
1. Their full name
2. Their email address
3. Their website URL (if they have one)
4. Their phone number (optional - for the one-pager contact section)
5. Their LinkedIn profile URL (optional - for professional networking)

Once you have their website, use the fetch_website tool to gather context about their business, expertise, and positioning. This will help you ask more targeted questions. The tool will also automatically extract their profile photo from the website if available (from meta tags like og:image, twitter:image, or schema.org).

PHASE 2 - Brand Details (Ask after you have context from their website):
6. Their title/role
7. Their area of expertise (you may already know this from their website)
8. What makes them unique (experience, approach, specialization)
9. The main services or offerings they provide (3-5 key services)
10. Their ideal client or audience
11. 2-3 key results, achievements, or impressive statistics (e.g., "200+ clients served", "15 years experience", "Featured in Forbes")
12. One brief client testimonial (optional but valuable for social proof)

Guidelines:
- Be warm, encouraging, and professional
- Ask ONE question at a time
- Keep responses concise (2-3 sentences)
- Acknowledge and validate their responses
- Make it feel like a natural conversation, not an interrogation
- Use their name once you know it
- After getting their website, use the fetch_website tool to analyze it and gain context
- If a profile photo was found from their website, mention it casually (e.g., "Great! I found your profile photo from your website.")
- If no photo was found, don't mention it - we'll use a placeholder or they can add one later
- Use insights from their website to ask more relevant, personalized questions
- For services, ask them to list their main offerings (you can help format them based on their website)
- For results/achievements, ask for impressive numbers or credentials that build credibility
- For testimonials, ask if they have a favorite short client quote (keep it to 1-2 sentences)
- When you have all the information, confirm the details and let them know you're ready to create their brand one-pager

Important: Do NOT generate the one-pager yet. Just collect the information conversationally and confirm when you have everything.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Tool definition for fetching website content
const tools: Anthropic.Tool[] = [
  {
    name: "fetch_website",
    description: "Fetches and analyzes the content of a website. Use this when you get a user's website URL to understand their business, expertise, services, and brand positioning. This helps you ask more relevant and personalized questions.",
    input_schema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The full URL of the website to fetch (e.g., https://example.com)",
        },
      },
      required: ["url"],
    },
  },
];

// Function to fetch website content and extract profile photo
async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrandConsultantBot/1.0)',
      },
    });

    if (!response.ok) {
      return `Unable to fetch website (HTTP ${response.status}). The website may be down or blocking automated requests.`;
    }

    const html = await response.text();

    // Extract profile photo from meta tags and common patterns
    let profilePhoto = '';

    // Try Open Graph image
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogImageMatch) {
      profilePhoto = ogImageMatch[1];
    }

    // Try Twitter card image if no OG image
    if (!profilePhoto) {
      const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
      if (twitterImageMatch) {
        profilePhoto = twitterImageMatch[1];
      }
    }

    // Try schema.org Person image
    if (!profilePhoto) {
      const schemaMatch = html.match(/"@type"\s*:\s*"Person"[^}]*"image"\s*:\s*"([^"]+)"/i);
      if (schemaMatch) {
        profilePhoto = schemaMatch[1];
      }
    }

    // Make relative URLs absolute
    if (profilePhoto && !profilePhoto.startsWith('http')) {
      try {
        const baseUrl = new URL(url);
        profilePhoto = new URL(profilePhoto, baseUrl.origin).href;
      } catch {
        profilePhoto = '';
      }
    }

    // Basic HTML parsing - extract text content
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
      .replace(/<[^>]+>/g, ' ') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .substring(0, 3000); // Limit to first 3000 characters

    let result = `Website content from ${url}:\n\n${text}`;

    if (profilePhoto) {
      result += `\n\n---PROFILE_PHOTO---\n${profilePhoto}\n---END_PROFILE_PHOTO---`;
    }

    result += `\n\nNote: This is a simplified text extraction. Focus on identifying their expertise, services, and brand voice.`;

    if (profilePhoto) {
      result += ` A profile photo was found and will be included in the one-pager.`;
    }

    return result;
  } catch (error) {
    return `Error fetching website: ${error instanceof Error ? error.message : 'Unknown error'}. The user may need to provide more details manually.`;
  }
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

    // Convert messages to Anthropic format
    const anthropicMessages: Anthropic.MessageParam[] = messages.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call Claude API with tool support
    let response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
      tools: tools,
    });

    // Handle tool use
    while (response.stop_reason === "tool_use") {
      const toolUse = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
      );

      if (!toolUse) break;

      let toolResult: string;

      if (toolUse.name === "fetch_website") {
        const input = toolUse.input as { url: string };
        toolResult = await fetchWebsiteContent(input.url);
      } else {
        toolResult = "Unknown tool";
      }

      // Continue conversation with tool result
      anthropicMessages.push({
        role: "assistant",
        content: response.content,
      });

      anthropicMessages.push({
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: toolResult,
          },
        ],
      });

      // Get next response
      response = await anthropic.messages.create({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: anthropicMessages,
        tools: tools,
      });
    }

    // Extract the assistant's text response
    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );

    const assistantMessage = textBlock?.text || "";

    return NextResponse.json({
      message: assistantMessage,
      conversationComplete:
        assistantMessage.toLowerCase().includes("ready to create") ||
        assistantMessage.toLowerCase().includes("generate your"),
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
