import { useState, useRef, useEffect } from "react";
import { generateAI } from "./api";
import "./styles/App.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    setShowIntro(false);

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await generateAI(input);
      const botMsg = { role: "bot", text: data.result };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Error getting response" }
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="chat-root">

   
      {showIntro && (
        <div className="intro">
          <h1>Welcome to <span>HealthPro</span></h1>
          <p>Your AI health assistant</p>
        </div>
      )}

      
      <div className={`chat-container ${showIntro ? "blur" : ""}`}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble bot typing">
            <span></span><span></span><span></span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      
      <div className="chat-input">
        <textarea
          placeholder="Ask your health question..."
          value={input}
          
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && sendMessage()
          }
        />
        <button onClick={sendMessage}>➤</button>
      </div>

     
      <div className="disclaimer">
        This might make mistakes. Please consider visiting a doctor.
      </div>

    </div>
  );
}
