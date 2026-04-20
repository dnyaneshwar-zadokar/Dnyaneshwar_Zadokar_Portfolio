import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const SKILLS = [
  // Programming Languages
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", isMern: true },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  // Web Technologies
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", isMern: true },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", isMern: true },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", isMern: true },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  // Databases & Tools
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", isMern: true },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Atlas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
];

const ROWS = [
  [
    { 
      title: "Programming Languages", 
      items: ["JavaScript (ES6+)", "Python", "SQL"] 
    },
    { 
      title: "Web Technologies", 
      items: ["HTML5", "CSS3", "Tailwind CSS", "React.js", "Node.js", "Express.js"],
      isMern: true
    },
    { 
      title: "Databases & Tools", 
      items: ["MongoDB", "MySQL", "Git & GitHub", "Postman", "MongoDB Atlas"],
      isMern: true
    },
  ],
  [
    { 
      title: "Frameworks & Libraries", 
      items: ["Socket.io", "WebRTC", "JWT Authentication", "RESTful API Development"] 
    },
    { 
      title: "AI & Integration", 
      items: ["NLP Basics", "LLM API Integration (OpenAI, Gemini)", "Prompt Engineering"],
      isAi: true
    },
  ],
  [
    { 
      title: "Core Concepts", 
      items: ["Data Structures & Algorithms", "Backend Development", "Authentication & Authorization", "MVC Architecture"] 
    },
    { 
      title: "Soft Skills", 
      items: ["Problem Solving", "Communication", "Team Collaboration", "Analytical Thinking"] 
    },
  ]
];

export default function Skills() {
  const [orbData, setOrbData] = useState([]);
  const stageRef = useRef();

  useEffect(() => {
    let timeoutId;
    const generateOrbs = () => {
      // Get accurate dimensions, fallback to typical window size
      const stageElement = stageRef.current;
      const stageW = stageElement ? stageElement.clientWidth : (window.innerWidth * 0.9);
      const stageH = stageElement ? stageElement.clientHeight : 600;

      // Ensure we have a minimum area to avoid start-up clumping
      if (!stageElement || stageW < 200) {
        timeoutId = setTimeout(generateOrbs, 100);
        return;
      }

      const placed = [];
      const orbSize = 68; // width/height of actual orb CSS
      const gap = 12;     // slightly reduced gap to fit 29 comfortably

      const newOrbData = SKILLS.map((skill) => {
        let x, y, tries = 0;
        
        const checkOverlap = (nx, ny) => {
          return placed.some(p => {
            const dx = p.x - nx;
            const dy = p.y - ny;
            return Math.sqrt(dx * dx + dy * dy) < (orbSize + gap);
          });
        };

        // Guarantee full area traversal
        do {
          x = Math.random() * (stageW - orbSize - 20) + 10;
          y = Math.random() * (stageH - orbSize - 20) + 10;
          tries++;
        } while (checkOverlap(x, y) && tries < 500);

        placed.push({ x, y });

        // Calculate independent floating offsets and speeds
        const floatX = (Math.random() - 0.5) * 120;
        const floatY = (Math.random() - 0.5) * 120;
        const duration = 5 + Math.random() * 5; // 5 to 10 seconds
        
        return { left: x, top: y, floatX, floatY, duration };
      });

      setOrbData(newOrbData);
    };

    // Calculate immediately and also on window resize
    generateOrbs();
    window.addEventListener('resize', generateOrbs);

    return () => {
      window.removeEventListener('resize', generateOrbs);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="skills-container" id="skills">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="title-gradient">Technical Expertise</h2>
        <div className="underline"></div>
        <p className="subtitle">
          Mastering the MERN stack and AI integration to build intelligent, high-performance systems.
        </p>
      </motion.div>

      <div className="skills-stage" ref={stageRef}>
        {SKILLS.map((s, i) => {
          const data = orbData[i];
          if (!data) return null; // Wait for initial calculation to finish
          
          return (
            <motion.div
              key={`${s.name}-${i}`}
              className={`skill-circle ${s.isMern ? "mern-orb" : ""}`}
              style={{ position: 'absolute', left: data.left, top: data.top }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                x: [0, data.floatX],
                y: [0, data.floatY]
              }}
              viewport={{ once: true }}
              transition={{ 
                opacity: { duration: 0.3, delay: i * 0.02 },
                scale: { duration: 0.3, delay: i * 0.02 },
                x: { duration: data.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                y: { duration: data.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
              }}
              whileHover={{ 
                scale: 1.25,
                zIndex: 10,
                background: "rgba(0, 255, 200, 0.1)",
                borderColor: "rgba(0, 255, 200, 0.5)"
              }}
            >
              {s.logo && <img src={s.logo} alt={s.name} className="skill-logo" />}
              <span className="skill-name">{s.name}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="skills-grid-container">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="skills-row-grid">
            {row.map((col, colIndex) => (
              <motion.div
                key={col.title}
                className={`skill-card ${col.isMern ? "mern-highlight" : ""} ${col.isAi ? "ai-highlight" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-header">
                  <h3>{col.title}</h3>
                  <div className="badges">
                    {col.isMern && <span className="badge mern">MERN</span>}
                    {col.isAi && <span className="badge ai">AI</span>}
                  </div>
                </div>
                <ul className="skill-list">
                  {col.items.map((item, i) => (
                    <li key={i}>
                      <span className="bullet">•</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
