import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import * as postService from "../services/postService";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="feed-header">
        <h2>Feed</h2>
        <p>Latest posts from everyone</p>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading-state">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="empty-state">No posts yet. Be the first to share something.</p>
      ) : (
        <div className="feed">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
