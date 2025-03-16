import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용
import axios from 'axios';

const BookDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // useParams 대신 useRouter로 변경
    const [book, setBook] = useState<{ title: string; author: string; description: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!book) {
        return <p>책 정보를 불러올 수 없습니다.</p>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>{book.description}</p>
        </div>
    );
};

export default BookDetail;