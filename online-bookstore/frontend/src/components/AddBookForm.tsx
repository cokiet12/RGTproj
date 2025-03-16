import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/books', {
                title,
                author,
                quantity,
            });
            console.log('Book added:', response.data);
            // Reset form fields
            setTitle('');
            setAuthor('');
            setQuantity(1);
        } catch (err) {
            setError('Failed to add book. Please try again.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;