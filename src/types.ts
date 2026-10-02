export interface Idea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rating: number;
  feedback: string;
  votes: number;
  createdAt: number;
}

export type SortKey = 'rating' | 'votes';

export type RootTabParamList = {
  Submit: undefined;
  Ideas: { highlightId?: string } | undefined;
  Leaderboard: undefined;
};
