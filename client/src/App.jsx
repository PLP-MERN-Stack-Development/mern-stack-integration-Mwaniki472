import React, { useState, useEffect } from "react";
import { fetchPosts, createPost } from "./lib/api";
import NoteCard from "./components/NoteCard";
import Input from "./components/ui/input";
import Textarea from "./components/ui/textarea";
import Button from "./components/ui/button";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    (async () => {
      const data = await fetchNotes();
      setNotes(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = await createNote(form);
    setNotes((prev) => [...prev, newNote]);
    setForm({ title: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Notes App</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6 space-y-3">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Button type="submit">Add Note</Button>
      </form>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};



export default App;
