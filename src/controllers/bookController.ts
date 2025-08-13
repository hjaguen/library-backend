import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Book } from '../models/Book';

const bookRepository = AppDataSource.getRepository(Book);

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookRepository.find();
    console.log('Books from DB:', books); // Debug log
    res.json({ items: books, status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, isbn } = req.body;
    
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = bookRepository.create({
      title,
      author,
      isbn,
      available: true,
    });

    const savedBook = await bookRepository.save(newBook);
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const updateBookAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const book = await bookRepository.findOne({ where: { id } });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.available = available;
    const updatedBook = await bookRepository.save(book);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};
