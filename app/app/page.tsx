import Link from "next/link"
import InterviewCard from "@/components/interview-card"
import ProfileCard from "@/components/profile-card"
import { Button } from "@/components/ui/button"
import { fetchInterviews } from "@/lib/data/interviews"
import { fetchProfiles } from "@/lib/data/profiles"

type InterviewList = Awaited<ReturnType<typeof fetchInterviews>>
type ProfileList = Awaited<ReturnType<typeof fetchProfiles>>

const getRecentInterviews = (interviews: InterviewList, limit = 6) =>
  interviews
    .slice()
    .sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime())
    .slice(0, limit)

const buildProfileContext = (profiles: ProfileList, interviews: InterviewList) => {
  const interviewLookup = interviews.reduce<Record<string, InterviewList>>((acc, interview) => {
    const key = interview.profileUsername
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(interview)
    return acc
  }, {})

  return profiles.map((profile) => ({
    profile,
    interviews: interviewLookup[profile.username] ?? [],
  }))
}

export default async function Home() {
  const [interviews, profiles] = await Promise.all([fetchInterviews(), fetchProfiles()])

  const profileContexts = buildProfileContext(profiles, interviews)
  const featuredProfiles = profileContexts.slice(0, 4)
  const recentInterviews = getRecentInterviews(interviews)
  const profileLookup = new Map(profileContexts.map(({ profile, interviews: items }) => [profile.username, { profile, interviews: items }]))
  const locationCount = new Set(interviews.map((item) => item.location?.label).filter(Boolean)).size

  return (
    <div className="bg-background">
      <div className="container mx-auto space-y-16 px-4 py-12 sm:px-6 lg:px-8">
  <section className="mx-auto grid max-w-6xl gap-10 rounded-[32px] border border-border bg-gradient-to-br from-background via-secondary to-background p-10 shadow-[0_35px_80px_-50px_rgba(34,28,22,0.55)] md:grid-cols-[1.2fr_0.8fr] md:p-16">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Oral history archive</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Discover stories that shape our communities and the places they call home.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Narra pairs Supabase with a calm storytelling interface so you can publish interviews, transcripts, and
              mapped memories—no matter where your archive lives today.
            </p>
            <div className="flex flex-col gap-3 text-sm sm:flex-row">
              <Button asChild className="rounded-full px-6">
                <Link href="/upload">Share a story</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/map">Explore the map</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-border bg-background p-8 backdrop-blur">
            <p className="text-sm font-semibold text-foreground">This week in Narra</p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <span>• {interviews.length} interviews in the archive</span>
              <span>• {profiles.length} active contributors</span>
              <span>• Stories spanning {locationCount} locations</span>
            </div>
            <Button asChild variant="ghost" className="w-full justify-start px-0 text-primary">
              <Link href="/interviews">Browse the full archive →</Link>
            </Button>
          </div>
        </section>

  <section className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Latest interviews</p>
              <h2 className="text-2xl font-semibold text-foreground">Freshly recorded stories</h2>
            </div>
            <Button asChild variant="ghost" className="self-start">
              <Link href="/interviews">View all interviews</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recentInterviews.map((interview) => {
              const uploader = profileLookup.get(interview.profileUsername)?.profile
              return (
                <InterviewCard key={interview.id} interview={interview} uploader={uploader} showProfileLink />
              )
            })}
          </div>
        </section>

  <section className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Featured contributors</p>
              <h2 className="text-2xl font-semibold text-foreground">Voices preserving community memory</h2>
            </div>
            <Button asChild variant="ghost" className="self-start">
              <Link href="/profile/jane-doe">Meet our narrators</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProfiles.map(({ profile, interviews: profileInterviews }) => (
              <ProfileCard key={profile.username} profile={profile} interviews={profileInterviews} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
