export const dynamic = 'force-dynamic'
import InterviewCard from '../../components/interview-card';
import PageTransition from '../../components/page-transition';
import { fetchInterviews } from '../../lib/data/interviews';

const InterviewsPage = async () => {
  const interviews = await fetchInterviews();

  return (
    <PageTransition className="space-y-10">
  <header className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-subtle bg-[linear-gradient(140deg,_rgba(255,253,247,0.92),_rgba(229,213,195,0.7)_60%,_rgba(193,221,220,0.45)_100%)] p-8 shadow-[0_30px_68px_-44px_rgba(36,30,26,0.5)] md:p-12">
        <div className="space-y-3 text-[color:var(--foreground)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Interviews</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Browse the Narra archive</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            These interviews load from Supabase when credentials are configured. Until then, the archive previews our
            sample stories, maps, and transcripts so you can shape the experience.
          </p>
        </div>
      </header>

  <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[color:var(--accent-strong)]">Featured</span>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[color:var(--accent-strong)]">Community</span>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[color:var(--accent-strong)]">2020s</span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} showProfileLink />
          ))}
        </div>
      </div>

  <footer className="mx-auto max-w-6xl rounded-3xl border border-dashed border-subtle bg-soft p-6 text-sm leading-relaxed text-muted">
        Ready to connect your own database? Add Supabase credentials to
        <code className="mx-1 rounded bg-accent-soft px-1 py-0.5">.env.local</code>
        and Narra will query your live tables for narrators, interviews, and media.
      </footer>
    </PageTransition>
  );
};

export default InterviewsPage;
