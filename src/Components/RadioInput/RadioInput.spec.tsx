import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders all radio options', () => {
    render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    mockOptions.forEach(option => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('selects the correct option based on value prop', () => {
    render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value="2"
        onChange={mockOnChange}
      />
    );

    const selectedRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
    expect(selectedRadio.checked).toBe(true);
  });

  it('calls onChange when an option is selected', () => {
    render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });

  it('handles disabled state', () => {
    render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        disabled
      />
    );

    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('maintains same name attribute for all radio inputs', () => {
    render(
      <RadioInput
        name="test-radio"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'test-radio');
    });
  });
});
