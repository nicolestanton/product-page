"use client";
import { useState } from "react";
import styles from "./Subscription.module.scss";
import RadioInput from "../RadioInput/RadioInput";
import { Dropdown } from "../Dropdown/Dropdown";

interface SubscriptionSectionProps {
  onSubscriptionChange?: (isSubscription: boolean) => void;
  saving: number;
}

export const SubscriptionSection = ({
  saving,
  onSubscriptionChange,
}: SubscriptionSectionProps) => {
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">(
    "subscription"
  );

  const [selectedFrequency, setSelectedFrequency] = useState<string>("30");
  const handlePurchaseTypeChange = (type: "one-time" | "subscription") => {
    setPurchaseType(type);
    onSubscriptionChange?.(type === "subscription");
  };

  const subscriptionOptions = [
    { label: "Subscription", value: "subscription" },
    { label: "One-off", value: "one-time" },
  ];

  const deliveryFrequencyOptions = [
    { label: "30days", value: "30" },
    { label: "60days", value: "60" },
    { label: "90days", value: "90" },
  ];

  return (
    <section className={styles.container} aria-labelledby="subscription-title">
      <h2 id="subscription-title" className={styles.title}>
        Subscription & Save {saving}%
      </h2>

      <div
        className={styles.options}
        role="radiogroup"
        aria-label="Purchase options"
      >
        <RadioInput
          name="purchase-type"
          options={subscriptionOptions}
          value={purchaseType}
          onChange={(value) =>
            handlePurchaseTypeChange(value as "one-time" | "subscription")
          }
        />
      </div>

      <div className={styles.deliveryInfo}>
        <Dropdown
          data-testid="Delivery Frequency"
          disabled={purchaseType === "one-time"}
          label="Delivery Frequency"
          options={deliveryFrequencyOptions}
          value={selectedFrequency}
          onChange={(value: string | number) =>
            setSelectedFrequency(String(value))
          }
          placeholder={selectedFrequency.toString()}
        />
      </div>
    </section>
  );
};
