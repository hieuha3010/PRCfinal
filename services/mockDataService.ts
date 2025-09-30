import { Screenshot, SearchResult } from '@/types';

// Mock placeholder images from Pexels
const MOCK_IMAGES = [
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7QKJLGFL762RVGJ2PQFC35FLNVB%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU5Mjg3NjAwIn0.fmkriKagganNIi_-muaV5b-nB38Fq-sha7EOb-4_n1g8Q5JcTs1dUrnY8Gw2hMOdo9So-gseIradxkZs3nG-3-jFVblRLvv2psQgAYCl95q_MevgymrzNLKxGu7rAjU5o0gkzfyVcplTMVdgZ3TR21eM3JD9_JC-B0eh3rQN7gnlbANFXDILA5llf4cH6AT_m84k5kE6Kx1hwR4wfcm8wKqqcjOpQe76ybIf2BEBjdFrqYDIp6V3om3PzwSzRXc_nDOEDBVe40waMO3UHHb-x2VPfvWqFBHSujXuvAu1nK5pLhryVlQG-tnGhKqBNJKmr15fgfucQKjhZYEG_aYeIH4qrEr8kRCDOpKthnk6NODHIhqJjtuupxi--3g2cnCw7Y0dBonGdgcmWvMMIALIAZV0qwhkYRonfA-bxHe18jqiqJUuyP6eU1GL_zoUMs_DZ8a1d0AzNhjqRXjHK2A3Hk8wUY4BBaJ6hEHawncp0Fs.c8rR3vYmumYgTOoDOJmVJEwbbnhZCaZkt3xqhbJ87sk%26version%3DPublished&cb=63894868749&encodeFailures=1&width=378&height=798',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7RCTNP4SAONTRC2SNQMRIY2SY7F%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU5Mjg3NjAwIn0.VD7FDSYdPgt091ZVtSfQckd4GkcZ_7K7X0Bj0phlJmgAsFHTzBzgjQc5Nv-QG-vynkz147ch0OFPTajmc44SCba-xkjwOXT9AIQhimbPWEOb_rTxD4OceEPybI913EOx5o14mPdsW3cq4_STJNmu_WMvnGMtNQBCAxPLj1oIxe9BeVo6WjIFtFNaFHsa74x7Q-q0-i3ubyLxHe-kcpOcfULprWc6VnZBBgGXVTw0sKvUs-Wy6sfr6khzmNOm19Z4jjbievWRc8Div6Stu9TqmP8O5A38sdWMbP8DzigEvb6AM6XI-3EWCNLbjGLGVIJxUPxr8HDUHOsg3is7tze-zY9ACJJYOZt82xb0BFw9fY-nZ-25hsMV4ZgaWany3Fq-r6Ra4nKwQZfA4f3BD7Sq6RRe_VVpV5qukCN21XwP0XTnF-ZBhufsDYD7Id1vTkYsMS9Hz_3gu0qMuDvB56HVsHU2sGeLqCBURNvj2w2QN_A.f6zBPbLqWcUqr4MjJlAgyGc9msq2XLcb8zydE0aJozo%26version%3DPublished&cb=63894868722&encodeFailures=1&width=377&height=767&action=Access',
];

const CONTACTS = ['Julie', 'Kate'];

const MOCK_SEEDS: Omit<Screenshot, 'id' | 'timestamp' | 'imageUrl'>[] = [
  {
    title: 'Danny',
    summary: 'Yeah, man. September 18th — my son’s first birthday… well, his “born day,” you know?',
    content: 'Yeah, man. September 18th — my son’s first birthday… well, his “born day,” you know?',
    contact: 'Danny',
    keywords: ['birthday'],
    appSource: 'whatsapp' as const,
    conversationName: 'Danny'
  },
  {
    title: 'John',
    summary: 'Speaking of, did you hear about his son’s birthday party on Sep 15?',
    content: 'Speaking of, did you hear about his son’s birthday party on Sep 15?',
    contact: 'John',
    keywords: ['birthday'],
    appSource: 'whatsapp' as const,
    conversationName: 'John'
  }  
];
class MockDataService {
  private screenshots: Screenshot[] = [];
  private recentSearches: string[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Base screenshots directly from seeds
    const baseScreenshots: Screenshot[] = MOCK_SEEDS.map((seed, index) => ({
      ...seed,
      id: `screenshot-${index}`,
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // within last 30 days
      ),
      imageUrl: MOCK_IMAGES[index % MOCK_IMAGES.length],
    }));

    // Generate additional variations to reach 50+ total items
    const extraCount = 0; // 4 base + 50 extras = 54 total
    const extras: Screenshot[] = Array.from({ length: extraCount }, (_, i) => {
      const baseSeed = MOCK_SEEDS[i % MOCK_SEEDS.length];
      const idx = baseScreenshots.length + i;
      const who = CONTACTS[i % CONTACTS.length];
      return {
        ...baseSeed,
        id: `screenshot-${idx}`,
        title: `${baseSeed.title} (${i + 1})`,
        contact: who,
        conversationName: who,
        timestamp: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        imageUrl: MOCK_IMAGES[i % MOCK_IMAGES.length],
      };
    });

