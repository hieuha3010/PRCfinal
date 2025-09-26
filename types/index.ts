export interface Screenshot {
  id: string;
  title: string;
  summary: string;
  content: string;
  contact: string;
  timestamp: Date;
  keywords: string[];
  imageUrl: string;
  appSource: 'whatsapp' | 'telegram' | 'instagram';
  conversationName: string;
}

export interface SearchResult extends Screenshot {
  matchScore: number;
  matchedKeywords: string[];
}

export interface MockData {
  screenshots: Screenshot[];
  recentSearches: string[];
}