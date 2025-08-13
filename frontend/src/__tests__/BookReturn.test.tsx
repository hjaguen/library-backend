import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookReturn from '../components/BookReturn';
import { BookContext } from '../contexts/BookContext';

describe('BookReturn', () => {
  const mockReturn = jest.fn();
  const mockCheckouts = [
    { 
      id: '1', 
      bookId: '1',
      bookTitle: 'Test Book 1',
      dueDate: '2024-04-30',
      isOverdue: false
    },
    { 
      id: '2', 
      bookId: '2',
      bookTitle: 'Test Book 2',
      dueDate: '2024-03-01',
      isOverdue: true
    }
  ];

  beforeEach(() => {
    render(
      <BookContext.Provider value={{ checkouts: mockCheckouts, returnBook: mockReturn }}>
        <BookReturn memberId="test-member-id" />
      </BookContext.Provider>
    );
  });

  it('renders checked out books', () => {
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Test Book 2')).toBeInTheDocument();
  });

  it('displays due dates for each book', () => {
    expect(screen.getByText(/due: 2024-04-30/i)).toBeInTheDocument();
    expect(screen.getByText(/due: 2024-03-01/i)).toBeInTheDocument();
  });

  it('highlights overdue books', () => {
    const overduebook = screen.getByText('Test Book 2').closest('.book-item');
    expect(overduebook).toHaveClass('overdue');
  });

  it('processes book return successfully', async () => {
    mockReturn.mockResolvedValueOnce({ success: true });
    
    const returnButton = screen.getAllByRole('button', { name: /return/i })[0];
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(mockReturn).toHaveBeenCalledWith({
        checkoutId: '1',
        memberId: 'test-member-id'
      });
    });

    expect(await screen.findByText(/return successful/i)).toBeInTheDocument();
  });

  it('handles late returns and displays fees', async () => {
    mockReturn.mockResolvedValueOnce({ 
      success: true, 
      lateFee: 2.50 
    });
    
    const returnButton = screen.getAllByRole('button', { name: /return/i })[1];
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(mockReturn).toHaveBeenCalledWith({
        checkoutId: '2',
        memberId: 'test-member-id'
      });
    });

    expect(await screen.findByText(/late fee: \$2.50/i)).toBeInTheDocument();
  });

  it('shows error message on failed return', async () => {
    mockReturn.mockRejectedValueOnce(new Error('Return failed'));
    
    const returnButton = screen.getAllByRole('button', { name: /return/i })[0];
    fireEvent.click(returnButton);

    expect(await screen.findByText(/return failed/i)).toBeInTheDocument();
  });
});
