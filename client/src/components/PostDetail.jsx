import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../lib/useApi";

export default function PostDetail() {
  const { id } = useParams();
  const { get, del } = useApi();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    get(`/posts/${id}`).then(setPost).catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      await del(`/posts/${id}`);
      navigate("/");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <div className="flex space-x-4">
        <Link to={`/edit/${id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
        <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
