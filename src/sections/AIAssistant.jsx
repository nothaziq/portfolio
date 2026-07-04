import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { matchAssistantResponse } from "../utils/assistantMatcher";
import { AI_ASSISTANT_SUGGESTIONS } from "../constants/data";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi, I'm Haziq's portfolio assistant. Ask me who he is, what he's built, or why you should hire him.",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    const response = matchAssistantResponse(trimmed);
    const delay = 500 + Math.min(response.length * 8, 900);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, delay);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <section id="assistant" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Ask about me"
          title="A tiny assistant that only knows one person, well."
          description="No API, no backend — just a focused set of answers about Haziq. Try one of the prompts below."
        />

        <div className="mt-14 glass overflow-hidden rounded-3xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-faint)]">
              <Sparkles size={12} className="text-[var(--color-accent)]" />
              haziq-assistant.local
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-[360px] overflow-y-auto px-5 py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user"
                        ? "bg-[var(--color-ink)] text-[var(--color-void)]"
                        : "bg-[var(--color-primary)]/20 text-[var(--color-primary-soft)]"
                    }`}
                  >
                    {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--color-ink)] text-[var(--color-void)] rounded-tr-sm"
                        : "bg-[var(--color-surface-2)] text-[var(--color-ink-dim)] rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-soft)]">
                  <Bot size={13} />
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[var(--color-surface-2)] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-faint)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-[var(--color-line)] px-5 py-3">
            {AI_ASSISTANT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                data-cursor-hover
                className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[var(--color-line)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about Haziq..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none"
              aria-label="Message the AI assistant"
            />
            <button
              type="submit"
              data-cursor-hover
              disabled={!input.trim() || isTyping}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-void)] disabled:opacity-40 transition-opacity"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
