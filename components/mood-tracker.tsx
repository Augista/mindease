"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void
}

export function MoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-green-100 dark:bg-green-900" },
    { emoji: "😌", label: "Calm", color: "bg-blue-100 dark:bg-blue-900" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-100 dark:bg-gray-800" },
    { emoji: "😔", label: "Sad", color: "bg-indigo-100 dark:bg-indigo-900" },
    { emoji: "😠", label: "Angry", color: "bg-red-100 dark:bg-red-900" },
    { emoji: "😰", label: "Anxious", color: "bg-yellow-100 dark:bg-yellow-900" },
    { emoji: "😴", label: "Tired", color: "bg-purple-100 dark:bg-purple-900" },
    { emoji: "🤔", label: "Confused", color: "bg-orange-100 dark:bg-orange-900" },
  ]

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood)
    onMoodSelect(mood)
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {moods.map((mood) => (
        <Card
          key={mood.label}
          className={cn(
            "cursor-pointer transition-all hover:scale-105",
            selectedMood === mood.label ? "ring-2 ring-primary" : "",
          )}
          onClick={() => handleMoodClick(mood.label)}
        >
          <CardContent className={cn("flex flex-col items-center justify-center p-3", mood.color)}>
            <span className="text-3xl" role="img" aria-label={mood.label}>
              {mood.emoji}
            </span>
            <span className="mt-1 text-xs font-medium">{mood.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
