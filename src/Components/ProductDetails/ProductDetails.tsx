"use client";
import { useState } from "react";
import styles from "./ProductDetails.module.scss";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import product from "../../mockData/ProductInfo";
import { calculateSubscriptionPrice } from "../../utils/price";
import { SubscriptionSection } from "../Subscription/Subscription";
import { ProductInfo } from "../ProductInfo/ProductInfo";
import { Dropdown } from "../Dropdown/Dropdown";
import { Button } from "../Button/Button";

export const ProductDetails = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [subscription, setSubscription] = useState(true);

  const breadcrumbItems = [
    "Shop all",
    "Dry Dog Food",
    "Health & Digestion Dry Food",
  ];

  const handleAddToBasket = () => {
    console.log("Adding to basket:", {
      quantity: selectedQuantity,
      subscription,
      product: product.title,
    });
  };

  const handleSubscriptionChange = () => {
    setSubscription(!subscription);
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.desktopBreadcrumbs}>
        <Breadcrumbs crumbs={breadcrumbItems} />
      </div>
      <ProductInfo
        title={product.title}
        price={product.price}
        points={
          subscription ? product.subscriptionPoints : product.regularPoints
        }
        currency={product.currency}
        subscription={subscription}
        subscriptionPrice={calculateSubscriptionPrice(
          product.price,
          product.subscriptionSaving
        )}
      />
      <Dropdown
        id="quantity"
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
        <div>
          <p className={styles.description}>{product.description}</p>
          <ul className={styles.keyFeatures}>
            {product.keyFeatures.map((feature, index) => {
              return (
                <li className={styles.feature} key={index}>
                  {feature}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            handleOnClick={handleAddToBasket}
            label="Add to Basket"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};
