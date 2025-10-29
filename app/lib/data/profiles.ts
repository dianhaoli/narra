import { isSupabaseConfigured, supabase } from '../supabaseClient';
import { sampleProfiles, type SampleProfile, sampleInterviews } from '../../data/mockData';

const profileSelect = `
  username,
  name,
  email,
  bio,
  headline,
  avatar_url,
  interviews
`;

type SupabaseProfileRow = {
  username: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  headline: string | null;
  avatar_url: string | null;
  interviews: number[] | null;
};

const mapRowToProfile = (row: SupabaseProfileRow): SampleProfile | null => {
  if (!row.username) {
    return null;
  }

  const fallback = sampleProfiles.find((profile) => profile.username === row.username);

  return {
    username: row.username,
    name: row.name ?? fallback?.name ?? row.username,
    email: row.email ?? fallback?.email ?? '',
    bio: row.bio ?? fallback?.bio ?? '',
    headline: row.headline ?? fallback?.headline ?? '',
    avatarUrl: row.avatar_url ?? fallback?.avatarUrl ?? '',
    interviews: row.interviews ?? fallback?.interviews ?? sampleInterviews.filter((item) => item.profileUsername === row.username).map((item) => item.id),
  };
};

export const fetchProfiles = async (): Promise<SampleProfile[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return sampleProfiles;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(profileSelect);

  if (error || !data) {
    console.warn('Falling back to sample profiles:', error?.message);
    return sampleProfiles;
  }

  const typedRows = data as SupabaseProfileRow[];
  const mapped = typedRows
    .map(mapRowToProfile)
    .filter((profile): profile is SampleProfile => profile !== null);

  return mapped.length > 0 ? mapped : sampleProfiles;
};

export const fetchProfileByUsername = async (username: string): Promise<SampleProfile | null> => {
  if (!username) {
    return null;
  }

  if (!isSupabaseConfigured || !supabase) {
    return sampleProfiles.find((profile) => profile.username === username) ?? null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(profileSelect)
    .eq('username', username)
    .maybeSingle();

  if (error) {
    console.warn('Falling back to sample profile:', error.message);
    return sampleProfiles.find((profile) => profile.username === username) ?? null;
  }

  if (!data) {
    return sampleProfiles.find((profile) => profile.username === username) ?? null;
  }

  const typedRow = data as SupabaseProfileRow;
  return mapRowToProfile(typedRow);
};
