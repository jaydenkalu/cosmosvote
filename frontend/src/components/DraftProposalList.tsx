import { useState } from 'react';
import type { DraftProposal } from '../types';
import { getDrafts, deleteDraft } from '../drafts';

interface Props {
  onEdit: (draft: DraftProposal) => void;
  onPublish: (draft: DraftProposal) => void;
}

export function DraftProposalList({ onEdit, onPublish }: Props) {
  const [drafts, setDrafts] = useState<DraftProposal[]>(() => getDrafts());

  const handleDelete = (id: string) => {
    deleteDraft(id);
    setDrafts(getDrafts());
  };

  if (drafts.length === 0) return <p style={{ color: '#6b7280' }}>No saved drafts.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {drafts.map(draft => (
        <li key={draft.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div>
              <strong>{draft.title || <em>Untitled</em>}</strong>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Saved {new Date(draft.savedAt).toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={() => onEdit(draft)}
                style={{ padding: '0.25rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                Edit
              </button>
              <button
                onClick={() => onPublish(draft)}
                style={{ padding: '0.25rem 0.75rem', border: 'none', borderRadius: 6, background: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                Publish
              </button>
              <button
                onClick={() => handleDelete(draft.id)}
                style={{ padding: '0.25rem 0.75rem', border: 'none', borderRadius: 6, background: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: '0.875rem' }}
                aria-label={`Delete draft "${draft.title}"`}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