    this.screenshots = [...baseScreenshots, ...extras];
  }

  /**
   * Search screenshots by free-text query with optional app and conversation filters.
   * - Empty query returns most recent 20 items.
   * - Results sorted by score, then by recency.
   */
  searchScreenshots(
    query: string,
    appSourceFilter: 'whatsapp' | 'telegram' | 'instagram' | null = null,
    conversationNameFilters: string[] | null = null
  ): SearchResult[] {
    // Track recent searches (simple, no dedupe by case)
    this.addRecentSearch(query);

    // Start from full set, then chain filters on the working set
    let screenshotsToSearch = this.screenshots;

    if (appSourceFilter) {
      screenshotsToSearch = screenshotsToSearch.filter(
        (s) => s.appSource === appSourceFilter
      );
    }

    if (conversationNameFilters?.length) {
      const set = new Set(conversationNameFilters);
      screenshotsToSearch = screenshotsToSearch.filter((s) =>
        set.has(s.conversationName)
      );
    }

    // Normalize & tokenize query (remove punctuation, keep letters/numbers/spaces)
    const normalized = query.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ');
    const queryTokens = normalized.split(/\s+/).filter(Boolean);

    // Empty query: return most recent 20
    if (queryTokens.length === 0) {
      return [...screenshotsToSearch]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20)
        .map((s) => ({
          ...s,
          matchScore: 1,
          matchedKeywords: [],
        })) as unknown as SearchResult[]; // ensure your SearchResult type includes these fields
    }

    const synonymMap: Record<string, string[]> = {
      price: ['cost', 'bill', 'invoice', 'amount'],
      money: ['cash', 'payment', 'dollar', 'cost'],
      document: ['pdf', 'file', 'paper'],
      photo: ['image', 'picture', 'screenshot'],
    };

    const results: SearchResult[] = [];

    for (const screenshot of screenshotsToSearch) {
      let matchScore = 0;
      const matchedKeywords: string[] = [];

      const searchableText = [
        screenshot.title,
        screenshot.summary,
        screenshot.content,
        screenshot.contact,
        ...(screenshot.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase();

      for (const token of queryTokens) {
        let tokenMatched = false;

        // Direct match
        if (searchableText.includes(token)) {
          matchScore += 10;
          matchedKeywords.push(token);
          tokenMatched = true;
        }

        // Synonym match (only if direct not already counted)
        if (
          !tokenMatched &&
          synonymMap[token]?.some((syn) => searchableText.includes(syn))
        ) {
          matchScore += 7;
          matchedKeywords.push(token);
          tokenMatched = true;
        }

        // Keyword field match (boost)
        if (screenshot.keywords?.some((k) => k.toLowerCase().includes(token))) {
          matchScore += 12;
        }

        // Title match (highest boost)
        if (screenshot.title.toLowerCase().includes(token)) {
          matchScore += 20;
        }
      }

      if (matchScore > 0) {
        results.push({
          ...(screenshot as any),
          matchScore,
          matchedKeywords: [...new Set(matchedKeywords)],
        } as SearchResult);
      }
    }

    // Sort by score desc, then by recency
    return results
      .sort(
        (a, b) =>
          b.matchScore - a.matchScore ||
          b.timestamp.getTime() - a.timestamp.getTime()
      )
      .slice(0, 30);
  }

  getRecentSearches(): string[] {
    return [...this.recentSearches];
  }

  private addRecentSearch(query: string) {
    const cleaned = query.trim();
    if (!cleaned) return;
    // Case-insensitive uniqueness
    const exists = this.recentSearches.some(
      (q) => q.toLowerCase() === cleaned.toLowerCase()
    );
    if (!exists) {
      this.recentSearches = [cleaned, ...this.recentSearches].slice(0, 10);
    }
  }

  getAllScreenshots(): Screenshot[] {
    return [...this.screenshots].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  /**
   * Simulate live indexing by prepending a fresh screenshot.
   */
  simulateNewCapture() {
    const randomSeed =
      MOCK_SEEDS[Math.floor(Math.random() * MOCK_SEEDS.length)];
    const newScreenshot: Screenshot = {
      ...randomSeed,
      id: `screenshot-new-${Date.now()}`,
      title: `${randomSeed.title} (Live)`,
      timestamp: new Date(),
      imageUrl: MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)],
      contact: CONTACTS[Math.floor(Math.random() * CONTACTS.length)],
      conversationName: CONTACTS[Math.floor(Math.random() * CONTACTS.length)],
    };

    this.screenshots.unshift(newScreenshot);
    return newScreenshot;
  }
}

export const mockDataService = new MockDataService();