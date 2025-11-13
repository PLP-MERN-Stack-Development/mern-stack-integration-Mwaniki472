import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { api } from '../lib/api';


const initialState = {
posts: [],
categories: [],
loading: false,
error: null,
};


function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts], loading: false };
    case 'UPDATE_POST':
      return { ...state, posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p), loading: false };
    case 'REMOVE_POST':
      return { ...state, posts: state.posts.filter(p => p._id !== action.payload), loading: false };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
    default:
      return state;
  }
}

const AppContext = createContext();


export function AppProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initialState);


// load initial data
useEffect(() => {
let mounted = true;
(async () => {
dispatch({ type: 'LOADING' });
try {
const [posts, categories] = await Promise.all([api.get('/posts'), api.get('/categories')]);
if (!mounted) return;
dispatch({ type: 'SET_POSTS', payload: posts });
dispatch({ type: 'SET_CATEGORIES', payload: categories });
} catch (err) {
if (!mounted) return;
dispatch({ type: 'ERROR', payload: err.message });
}
})();
return () => (mounted = false);
}, []);

// action helpers with optimistic updates
const createPost = async (post) => {
    // optimistic: create temp id and add immediately
    const tempId = `temp-${Date.now()}`;
    const optimisticPost = { ...post, _id: tempId, createdAt: new Date().toISOString() };
    dispatch({ type: 'ADD_POST', payload: optimisticPost });
    
    
    try {
    const saved = await api.post('/posts', post);
    // replace temp post with saved
    dispatch({ type: 'UPDATE_POST', payload: saved });
    return saved;
    } catch (err) {
    // rollback
    dispatch({ type: 'REMOVE_POST', payload: tempId });
    dispatch({ type: 'ERROR', payload: err.message });
    throw err;
    }
    };

    const updatePost = async (id, data) => {
        // optimistic: snapshot and update
        const before = state.posts.find(p => p._id === id);
        const optimistic = { ...before, ...data };
        dispatch({ type: 'UPDATE_POST', payload: optimistic });
        
        
        try {
        const updated = await api.put(`/posts/${id}`, data);
        dispatch({ type: 'UPDATE_POST', payload: updated });
        return updated;
        } catch (err) {
        // rollback
        dispatch({ type: 'UPDATE_POST', payload: before });
        dispatch({ type: 'ERROR', payload: err.message });
        throw err;
        }
        };
        
        
        const deletePost = async (id) => {
        // optimistic remove
        const before = state.posts;
        dispatch({ type: 'REMOVE_POST', payload: id });
        
        
        try {
        await api.del(`/posts/${id}`);
        } catch (err) {
        // rollback
        dispatch({ type: 'SET_POSTS', payload: before });
        dispatch({ type: 'ERROR', payload: err.message });
        throw err;
        }
        };

        return (
            <AppContext.Provider value={{ state, dispatch, createPost, updatePost, deletePost }}>
            {children}
            </AppContext.Provider>
            );
            }
            
            
export const useApp = () => useContext(AppContext);