import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import type { Highlight } from "../types/highlight";
import type { ArticleData, ChatMessage } from "../types/chat";
import { clearChatSession, readChatSession, writeChatSession } from "../lib/chatSession";
import { fetchArticleForHighlight } from "../lib/wordpress";
import { answerQuestionFromArticle, generateInitialChat } from "../lib/groq";

type Props = {
  item: Highlight;
  open: boolean;
};

function ChatBubble({ role, text }: ChatMessage) {
  const isUser = role === "user";

  return (
    <div
      className={[
        "flex w-full min-w-0 gap-2 sm:gap-3",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100 sm:mt-1 sm:h-8 sm:w-8">
          <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      )}

      <div
        className={[
          "whitespace-pre-wrap wrap-break-word rounded-2xl px-3.5 py-2.5 text-base leading-relaxed shadow-sm sm:px-4 sm:py-3",
          isUser
            ? "ml-auto w-fit max-w-[min(100%,22rem)] bg-slate-900 text-white sm:max-w-[85%]"
            : "min-w-0 flex-1 bg-slate-50 text-slate-700 ring-1 ring-slate-200",
        ].join(" ")}
      >
        {text}
      </div>

      {isUser && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 sm:mt-1 sm:h-8 sm:w-8">
          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      )}
    </div>
  );
}

export default function ArticleChatPanel({ item, open }: Props) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);

  const [chatError, setChatError] = useState("");

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const articleId = useMemo(() => String(item.id), [item.id]);

  useEffect(() => {
    if (!open) return;
    clearChatSession(articleId);
  }, [open, articleId]);
  
  useEffect(() => {
    if (!open) return;

    const stored = readChatSession(articleId);

    if (stored) {
      setArticle(stored.article);
      setMessages(stored.messages || []);
    } else {
      setArticle(null);
      setMessages([]);
    }

    setChatError("");
  }, [open, articleId]);

  useEffect(() => {
    if (!open) return;

    writeChatSession(articleId, {
      article,
      messages,
      faqSuggestions: [],
    });
  }, [open, articleId, article, messages]);

  useEffect(() => {
    if (!open) return;
    if (article) return;

    let cancelled = false;

    async function loadArticle() {
      try {
        setArticleLoading(true);
        const result = await fetchArticleForHighlight(item);
        if (!cancelled) setArticle(result);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setArticleLoading(false);
      }
    }

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [open, item, article]);

  useEffect(() => {
    if (!open || !article) return;
    if (messages.length > 0) return;

    let cancelled = false;

    async function loadInitialChat() {
      if (!article) return;

      setInitialLoading(true);

      const chatMessages = await generateInitialChat(article);

      if (!cancelled) {
        setMessages(chatMessages);
        setInitialLoading(false);
      }
    }

    loadInitialChat();

    return () => {
      cancelled = true;
    };
  }, [open, article, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  async function handleSend(questionOverride?: string) {
    const question = (questionOverride ?? input).trim();

    if (!question || sending) return;
    if (!article) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: question,
    };

    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setInput("");
    setSending(true);
    setChatError("");

    try {
      const answer = await answerQuestionFromArticle(article!, question, nextHistory);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    } catch (error) {
      console.error(error);
      setChatError("AI sedang belum bisa diakses. Menampilkan respons fallback.");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Saya belum bisa menghubungi layanan AI saat ini. Namun berdasarkan highlight yang tersedia, ${item.title} menunjukkan perkembangan yang positif. Kamu juga bisa membuka "Lihat selengkapnya" untuk membaca artikel lengkapnya.`,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleReset() {
    clearChatSession(articleId);
    setMessages([]);
    setChatError("");
  }

  return (
    <div
      className="
        flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200
        max-md:h-auto max-md:min-h-[min(40dvh,360px)]
        md:h-full md:min-h-0 md:max-h-full
      "
    >
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 py-3 pl-4 pr-3 sm:items-center sm:px-5 sm:py-4">
        <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
          <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100 sm:mt-0">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="font-semibold leading-snug text-slate-900">
              Tanya AI tentang artikel ini
            </div>
            <div className="mt-0.5 text-xs leading-snug text-slate-500">
              Jawaban diprioritaskan dari artikel yang sedang dibuka
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-0.5 shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 sm:mt-0 sm:px-3"
        >
          Reset chat
        </button>
      </div>

      <div
        className="
          px-3 py-4 sm:px-5 sm:py-4
          max-md:flex-none max-md:overflow-visible
          md:min-h-0 md:flex-1 md:overflow-y-auto
        "
      >
        {articleLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengambil artikel WordPress...
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="space-y-4">
                {initialLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI sedang menyiapkan ringkasan artikel...
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-50 p-3.5 text-base leading-relaxed text-slate-600 ring-1 ring-slate-200 sm:p-4">
                    Hai, saya siap bantu menjelaskan isi artikel{" "}
                    <span className="font-semibold">{item.title}</span>. Silakan tanya apa saja.
                  </div>
                )}
              </div>
            )}

            {messages.length > 0 && (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <ChatBubble key={`${msg.role}-${idx}`} role={msg.role} text={msg.text} />
                ))}

                {sending && (
                  <div className="flex w-full min-w-0 gap-2 sm:gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100 sm:mt-1 sm:h-8 sm:w-8">
                      <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-3.5 py-2.5 text-base leading-relaxed text-slate-500 ring-1 ring-slate-200 sm:px-4 sm:py-3">
                      AI sedang menyusun jawaban...
                    </div>
                  </div>
                )}
              </div>
            )}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="shrink-0 border-t border-slate-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-3"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            placeholder="Tulis pertanyaan tentang artikel ini..."
            className="
              min-h-[48px] max-h-[140px] flex-1 resize-none overflow-y-auto
              rounded-2xl border border-slate-200 px-4 py-3
              text-sm text-slate-700 outline-none
              placeholder:text-slate-400
              focus:border-sky-300 focus:ring-4 focus:ring-sky-100
            "
          />

          <button
            type="submit"
            disabled={sending || articleLoading || !article || !input.trim()}
            className="
              inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl
              bg-slate-900 text-white transition
              hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>

        {chatError ? (
          <div className="mt-2 text-xs text-amber-600">{chatError}</div>
        ) : (
          <div className="mt-2 text-xs text-slate-400">
            AI memprioritaskan isi artikel ini, lalu membantu menjelaskan dengan bahasa yang lebih mudah dipahami.
          </div>
        )}
      </div>
    </div>
  );
}
