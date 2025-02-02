export const calculateSubscriptionPrice = (
  basePrice: number,
  subscriptionSaving: number
) => {
  return (basePrice - (basePrice * subscriptionSaving) / 100).toFixed(2);
};
