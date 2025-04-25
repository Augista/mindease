"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, ChevronRight, Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoodTracker } from "@/components/mood-tracker"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  const { toast } = useToast()
  const [streak, setStreak] = useState(3)
  const [progress, setProgress] = useState(60)

  const handleMoodSelect = (mood: string) => {
    toast({
      title: "Mood tracked!",
      description: `You're feeling ${mood} today. Thanks for sharing.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">Track your mood, journal your thoughts, and practice mindfulness.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daily Streak</CardTitle>
            <CardDescription>Keep up the good work!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">{streak} days</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStreak(streak + 1)}>
                Check in
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Mindfulness Progress</CardTitle>
            <CardDescription>This week's practice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">60% complete</span>
              <span className="text-sm text-muted-foreground">30/50 minutes</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Next Session</CardTitle>
            <CardDescription>Scheduled mindfulness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Today</span>
              <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">7:00 PM</span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium">Evening Relaxation</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">How are you feeling today?</h2>
        <MoodTracker onMoodSelect={handleMoodSelect} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Journal</CardTitle>
            <CardDescription>Record your thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Take a moment to reflect on your day and write down your thoughts.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/journal" passHref>
              <Button className="w-full gap-1">
                Open Journal <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mindfulness Exercises</CardTitle>
            <CardDescription>Practice being present</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Choose from guided breathing, meditation, or other mindfulness exercises.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/mindfulness" passHref>
              <Button className="w-full gap-1">
                Start Exercise <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Weekly Mood Insights</CardTitle>
              <CardDescription>Your emotional patterns</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[120px] w-full rounded-md bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Mood visualization will appear here</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/insights" passHref>
              <Button variant="outline" className="w-full gap-1">
                View Detailed Insights <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
