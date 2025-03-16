class BooksController {
    constructor(private booksService: any) {}

    async getAllBooks(req: any, res: any) {
        try {
            const books = await this.booksService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving books' });
        }
    }

    async getBookById(req: any, res: any) {
        const { id } = req.params;
        try {
            const book = await this.booksService.getBookById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving book' });
        }
    }

    async addBook(req: any, res: any) {
        const newBook = req.body;
        try {
            const createdBook = await this.booksService.addBook(newBook);
            res.status(201).json(createdBook);
        } catch (error) {
            res.status(500).json({ message: 'Error adding book' });
        }
    }

    async updateBook(req: any, res: any) {
        const { id } = req.params;
        const updatedBook = req.body;
        try {
            const result = await this.booksService.updateBook(id, updatedBook);
            if (result) {
                res.status(200).json({ message: 'Book updated successfully' });
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating book' });
        }
    }

    async deleteBook(req: any, res: any) {
        const { id } = req.params;
        try {
            const result = await this.booksService.deleteBook(id);
            if (result) {
                res.status(200).json({ message: 'Book deleted successfully' });
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book' });
        }
    }
}

export default BooksController;