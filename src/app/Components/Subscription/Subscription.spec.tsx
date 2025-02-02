// import { render, screen, fireEvent } from '@testing-library/react';
// import { SubscriptionSection } from './Subscription';

// describe('SubscriptionSection', () => {
//   const basePrice = 99.99;
//   const mockOnSubscriptionChange = jest.fn();

//   beforeEach(() => {
//     mockOnSubscriptionChange.mockClear();
//   });

//   it('renders with default one-time purchase selected', () => {
//     render(<SubscriptionSection basePrice={basePrice} />);
    
//     const oneTimeRadio = screen.getByRole('radio', { name: /one-time purchase/i });
//     expect(oneTimeRadio).toBeChecked();
//   });

//   it('shows discounted price for subscription option', () => {
//     render(<SubscriptionSection basePrice={basePrice} discountPercentage={10} />);
    
//     const discountedPrice = screen.getByText('$89.99');
//     const originalPrice = screen.getByText('$99.99');
    
//     expect(discountedPrice).toBeVisible();
//     expect(originalPrice).toBeVisible();
//   });

//   it('calls onSubscriptionChange when switching between options', () => {
//     render(
//       <SubscriptionSection 
//         basePrice={basePrice} 
//         onSubscriptionChange={mockOnSubscriptionChange}
//       />
//     );
    
//     const subscribeRadio = screen.getByRole('radio', { name: /subscribe & save/i });
//     fireEvent.click(subscribeRadio);
    
//     expect(mockOnSubscriptionChange).toHaveBeenCalledWith(true);
//   });

//   it('shows delivery schedule when subscription is selected', () => {
//     render(<SubscriptionSection basePrice={basePrice} />);
    
//     const subscribeRadio = screen.getByRole('radio', { name: /subscribe & save/i });
//     fireEvent.click(subscribeRadio);
    
//     const deliverySelect = screen.getByRole('combobox', { name: /delivery frequency/i });
//     expect(deliverySelect).toBeVisible();
//   });
// });