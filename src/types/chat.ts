export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  text: string;
};

export type ArticleData = {
  title: string;
  content: string;
  excerpt: string;
  link: string;
  slug?: string;
};

export type StoredChatSession = {
  article: ArticleData | null;
  messages: ChatMessage[];
  faqSuggestions: string[];
};