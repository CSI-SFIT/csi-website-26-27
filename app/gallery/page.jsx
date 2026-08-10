"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { BlurFade } from "../../components/ui/blur-fade.jsx";

const galleryItems = [
  // --- CSI DAY ---
  { id: 1, title: 'CSI Team', category: 'CSI Day', size: 'large', src: '/gallery/csi-day/IMG_0965.webp' },
  { id: 2, title: 'CSI Day', category: 'CSI Day', size: 'normal', src: '/gallery/csi-day/IMG_4352.webp' },
  { id: 3, title: 'CSI Magazine Launch', category: 'CSI Day', size: 'tall', src: '/gallery/csi-day/IMG_9571.webp' },
  { id: 4, title: 'CSI Day', category: 'CSI Day', size: 'normal', src: '/gallery/csi-day/IMG_0961.webp' },
  { id: 5, title: 'CSI Crowd', category: 'CSI Day', size: 'tall', src: '/gallery/csi-day/IMG_9576.webp' },
  { id: 6, title: 'CSI Day', category: 'CSI Day', size: 'wide', src: '/gallery/csi-day/IMG_6382.webp' },
  { id: 7, title: 'CSI Day', category: 'CSI Day', size: 'normal', src: '/gallery/csi-day/IMG_0952.webp' },

  // --- MOSAIC ---
  { id: 8, title: 'Mosaic Inauguration', category: 'Mosaic 25-26', size: 'wide', src: '/gallery/mosaic/IMG_6828.webp' },
  { id: 9, title: 'CSI Team', category: 'Mosaic 25-26', size: 'normal', src: '/gallery/mosaic/IMG_6962.webp' },
  { id: 10, title: 'Mosaic 25-26', category: 'Mosaic 25-26', size: 'tall', src: '/gallery/mosaic/IMG_6911.webp' },
  { id: 11, title: 'Mosaic 25-26', category: 'Mosaic 25-26', size: 'normal', src: '/gallery/mosaic/IMG_9121.webp' },
  { id: 12, title: 'Mosaic 25-26', category: 'Mosaic 25-26', size: 'wide', src: '/gallery/mosaic/IMG_1215.webp' },
  { id: 13, title: 'Mosaic Caution!', category: 'Mosaic 25-26', size: 'tall', src: '/gallery/mosaic/IMG_1140.webp' },
  { id: 14, title: 'Mosaic 25-26', category: 'Mosaic 25-26', size: 'normal', src: '/gallery/mosaic/IMG_9275.webp' },
  { id: 15, title: 'Mosaic Feedback', category: 'Mosaic 25-26', size: 'large', src: '/gallery/mosaic/IMG_9712.webp' },
  { id: 16, title: 'Mosaic 25-26', category: 'Mosaic 25-26', size: 'tall', src: '/gallery/mosaic/IMG_1208.webp' },

  // --- WORKSHOPS ---
  { id: 17, title: 'Next.js Crowd', category: 'Workshops', size: 'large', src: '/gallery/workshops/IMG_2429.webp' },
  { id: 18, title: 'Next.js', category: 'Workshops', size: 'normal', src: '/gallery/workshops/IMG_0670.webp' },
  { id: 19, title: 'Next.js', category: 'Workshops', size: 'tall', src: '/gallery/workshops/IMG_2366.webp' },
  { id: 20, title: 'Next.js', category: 'Workshops', size: 'normal', src: '/gallery/workshops/IMG_2334.webp' },
  { id: 21, title: 'Next.js', category: 'Workshops', size: 'tall', src: '/gallery/workshops/IMG_2384.webp' },
  { id: 22, title: 'Next.js', category: 'Workshops', size: 'wide', src: '/gallery/workshops/IMG_0626.webp' },
  { id: 23, title: 'Frame the Moment', category: 'Workshops', size: 'wide', src: '/gallery/workshops/IMG_5225.webp' },
  { id: 24, title: 'Frame the Moment', category: 'Workshops', size: 'tall', src: '/gallery/workshops/9708.webp' },
  { id: 25, title: 'Frame the Moment', category: 'Workshops', size: 'normal', src: '/gallery/workshops/IMG_8990.webp' },
  { id: 26, title: 'Frame the Moment', category: 'Workshops', size: 'tall', src: '/gallery/workshops/9676.webp' },
  { id: 27, title: 'Frame the Moment', category: 'Workshops', size: 'large', src: '/gallery/workshops/9636.webp' },
  { id: 28, title: 'Frame the Moment', category: 'Workshops', size: 'normal', src: '/gallery/workshops/9633.webp' },
  { id: 29, title: 'Frame the Moment', category: 'Workshops', size: 'large', src: '/gallery/workshops/IMG_8987.webp' },

  // --- HACKATHONS ---
  { id: 30, title: 'HackX Inauguration', category: 'Hackathon', size: 'large', src: '/gallery/hackathon/IMG_6196.webp' },
  { id: 31, title: 'HackX Inauguration', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_6184.webp' },
  { id: 32, title: 'HackX Inauguration', category: 'Hackathon', size: 'tall', src: '/gallery/hackathon/IMG_4706.webp' },
  { id: 33, title: 'HackX', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_4023.webp' },
  { id: 34, title: 'The Judges', category: 'Hackathon', size: 'tall', src: '/gallery/hackathon/IMG_4790.webp' },
  { id: 35, title: 'HackX', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_4807.webp' },
  { id: 36, title: 'HackX Team', category: 'Hackathon', size: 'wide', src: '/gallery/hackathon/IMG_4522.webp' },
  { id: 37, title: 'HackX', category: 'Hackathon', size: 'tall', src: '/gallery/hackathon/6200.webp' },
  { id: 38, title: 'HackX', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_4365.webp' },
  { id: 39, title: 'HackX', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_6233.webp' },
  { id: 40, title: 'Red Bull gives you Wiiiiings', category: 'Hackathon', size: 'wide', src: '/gallery/hackathon/IMG_4056.webp' },
  { id: 41, title: 'Award Ceremony', category: 'Hackathon', size: 'large', src: '/gallery/hackathon/IMG_4847.webp' },
  { id: 42, title: 'Award Ceremony', category: 'Hackathon', size: 'large', src: '/gallery/hackathon/IMG_4833.webp' },
  { id: 43, title: 'HackX', category: 'Hackathon', size: 'normal', src: '/gallery/hackathon/IMG_6281.webp' },
];

const categories = ['All', ...new Set(galleryItems.map((item) => item.category))];

// A rough starting-point aspect ratio per card "size" so the modal frame
// doesn't always guess a square while the real image dimensions load in.
// This is only a placeholder guess — handleModalImageLoad overwrites it
// with the image's real aspect ratio as soon as it's known.
const SIZE_ASPECT_HINTS = {
  tall: 0.5,
  wide: 1.9,
  large: 1,
  normal: 1,
};

function computeFrameSize(aspectRatio) {
  const isMobile = window.innerWidth < 700;
  const maxWidth = Math.min(1100, window.innerWidth * (isMobile ? 0.94 : 0.88));
  const maxHeight = Math.min(720, window.innerHeight * 0.75);

  let width = maxWidth;
  let height = width / aspectRatio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [frameSize, setFrameSize] = useState(null);
  const naturalAspectRef = useRef(4 / 3);

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const selectedImage = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setImageLoading(true);
    setFrameSize(computeFrameSize(1));
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setImageLoading(true);
    setFrameSize(computeFrameSize(1));
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  const openModal = (index) => {
    setImageLoading(true);
    // Seed a closer starting guess from the card's own size category
    // (e.g. "tall" cards are probably portrait) to reduce the visible
    // jump once the real image dimensions come back.
    const hint = SIZE_ASPECT_HINTS[filteredItems[index]?.size] ?? 1;
    setFrameSize(computeFrameSize(hint));
    setSelectedIndex(index);
  };

  const handleModalImageLoad = (e) => {
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      naturalAspectRef.current = naturalWidth / naturalHeight;
      setFrameSize(computeFrameSize(naturalAspectRef.current));
    }
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, closeModal, showPrev, showNext]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onResize = () => setFrameSize(computeFrameSize(naturalAspectRef.current));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= filteredItems.length) {
      setSelectedIndex(null);
    }
  }, [filteredItems.length, selectedIndex]);

  const handleCardKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(index);
    }
  };

  const hasMultipleItems = filteredItems.length > 1;

  // Once the frame's real pixel size is known, ask Next.js for an image
  // sized to match it instead of a generic viewport-percentage guess —
  // avoids over-fetching a viewport-wide image for a narrow portrait photo.
  const modalImageSizes = frameSize ? `${frameSize.width}px` : '92vw';

  return (
    <div className={styles.galleryContainer}>
      <section className={styles.hero}>
  <BlurFade delay={0.1} inView>
    <div className={styles.heroLabel}>Explore</div>
  </BlurFade>

  <BlurFade delay={0.2} inView>
    <h1 className={styles.heroTitle}>
      Our <span className={styles.highlight}>Gallery</span>
    </h1>
  </BlurFade>

  <BlurFade delay={0.3} inView>
    <p className={styles.heroSub}>
      Glimpses of our events, workshops, and memories.
    </p>
  </BlurFade>
</section>

      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
            aria-pressed={activeFilter === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            className={`${styles.card} ${styles[item.size]}`}
            onClick={() => openModal(index)}
            onKeyDown={(e) => handleCardKeyDown(e, index)}
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            <div className={styles.overlay}>
              <span className={styles.eventName}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={closeModal}
        >
          <div
            className={styles.modalFrame}
            style={frameSize ? { width: frameSize.width, height: frameSize.height } : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close image preview"
            >
              &times;
            </button>

            {hasMultipleItems && (
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                onClick={showPrev}
                aria-label="Previous image"
              >
                {/* Decorative icon — the button's aria-label already
                    describes the action, so hide this from screen readers. */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            <div className={styles.modalImageWrapper}>
              {imageLoading && (
                <div className={styles.modalSpinner} role="status" aria-label="Loading image" />
              )}
              <Image
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className={styles.modalContent}
                sizes={modalImageSizes}
                priority
                onLoad={handleModalImageLoad}
              />
            </div>

            {hasMultipleItems && (
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={showNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>

          <div className={styles.modalCaption}>
            {selectedImage.title}
            {hasMultipleItems && (
              <span className={styles.modalCounter}>
                {selectedIndex + 1} / {filteredItems.length}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}