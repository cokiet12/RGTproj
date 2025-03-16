import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookDetail from '../components/BookDetail';
import { fetchBook } from '../utils/api';

const BookPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const getBook = async () => {
                try {
                    const data = await fetchBook(id);
                    setBook(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            getBook();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {book ? <BookDetail book={book} /> : <div>Book not found</div>}
        </div>
    );
};

export default BookPage;