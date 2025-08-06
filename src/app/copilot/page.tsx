"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm Ostrich Copilot. What integration do you want to build today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate Copilot thinking
    setTimeout(() => {
      const assistantReply = {
        role: "assistant",
        text: `Got it! Generating a workflow to integrate ${input}.`,
      };
      setMessages((prev) => [...prev, assistantReply]);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-start px-4 pt-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">🧠 Ostrich Copilot</h1>
      <div className="w-full max-w-2xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
        <div className="h-96 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`rounded-xl px-4 py-3 text-sm w-fit max-w-[80%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-900 ml-auto"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="e.g., Send Slack alert when Notion updated"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-950 text-black dark:text-white"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
