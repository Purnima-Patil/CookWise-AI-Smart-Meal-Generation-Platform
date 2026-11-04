import React, { useState, useRef, useEffect } from 'react';
import { Recipe, ChatMessage } from '../../types';
import { askAICookingAssistant } from '../../lib/ai';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, CornerDownLeft } from 'lucide-react';

interface AICookingAssistantProps {
  recipe: Recipe;
}

export const AICookingAssistant: React.FC<AICookingAssistantProps> = ({ recipe }) => {
  const { currentLanguageOption, t } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: `Hello! I'm your dedicated culinary assistant for "${recipe.title}". Feel free to ask about ingredient substitutions, heat levels, step clarification, or vegan/dietary adaptations!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested question chips based on active recipe
  const suggestedQuestions = [
    `What can I substitute for ${recipe.ingredients[0]?.name || 'key ingredient'}?`,
    'Can I make this dish 100% vegan?',
    'How can I tone down the spice level?',
    'What wine or drink pairs best with this?',
    'Can I prep and store this in advance?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (questionText: string) => {
    const text = questionText.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await askAICookingAssistant(
        recipe,
        text,
        messages,
        currentLanguageOption.name
      );
      const assistantMsg: ChatMessage = {
        id: `msg_assistant_${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        role: 'assistant',
        content: `I'm having trouble connecting right now, but for "${recipe.title}", always keep pan temperatures steady and adjust seasoning to taste!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide flex items-center gap-2">
              Context-Aware Cooking Assistant
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <p className="text-[11px] text-stone-400 truncate max-w-xs">
              Grounded in {recipe.title}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-stone-400 font-medium shrink-0 text-[11px]">Ask:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isTyping}
            className="px-2.5 py-1 rounded-md bg-white border border-stone-200/90 text-stone-700 hover:border-amber-600 hover:text-amber-900 transition-colors shrink-0 text-[11px] font-medium cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 text-xs mt-0.5 border border-amber-200">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white rounded-tr-xs'
                  : 'bg-white border border-stone-200/80 text-stone-800 rounded-tl-xs'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <div
                className={`text-[10px] mt-1.5 ${
                  msg.role === 'user' ? 'text-stone-400 text-right' : 'text-stone-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-stone-800 text-stone-200 flex items-center justify-center shrink-0 text-xs mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 text-xs border border-amber-200">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about cooking ${recipe.title.slice(0, 24)}...`}
          className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-amber-400 transition-all cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
