import { Request, Response } from 'express';
import { Checkout } from '../models/Checkout';

// In-memory storage for checkouts (replace with database in production)
let checkouts: Checkout[] = [];

export const getAllCheckouts = (req: Request, res: Response) => {
  res.json(checkouts);
};

export const createCheckout = (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  
  if (!bookId || !memberId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

  const newCheckout: Checkout = {
    id: Date.now().toString(),
    bookId,
    memberId,
    checkoutDate: new Date().toISOString(),
    dueDate: dueDate.toISOString(),
  };

  checkouts.push(newCheckout);
  res.status(201).json(newCheckout);
};

export const returnBook = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const checkout = checkouts.find(c => c.id === id);
  if (!checkout) {
    return res.status(404).json({ error: 'Checkout not found' });
  }

  if (checkout.returnDate) {
    return res.status(400).json({ error: 'Book already returned' });
  }

  checkout.returnDate = new Date().toISOString();
  res.json(checkout);
};
