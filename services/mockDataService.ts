import { Screenshot, SearchResult } from '@/types';

// Mock placeholder images from Pexels
const MOCK_IMAGES = [
  'https://onedrive.live.com/?qt=allmyphotos&photosData=%2Fshare%2FC367B280DA17E00F%21sb0e5b875a06f497f836234a6609f21a2%3Fithint%3Dphoto%26e%3DPZGQ4D%26migratedtospo%3Dtrue&cid=C367B280DA17E00F&id=C367B280DA17E00F%21sb0e5b875a06f497f836234a6609f21a2&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2kvYy9jMzY3YjI4MGRhMTdlMDBmL0VYVzQ1YkJ2b0g5SmcySTBwbUNmSWFJQlFrODdwdUNpeHFNV2hLcU95LXk5Y0E%5FZT1QWkdRNEQ&v=photos',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7WVKVCLIJQ7ZBAZOS2VYIOUL6L3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODY2NDAwIn0.9tVwP6zwxZr7c0hbHSc9wyfSPLuCzL7aVSSKqPhC_F6yIbkmH9dmoJYpp7EPLjfHyqrUDggHasKQ_801wDA6GB9wT0PMiLPLArKilLh8x7WabwateSvDejcdnAVYIGo1ipT2Faw9Vk8DqIQiW2WmHPiuxLdBvi2j-rw2ldFVRVt1aCLbCW7YPNuRbc-wiPkI1kpf-uql6U0j8PJzU-0D1SU8ELWUkIOJ-yuQcxyghxKJVT8qcoCKwgTYgy9PMAQSYbU5KAK4niXXfqltjdXqxkHjIy5PiTmCW-oWWEPNtkaBpZoDxAvG3tLbXto5Ig9T-eDwHTi4a6j8M-ZQp1BQtGI-ts0uLttvrZaNigZYMP-i9t8s6J2n541fjyM8lbzs-nqihOmAr_XQJO1CBu5Q14O3ITGl3FcF1pe62kQGnfKGBU6-e-SXELaq_hScaeBD5qvIsyDX8dwQTsaKLQ8rEMrWE97TFzs9PE1fOznhqiA.HsKvvBY-UleAoctTFACW55PLm-zACVNGpfIwYr0LU0w%26version%3DPublished&cb=63894451471&encodeFailures=1&width=447&height=969',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7WAJTINEWLKONFK4NE3LJNOW7LV%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODY2NDAwIn0.HzYO8lvlExp-z8S2DFy_ybc67uu-xcNQwGlbidMupgSlUtNrvOU5A0thouCG6d1d9lD5WT1T8tJmUSGerinL7QH_16ZclKv_6OJdOoJxYda8apNSIYf-sWLkSNWI4WuipsC_Bb_zukdvdxSodWgTM_Mj0Q9zOnHJ54Ek48buOkysCO5ScY6WLiBgUjRIakRBg027qTqtbrlYxHUOM-fEY_HDsCQs4Nr0WdFZo-1Eckj-UjoEyp0OSPrnuSAnas8Kc6XRifXEOz7Zd5MA080NIT2OB26e7kwESXVSDYUFbtmdotpWq8fUcSEjPXi4EapuB-9gT_VOGJeyfm_iz_jp--bz3idXEnuz50ne_CujGbYJKkDUnoDsWnPeFmJumFyHc4RrAwl07JvdDXE2rnDiwqmyOKYZOwx4il3YvM-XrBZOQYMX3XdgnLgARyQ76ZIoH42Bxa3qA-wNxJWolVUHtFZHgRrWN9u3CEnF-8bPYVg.tZeb3JgZFiBn6HJzYDp0wSRb1NBTbIM-AbIZOCa3eaw%26version%3DPublished&cb=63894451468&encodeFailures=1&width=447&height=969',
  'https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=196810&inputFormat=jpeg&cs=fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!28Ai8SseuEis5ffcay8sJFnAoAsOQIhClKjVSJmEvtSXnT6THdAyTq_azScFg7JC%2Fitems%2F01NYQHG7RZ4KCTZBNX5REZXLP47F7HYOMS%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJmMTIyYzBkYi0xZTJiLTQ4YjgtYWNlNS1mN2RjNmIyZjJjMjQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbXkubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzU4ODY2NDAwIn0.ayCVqWMmjXbRXzWWjz1l4pV6-XECe6x9fnjLnZfkCQLRUD_L5XkeDOq3BfHxwbEtfFTwuznU-qI4JMjqt-glkozftQYn7mvsFhgTAavVKhy35nNhGNHoU6eyL9YttSQ36y3jLqJo7xQOqixAHSSbK34T9JXXd9XDgO_-X5s_BJyAYTBEtlOkLBIIH8rSYKGZlAwcQisVNBzL1BR3u3YXiD2scSKCxLcyaA5C4uGGYcNqfaIHvld6XVAEIka1wH6dU40M2VSb3yhy4it8YoRSPH36vBVpzu5ZK8SyxSgVIoTJ6zOijCqff8FsLx0dmMwag6Vv8zqWsxfb2Nip60KdAn3_tkMo7HZP85D4JI1T2HrJBsD1sDckm-YvcLcZ1Tm-gVslQXuutVg2WXKqTPgI53Q-7XWrmZScqSwQR8wjL1oLYDbWzU_Ac2lXidjASPqOF2Hc7XFy2hPBnnPYDXk3DWROadgimG1aL1GhUERVfTc.wILANmuzYh0I0qNth5IWyPShceRgRfomTPKLaylpjnc%26version%3DPublished&cb=63894451486&encodeFailures=1&width=447&height=969',
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