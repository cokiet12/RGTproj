class BooksService {
    private books = [
        { id: '1', title: '해리포터와 마법사의 돌', author: '조앤 K. 롤링', quantity: 10 },
        { id: '2', title: '삼국지', author: '나관중', quantity: 5 },
        { id: '3', title: '토지', author: '박경리', quantity: 8 },
        { id: '4', title: '태백산맥', author: '조정래', quantity: 12 },
        { id: '5', title: '난장이가 쏘아올린 작은 공', author: '조세희', quantity: 7 },
        { id: '6', title: '무진기행', author: '김승옥', quantity: 15 },
        { id: '7', title: '칼의 노래', author: '김훈', quantity: 9 },
        { id: '8', title: '아리랑', author: '조정래', quantity: 6 },
        { id: '9', title: '우리들의 일그러진 영웅', author: '이문열', quantity: 11 },
        { id: '10', title: '소나기', author: '황순원', quantity: 4 },
        { id: '11', title: '모순', author: '양귀자', quantity: 13 },
        { id: '12', title: '가시고기', author: '조창인', quantity: 8 },
        { id: '13', title: '데미안', author: '헤르만 헤세', quantity: 10 },
        { id: '14', title: '나의 라임 오렌지나무', author: '호세 마우로', quantity: 7 },
        { id: '15', title: '참을 수 없는 존재의 가벼움', author: '밀란 쿤데라', quantity: 5 },
        { id: '16', title: '채식주의자', author: '한강', quantity: 14 },
        { id: '17', title: '82년생 김지영', author: '조남주', quantity: 6 },
        { id: '18', title: '바람과 함께 사라지다', author: '마거릿 미첼', quantity: 9 },
        { id: '19', title: '파리대왕', author: '윌리엄 골딩', quantity: 8 },
        { id: '20', title: '그 많던 싱아는 누가 다 먹었을까', author: '박완서', quantity: 10 },
        { id: '21', title: '빙점', author: '미우라 아야코', quantity: 7 },
        { id: '22', title: '자전거 도둑', author: '박완서', quantity: 6 },
        { id: '23', title: '난중일기', author: '이순신', quantity: 12 },
        { id: '24', title: '동백꽃', author: '김유정', quantity: 8 },
        { id: '25', title: '별을 스치는 바람', author: '이정명', quantity: 9 },
        { id: '26', title: '정글만리', author: '조정래', quantity: 11 },
        { id: '27', title: '사랑손님과 어머니', author: '주요섭', quantity: 5 },
        { id: '28', title: '운수 좋은 날', author: '현진건', quantity: 7 },
        { id: '29', title: '메밀꽃 필 무렵', author: '이효석', quantity: 6 },
        { id: '30', title: '광장', author: '최인훈', quantity: 10 },
    ];

    async getAllBooks() {
        return this.books;
    }

    async getBookById(id: string) {
        return this.books.find((book) => book.id === id) || null;
    }

    async addBook(newBook: { id: string; title: string; author: string; quantity: number }) {
        this.books.push(newBook);
        return newBook;
    }

    async updateBook(id: string, updatedBook: { title?: string; author?: string; quantity?: number }) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return null;

        this.books[bookIndex] = { ...this.books[bookIndex], ...updatedBook };
        return this.books[bookIndex];
    }

    async deleteBook(id: string) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return false;

        this.books.splice(bookIndex, 1);
        return true;
    }
}

export default BooksService;