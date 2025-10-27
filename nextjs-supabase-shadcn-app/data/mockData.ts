export type SampleInterview = {
  id: number;
  title: string;
  description: string;
  candidateName: string;
  role: string;
  scheduledFor: string;
  location: {
    label: string;
    coordinates: [number, number];
  };
  tags: string[];
  audioUrl: string;
  transcript: string;
  profileUsername: string;
};

export type SampleProfile = {
  username: string;
  name: string;
  email: string;
  bio: string;
  headline: string;
  avatarUrl: string;
  interviews: SampleInterview['id'][];
};

export const sampleInterviews: SampleInterview[] = [
  {
    id: 1,
    title: 'Remembering the Fillmore District',
    description:
      'Jane shares stories about growing up in the Fillmore District of San Francisco during the 1960s and how the community changed over time.',
    candidateName: 'Jane Doe',
    role: 'Community Historian',
    scheduledFor: '2025-10-30T18:00:00Z',
    location: {
      label: 'San Francisco, CA',
      coordinates: [37.7749, -122.4194],
    },
    tags: ['community', 'san-francisco', 'civil-rights'],
    audioUrl: '#',
    transcript:
      'I remember the music pouring out of every open window. My parents ran a small record store, and every Friday night the neighborhood would gather to listen to new jazz records. When redevelopment came, so much of that magic disappeared... (transcript continues).',
    profileUsername: 'jane-doe',
  },
  {
    id: 2,
    title: 'Designing Connection in Remote Teams',
    description:
      'Alex reflects on designing digital spaces that help remote collaborators feel present with one another, especially during the early pandemic era.',
    candidateName: 'Alex Kim',
    role: 'Product Designer',
    scheduledFor: '2025-11-01T17:30:00Z',
    location: {
      label: 'Seoul, South Korea',
      coordinates: [37.5665, 126.978],
    },
    tags: ['design', 'remote-work', 'pandemic'],
    audioUrl: '#',
    transcript:
      'The first time I tested our prototype with a remote team, I realized how isolating those small delays could be. We started experimenting with spatial audio cues and gentle motion to simulate presence... (transcript continues).',
    profileUsername: 'alex-kim',
  },
  {
    id: 3,
    title: 'Building Bridges Through Mentorship',
    description:
      'Priya recounts mentoring first-generation engineers and the programs she launched to make the tech industry more inclusive.',
    candidateName: 'Priya Patel',
    role: 'Engineering Manager',
    scheduledFor: '2025-11-04T20:00:00Z',
    location: {
      label: 'New York, NY',
      coordinates: [40.7128, -74.006],
    },
    tags: ['mentorship', 'inclusion', 'leadership'],
    audioUrl: '#',
    transcript:
      'Mentorship was how I found my footing. When I moved to the United States for grad school, the person who helped me most was another student who had only been there a year longer... (transcript continues).',
    profileUsername: 'priya-patel',
  },
];

export const sampleProfiles: SampleProfile[] = [
  {
    username: 'jane-doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    bio: 'Community historian documenting the Fillmore District through oral histories and archival work.',
    headline: 'Community Historian · San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
    interviews: [1],
  },
  {
    username: 'alex-kim',
    name: 'Alex Kim',
    email: 'alex@example.com',
    bio: 'Product designer exploring how technology can make distant collaboration feel personal.',
    headline: 'Product Designer · Remote',
    avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80',
    interviews: [2],
  },
  {
    username: 'priya-patel',
    name: 'Priya Patel',
    email: 'priya@example.com',
    bio: 'Engineering leader investing in mentorship programs for first-generation technologists.',
    headline: 'Engineering Manager · New York, NY',
    avatarUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=256&q=80',
    interviews: [1, 3],
  },
];
