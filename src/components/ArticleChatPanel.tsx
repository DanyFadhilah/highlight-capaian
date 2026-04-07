import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import type { Highlight } from "../types/highlight";
import type { ArticleData, ChatMessage } from "../types/chat";
import { clearChatSession, readChatSession, writeChatSession } from "../lib/chatSession";
import { fetchArticleForHighlight } from "../lib/wordpress";
import { answerQuestionFromArticle, generateStaticFaqFromArticle } from "../lib/gemini";

type Props = {
  item: Highlight;
  open: boolean;
};

function ChatBubble({ role, text }: ChatMessage) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={[
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-slate-900 text-white"
            : "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
        ].join(" ")}
      >
        {text}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}

export default function ArticleChatPanel({ item, open }: Props) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [faqSuggestions, setFaqSuggestions] = useState<string[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);

  const [faqError, setFaqError] = useState("");
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
      setFaqSuggestions(stored.faqSuggestions || []);
    } else {
      setArticle(null);
      setMessages([]);
      setFaqSuggestions([]);
    }

    setFaqError("");
    setChatError("");
  }, [open, articleId]);

  useEffect(() => {
    if (!open) return;

    writeChatSession(articleId, {
      article,
      messages,
      faqSuggestions,
    });
  }, [open, articleId, article, messages, faqSuggestions]);

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

    async function loadStaticFaq() {
      if (!article) return;

      setFaqLoading(true);

      const faqs = await generateStaticFaqFromArticle(article);

      const newMessages: ChatMessage[] = [];

      faqs.forEach((faq) => {
        newMessages.push({
          role: "user",
          text: faq.q,
        });

        newMessages.push({
          role: "assistant",
          text: faq.a,
        });
      });

      if (!cancelled) {
        setMessages(newMessages);
      }
    }

    loadStaticFaq();

    return () => {
      cancelled = true;
    };
  }, [open, article]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending, faqSuggestions.length]);

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
    setFaqSuggestions([]);
    setFaqError("");
    setChatError("");
  }

  return (
    <div
      className="
        flex min-h-[97.5vh] max-h-[97.5vh] flex-col
        overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200
      "
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <div className="font-semibold text-slate-900">Tanya AI tentang artikel ini</div>
            <div className="text-xs text-slate-500">
              Jawaban diprioritaskan dari artikel yang sedang dibuka
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Reset chat
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {articleLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengambil artikel WordPress...
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 ring-1 ring-slate-200">
                  Hai, saya siap bantu menjelaskan isi artikel{" "}
                  <span className="font-semibold">{item.title}</span>. Kamu bisa pilih FAQ awal
                  atau langsung tanya bebas.
                </div>

                <div className="space-y-2">


                  {faqError ? <div className="text-xs text-amber-600">{faqError}</div> : null}

                  {faqLoading && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Menyiapkan pertanyaan awal dari isi artikel...
                    </div>
                  )}

                  {!faqLoading && faqSuggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      
                    </div>
                  )}
                </div>
              </div>
            )}

            {messages.length > 0 && (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <ChatBubble key={`${msg.role}-${idx}`} role={msg.role} text={msg.text} />
                ))}

                {sending && (
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500 ring-1 ring-slate-200">
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

      <div className="shrink-0 border-t border-slate-200 p-4">
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
