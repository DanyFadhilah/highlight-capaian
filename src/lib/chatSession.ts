import type { StoredChatSession } from "../types/chat";

export function buildSessionKey(articleId: string) {
  return `highlight-chat-session:${articleId}`;
}

export function readChatSession(articleId: string): StoredChatSession | null {
  const key = buildSessionKey(articleId);
  const raw = sessionStorage.getItem(key);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredChatSession;
  } catch {
    return null;
  }
}

export function writeChatSession(articleId: string, data: StoredChatSession) {
  const key = buildSessionKey(articleId);
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function clearChatSession(articleId: string) {
  const key = buildSessionKey(articleId);
  sessionStorage.removeItem(key);
}