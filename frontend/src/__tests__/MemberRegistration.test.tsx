import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberRegistration from '../components/MemberRegistration';
import { MemberContext } from '../contexts/MemberContext';

describe('MemberRegistration', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    render(
      <MemberContext.Provider value={{ register: mockRegister }}>
        <MemberRegistration />
      </MemberContext.Provider>
    );
  });

  it('renders registration form', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/address is required/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const addressInput = screen.getByLabelText(/address/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(addressInput, '123 Library St');

    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Library St'
      });
    });
  });
});
