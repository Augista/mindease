"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoodChart } from "@/components/mood-chart"

export function InsightsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">Visualize your emotional patterns and track your progress.</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Mood Patterns</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="mood" className="mt-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
                <CardDescription>How your moods have been distributed over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <MoodChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Most Common Mood</CardTitle>
                  <CardDescription>Your predominant emotional state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">😌</span>
                    <div>
                      <p className="font-medium">Calm</p>
                      <p className="text-sm text-muted-foreground">42% of the time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mood Variability</CardTitle>
                  <CardDescription>How much your mood fluctuates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Moderate</p>
                    <p className="text-sm text-muted-foreground">
                      Your mood shows healthy variation without extreme swings
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity Impact</CardTitle>
                <CardDescription>How different activities affect your mood</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    Activity tracking data will appear here as you log more entries
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-2">
            <Card>
              <CardHeader>
                <CardTitle>Mindfulness Progress</CardTitle>
                <CardDescription>Your mindfulness practice over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    Progress tracking data will appear here as you complete more exercises
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
