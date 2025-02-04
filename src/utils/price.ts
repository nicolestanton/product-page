/**
 * Calculates the discounted subscription price based on the base price and subscription savings percentage
 * @param basePrice - The original price of the product
 * @param subscriptionSaving - The percentage discount for subscription
 * @returns The calculated subscription price as a number with 2 decimal places
 */
export const calculateSubscriptionPrice = (
  basePrice: number,
  subscriptionSaving: number
) => {
  return Number(
    (basePrice - (basePrice * subscriptionSaving) / 100).toFixed(2)
  );
};
