import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../lib/useApi";
import React from "react";
import { useApp } from "../context/AppContext";


export default function PostList() {
  const { get } = useApi();
  const { state } = useApp();
  const { posts, loading, error } = state;

  useEffect(() => {
    get("/posts").then(loading, error).catch(console.error);
  }, []);
    if (loading) return <p>Loading posts...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={p._id} className="border p-4 rounded">
          <h3>{p.title}</h3>
          <p>{p.content?.slice(0, 120)}</p>
          <Link to={`/posts/${p._id}`}>Read</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
