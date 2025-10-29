import Link from "next/link"
import { Calendar, FileAudio, MapPin, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SampleInterview, SampleProfile } from "@/data/mockData"

type ProfileCardProps = {
  profile: SampleProfile
  interviews?: SampleInterview[]
  featuredTags?: string[]
  joinedLabel?: string
  className?: string
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase())
    .join("") || "N"

const extractLocation = (headline: string) => {
  if (!headline) {
    return "Location pending"
  }

  const parts = headline.split("·").map((item) => item.trim())
  return parts.length > 1 ? parts[parts.length - 1] : headline
}

const ProfileCard = ({ profile, interviews = [], featuredTags, joinedLabel, className }: ProfileCardProps) => {
  const interviewCount = profile.interviews?.length ?? 0
  const location = extractLocation(profile.headline)

  const computedTags = featuredTags
    ? featuredTags
    : Array.from(
        new Set(
          interviews
            .flatMap((interview) => interview.tags ?? [])
            .filter(Boolean)
            .slice(0, 6),
        ),
      )

  const firstInterviewDate = (() => {
    if (joinedLabel) return joinedLabel
    if (interviews.length === 0) return "Active contributor"
    const earliest = interviews
      .map((item) => new Date(item.scheduledFor))
      .filter((date) => !Number.isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime())[0]
    if (!earliest) return "Active contributor"
    return new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(earliest)
  })()

  return (
    <Card className={cn("group overflow-hidden transition-all shadow-md shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1", className)}>
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-border group-hover:ring-primary/50 transition-all shadow-lg shadow-black/10">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            ) : (
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {getInitials(profile.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-balance transition-colors group-hover:text-primary">
              {profile.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{profile.bio}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 shadow-sm shadow-black/5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileAudio className="h-4 w-4" />
              <span className="text-xs font-medium">Interviews</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{interviewCount}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Member since</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{firstInterviewDate}</p>
          </div>
        </div>

        {computedTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Story themes</p>
            <div className="flex flex-wrap gap-1.5">
              {computedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

  <CardFooter className="border-t border-border pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/profile/${profile.username}`} className="inline-flex items-center justify-center gap-1">
            View profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProfileCard
