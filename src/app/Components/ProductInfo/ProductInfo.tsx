import styles from "./ProductInfo.module.scss";

export const ProductInfo = ({
  title,
  price,
  points,
  subscription,
  currency,
  subscriptionPrice,
}: {
  title: string;
  price: number;
  subscription?: boolean;
  subscriptionPrice?: number;
  points: number;
  currency: string;
}) => {
  return (
    <div className={styles.productInfo}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.priceContainer}>
        {subscription && (
          <span className={styles.subscriptionPrice}>
            {currency}
            {subscriptionPrice}
          </span>
        )}
        <span className={subscription ? styles.fullPrice : styles.price}>
          {currency}
          {price}
        </span>
        <span className={styles.points}>+{points} PoochPoints</span>
      </div>
    </div>
  );
};
