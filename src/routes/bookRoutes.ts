import express from 'express';
import { getAllBooks, addBook, updateBookAvailability } from '../controllers/bookController';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.put('/:id/availability', updateBookAvailability);

export default router;
