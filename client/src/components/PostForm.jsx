import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApp } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';


const schema = yup.object({
title: yup.string().required('Title is required'),
content: yup.string().required('Content is required').min(10, 'Too short'),
});


export default function PostForm() {
const { id } = useParams();
const navigate = useNavigate();
const { state, createPost, updatePost } = useApp();


const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });


useEffect(() => {
if (id) {
const existing = state.posts.find(p => p._id === id);
if (existing) reset({ title: existing.title, content: existing.content });
else {
// optionally fetch from API if not in state
}
}
}, [id]);

const onSubmit = async (data) => {
    try {
    if (id) await updatePost(id, data);
    else await createPost(data);
    navigate('/');
    } catch (err) {
    // error handled in context; optionally show toast
    }
    };
    
    
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
    <div>
    <input {...register('title')} placeholder="Title" />
    {errors.title && <p className="text-red-600">{errors.title.message}</p>}
    </div>
    <div>
    <textarea {...register('content')} placeholder="Content" />
    {errors.content && <p className="text-red-600">{errors.content.message}</p>}
    </div>
    <button disabled={isSubmitting}>{id ? 'Update' : 'Create'}</button>
    </form>
    );
}
