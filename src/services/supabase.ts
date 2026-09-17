import { createClient } from '@supabase/supabase-js';
import { Artifact } from '../types';

const SUPABASE_URL = 'https://oyoacuakzwsvxmzcckot.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9E_Hf168dkeWJIQbhgHCKg_DEPsWQc7';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const COLOR_ROTATIONS = [
  { visual: 'pink', shadow: 'acid', rot: '-1.8deg' },
  { visual: 'acid', shadow: 'cyan', rot: '1.4deg' },
  { visual: 'cyan', shadow: 'orange', rot: '-2.2deg' },
  { visual: 'orange', shadow: 'pink', rot: '0.9deg' },
  { visual: 'purple', shadow: 'acid', rot: '-1.5deg' }
] as const;

export async function fetchRemoteArtifacts(): Promise<Artifact[]> {
  try {
    const { data, error } = await supabase
      .from('artifacts')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((item, idx) => {
      const style = COLOR_ROTATIONS[idx % COLOR_ROTATIONS.length];
      return {
        id: item.accession,
        title: item.title,
        category: item.category || 'Writing',
        year: item.year || '2024',
        status: item.status || 'Published',
        visualColor: (item.visual as any) || style.visual,
        shadowColor: style.shadow,
        rotation: style.rot,
        description: item.description || item.reason || 'A preserved record in the public collection.',
        text: item.record_text || item.description || '',
        note: item.reason || item.contributor_note || 'Circumstances not documented.',
        username: item.contributor_username || 'Anonymous',
        tributes: 10
      };
    });
  } catch (err) {
    console.warn('Supabase fetch error, fallback to cache:', err);
    return [];
  }
}

export async function insertRemoteArtifact(artifact: Artifact): Promise<boolean> {
  try {
    const { error } = await supabase.from('artifacts').insert({
      accession: artifact.id,
      title: artifact.title,
      category: artifact.category,
      year: artifact.year,
      status: artifact.status,
      reason: artifact.note,
      visual: artifact.visualColor,
      description: artifact.description,
      contributor_note: artifact.note,
      record_text: artifact.text,
      contributor_username: artifact.username
    });
    return !error;
  } catch (err) {
    console.warn('Supabase insert error, saved locally:', err);
    return false;
  }
}

export async function updateRemoteArtifactStatus(accession: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('artifacts')
      .update({ status })
      .eq('accession', accession);
    return !error;
  } catch (err) {
    console.warn('Supabase update status error:', err);
    return false;
  }
}
