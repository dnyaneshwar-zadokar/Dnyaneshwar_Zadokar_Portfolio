import React from 'react'
import { motion } from 'framer-motion'

const EXPERIENCES = [
  {
    title: '💼 AI Virtual Intern',
    company: 'Infosys Springboard',
    duration: 'Nov 2025 – Jan 2026',
    desc: 'Worked on an AI-driven content verification system, processing 1000+ data samples to detect misinformation. Improved model accuracy and applied SDLC practices for efficient development.',
    ss: '/infosys-ai.png',
    tech: ['Python', 'NLP', 'AI Models', 'Data Processing'],
    type: 'research',
  },
  {
    title: '🎨 UI/UX Design Intern',
    company: 'Technogrowth Software Solutions',
    duration: 'Jun 2025 – Jul 2025',
    desc: 'Designed responsive UI layouts and optimized user workflows to enhance usability and accessibility. Collaborated with developers to improve UI consistency across 5+ components.',
    ss: '/portfolio.jpg',
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Responsive Design'],
    type: 'work',
  },
  {
    title: '🌐 Web Development Intern',
    company: 'Heal Bharat (Codelevate Internship Program)',
    duration: 'Apr 2025 – May 2025',
    desc: 'Completed a 6-week web development internship, building responsive web applications and delivering strong performance. Recognized for best achievements during the program.',
    ss: '/fullstack-exp.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    type: 'work',
  },
  {
    title: '🤖 AI Internship – Foundations of AI',
    company: 'Microsoft x Edunet Foundation (AICTE Initiative)',
    duration: 'Apr 2025 – May 2025',
    desc: 'Completed a 4-week AI internship focused on foundational AI concepts and real-world applications. Gained hands-on exposure to AI workflows and problem-solving approaches.',
    ss: '/aiml-exp.png',
    tech: ['AI Basics', 'Machine Learning Concepts', 'Data Analysis'],
    type: 'research',
  },
]

const TYPE_LABELS = {
  work: 'Work',
  research: 'Research',
  community: 'Community',
}

export default function Experience() {
  return (
    <motion.section
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="experience"
    >
      <div
        className="card"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 16,
          padding: 30,
        }}
      >
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: 4,
          }}
        >
          💼 Experience
        </motion.h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: 28 }}>
          My professional journey — building, researching, and contributing to the developer community.
        </p>

        {/* Experience Grid */}
        <div
          className="experience-grid"
          style={{
            display: 'grid',
            gap: 24,
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              className="experience-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              style={{
                background:
                  'linear-gradient(145deg, rgba(20,20,20,0.9), rgba(10,10,10,0.9))',
                border: '1px solid rgba(0,255,255,0.1)',
                borderRadius: 16,
                padding: 16,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 20px rgba(0,255,255,0.08)',
              }}
            >
              {/* Type Badge */}
              <span className={`experience-type-badge ${exp.type}`}>
                {TYPE_LABELS[exp.type]}
              </span>

              {/* Screenshot Image */}
              <motion.div
                className="ss"
                whileHover={{ scale: 1.05 }}
                style={{ borderRadius: 12, overflow: 'hidden' }}
              >
                <img
                  src={exp.ss}
                  alt={exp.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
              </motion.div>

              {/* Content */}
              <div style={{ marginTop: 12 }}>
                {/* Role Title */}
                <h3
                  style={{
                    fontSize: 18,
                    color: '#0ea5e9',
                    marginBottom: 4,
                    fontWeight: 700,
                  }}
                >
                  {exp.title}
                </h3>

                {/* Company & Duration */}
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--accent-2)',
                    marginBottom: 2,
                    fontWeight: 500,
                  }}
                >
                  {exp.company}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    marginBottom: 8,
                  }}
                >
                  📅 {exp.duration}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: '#bbb',
                    marginBottom: 8,
                    lineHeight: 1.6,
                  }}
                >
                  {exp.desc}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(0,255,255,0.05)',
                        border: '1px solid rgba(0,255,255,0.1)',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#aaf',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
