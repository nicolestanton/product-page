import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RadioInput from './RadioInput';

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('RadioInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  const renderComponent = (props = {}) => {
    return render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        {...props}
      />
    );
  };

  it('renders all radio options', () => {
    renderComponent();
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles disabled state', () => {
    renderComponent({ disabled: true });
    const fieldset = screen.getByRole('radiogroup');
    expect(fieldset).toBeDisabled();
  });

  it('maintains same name attribute for all radio inputs', () => {
    renderComponent();
    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'test-radio');
    });
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-radio-group';
    renderComponent({ className: customClass });
    const radioGroup = screen.getByRole('radiogroup').parentElement;
    expect(radioGroup).toHaveClass(customClass);
  });

  describe('with description', () => {
    const description = 'Test description';

    it('sets aria-describedby when description is provided', () => {
      renderComponent({ description });
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-describedby', 'test-radio-description');
    });
  });

  describe('without description', () => {
    it('does not set aria-describedby when description is not provided', () => {
      renderComponent();
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).not.toHaveAttribute('aria-describedby');
    });
  });

  it('sets correct ARIA attributes', () => {
    renderComponent();
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-labelledby', 'test-radio');
  });
});
