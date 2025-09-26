import { Screenshot, SearchResult } from '@/types';

// Mock placeholder images from Pexels
const MOCK_IMAGES = [
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7TVXDS3A35AP5EYGYRUUZQJ6INC%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODg4MDAwIn0.-ns0yVKqnJXF0Vzxx5C5NAsoGHyKw6ZVaxecX5R5t2j9MlWZKTrn2RWpcyMHko7Sr1FNWd44BSLfwiPCEida9lTidHw34g3cjnulSAeARqjnuvFLsuHwYVhHmNO-oJnD-lr9aEzVsNhfpPWcAPbgmdxSGcdO0zkfM1LlzYJmnFp_PVQyhtjRF6aMG4iz4WLIeHT7jOpD8Fn0nV8Q8gaTUbEHNp2FLgkLmBHdcZrHsbt4oeBQY2Fzg9QhRt6HtRcHJZ-5okEKBwioxg_kTMmWKqqAsyJ6Gv73xV0jJunWEsDTJM7GQoGv305I9a5K-H9nPbn-X2PxrjS84fJKJXh2NKw1PVr9f9r5aGeIXLgALNMlpM2Q7wblVThnyUENXunLz1TKlKZeAP9dDtMbQVIpumwt1sQ7L1cZgTCrFxlAZ996j0pi6okA3YRTMyMK0QDJypJRv3pUK6L4CN6tWY7j_7m0izcFsCaCi6DCEh7u6Wk.Ze2SGfCe_j8fQu1H9r-8D63B6UAqy-7PuHLakY2Oy2Q%26version%3DPublished&cb=63894451476&encodeFailures=1&width=431&height=933',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7WVKVCLIJQ7ZBAZOS2VYIOUL6L3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODg4MDAwIn0.OYD3v5SjJ_MqOHJZxclk7Aw2I_JtNVM-XRhkT7WIYsbm3B60V7UFs7YQPZeyqiJyaOlWvbA8YzbafirW7wS8yV5RxevMbWKopME7k4DLnEa5AlzQyxGg_I2bZ-5PwqW36TZjaIou_QfOkz8e9bIsqMlNqg1RLHVjZrMUzY_SlGYjuzMEy0rBA9xykkDn8xoaqFebPo9Px7LYZiR4FcJMXCvgBhlWDISqC_TpccwUnmJMFZwNOd23A-n-RyFCHTBtAl1f6VHrlY7fEOY3yZOxwH4MOVj66H8BYJ7aTtm68UxdQBvPGcdmimu1rmPT-9ctjVI0BvxRONXN4AwgXKCf5ZPH_8n1_5zYgM0lxB1tSL8h7OD7uhsaTUMjHsDdRkGD9f8J2049cetEkT6IgcdX7akbXvXcNUAps3NPLp25kMxiDKpTe4W-oGXwbtyiYcfw24uKcBdUBO8-cSvo2CB3LmajtewLUaYAbK0kyKOTAvY.fkAG4beWGt7FZnvuAaHdrbmFBeBywBK5Ojz1nyxHLoc%26version%3DPublished&cb=63894451471&encodeFailures=1&width=431&height=933',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7WAJTINEWLKONFK4NE3LJNOW7LV%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODg4MDAwIn0.grmgU0Ho2BNc_qN21AAbb07Cjn3Q9qGchT4iAD0-p4GOYUmhub8C5ta2i8r-9XsQtxbZRlL1PSy-uMHnKei7eh3VCamLSiyAGc_umZJX2mKmCX-fmswjBTy0xrMRgZl4IlzBH6ZX_q3toesFIybXcYP4sJMKKlQ8JE_nXL_MoDOQK77n7LZEoDjqiApaWCmNQG_oCInQDjcoQwtj2oS3l2SKm5Fzsvs45Kgomy0it279NMZYoTY-arCPByJmRDGa206jUImcQ2egS1sOHMqpZJ7l8rsVV7VspiTL60KovkAyOr4Ymx6BffE5S3Zwmmsze0Sk_3SDg7k7Ktv3GOKTCjMwvuGXWGfZmvaVv8Fk5nGFmW0FvrnC4xCEEdls1joqpbXSyK8kedoe6jeZjTnHi4LfmNFHz-w0mNKjkTVsrRW_g4CiN_q73srsNl36d_byvJoRXDFlZicpNykOZWzU-UInBqqtqNwe5K9Fi7CIZcs.gNR_kwywV0kwKVHnIUAVFAKrh-M4EEIwI2BjlmDOnjM%26version%3DPublished&cb=63894451468&encodeFailures=1&width=431&height=933',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7RZ4KCTZBNX5REZXLP47F7HYOMS%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODg4MDAwIn0.ycTa3OOzzjRLQJbbBhf-PvVzR4olxngbuhq0FVGx8O95XKrhf-dgKhfgNf8CPT7pljkCgyk5cLHo95GWhAeiII9B7SfiNJ1nTosvetQ63jh1jukKxOCC2E1SK_36E_4j5Phjxp-G2epK_uKe7nC78nZogmaLteGqGDY8i18SAqK5PqFbcOLN4RZAWl40Y6ib82uX6HyDx60KhARisQ7gVB7RtPXQIsyhptkXiG8kDeqhkeNGsG7XLbcX8nH87Vo-mfQpGZacthYZK4OSOFR3z82ZQ2sT0F0Jk0DFOEHI_iofgREPZpw75cohU8L5b_mZwDPMk4OuYUvywPsUjLvwI9AdRbTn2zbMt0TXgrJEG-LuV8st2in09GYlrlmSuKiMSVnYJe2mdd00Upp-Zj56gDUZgVvUUOlm-f7B0tYw_A1Qd5ltEMw27FYi8yvKQyFNQ1DKpbVg3HRGPK_yS04rI3jAhG5KydY6MNgIuw32Zd8.ldJNT_VT2pZ3EFj3N_U3cOrmKwEQ8xprqEbXV0aAA54%26version%3DPublished&cb=63894451486&encodeFailures=1&width=431&height=933',
];

