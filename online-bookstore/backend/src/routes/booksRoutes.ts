import express from 'express';
import BooksController from '../controllers/booksController';
import BooksService from '../services/booksService';

const router = express.Router();
const booksService = new BooksService();
const booksController = new BooksController(booksService); 

// Routes
router.get('/', (req, res) => booksController.getAllBooks(req, res));
router.get('/:id', (req, res) => booksController.getBookById(req, res));
router.post('/', (req, res) => booksController.addBook(req, res));
router.put('/:id', (req, res) => booksController.updateBook(req, res));
router.delete('/:id', (req, res) => booksController.deleteBook(req, res));

export default router;