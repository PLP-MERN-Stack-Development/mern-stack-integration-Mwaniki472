const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Fetch all notes (or posts)
export const fetchNotes = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

// Create a new note (or post)
export const createNote = async (noteData) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
};

// Update an existing note (or post)
export const updateNote = async (id, noteData) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  if (!response.ok) throw new Error("Failed to update post");
  return response.json();
};

// Delete a note (or post)
export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete post");
  return true;
};

// User authentication
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Failed to login");
  return response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error("Failed to register");
  return response.json();
};

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// Create a new category
export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error("Failed to create category");
  return response.json();
};

// Update an existing category
export const updateCategory = async (id, categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error("Failed to update category");
  return response.json();
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete category");
  return true;
};

