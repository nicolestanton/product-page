import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Dropdown', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder when no value is selected', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Select an option"
      />
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        label="Test Label"
        id="test-dropdown"
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows options when clicked and hides when clicked outside', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    // Initially options are hidden
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(mockOptions.length);

    // Click outside to close
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByRole('button'));
    
    // Click an option
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(mockOnChange).toHaveBeenCalledWith('2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('displays selected option', () => {
    render(
      <Dropdown
        options={mockOptions}
        value="2"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(screen.getByRole('button').parentElement).toHaveClass('custom-class');
  });
});
