import { useEffect, useRef, useState } from "react";

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00e5ff", textDecoration: "underline" }}
        >
          {linkMatch[1]}
        </a>
      );
    }

    const urlParts = part.split(/(https?:\/\/[^\s]+)/g);
    if (urlParts.length > 1) {
      return urlParts.map((up, j) =>
        /^https?:\/\//.test(up) ? (
          <a
            key={`${i}-${j}`}
            href={up}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#00e5ff",
              textDecoration: "underline",
              wordBreak: "break-all",
            }}
          >
            {up}
          </a>
        ) : (
          up
        )
      );
    }

    return part;
  });
}

function renderMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} style={{ margin: "6px 0 6px 16px", padding: 0 }}>
          {listItems.map((li, i) => (
            <li key={i} style={{ marginBottom: 3, fontSize: 13, lineHeight: 1.5 }}>
              {renderInline(li)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const t = line.trim();

    if (t.startsWith("## ")) {
      flushList();
      elements.push(
        <div
          key={key++}
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#00e5ff",
            marginTop: 10,
            marginBottom: 3,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          {renderInline(t.slice(3))}
        </div>
      );
    } else if (t.startsWith("### ")) {
      flushList();
      elements.push(
        <div
          key={key++}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#a78bfa",
            marginTop: 8,
            marginBottom: 2,
          }}
        >
          {renderInline(t.slice(4))}
        </div>
      );
    } else if (t.startsWith("- ") || t.startsWith("* ")) {
      listItems.push(t.slice(2));
    } else if (t === "") {
      flushList();
      if (elements.length > 0) elements.push(<div key={key++} style={{ height: 4 }} />);
    } else {
      flushList();
      elements.push(
        <p key={key++} style={{ margin: "3px 0", fontSize: 13, lineHeight: 1.6 }}>
          {renderInline(t)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

const SUGGESTIONS = [
  "What is your current CTC?",
  "What is your expected CTC?",
  "Do you have WooCommerce experience?",
  "Show all project links",
  "What is your GoDaddy hosting experience?",
  "What are your key skills?",
  "Tell me about your experience",
  "Shopify projects?",
  "WordPress and WooCommerce projects?",
  "BigCommerce projects?",
  "Contact details?",
];

function getFriendlyErrorMessage(error) {
  const raw = String(error?.message || "").toLowerCase();

  if (
    raw.includes("high demand") ||
    raw.includes("overloaded") ||
    raw.includes("quota") ||
    raw.includes("temporarily unavailable") ||
    raw.includes("503")
  ) {
    return "I'm unable to respond right now due to a temporary service issue. Please try again in a moment.";
  }

  if (
    raw.includes("api key") ||
    raw.includes("permission denied") ||
    raw.includes("unauthorized") ||
    raw.includes("401") ||
    raw.includes("403")
  ) {
    return "The assistant is currently unavailable because of a configuration issue. Please try again later.";
  }

  if (
    raw.includes("prompt is required") ||
    raw.includes("400") ||
    raw.includes("bad request")
  ) {
    return "The request could not be processed right now. Please try again.";
  }

  if (
    raw.includes("network") ||
    raw.includes("failed to fetch") ||
    raw.includes("load failed")
  ) {
    return "There seems to be a network issue right now. Please check the connection and try again.";
  }

  return "Something went wrong while generating the response. Please try again later.";
}

export default function ChatWidget({ resumeContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Vishwanath's AI assistant. Ask me about his **skills**, **projects**, **experience**, **WooCommerce work**, **hosting experience**, or **CTC**. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const apiMessages = updatedMessages.slice(1);

      const geminiPrompt = `
${resumeContext}

IMPORTANT FORMATTING RULES:
- Use ## for main headings
- Use ### for sub-headings
- Use **bold** for important values, technologies, salary numbers, and company/platform names
- Use - bullet lists for multiple items
- Keep replies friendly, human, and professional
- For CTC questions, always show:
  - **Current CTC:** 5.4 Lac per annum
  - **Expected CTC:** 6 to 6.5 Lac per annum
- For hosting questions, mention AWS EC2 and GoDaddy experience
- For ecommerce questions, include WooCommerce where relevant
- For project links, share direct links with short summaries
- Only answer questions about Vishwanath Ray. If asked about anything else, politely redirect.

Conversation:
${apiMessages
  .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
  .join("\n")}
`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: geminiPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `API error ${response.status}`);
      }

      const reply = data?.text || "Sorry, I couldn't generate a response right now.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getFriendlyErrorMessage(error),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="chat-fab-wrap">
        {!open && (
          <>
            <span className="chat-fab-pulse ring1" />
            <span className="chat-fab-pulse ring2" />
            <span className="chat-fab-pulse ring3" />
          </>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className={`chat-fab ${open ? "fab-open" : "fab-idle"}`}
          aria-label="AI Assistant"
        >
          <span className="chat-fab-spin-border" />
          <span className="chat-fab-inner">
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <line x1="18" y1="2" x2="18" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="18" cy="2" r="2" fill="#00e5ff" />
                <rect x="7" y="8" width="22" height="14" rx="4" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="13" cy="15" r="2.5" fill="#00e5ff" />
                <circle cx="23" cy="15" r="2.5" fill="#a78bfa" />
                <circle cx="14" cy="14" r="0.8" fill="white" />
                <circle cx="24" cy="14" r="0.8" fill="white" />
                <path d="M13 19.5 Q18 22 23 19.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <rect x="11" y="23" width="14" height="10" rx="3" stroke="white" strokeWidth="2" fill="none" />
                <line x1="15" y1="26" x2="21" y2="26" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="15" y1="29" x2="21" y2="29" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                <rect x="3" y="24" width="7" height="4" rx="2" stroke="white" strokeWidth="1.8" fill="none" />
                <rect x="26" y="24" width="7" height="4" rx="2" stroke="white" strokeWidth="1.8" fill="none" />
                <line x1="14" y1="33" x2="14" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="22" y1="33" x2="22" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>

        {!open && <div className="chat-fab-tooltip">Ask AI ✨</div>}
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-bot-icon">🤖</div>
            <div>
              <div className="chat-title">Vishwanath's AI</div>
              <div className="chat-subtitle">Ask about projects, WooCommerce, hosting & CTC</div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-row ${m.role === "user" ? "user" : "assistant"}`}>
                <div className={`chat-bubble ${m.role}`}>
                  {m.role === "assistant" ? renderMarkdown(m.content) : m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-row assistant">
                <div className="chat-bubble assistant">
                  <span className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {showSuggestions && messages.length === 1 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="chat-suggestion-chip" onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
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
              placeholder="Ask about projects, WooCommerce, CTC, hosting..."
              className="chat-input"
            />
            <button onClick={() => sendMessage()} disabled={loading} className="chat-send-btn">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}