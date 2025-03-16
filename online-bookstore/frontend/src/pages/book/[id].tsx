import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './BookDetail.module.css'; // 경로 확인 및 수정

const BookDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState<{ title: string; author: string; quantity: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ title: '', author: '', quantity: 0 });

    useEffect(() => {
        if (!id) return;

        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(response.data);
                setFormData({
                    title: response.data.title,
                    author: response.data.author,
                    quantity: response.data.quantity,
                });
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'quantity' ? parseInt(value, 10) : value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/books/${id}`, formData);
            setBook({ ...book, ...formData });
            setEditing(false);
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (loading) {
        return <p className={styles.loading}>로딩 중...</p>;
    }

    if (!book) {
        return <p className={styles.error}>책 정보를 불러올 수 없습니다.</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>책 상세 정보</h1>
            {editing ? (
                <div className={styles.editForm}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="책 제목"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="저자"
                        className={styles.input}
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="수량"
                        className={styles.input}
                    />
                    <div className={styles.buttonGroup}>
                        <button onClick={handleSave} className={styles.saveButton}>저장</button>
                        <button onClick={() => setEditing(false)} className={styles.cancelButton}>취소</button>
                    </div>
                </div>
            ) : (
                <div className={styles.details}>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    <h3 className={styles.bookAuthor}>{book.author}</h3>
                    <p className={styles.bookQuantity}>수량: {book.quantity}</p>
                    <div className={styles.buttonGroup}>
                        <button onClick={() => setEditing(true)} className={styles.editButton}>수정</button>
                        <button onClick={() => router.push('/')} className={styles.backButton}>이전</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
