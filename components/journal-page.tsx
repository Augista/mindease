"use client"

import { useState } from "react"
import { Calendar, Mic, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JournalEntry } from "@/components/journal-entry"

export function JournalPage() {
  const { toast } = useToast()
  const [journalText, setJournalText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [entries, setEntries] = useState([
    {
      id: "1",
      date: "2023-04-24",
      title: "A productive day",
      content: "Today was quite productive. I managed to complete most of my tasks and felt accomplished.",
      mood: "Happy",
    },
    {
      id: "2",
      date: "2023-04-23",
      title: "Feeling stressed",
      content: "I'm feeling overwhelmed with assignments and deadlines. Need to practice some breathing exercises.",
      mood: "Anxious",
    },
  ])

  const handleSaveJournal = () => {
    if (!journalText.trim()) {
      toast({
        title: "Journal entry is empty",
        description: "Please write something before saving.",
        variant: "destructive",
      })
      return
    }

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      title: "New Entry",
      content: journalText,
      mood: "Neutral",
    }

    setEntries([newEntry, ...entries])
    setJournalText("")

    toast({
      title: "Journal entry saved!",
      description: "Your thoughts have been recorded successfully.",
    })
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      toast({
        title: "Voice recording started",
        description: "Speak clearly. Recording will automatically stop after 60 seconds.",
      })
    } else {
      toast({
        title: "Voice recording stopped",
        description: "Your recording has been processed.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Journal</h1>
        <p className="text-muted-foreground">Record your thoughts, feelings, and experiences.</p>
      </div>

      <Tabs defaultValue="write">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write Journal</TabsTrigger>
          <TabsTrigger value="history">Journal History</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>Write freely about your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
              </div>
              <Textarea
                placeholder="How are you feeling today? What's on your mind?"
                className="min-h-[200px]"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className={isRecording ? "text-red-500 animate-pulse" : ""}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
                <span className="sr-only">{isRecording ? "Stop recording" : "Start voice recording"}</span>
              </Button>
              <Button onClick={handleSaveJournal}>
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="space-y-4">
            {entries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
