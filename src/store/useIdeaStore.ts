import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Idea } from '../types';
import { generateAIRating } from '../utils/fakeAI';
import { SEED_IDEAS } from './seed';

interface IdeaState {
  ideas: Idea[];
  votedIds: string[];
  darkMode: boolean;
  hasHydrated: boolean;

  addIdea: (input: { name: string; tagline: string; description: string }) => Idea;
  toggleVote: (id: string) => 'voted' | 'unvoted';
  toggleDarkMode: () => void;
  resetAll: () => void;
}

const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const useIdeaStore = create<IdeaState>()(
  persist(
    (set, get) => ({
      ideas: SEED_IDEAS,
      votedIds: [],
      darkMode: false,
      hasHydrated: false,

      addIdea: ({ name, tagline, description }) => {
        const { rating, feedback } = generateAIRating(name, tagline, description);
        const idea: Idea = {
          id: makeId(),
          name: name.trim(),
          tagline: tagline.trim(),
          description: description.trim(),
          rating,
          feedback,
          votes: 0,
          createdAt: Date.now(),
        };
        set((s) => ({ ideas: [idea, ...s.ideas] }));
        return idea;
      },

      toggleVote: (id) => {
        const alreadyVoted = get().votedIds.includes(id);
        set((s) => ({
          votedIds: alreadyVoted ? s.votedIds.filter((v) => v !== id) : [...s.votedIds, id],
          ideas: s.ideas.map((i) =>
            i.id === id ? { ...i, votes: Math.max(0, i.votes + (alreadyVoted ? -1 : 1)) } : i
          ),
        }));
        return alreadyVoted ? 'unvoted' : 'voted';
      },

      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      resetAll: () => set({ ideas: SEED_IDEAS, votedIds: [] }),
    }),
    {
      name: 'startup-idea-evaluator',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ ideas: s.ideas, votedIds: s.votedIds, darkMode: s.darkMode }),
      version: 3,
      migrate: (persisted: any, version) => {
        const { savedIds, ...rest } = persisted ?? {};
        return version < 3 ? { ...rest, darkMode: false } : rest;
      },
      onRehydrateStorage: () => () => {
        useIdeaStore.setState({ hasHydrated: true });
      },
    }
  )
);
