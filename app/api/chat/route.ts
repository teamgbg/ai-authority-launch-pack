import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are a warm, professional brand consultant helping established female experts (ages 45-60) create their Personal Brand One-Pager.

Your goal is to naturally collect the following information through conversation:
1. Their name
2. Their title/role
3. Their area of expertise
4. What makes them unique (experience, approach, specialization)
5. Their ideal client or audience
6. Their tone of voice preferences (professional, warm, authoritative, approachable, etc.)

Guidelines:
- Be warm, encouraging, and professional
- Ask ONE question at a time
- Keep responses concise (2-3 sentences)
- Acknowledge and validate their responses
- Make it feel like a natural conversation, not an interrogation
- Use their name once you know it
- When you have all the information, confirm the details and let them know you're ready to create their brand pack

Important: Do NOT generate the one-pager or social posts yet. Just collect the information conversationally and confirm when you have everything.`;

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

    // Convert messages to Anthropic format
    const anthropicMessages = messages.map((msg: Message) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    });

    // Extract the assistant's response
    const assistantMessage = response.content[0];
    const messageText =
      assistantMessage.type === "text" ? assistantMessage.text : "";

    return NextResponse.json({
      message: messageText,
      conversationComplete: messageText.toLowerCase().includes("ready to create") ||
        messageText.toLowerCase().includes("generate your"),
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
