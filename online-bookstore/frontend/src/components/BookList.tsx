import React from 'react';
import Link from 'next/link';
import styles from './BookList.module.css';

interface Book {
    id: number;
    title: string;
    author: string;
}

interface BookListProps {
    books: Book[];
    searchTerm: string; // 검색어 추가
}

const BookList: React.FC<BookListProps> = ({ books, searchTerm }) => {
    const highlightText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className={styles.highlight}>{part}</span> : part
        );
    };

    return (
        <ul className={styles.bookList}>
            {books.map(book => (
                <li key={book.id} className={styles.bookItem}>
                    <Link href={`/book/${book.id}`} legacyBehavior>
                        <a className={styles.bookLink}>
                            <span className={styles.bookTitle}>
                                {highlightText(book.title, searchTerm)}
                            </span>
                            {' - '}
                            <span className={styles.bookAuthor}>
                                {highlightText(book.author, searchTerm)}
                            </span>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default BookList;