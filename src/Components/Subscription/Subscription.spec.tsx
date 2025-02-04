import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubscriptionSection } from './Subscription';

describe('SubscriptionSection', () => {
  const mockOnSubscriptionChange = jest.fn();

  beforeEach(() => {
    mockOnSubscriptionChange.mockClear();
  });

  it('renders subscription title with saving percentage', () => {
    render(<SubscriptionSection saving={10} onSubscriptionChange={mockOnSubscriptionChange} />);
    expect(screen.getByText('Subscription & Save 10%')).toBeInTheDocument();
  });

  it('renders radio options for subscription and one-time purchase', () => {
    render(<SubscriptionSection saving={10} onSubscriptionChange={mockOnSubscriptionChange} />);
    
    expect(screen.getByRole('radio', { name: /subscription/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /one-off/i })).toBeInTheDocument();
  });

  it('defaults to subscription option', () => {
    render(<SubscriptionSection saving={10} onSubscriptionChange={mockOnSubscriptionChange} />);
    
    const subscriptionRadio = screen.getByRole('radio', { name: /subscription/i }) as HTMLInputElement;
    expect(subscriptionRadio.checked).toBe(true);
  });

  it('calls onSubscriptionChange when switching between options', () => {
    render(<SubscriptionSection saving={10} onSubscriptionChange={mockOnSubscriptionChange} />);
    
    const oneTimeRadio = screen.getByRole('radio', { name: /one-off/i });
    fireEvent.click(oneTimeRadio);
    
    expect(mockOnSubscriptionChange).toHaveBeenCalledWith(false);
  });
});