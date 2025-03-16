import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { fetchBooks } from '../utils/api';
import Link from 'next/link';
import styles from './Home.module.css'; // 스타일 추가

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const highlightText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className={styles.highlight}>{part}</span> : part
        );
    };

    if (loading) return <div className={styles.loading}>로딩 중...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>온라인 서점</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="책 제목 또는 저자 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Link href="/add-book">
                    <button className={styles.addButton}>책 추가</button>
                </Link>
            </div>
            <BookList books={currentBooks} searchTerm={searchTerm} /> {/* searchTerm 전달 */}
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredBooks.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.activeButton : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
