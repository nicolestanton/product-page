"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { CgClose } from "react-icons/cg";
import logo from "@/assets/Logo.png";
import menuIcon from "@/assets/icons/icon-menu.png";
import cartIcon from "@/assets/icons/icon-cart.png";
import searchIcon from "@/assets/icons/icon-search.png";
import userIcon from "@/assets/icons/icon-user.png";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Shop", href: "/" },
  { label: "Find your food", href: "/about" },
  { label: "About", href: "/services" },
  { label: "Blog", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        {/* Desktop Menu */}
        <ul className={styles.menuItems}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.menuItem}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <CgClose className={styles.closeIcon} size={24} />
          ) : (
            <Image src={menuIcon} alt="Menu" width={24} height={24} />
          )}
        </button>
        <Image
          className={styles.logo}
          src={logo}
          alt="Logo"
          width={90}
          height={40}
        />
        <div className={styles.headerIcons}>
          <div className={styles.desktopMenuIcons}>
        <Image src={searchIcon} alt="search" width={24} height={24} />
        <Image src={userIcon} alt="account" width={24} height={24} />
        </div>
        <Image src={cartIcon} alt="cart" width={24} height={24} />
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
          <ul className={styles.mobileMenuItems}>
            {menuItems.map((item) => (
              <li key={item.href} className={styles.mobileMenuItem}>
                <a
                  href={item.href}
                  className={styles.menuItem}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
