const BUZZWORDS = [
  'ai', 'blockchain', 'web3', 'quantum', 'platform', 'marketplace', 'subscription',
  'saas', 'sustainable', 'green', 'health', 'community', 'automation', 'ml', 'app',
];

const FEEDBACK: { min: number; lines: string[] }[] = [
  {
    min: 85,
    lines: [
      'Unicorn energy detected. Investors are already refreshing your inbox. 🦄',
      'Our neural nets got goosebumps. Ship it yesterday. 🚀',
      'This one made the GPU fans spin faster. Strong product–market vibes.',
    ],
  },
  {
    min: 65,
    lines: [
      'Solid idea with real legs. Nail the go-to-market and you’re cooking. 🔥',
      'Promising! A sharper niche could turn this into a rocket.',
      'Good fundamentals. Our AI would angel-invest (if it had money).',
    ],
  },
  {
    min: 40,
    lines: [
      'Interesting spark — needs a clearer “why now?”. 🤔',
      'Decent foundation. Talk to 10 real users before writing more code.',
      'Could work… or could be a very expensive hobby. Validate first.',
    ],
  },
  {
    min: 0,
    lines: [
      'Our AI read this twice and then went for a walk. 🚶',
      'Bold. Very bold. Maybe a pivot is in order? 😅',
      'Every great founder has a few of these. On to the next one!',
    ],
  },
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function generateAIRating(name: string, tagline: string, description: string) {
  const text = `${name} ${tagline} ${description}`.toLowerCase();
  const words = text.split(/\W+/).filter(Boolean);

  const lengthBonus = Math.min(description.trim().length / 20, 12);
  const buzzBonus = Math.min(words.filter((w) => BUZZWORDS.includes(w)).length * 3, 13);

  const base = 30 + Math.random() * 45;

  const rating = Math.max(0, Math.min(100, Math.round(base + lengthBonus + buzzBonus)));
  const tier = FEEDBACK.find((t) => rating >= t.min)!;

  return { rating, feedback: pick(tier.lines) };
}

export const fakeThinkingDelay = (ms = 1400) => new Promise((r) => setTimeout(r, ms));

export function ratingClasses(rating: number) {
  if (rating >= 80) return { text: 'text-green-500', border: 'border-green-500', bg: 'bg-green-500/10' };
  if (rating >= 60) return { text: 'text-lime-500', border: 'border-lime-500', bg: 'bg-lime-500/10' };
  if (rating >= 40) return { text: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500/10' };
  return { text: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500/10' };
}
