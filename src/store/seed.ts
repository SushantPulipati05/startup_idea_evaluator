import { Idea } from '../types';

const now = Date.now();

export const SEED_IDEAS: Idea[] = [
  {
    id: 'seed-1',
    name: 'PlantPal',
    tagline: 'Your houseplants, but they text you.',
    description:
      'A cheap soil sensor plus an app that sends you funny messages when your plants need water, light, or a little emotional support. Subscription unlocks care plans for rare species.',
    rating: 82,
    feedback: 'Solid idea with real legs. Nail the go-to-market and you’re cooking. 🔥',
    votes: 12,
    createdAt: now - 1000 * 60 * 60 * 30,
  },
  {
    id: 'seed-2',
    name: 'QueueLess',
    tagline: 'Skip the line at your college canteen.',
    description:
      'Students pre-order food from the campus canteen and get a notification when it’s ready. Canteens get demand forecasts so less food is wasted.',
    rating: 74,
    feedback: 'Promising! A sharper niche could turn this into a rocket.',
    votes: 18,
    createdAt: now - 1000 * 60 * 60 * 20,
  },
  {
    id: 'seed-3',
    name: 'Rentrobe',
    tagline: 'Rent outfits for one night, not forever.',
    description:
      'A peer-to-peer marketplace for renting ethnic and party wear for weddings and festivals. Built-in dry-cleaning pickup and deposit protection.',
    rating: 68,
    feedback: 'Good fundamentals. Our AI would angel-invest (if it had money).',
    votes: 9,
    createdAt: now - 1000 * 60 * 60 * 10,
  },
  {
    id: 'seed-4',
    name: 'Snoozr',
    tagline: 'An alarm clock that bets against you.',
    description:
      'Every time you hit snooze, ₹10 goes to a charity you dislike. Wake up on time for a week and earn streak badges.',
    rating: 57,
    feedback: 'Interesting spark — needs a clearer “why now?”. 🤔',
    votes: 21,
    createdAt: now - 1000 * 60 * 60 * 5,
  },
];