const CONTACTS = ['Julie', 'Kate'];

const MOCK_SEEDS: Omit<Screenshot, 'id' | 'timestamp' | 'imageUrl'>[] = [
  {
    title: 'Julie',
    summary: 'Youre a machine, Dad. Need me to bring over some hot coffee?',
    content: 'Youre a machine, Dad. Need me to bring over some hot coffee?',
    contact: 'Julie',
    keywords: ['coffee'],
    appSource: 'whatsapp' as const,
    conversationName: 'Julie'
  },
  {
    title: 'Kate',
    summary: 'Then maybe Café Lumi? Cozy, quiet, and their flat white is unbeatable. Sold. Italian pasta + Lumi coffee. We basically nailed dinner and dessert.',
    content: 'Then maybe Café Lumi? Cozy, quiet, and their flat white is unbeatable. Sold. Italian pasta + Lumi coffee. We basically nailed dinner and dessert.',
    contact: 'Kate',
    keywords: ['coffee'],
    appSource: 'whatsapp' as const,
    conversationName: 'Kate'
  },
  {
    title: 'Kate',
    summary: 'Or we can go there, I eat and you drink coffee lol.',
    content: 'Or we can go there, I eat and you drink coffee lol.',
    contact: 'Kate',
    keywords: ['coffee'],
    appSource: 'whatsapp' as const,
    conversationName: 'Kate'
  },
  {
    title: 'Kate',
    summary: 'Ha! Classic. But if we’re doing that, I’m making sure the coffee is top-tier. Or… we could hit a real coffee spot after and keep it pure. You mean like a double stop? Pasta first, coffee pilgrimage second? I like the way you think. So… Italian plus a coffee run?',
    content: 'Ha! Classic. But if we’re doing that, I’m making sure the coffee is top-tier. Or… we could hit a real coffee spot after and keep it pure. You mean like a double stop? Pasta first, coffee pilgrimage second? I like the way you think. So… Italian plus a coffee run?',
    contact: 'Kate',
    keywords: ['coffee'],
    appSource: 'whatsapp' as const,
    conversationName: 'Kate'
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