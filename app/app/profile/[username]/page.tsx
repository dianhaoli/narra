import Image from 'next/image';
import Link from 'next/link';
import InterviewCard from '../../../components/interview-card';
import PageTransition from '../../../components/page-transition';
import { fetchInterviews } from '../../../lib/data/interviews';
import { fetchProfileByUsername } from '../../../lib/data/profiles';

type ProfilePageProps = {
  params: {
    username: string;
  };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const profile = await fetchProfileByUsername(params.username);
  const interviews = await fetchInterviews();

  if (!profile) {
    return (
      <PageTransition>
  <div className="mx-auto max-w-6xl rounded-3xl border border-dashed border-subtle bg-soft p-8 text-muted">
          <h1 className="text-xl font-semibold text-[color:var(--foreground)]">Profile not found</h1>
          <p className="mt-2 text-sm">We couldn&apos;t find a profile with this username yet.</p>
          <Link href="/interviews" className="mt-4 inline-flex text-sm font-medium accent-link">
            Browse interviews →
          </Link>
        </div>
      </PageTransition>
    );
  }

  const profileInterviews = interviews.filter((interview) => profile.interviews.includes(interview.id));

  return (
    <PageTransition className="space-y-10">
  <header className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-subtle bg-[radial-gradient(circle_at_top,_rgba(255,253,247,0.95),_rgba(231,215,196,0.75)_60%,_rgba(107,185,182,0.28)_100%)] p-10 shadow-[0_36px_80px_-48px_rgba(34,28,22,0.52)] md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={112}
              height={112}
              className="h-28 w-28 rounded-3xl object-cover shadow-[0_24px_55px_-32px_rgba(34,28,22,0.55)]"
            />
            <div className="space-y-2 text-[color:var(--foreground)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Storyteller</p>
              <h1 className="text-3xl font-semibold md:text-4xl">{profile.name}</h1>
              <p className="text-sm text-muted">{profile.headline}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-subtle bg-soft px-6 py-4 text-sm text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <p className="text-xs uppercase tracking-[0.18em]">Contact</p>
            <a href={`mailto:${profile.email}`} className="accent-link mt-2 inline-flex text-sm font-medium">
              {profile.email}
            </a>
          </div>
        </div>
      </header>

  <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.7fr_1fr]">
	<article className="narra-card narra-card--compact">
          <h2 className="narra-card__heading">About</h2>
          <p className="text-sm leading-relaxed text-muted">{profile.bio}</p>
        </article>
	<aside className="narra-card narra-card--compact text-sm text-muted">
          <h2 className="narra-card__heading">Interview stats</h2>
          <p>{profileInterviews.length} published interviews</p>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Tags represented</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(profileInterviews.flatMap((interview) => interview.tags))).map((tag) => (
                <span key={tag} className="narra-card__chip">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

  <section className="mx-auto max-w-6xl space-y-5">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Stories by {profile.name.split(' ')[0]}</h2>
            <p className="text-sm text-muted">
              These interviews appear from Supabase once connected. Until then, sample stories help illustrate the layout.
            </p>
          </div>
        </header>
        {profileInterviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profileInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-subtle bg-soft p-6 text-sm text-muted">
            No stories published yet. Upload an interview to populate this section.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-dashed border-subtle bg-soft p-6 text-sm text-muted">
        Profiles automatically surface the narrator&apos;s interviews and metadata from Supabase once connected.
      </section>
    </PageTransition>
  );
};

export default ProfilePage;