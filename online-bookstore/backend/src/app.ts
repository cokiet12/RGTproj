// filepath: c:\Users\liket\Desktop\알지티과제\online-bookstore\backend\src\app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // CORS 추가
import booksRoutes from './routes/booksRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // CORS 활성화
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/books', booksRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;