import type { DraftProposal } from './types';

const KEY = 'cosmosvote_drafts';

function load(): DraftProposal[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

function save(drafts: DraftProposal[]): void {
  localStorage.setItem(KEY, JSON.stringify(drafts));
}

export function saveDraft(draft: Omit<DraftProposal, 'id' | 'savedAt'>): DraftProposal {
  const drafts = load();
  const entry: DraftProposal = { ...draft, id: crypto.randomUUID(), savedAt: Date.now() };
  save([...drafts, entry]);
  return entry;
}

export function getDrafts(): DraftProposal[] {
  return load();
}

export function getDraft(id: string): DraftProposal | null {
  return load().find(d => d.id === id) ?? null;
}

export function deleteDraft(id: string): void {
  save(load().filter(d => d.id !== id));
}
