import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as commentService from "../services/commentService";
import Avatar from "./Avatar";

export default function CommentItem({ comment, onUpdated, onDeleted }) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState("");

  // The backend enforces this too (403 Forbidden), this is just to
  // hide buttons that would fail anyway.
  const isOwner = user && Number(user.userId) === Number(comment.user_id);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await commentService.updateComment(comment.id, content);
      onUpdated(data.comment);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    setError("");
    try {
      await commentService.deleteComment(comment.id);
      onDeleted(comment.id);
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    return (
      <div className="comment">
        {/* comments.repository.js does not join the users table, so we
            don't have the commenter's name here - only a generic avatar. */}
        <Avatar name="" size="sm" />
        <div className="comment-body">
          <form onSubmit={handleUpdate} className="comment-edit-form">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <div className="comment-edit-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="comment">
      <Avatar name="" size="sm" />
      <div className="comment-body">
        <p className="comment-content">{comment.content}</p>
        {isOwner && (
          <div className="comment-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="delete-link">
              Delete
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
