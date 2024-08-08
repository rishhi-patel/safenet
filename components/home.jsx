"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Home() {
  const token = localStorage.getItem("token")
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPosts(data)
    } catch (error) {
      if (error?.response && error.response.status === 401) {
        router.push("/login")
      }
      console.error("Failed to fetch posts", error)
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    fetchPosts()
  }, [router])

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    try {
      const { data } = await axios.post(
        "/api/posts",
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      fetchPosts()
      setNewPost("")
    } catch (error) {
      console.error("Failed to post", error)
    }
  }

  function formatDate(isoString) {
    const date = new Date(isoString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-4)

    return `${day}/${month}/${year}`
  }
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-4 py-3 bg-card shadow">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold">SafeNet</span>
        </Link>
        <form>
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </form>
      </header>
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="bg-card p-4">
            <form
              className="flex items-start gap-4"
              onSubmit={handlePostSubmit}
            >
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                className="flex-1 resize-none rounded-lg bg-muted px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={2}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                required
              />
              <Button type="submit" className="shrink-0">
                Post
              </Button>
            </form>
          </Card>
          {posts.map((post) => (
            <div key={post.id}>
              <Card className="bg-card p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="User Avatar"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{post?.User.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(post?.createdAt)}
                      </div>
                    </div>
                    {post.content}
                    <div className="mt-2 flex items-center gap-4">
                      <Button variant="ghost" size="icon">
                        <HeartIcon className="w-5 h-5" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageCircleIcon className="w-5 h-5" />
                        <span className="sr-only">Comment</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ShareIcon className="w-5 h-5" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
