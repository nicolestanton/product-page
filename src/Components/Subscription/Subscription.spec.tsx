import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SubscriptionSection } from './Subscription';

// Mock the Dropdown component
jest.mock('../Dropdown/Dropdown', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dropdown: ({ disabled, value, onChange, ...props }: any) => (
    <select
      data-testid="Delivery Frequency"
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      <option value="30">30 Days</option>
      <option value="60">60 Days</option>
      <option value="90">90 Days</option>
    </select>
  ),
}));

describe('SubscriptionSection', () => {
  const mockOnSubscriptionChange = jest.fn();

  beforeEach(() => {
    mockOnSubscriptionChange.mockClear();
  });

  const renderComponent = (props = {}) => {
    return render(
      <SubscriptionSection 
        saving={10} 
        onSubscriptionChange={mockOnSubscriptionChange}
        {...props}
      />
    );
  };

  it('renders subscription title with saving percentage', () => {
    renderComponent();
    expect(screen.getByText(/subscription & save 10%/i)).toBeInTheDocument();
  });

  it('renders radio options', () => {
    renderComponent();
    expect(screen.getByText("Subscription")).toBeInTheDocument();
    expect(screen.getByText("One-off")).toBeInTheDocument();
  });

  describe('delivery frequency dropdown', () => {
    it('renders and defaults to 30 days', () => {
      renderComponent();
      const dropdown = screen.getByTestId('Delivery Frequency') as HTMLSelectElement;
      expect(dropdown).toBeInTheDocument();
      expect(dropdown.value).toBe('30');
    });

    it('is enabled by default with subscription', () => {
      renderComponent();
      const dropdown = screen.getByTestId('Delivery Frequency');
      expect(dropdown).not.toBeDisabled();
    });
  });
});