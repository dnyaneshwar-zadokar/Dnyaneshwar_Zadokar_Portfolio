import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
  { label: "Blog", to: "/blog" },
  { label: "Resume", to: "/resume" },
  { label: "About me", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8.5 },
  };
  const middleBarVariants = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  };
  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8.5 },
  };

  const barStyle = {
    display: "block",
    width: 26,
    height: 2.5,
    background: "var(--text-primary, white)",
    borderRadius: 2,
    transformOrigin: "center",
  };

  return (
    <>
      <nav
        className="nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 2rem",
          borderBottom: "1px solid var(--glass-border, rgba(255,255,255,0.1))",
          background: "var(--nav-bg, rgba(0,0,0,0.6))",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* --- Left Logo + Name --- */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              color: "var(--accent)",
            }}
          >
            DZ
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 0, fontSize: 14, color: "var(--text-primary, white)" }}>Dnyaneshwar Zadokar</h1>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              Full Stack Web Developer
            </div>
          </div>
        </div>

        {/* --- Center Navigation Links (desktop only) --- */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.8rem",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
              style={{
                position: "relative",
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "var(--text-primary, white)",
                fontWeight: 500,
              }}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    color: "var(--accent)",
                    textShadow: "0 0 8px var(--accent)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <motion.span
                    animate={{
                      color: isActive ? "var(--accent)" : "var(--text-primary, white)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {l.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="underline"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: "70%",
                        height: "2px",
                        marginTop: "4px",
                        borderRadius: "1px",
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 6px var(--accent)",
                      }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* --- Right side: Theme toggle + Hamburger --- */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />

          {/* Hamburger button (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              style={barStyle}
              variants={topBarVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              style={barStyle}
              variants={middleBarVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              style={barStyle}
              variants={bottomBarVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(5,5,9,0.97)",
              backdropFilter: "blur(20px)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <NavLink
                  to={l.to}
                  end
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-link"
                  style={({ isActive }) => ({
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: isActive ? "var(--accent)" : "white",
                    textDecoration: "none",
                    textShadow: isActive ? "0 0 20px var(--accent)" : "none",
                    display: "block",
                    textAlign: "center",
                    transition: "transform 0.3s ease, color 0.3s ease",
                  })}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
