import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookCheckout from '../components/BookCheckout';
import { BookContext } from '../contexts/BookContext';

describe('BookCheckout', () => {
  const mockCheckout = jest.fn();
  const mockBooks = [
    { id: '1', title: 'Test Book 1', isbn: '1234567890', available: true },
    { id: '2', title: 'Test Book 2', isbn: '0987654321', available: false }
  ];

  beforeEach(() => {
    render(
      <BookContext.Provider value={{ books: mockBooks, checkout: mockCheckout }}>
        <BookCheckout memberId="test-member-id" />
      </BookContext.Provider>
    );
  });

  it('renders available books', () => {
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Test Book 2')).toBeInTheDocument();
  });

  it('disables checkout button for unavailable books', () => {
    const checkoutButtons = screen.getAllByRole('button', { name: /checkout/i });
    expect(checkoutButtons[1]).toBeDisabled();
  });

  it('allows checkout of available books', async () => {
    const checkoutButton = screen.getAllByRole('button', { name: /checkout/i })[0];
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(mockCheckout).toHaveBeenCalledWith({
        bookId: '1',
        memberId: 'test-member-id'
      });
    });
  });

  it('shows confirmation after successful checkout', async () => {
    mockCheckout.mockResolvedValueOnce({ success: true, dueDate: '2024-04-30' });
    
    const checkoutButton = screen.getAllByRole('button', { name: /checkout/i })[0];
    fireEvent.click(checkoutButton);

    expect(await screen.findByText(/checkout successful/i)).toBeInTheDocument();
    expect(await screen.findByText(/due date: 2024-04-30/i)).toBeInTheDocument();
  });

  it('shows error message on failed checkout', async () => {
    mockCheckout.mockRejectedValueOnce(new Error('Checkout failed'));
    
    const checkoutButton = screen.getAllByRole('button', { name: /checkout/i })[0];
    fireEvent.click(checkoutButton);

    expect(await screen.findByText(/checkout failed/i)).toBeInTheDocument();
  });
});
