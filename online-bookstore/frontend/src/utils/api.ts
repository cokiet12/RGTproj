import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchBooks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching books: ' + error.message);
        } else {
            throw new Error('Error fetching books: An unknown error occurred');
        }
    }
};

export const fetchBookById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching book: ' + error.message);
        } else {
            throw new Error('Error fetching book: An unknown error occurred');
        }
    }
};

export const addBook = async (bookData: { title: string; author: string; quantity: number }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/books`, bookData);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error adding book: ' + error.message);
        } else {
            throw new Error('Error adding book: An unknown error occurred');
        }
    }
};

export const updateBook = async (id: string, bookData: { title?: string; author?: string; quantity?: number }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error updating book: ' + error.message);
        } else {
            throw new Error('Error updating book: An unknown error occurred');
        }
    }
};

export const deleteBook = async (id: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/books/${id}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting book: ' + error.message);
        } else {
            throw new Error('Error deleting book: An unknown error occurred');
        }
    }
};