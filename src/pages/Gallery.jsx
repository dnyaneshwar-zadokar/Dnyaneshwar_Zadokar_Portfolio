import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./Gallery.css";

const IMAGES = {
  achievements: [
    {
      id: 1,
      title: "Google Cloud Arcade Legend Tier 2025",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.30 PM (1).jpeg"],
    },
    {
      id: 2,
      title: "Google Cloud Arcade Tropper Tier 2025",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.30 PM.jpeg"],
    },
    {
      id: 3,
      title: "India Skills Competition 2026",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.31 PM (1).jpeg"],
    },
    {
      id: 4,
      title: "Google Cloud Arcade Legend Tier 2025 - Cohort 1",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.31 PM (2).jpeg"],
    },
    {
      id: 5,
      title: "Best Project of the Year Award 2026",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.31 PM.jpeg"],
    },
    {
      id: 6,
      title: "1st Prize in Coding Competition 2025",
      photos: ["/gallery/WhatsApp Image 2026-04-20 at 3.02.32 PM.jpeg"],
    },
  ],
};

// ✨ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Gallery() {
  const [zoom, setZoom] = useState({ img: null, post: null, index: 0 });

  const openZoom = (post, index) =>
    setZoom({ img: post.photos[index], post, index });

  const closeZoom = () => setZoom({ img: null, post: null, index: 0 });

  const nextImage = () => {
    if (!zoom.post) return;
    const nextIndex = (zoom.index + 1) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    if (!zoom.post) return;
    const prevIndex =
      (zoom.index - 1 + zoom.post.photos.length) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[prevIndex], index: prevIndex });
  };

  return (
    <motion.section
      className="gallery-container"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🌟 Title */}
      <motion.div className="gallery-header" variants={childVariants}>
        <h2 className="gallery-title">My Achievements</h2>
        <p className="gallery-subtitle">A showcase of my milestones and technical excellence</p>
      </motion.div>

      {/* 🖼️ Achievements Grid */}
      <div className="post-feed">
        {IMAGES.achievements.map((post) => (
          <motion.div
            key={post.id}
            className="post-card"
            variants={childVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="achievement-image-container" onClick={() => openZoom(post, 0)}>
              <img src={post.photos[0]} alt={post.title} className="achievement-img" />
              <div className="image-overlay">
                <span>View Full Photo</span>
              </div>
            </div>
            <div className="achievement-info">
              <h3 className="achievement-name">{post.title}</h3>
              <p className="caption">{post.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔍 Zoom Overlay */}
      <AnimatePresence>
        {zoom.img && (
          <motion.div
            className="zoom-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={closeZoom}
          >
            <motion.div
              className="zoom-content"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={zoom.img}
                src={zoom.img}
                alt="zoom"
                className="zoom-img"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <button className="close-btn" onClick={closeZoom}>
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

