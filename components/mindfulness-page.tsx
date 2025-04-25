"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, Volume2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MindfulnessPage() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const exercises = [
    {
      id: "breathing",
      title: "Deep Breathing",
      description: "A simple breathing exercise to help you relax and focus.",
      duration: 300, // 5 minutes in seconds
      instructions: [
        "Find a comfortable position",
        "Breathe in deeply through your nose for 4 seconds",
        "Hold your breath for 4 seconds",
        "Exhale slowly through your mouth for 6 seconds",
        "Repeat the cycle",
      ],
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      description: "A meditation to increase awareness of your body and release tension.",
      duration: 600, // 10 minutes in seconds
      instructions: [
        "Lie down in a comfortable position",
        "Close your eyes and focus on your breathing",
        "Bring attention to your feet and slowly move upward",
        "Notice any sensations without judgment",
        "Release tension as you scan each body part",
      ],
    },
    {
      id: "mindful-walking",
      title: "Mindful Walking",
      description: "Practice mindfulness while walking to stay present and grounded.",
      duration: 480, // 8 minutes in seconds
      instructions: [
        "Find a quiet place to walk slowly",
        "Focus on the sensation of each step",
        "Notice the movement of your body",
        "When your mind wanders, gently bring it back",
        "Maintain awareness of your surroundings",
      ],
    },
  ]

  const startExercise = (id: string) => {
    setActiveExercise(id)
    setProgress(0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetExercise = () => {
    setProgress(0)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (isPlaying && activeExercise) {
      const exercise = exercises.find((ex) => ex.id === activeExercise)
      if (!exercise) return

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / exercise.duration
          if (newProgress >= 100) {
            clearInterval(timerRef.current as NodeJS.Timeout)
            setIsPlaying(false)
            return 100
          }
          return newProgress
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, activeExercise, exercises])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getActiveExercise = () => {
    return exercises.find((ex) => ex.id === activeExercise)
  }

  const getCurrentTime = () => {
    const exercise = getActiveExercise()
    if (!exercise) return "0:00"
    return formatTime((progress / 100) * exercise.duration)
  }

  const getTotalTime = () => {
    const exercise = getActiveExercise()
    if (!exercise) return "0:00"
    return formatTime(exercise.duration)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mindfulness Exercises</h1>
        <p className="text-muted-foreground">Practice being present with guided exercises.</p>
      </div>

      <Tabs defaultValue="exercises">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="player" disabled={!activeExercise}>
            Active Exercise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span>Duration:</span>
                    <span>{formatTime(exercise.duration)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => startExercise(exercise.id)}>
                    Start Exercise
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="player" className="mt-4">
          {activeExercise && (
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>{getActiveExercise()?.title}</CardTitle>
                <CardDescription>{getActiveExercise()?.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Instructions:</h3>
                  <ul className="space-y-1 text-sm">
                    {getActiveExercise()?.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{getCurrentTime()}</span>
                    <span>{getTotalTime()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={resetExercise}>
                    <SkipBack className="h-4 w-4" />
                    <span className="sr-only">Reset</span>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 pl-1" />}
                    <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setVolume(value[0])}
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
