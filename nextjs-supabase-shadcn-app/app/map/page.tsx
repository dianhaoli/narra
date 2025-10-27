import MapView from '../../components/map-view';
import PageTransition from '../../components/page-transition';
import { fetchInterviews } from '../../lib/data/interviews';

const MapPage = async () => {
    const interviews = await fetchInterviews();

    return (
        <PageTransition className="space-y-8">
            <header className="mx-auto max-w-6xl rounded-[28px] border border-subtle bg-surface p-8 shadow-[0_30px_68px_-44px_rgba(36,30,26,0.5)] md:flex md:items-center md:justify-between md:gap-8 md:p-10">
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore stories on the map</p>
                    <h1 className="text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">Where these histories took place</h1>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                        Each pin represents an interview location. Click a marker to preview the narrator, tags, and recording, then
                        jump into the full story.
                    </p>
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted md:mt-0">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]"></span>
                    Live map preview using sample data
                </div>
            </header>

            <section className="mx-auto min-h-[70vh] max-w-6xl rounded-[32px] border border-subtle bg-surface-solid p-4 shadow-[0_32px_70px_-46px_rgba(36,30,26,0.5)] md:p-6">
                <div className="flex h-full flex-col gap-6 xl:flex-row">
                    <aside className="flex w-full flex-col gap-4 rounded-3xl border border-subtle bg-soft p-5 text-sm text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] xl:max-w-sm xl:overflow-hidden">
                        <h2 className="text-base font-semibold text-[color:var(--foreground)]">Story highlights</h2>
                        <p className="text-xs leading-relaxed">
                            Scroll to view a quick snapshot of each interview and select a story to open the full detail page.
                        </p>
                        <div className="max-h-[260px] space-y-4 overflow-y-auto pr-1">
                            {interviews.map((interview) => (
                                <a
                                    key={interview.id}
                                    href={`/interviews/${interview.id}`}
                                    className="block rounded-2xl border border-transparent bg-white/40 p-4 text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:bg-accent-soft"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{interview.location.label}</p>
                                    <p className="mt-2 text-sm font-semibold">{interview.title}</p>
                                    <p className="mt-1 text-xs text-muted">{new Date(interview.scheduledFor).toLocaleDateString()}</p>
                                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-[color:var(--accent)]">
                                        {interview.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="rounded-full bg-accent-soft px-2 py-1">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </aside>

                    <div className="flex-1">
                        <MapView interviews={interviews} className="h-full" />
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default MapPage;