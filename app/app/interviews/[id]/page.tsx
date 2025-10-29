import Link from 'next/link';
import PageTransition from '../../../components/page-transition';
import { fetchInterviewById } from '../../../lib/data/interviews';

type InterviewPageProps = {
  params: {
    id: string;
  };
};

const InterviewPage = async ({ params }: InterviewPageProps) => {
  const interviewId = Number(params.id);
  const interview = await fetchInterviewById(interviewId);

  if (!interview) {
    return (
      <PageTransition>
  <div className="mx-auto max-w-6xl rounded-3xl border border-dashed border-subtle bg-soft p-8 text-muted">
          <h1 className="text-xl font-semibold text-[color:var(--foreground)]">Interview not found</h1>
          <p className="mt-2 text-sm">We couldn&apos;t find a story with this id. Try returning to the archive.</p>
          <Link href="/interviews" className="mt-4 inline-flex text-sm font-medium accent-link">
            Back to interviews →
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-10">
      <header className="mx-auto max-w-6xl space-y-4 rounded-[32px] border border-subtle bg-[linear-gradient(120deg,_rgba(255,253,247,0.92),_rgba(216,205,190,0.75)_60%,_rgba(107,185,182,0.28)_100%)] p-10 shadow-[0_36px_78px_-48px_rgba(34,28,22,0.52)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Interview</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold md:text-4xl">{interview.title}</h1>
          <p className="text-sm text-muted">
            {interview.candidateName} · {interview.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[color:var(--accent-strong)]">
            {interview.location.label}
          </span>
          <span>{new Date(interview.scheduledFor).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</span>
        </div>
      </header>

  <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
  <article className="space-y-6 rounded-3xl border border-subtle bg-surface-solid p-8 shadow-[0_30px_65px_-42px_rgba(34,28,22,0.5)]">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Listen</h2>
            <p className="text-sm text-muted">Press play to hear the narrator in their own words.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-subtle bg-soft p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <audio controls src={interview.audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
          <p className="text-xs text-muted">
            Audio is stored in Supabase Storage. Replace the sample URL with the uploaded file when wiring storage.
          </p>
        </article>

  <aside className="flex flex-col gap-5 rounded-3xl border border-subtle bg-surface-solid p-6 text-sm text-muted shadow-[0_26px_55px_-38px_rgba(34,28,24,0.45)]">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-[color:var(--foreground)]">Story metadata</h2>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Tags</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {interview.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-[color:var(--accent-strong)]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Narrator</p>
            <Link className="accent-link text-sm font-medium" href={`/profile/${interview.profileUsername}`}>
              View profile →
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Location</p>
            <p>{interview.location.label}</p>
          </div>
        </aside>
      </section>

  <section className="mx-auto max-w-6xl rounded-3xl border border-subtle bg-surface-solid p-8 shadow-[0_28px_62px_-44px_rgba(34,28,22,0.48)]">
        <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Transcript</h2>
        <div className="mt-4 max-h-[70vh] overflow-y-auto rounded-2xl border border-subtle bg-soft p-6 text-sm leading-relaxed text-[color:var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
          <p className="whitespace-pre-line">{interview.transcript}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-dashed border-subtle bg-soft p-6 text-sm text-muted">
        This page fetches data from Supabase when available. Until then, it uses the sample data defined in
        <code className="mx-1 rounded bg-accent-soft px-1 py-0.5">data/mockData.ts</code>.
      </section>
    </PageTransition>
  );
};

export default InterviewPage;