import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postService from "../services/postService";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await postService.createPost(title, content);
      navigate(`/posts/${data.post.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="field">
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Publish Post
        </button>
      </form>
    </div>
  );
}
