import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as postService from "../services/postService";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getPostById(id)
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await postService.updatePost(id, title, content);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading-state">Loading...</p>;

  return (
    <div className="form-page">
      <h2>Edit Post</h2>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
