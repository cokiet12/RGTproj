import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './AddBookForm.module.css'; // 스타일 추가

const AddBookForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ title: '', author: '', quantity: 0 });
    const [maxId, setMaxId] = useState<number>(0); // 현재 보유한 최대 id

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log('Fetching books to determine max ID...');
                const response = await axios.get('http://localhost:5000/api/books');
                const books = response.data;
                console.log('Books fetched:', books);
                const highestId = books.reduce((max: number, book: { id: number }) => Math.max(max, book.id), 0);
                console.log('Highest ID found:', highestId);
                setMaxId(highestId);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === 'quantity' ? parseInt(value, 10) : value;
        console.log(`Input changed - ${name}:`, updatedValue);
        setFormData({ ...formData, [name]: updatedValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newBook = { id: (maxId + 1).toString(), ...formData }; // id 자동 생성
            await axios.post('http://localhost:5000/api/books', newBook);
            router.push('/');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>책 추가</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="책 제목"
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="저자"
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="수량"
                    required
                    className={styles.input}
                />
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>추가</button>
                    <button type="button" className={styles.backButton} onClick={() => router.push('/')}>이전</button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;
