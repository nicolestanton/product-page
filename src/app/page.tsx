import { Carousel } from "../Components/Carousel/Carousel";
import styles from "./page.module.scss";
import product from "../mockData/ProductInfo";
import { FlexContainer, FlexItem } from "../Components/Grid/Grid";
import { ProductDetails } from "@/Components/ProductDetails/ProductDetails";
import Breadcrumbs from "@/Components/Breadcrumbs/Breadcrumbs";

export const Home = () => {
  return (
    <main className={styles.wrapper}>
      <FlexContainer className={styles.pageContainer}>
        <FlexItem columns={12} medium={6}>
        <div className={styles.mobileBreadcrumbs}>
        <Breadcrumbs crumbs={["Shop all", "Dry Dog Food", "Health & Digestion Dry Food"]} />
      </div>
          <Carousel images={product.images} title={product.title} />
        </FlexItem>
        <FlexItem columns={12} medium={6} className={styles.contentContainer}>
          <ProductDetails />
        </FlexItem>
      </FlexContainer>
    </main>
  );
};

export default Home;
