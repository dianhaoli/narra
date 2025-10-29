import { isSupabaseConfigured, supabase } from '../supabaseClient';
import { sampleInterviews, type SampleInterview } from '../../data/mockData';

const interviewSelect = `
  id,
  title,
  description,
  candidate_name,
  role,
  scheduled_for,
  location_label,
  location_latitude,
  location_longitude,
  tags,
  audio_url,
  transcript,
  profile_username
`;

type SupabaseInterviewRow = {
  id: number;
  title: string;
  description: string | null;
  candidate_name: string | null;
  role: string | null;
  scheduled_for: string | null;
  location_label: string | null;
  location_latitude: number | null;
  location_longitude: number | null;
  tags: string[] | null;
  audio_url: string | null;
  transcript: string | null;
  profile_username: string | null;
};

const mapRowToInterview = (row: SupabaseInterviewRow): SampleInterview | null => {
  if (!row.id || !row.title) {
    return null;
  }

  const fallback = sampleInterviews.find((item) => item.id === row.id);

  return {
    id: row.id,
    title: row.title ?? fallback?.title ?? 'Untitled Interview',
    description: row.description ?? fallback?.description ?? '',
    candidateName: row.candidate_name ?? fallback?.candidateName ?? 'Narrator',
    role: row.role ?? fallback?.role ?? '',
    scheduledFor: row.scheduled_for ?? fallback?.scheduledFor ?? new Date().toISOString(),
    location: {
      label: row.location_label ?? fallback?.location.label ?? 'Unknown Location',
      coordinates: [
        row.location_latitude ?? fallback?.location.coordinates[0] ?? 0,
        row.location_longitude ?? fallback?.location.coordinates[1] ?? 0,
      ],
    },
    tags: row.tags ?? fallback?.tags ?? [],
    audioUrl: row.audio_url ?? fallback?.audioUrl ?? '#',
    transcript: row.transcript ?? fallback?.transcript ?? '',
    profileUsername: row.profile_username ?? fallback?.profileUsername ?? 'unknown',
  };
};

export const fetchInterviews = async (): Promise<SampleInterview[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return sampleInterviews;
  }

  const { data, error } = await supabase
    .from('interviews')
    .select(interviewSelect);

  if (error || !data) {
    console.warn('Falling back to sample interviews:', error?.message);
    return sampleInterviews;
  }

  const typedRows = data as SupabaseInterviewRow[];

  const mapped = typedRows
    .map(mapRowToInterview)
    .filter((item): item is SampleInterview => item !== null);

  return mapped.length > 0 ? mapped : sampleInterviews;
};

export const fetchInterviewById = async (id: number): Promise<SampleInterview | null> => {
  if (!Number.isFinite(id)) {
    return null;
  }

  if (!isSupabaseConfigured || !supabase) {
    return sampleInterviews.find((interview) => interview.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from('interviews')
    .select(interviewSelect)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.warn('Falling back to sample interview:', error.message);
    return sampleInterviews.find((interview) => interview.id === id) ?? null;
  }

  if (!data) {
    return sampleInterviews.find((interview) => interview.id === id) ?? null;
  }

  const typedRow = data as SupabaseInterviewRow;

  return mapRowToInterview(typedRow);
};
