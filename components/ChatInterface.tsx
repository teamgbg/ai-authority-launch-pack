"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSent?: (email: string, name: string) => void;
}

export default function ChatInterface({ isOpen, onClose, onEmailSent }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hi there! I'm excited to help you create your Personal Brand One-Pager. To get started and provide you with the most personalized guidance, I'd love to know: What's your full name?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add assistant response to chat
      const newMessages = [
        ...messages,
        { role: "user" as const, content: userMessage },
        { role: "assistant" as const, content: data.message },
      ];

      setMessages(newMessages);

      // Check if conversation is complete
      if (data.conversationComplete) {
        setIsGenerating(true);
        try {
          // Generate the one-pager
          const onePagerResponse = await fetch("/api/generate-onepager", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: newMessages,
            }),
          });

          if (!onePagerResponse.ok) {
            throw new Error("Failed to generate one-pager");
          }

          const onePagerData = await onePagerResponse.json();

          // Send via email
          const emailResponse = await fetch("/api/send-onepager", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: newMessages,
              onePagerData: onePagerData.data,
            }),
          });

          if (!emailResponse.ok) {
            throw new Error("Failed to send email");
          }

          const emailData = await emailResponse.json();

          // Call the callback with email info
          if (onEmailSent && emailData.success) {
            onEmailSent(emailData.email, emailData.name);
          }
        } catch (error) {
          console.error("Error generating/sending one-pager:", error);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "I've collected all your information, but there was an error sending your one-pager. Please try again.",
            },
          ]);
        } finally {
          setIsGenerating(false);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Chat Modal */}
      <div className="relative w-full max-w-2xl h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#F83600] to-[#FF6B3D] text-white">
          <div>
            <h2 className="text-xl font-bold">Create Your Brand One-Pager</h2>
            <p className="text-sm text-white/90">Let&apos;s get to know you better</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-[#F83600] text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200">
          {isGenerating ? (
            <div className="flex items-center justify-center gap-3 py-3 text-[#F83600]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#F83600] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#F83600] rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-[#F83600] rounded-full animate-bounce delay-200" />
              </div>
              <span className="font-semibold">Generating and sending your Brand One-Pager...</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#F83600] focus:ring-2 focus:ring-[#F83600]/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-[#F83600] text-white rounded-full font-semibold hover:bg-[#E02F00] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
