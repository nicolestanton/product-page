"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import styles from "./Carousel.module.scss";
import Image, { StaticImageData } from "next/image";

interface CarouselProps {
  images: string[] | StaticImageData[];
  title: string;
}

export const Carousel = ({ images, title }: CarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const thumbnailsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When current image changes, focus the selected thumbnail
    if (isFocused) {
      thumbnailsRef.current[currentImage]?.focus();
    }

    // Scroll to current image on mobile
    if (window.innerWidth <= 768) {
      thumbnailsRef.current[currentImage]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [currentImage, isFocused]);

  // Add scroll snap observer for mobile
  useEffect(() => {
    if (window.innerWidth > 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = thumbnailsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentImage(index);
            }
          }
        });
      },
      {
        root: thumbnailsContainerRef.current,
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    thumbnailsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        setCurrentImage((prev) => (prev + 1) % images.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        break;
      case "Home":
        e.preventDefault();
        setCurrentImage(0);
        break;
      case "End":
        e.preventDefault();
        setCurrentImage(images.length - 1);
        break;
    }
  };

  const handleThumbnailKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault();
        setCurrentImage(index);
        break;
      default:
        handleKeyDown(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!carouselRef.current?.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      role="region"
      aria-label="Product images"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className={styles.mainImage}>
        <Image
          src={images[currentImage]}
          alt={`${title} - View ${currentImage + 1} of ${images.length}`}
          className={styles.image}
          fill
          priority
        />
      </div>
      <div className={styles.thumbnailContainer}>
        <div
          ref={thumbnailsContainerRef}
          className={styles.thumbnails}
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((image, index) => (
            <button
              key={index}
              ref={(el) => { thumbnailsRef.current[index] = el; }}
              className={`${styles.thumbnail} ${
                index === currentImage ? styles.active : ""
              }`}
              onClick={() => setCurrentImage(index)}
              onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
              role="tab"
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-selected={index === currentImage}
              aria-controls={`image-${index}`}
              tabIndex={index === currentImage ? 0 : -1}
            >
              <Image 
                src={image} 
                alt="" 
                className={styles.thumbnailImage} 
                fill
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;