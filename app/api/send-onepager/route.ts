import { NextResponse } from "next/server";

// Extract email from conversation
function extractEmail(messages: Array<{ role: string; content: string }>): string | null {
  const conversationText = messages.map(m => m.content).join(" ");
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = conversationText.match(emailRegex);
  return match ? match[0] : null;
}

// Extract name from conversation
function extractName(messages: Array<{ role: string; content: string }>): string {
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === "assistant" && messages[i].content.toLowerCase().includes("name")) {
      if (i + 1 < messages.length && messages[i + 1].role === "user") {
        return messages[i + 1].content.trim();
      }
    }
  }
  return "";
}

interface OnePagerData {
  name: string;
  title: string;
  expertise: string;
  uniqueValue: string;
  idealClient: string;
  toneOfVoice: string;
  headline?: string;
  subheadline?: string;
  keyPoints?: string[];
  callToAction?: string;
}

export async function POST(request: Request) {
  try {
    const { messages, onePagerData } = await request.json() as {
      messages: Array<{ role: string; content: string }>;
      onePagerData: OnePagerData;
    };

    const email = extractEmail(messages);
    if (!email) {
      return NextResponse.json(
        { error: "Email address not found in conversation" },
        { status: 400 }
      );
    }

    const name = extractName(messages);

    // Send webhook to GoHighLevel
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookPayload = {
        email,
        name,
        onePagerData,
        timestamp: new Date().toISOString(),
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });
    } else {
      console.log("GHL Webhook URL not configured. Would send:", { email, name, onePagerData });
    }

    return NextResponse.json({
      success: true,
      email,
      name,
      message: "Data sent to GoHighLevel successfully",
    });
  } catch (error) {
    console.error("Error sending to GHL:", error);
    return NextResponse.json(
      { error: "Failed to send data" },
      { status: 500 }
    );
  }
}
