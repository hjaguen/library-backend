import express from 'express';
import { getAllCheckouts, createCheckout, returnBook } from '../controllers/checkoutController';

const router = express.Router();

router.get('/', getAllCheckouts);
router.post('/', createCheckout);
router.post('/:id/return', returnBook);

export default router;
