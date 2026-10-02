import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { Idea } from '../types';

const ideaText = (idea: Idea) =>
  `🚀 ${idea.name} — ${idea.tagline}\n\n${idea.description}\n\n🤖 AI score: ${idea.rating}/100 · 👍 ${idea.votes} votes\n(via Startup Idea Evaluator)`;

export async function shareIdea(idea: Idea) {
  try {
    await Share.share({ message: ideaText(idea), title: idea.name });
  } catch {
    await copyIdea(idea);
  }
}

export async function copyIdea(idea: Idea) {
  await Clipboard.setStringAsync(ideaText(idea));
  Toast.show({ type: 'success', text1: 'Copied to clipboard 📋', text2: idea.name });
}
