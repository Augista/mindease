import { Calendar, Edit, Trash } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JournalEntryProps {
  entry: {
    id: string
    date: string
    title: string
    content: string
    mood: string
  }
}

export function JournalEntry({ entry }: JournalEntryProps) {
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-800 dark:text-green-100"
      case "Calm":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-800 dark:text-blue-100"
      case "Anxious":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-800 dark:text-yellow-100"
      case "Sad":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80 dark:bg-indigo-800 dark:text-indigo-100"
      case "Angry":
        return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{entry.title}</CardTitle>
          <Badge className={getMoodColor(entry.mood)} variant="outline">
            {entry.mood}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(entry.date)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm whitespace-pre-line">{entry.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-3.5 w-3.5" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-destructive">
          <Trash className="mr-2 h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
