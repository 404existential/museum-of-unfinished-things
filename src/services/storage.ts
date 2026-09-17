import { Artifact } from '../types';

const LOCAL_STORIES_KEY = 'mout-local-stories';
const LOCAL_TRIBUTES_KEY = 'mout-tributes';

export function getLocalStories(): Artifact[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalStory(story: Artifact): void {
  try {
    const existing = getLocalStories();
    existing.unshift(story);
    localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export function getLocalTributes(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LOCAL_TRIBUTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function incrementLocalTribute(id: string): number {
  try {
    const map = getLocalTributes();
    map[id] = (map[id] || 0) + 1;
    localStorage.setItem(LOCAL_TRIBUTES_KEY, JSON.stringify(map));
    return map[id];
  } catch {
    return 1;
  }
}
