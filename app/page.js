"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts")
      setPosts(data)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn")
    if (!loggedIn) {
      router.push("/login")
    }
  }, [router])

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    try {
      const userId = localStorage.getItem("userId")
      const { data } = await axios.post("/api/posts", {
        content: newPost,
        userId,
      })
      setPosts([data, ...posts])
      setNewPost("")
    } catch (error) {
      console.error("Failed to post", error)
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  )
}
