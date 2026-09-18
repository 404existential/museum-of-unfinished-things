import { Artifact } from '../types';

const LOCAL_STORIES_KEY = 'mout-local-stories';
const LOCAL_TRIBUTES_KEY = 'mout-tributes';

const LOCAL_WITNESSED_KEY = 'mout-user-witnessed-ids';

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

export function deleteLocalStory(id: string): void {
  try {
    const existing = getLocalStories();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_STORIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage delete error:', e);
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

export function getUserWitnessedIds(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_WITNESSED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addUserWitnessedId(id: string): void {
  try {
    const list = getUserWitnessedIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(LOCAL_WITNESSED_KEY, JSON.stringify(list));
    }
  } catch (e) {
    console.warn('LocalStorage witnessed error:', e);
  }
}

export function isUserWitnessed(id: string): boolean {
  try {
    const list = getUserWitnessedIds();
    return list.includes(id);
  } catch {
    return false;
  }
}
