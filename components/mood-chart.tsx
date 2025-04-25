"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface MoodChartProps {
  timeRange: string
}

export function MoodChart({ timeRange }: MoodChartProps) {
  // Sample data - in a real app, this would come from your database
  const weekData = [
    { name: "Mon", Happy: 4, Calm: 3, Neutral: 2, Sad: 1, Anxious: 2 },
    { name: "Tue", Happy: 3, Calm: 4, Neutral: 1, Sad: 0, Anxious: 1 },
    { name: "Wed", Happy: 2, Calm: 3, Neutral: 3, Sad: 2, Anxious: 3 },
    { name: "Thu", Happy: 3, Calm: 5, Neutral: 2, Sad: 0, Anxious: 0 },
    { name: "Fri", Happy: 5, Calm: 3, Neutral: 1, Sad: 0, Anxious: 1 },
    { name: "Sat", Happy: 4, Calm: 4, Neutral: 2, Sad: 0, Anxious: 0 },
    { name: "Sun", Happy: 3, Calm: 5, Neutral: 1, Sad: 0, Anxious: 0 },
  ]

  const monthData = [
    { name: "Week 1", Happy: 15, Calm: 20, Neutral: 10, Sad: 5, Anxious: 8 },
    { name: "Week 2", Happy: 18, Calm: 22, Neutral: 8, Sad: 3, Anxious: 5 },
    { name: "Week 3", Happy: 20, Calm: 18, Neutral: 12, Sad: 2, Anxious: 4 },
    { name: "Week 4", Happy: 22, Calm: 25, Neutral: 5, Sad: 1, Anxious: 3 },
  ]

  const yearData = [
    { name: "Jan", Happy: 60, Calm: 70, Neutral: 40, Sad: 20, Anxious: 30 },
    { name: "Feb", Happy: 65, Calm: 75, Neutral: 35, Sad: 15, Anxious: 25 },
    { name: "Mar", Happy: 70, Calm: 65, Neutral: 45, Sad: 10, Anxious: 20 },
    { name: "Apr", Happy: 75, Calm: 80, Neutral: 30, Sad: 5, Anxious: 15 },
  ]

  const getData = () => {
    switch (timeRange) {
      case "week":
        return weekData
      case "month":
        return monthData
      case "year":
        return yearData
      default:
        return weekData
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={getData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Happy" fill="#4ade80" name="Happy" />
        <Bar dataKey="Calm" fill="#60a5fa" name="Calm" />
        <Bar dataKey="Neutral" fill="#94a3b8" name="Neutral" />
        <Bar dataKey="Sad" fill="#818cf8" name="Sad" />
        <Bar dataKey="Anxious" fill="#facc15" name="Anxious" />
      </BarChart>
    </ResponsiveContainer>
  )
}
