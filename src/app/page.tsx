"use client";
import { SubscriptionSection } from "../Components/Subscription/Subscription";
import { Carousel } from "../Components/Carousel/Carousel";
import styles from "./page.module.scss";
import { ProductInfo } from "../Components/ProductInfo/ProductInfo";
import { useCallback, useMemo, useState } from "react";
import product from "../mockData/ProductInfo";
import { calculateSubscriptionPrice } from "../utils/price";
import { Button } from "../Components/Button/Button";
import { Dropdown } from "../Components/Dropdown/Dropdown";
import { FlexContainer, FlexItem } from "../Components/Grid/Grid";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";

export const Home = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [subscription, setSubscription] = useState(true);

  const handleSubscriptionChange = () => {
    setSubscription(!subscription);
  };

  const options = useMemo(
    () => [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
    []
  );

  const breadcrumbItems = useMemo(
    () => ["Shop all", "Dry Dog Food", "Health & Digestion Dry Food"],
    []
  );

  const handleAddToBasket = useCallback(() => {
    console.log("Adding to basket:", {
      quantity: selectedQuantity,
      subscription,
      product: product.title,
    });
  }, [selectedQuantity, subscription]);
  
  return (
    <main className={styles.wrapper}>
      <div className={styles.mobileBreadcrumbs}>
        <Breadcrumbs crumbs={breadcrumbItems} />
      </div>
      <FlexContainer className={styles.pageContainer}>
        <FlexItem columns={12} medium={6}>
          <Carousel images={product.images} title={product.title} />
        </FlexItem>
        <FlexItem columns={12} medium={6} className={styles.contentContainer}>
          <div className={styles.productInfoContainer}>
            <div className={styles.desktopBreadcrumbs}>
              <Breadcrumbs crumbs={breadcrumbItems} />
            </div>
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
              subscriptionPrice={calculateSubscriptionPrice(
                product.price,
                product.subscriptionSaving
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
        </FlexItem>
      </FlexContainer>
    </main>
  );
};

export default Home;
