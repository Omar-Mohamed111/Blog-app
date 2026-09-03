import { Link } from "react-router-dom";
import Avatar from "./Avatar";

// post fields come straight from posts.repository.js's JOIN query:
// id, title, content, user_id, first_name, last_name
export default function PostCard({ post }) {
  const preview =
    post.content.length > 150 ? post.content.slice(0, 150) + "..." : post.content;

  const authorName = `${post.first_name} ${post.last_name}`;

  return (
    <article className="post-card">
      <div className="post-card-header">
        <Avatar name={authorName} size="md" />
        <span className="post-author-name">{authorName}</span>
      </div>

      <h3>{post.title}</h3>
      <p className="post-preview">{preview}</p>

      <div className="post-card-footer">
        <Link to={`/posts/${post.id}`} className="read-more">
          Read more
        </Link>
      </div>
    </article>
  );
}
