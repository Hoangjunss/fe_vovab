// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

// ========== KIỂU DỮ LIỆU ==========
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
}

interface VocabSet {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  wordCount: number;
  difficultyLevel: number;
  createdAt: string;
  updatedAt: string;
}

interface FlashcardSession {
  cardId: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
  audioUrl?: string;
  imageUrl?: string;
  currentSrsLevel: number;
  totalCardsInSet: number;
  reviewedCount: number;
  cardsDueToday: number;
}

// Thêm interface cho phân trang (dùng trong getCardsBySet)
interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Interface cho thẻ từ (vocab card)
interface VocabCard {
  id: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
  phonetic?: string;
  audioUrl?: string;
  imageUrl?: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
}

// ========== HÀM FETCH CHUNG ==========
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  // Lấy token từ localStorage (chỉ chạy trên client)
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Lỗi kết nối' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// ========== AUTH API ==========
export const authApi = {
  register: (email: string, password: string, fullName: string) =>
    apiFetch<{ accessToken: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    }),
  login: (email: string, password: string) =>
    apiFetch<{ accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => apiFetch<User>('/auth/me'),
  googleLogin: (idToken: string) =>
  apiFetch<{ accessToken: string; refreshToken: string }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  }),
};

// ========== VOCABULARY API ==========
export const vocabApi = {
  getPublicSets: (topic?: string, page = 0, size = 12) =>
    apiFetch<{ content: VocabSet[]; totalElements: number }>(
      `/vocab/sets/public?topic=${topic || ''}&page=${page}&size=${size}`
    ),
  getSetById: (setId: string) => apiFetch<VocabSet>(`/vocab/sets/${setId}`),
  getNextFlashcard: (setId: string) => apiFetch<FlashcardSession>(`/vocab/study/${setId}/next`),
  submitAnswer: (cardId: string, quality: number) =>
    apiFetch<void>('/vocab/study/answer', {
      method: 'POST',
      body: JSON.stringify({ cardId, quality }),
    }),
  // Thêm method mới: lấy danh sách thẻ của một bộ (phân trang)
  getCardsBySet: (setId: string, page = 0, size = 20) =>
    apiFetch<PageResponse<VocabCard>>(`/vocab/sets/${setId}/cards?page=${page}&size=${size}`),
};