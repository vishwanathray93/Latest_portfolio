import { useEffect, useRef, useState } from "react";

export default function ChatWidget({ resumeContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Vishwanath's AI assistant. Ask me anything about his skills, projects, or experience! 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const conversationText = updatedMessages
        .map((m) => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`)
        .join("\n");

      const prompt = `${resumeContext}

Answer only about Vishwanath Ray.
If the question is unrelated, politely say you can only answer about Vishwanath Ray.

Conversation so far:
${conversationText}

Respond to the latest user message naturally, clearly, and briefly.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      const reply =
        data?.text ||
        data?.error ||
        "Sorry, I couldn't get a response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Request failed. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="chat-fab"
        title="AI Assistant"
      >
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-bot-icon">🤖</div>
            <div>
              <div className="chat-title">Vishwanath's AI</div>
              <div className="chat-subtitle">Ask about projects and skills</div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-row ${m.role === "user" ? "user" : "assistant"}`}
              >
                <div className={`chat-bubble ${m.role}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-row assistant">
                <div className="chat-bubble assistant">Thinking...</div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input-wrap">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask about projects, skills..."
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="chat-send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}