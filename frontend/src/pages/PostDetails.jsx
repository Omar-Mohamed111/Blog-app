import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as postService from "../services/postService";
import * as commentService from "../services/commentService";
import CommentItem from "../components/CommentItem";
import Avatar from "../components/Avatar";

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addComment, setAddComment] = useState(false);
  const [error, setError] = useState("false");

  useEffect(() => {
    postService
      .getPostById(id)
      .then((data) => setPost(data.post))
      .catch((err) => setError(err.message));

    commentService
      .getCommentsByPostId(id)
      .then((data) => setComments(data.comments))
      .catch(() => {
        // If comments can't load, the post itself can still be shown.
      });
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setError("");
    setAddComment(true)
    try {
      const data = await commentService.createComment(id, newComment);
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    } catch (err) {
      setError(err.message);
    }finally{
      setAddComment(false)

    }
  };

  const handleDeletePost = async () => {
    setError("");
    const confirmed =   confirm("Are you sure you want to delete this post?");
    if(!confirmed) {
      return
    }
    try {
      await postService.deletePost(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error && !post) return <p className="error">{error}</p>;
  if (!post) return <p className="loading-state">Loading...</p>;

  const isOwner = user && Number(user.userId) === Number(post.user_id);
  const authorName = `${post.first_name} ${post.last_name}`;

  return (
    <div>
      <article className="post-detail">
        <div className="post-card-header">
          <Avatar name={authorName} size="md" />
          <span className="post-author-name">{authorName}</span>
        </div>

        <h2 className="post-detail-title">{post.title}</h2>
        <p className="post-detail-body">{post.content}</p>

        {isOwner && (
          <div className="post-actions">
            <Link to={`/edit-post/${post.id}`} className="btn btn-secondary btn-sm">
              Edit Post
            </Link>
            <button onClick={handleDeletePost} className="btn btn-danger btn-sm">
              Delete Post
            </button>
          </div>
        )}
      </article>

      <section className="comments-section">
        <h3>Comments</h3>

        {user && (
          <form onSubmit={handleAddComment} className="comment-composer">
            <Avatar name="" size="sm" />
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button disabled={addComment} type="submit" className="btn btn-primary">
              { addComment ? "Posting ..." : "Post"}
            </button>
          </form>
        )}

        {error && <p className="error">{error}</p>}

        {comments.length === 0 ? (
          <p className="empty-state">No comments yet.</p>
        ) : (
          <div className="comment-list">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpdated={(updated) =>
                  setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
                }
                onDeleted={(deletedId) =>
                  setComments((prev) => prev.filter((c) => c.id !== deletedId))
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
