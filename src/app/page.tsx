"use client";
import { SubscriptionSection } from "./Components/Subscription/Subscription";
import { Carousel } from "./Components/Carousel/Carousel";
import styles from "./page.module.scss";
import { ProductInfo } from "./Components/ProductInfo/ProductInfo";
import { useState } from "react";
import product from "./ProductInfo";
import { calculateSubscriptionPrice } from "./helpers";
import { Button } from "./Components/Button/Button";
import { Dropdown } from "./Components/Dropdown/Dropdown";

export const Home = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [subscription, setSubscription] = useState<boolean>(true);

  const handleSubscriptionChange = () => {
    setSubscription(!subscription);
    console.log(subscription);
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* TODO: Add properrouting in next js to create correct breadcrumb */}
        <div className={styles.breadcrumbs}>
          Shop all &#62; Dry Dog Food &#62;{" "}
          <span className={styles.current}>Health & Digestion Dry Food</span>
        </div>
        {/* TODO: do we need this paye layout classnames*/}
        <div className={styles.pageLayout}>
          <Carousel images={product.images} title={product.title} />
          <div className={styles.productDetails}>
            <ProductInfo
              title={product.title}
              price={product.price}
              points={
                subscription
                  ? product.subscriptionPoints
                  : product.regularPoints
              }
              currency={product.currency}
              subscription={subscription}
              subscriptionPrice={parseFloat(
                calculateSubscriptionPrice(
                  product.price,
                  product.subscriptionSaving
                )
              )}
            />
            <Dropdown
              label="Quantity"
              options={options}
              value={selectedQuantity}
              onChange={(value) => setSelectedQuantity(Number(value))}
              placeholder={selectedQuantity.toString()}
            />

            <SubscriptionSection
              onSubscriptionChange={handleSubscriptionChange}
              saving={product.subscriptionSaving}
            />
            <div className={styles.productDescription}>
              <p className={styles.description}>{product.description}</p>
              <ul className={styles.keyFeatures}>
                {product.keyFeatures.map((feature: string, index: number) => {
                  return (
                    <li className={styles.feature} key={index}>
                      {feature}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.buttonWrapper}>
                <Button
                  handleOnClick={() => console.log("clicked")}
                  label="Add to Basket"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
