import { Home } from "@/components/home"

export default function HomeMain() {
  return (
    <>
      <Home />
      <form onSubmit={handlePostSubmit}>
        <textarea />
        <button type="submit">Post</button>
      </form>
    </>
  )
}
