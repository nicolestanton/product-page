import styles from "../Breadcrumbs/Breadcrumbs.module.scss";

export function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
  return crumbs.map((crumb, index) => {
    return (
      <span className={styles.crumb} key={index}>
        {crumb} {index < crumbs.length - 1 && ">"}
      </span>
    );
  });
}

export default Breadcrumbs;
