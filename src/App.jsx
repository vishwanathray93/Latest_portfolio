import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import ScrollButtons from "./components/ScrollButtons";
const RESUME_CONTEXT = `
You are an AI assistant for Vishwanath Ray's portfolio website.
Answer ONLY questions about Vishwanath Ray in a friendly, professional, and structured style.

NAME: Vishwanath Ray
EMAIL: rayvishu93@gmail.com
PHONE: +91-9304423628
GitHub: https://github.com/vishwanathray93
LinkedIn: https://in.linkedin.com/in/vishwanath-ray-594660230
Portfolio: https://vishwanathportfolio.free.nf/

PROFESSIONAL SUMMARY:
Backend-focused Web Developer with 4+ years of experience building scalable web applications using PHP, Laravel, WordPress, Shopify, BigCommerce, and WooCommerce. Experienced in REST API integrations, ecommerce development, database optimization, deployment, automation systems, and hosting support. Skilled in custom themes, plugins, backend systems, storefront customization, and performance optimization.

CURRENT CTC:
5.4 Lac per annum

EXPECTED CTC:
6 to 6.5 Lac per annum

SKILLS:
- Front-End: HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap, React.js
- Back-End: PHP, Laravel, MySQL, PostgreSQL, Node.js (Basic)
- CMS/Platforms: WordPress, Shopify, BigCommerce, WooCommerce
- Shopify Development: Liquid, Storefront API, Shopify App Development (Remix.js), Klaviyo, Theme Customization
- WordPress / WooCommerce: Theme Customization, Plugin Integration, Product/Checkout Customization, Payment/Shipping Integration
- Version Control: Git (GitHub, GitLab)
- DevOps / Deployment: AWS EC2, Linux Server, Git Deployment, SSL, DNS Configuration, GoDaddy Hosting, cPanel
- AI & Automation: N8n Workflow Automation, OpenAI API Integration, WhatsApp Business API, Webhook Architecture
- Other: SEO Optimization, Cross-Browser Compatibility, Database Optimization, REST API Integration

EXPERIENCE:
1. ATH Infosystem – Web Developer (May 2025 – Present, Noida, India)
2. Tech Prastish Software Solutions – PHP Developer (June 2022 – April 2025, Chandigarh, India)
3. Solitaire Infotech – PHP Web Development Intern (March 2021 – July 2022, Mohali, Punjab)

EDUCATION:
Himachal Pradesh Technical University | Bachelor of Technology – Computer Science and Engineering | Aug 2018 – Sep 2022 | CGPA: 7.0

HOSTING / DEPLOYMENT EXPERIENCE:
- Worked on AWS EC2 deployment
- Managed Linux server related tasks
- Configured SSL and DNS
- Worked with GoDaddy hosting and domain setup
- Handled cPanel/file manager/basic hosting operations for website deployment and maintenance

PROJECTS WITH LINKS:
- https://venuemarketplace.com/  (BigCommerce)
- https://venueoutlet.mybigcommerce.com/  (BigCommerce)
- https://everything4thelow.com/  (BigCommerce)
- https://pinknoire.com/  (Shopify)
- https://crownnaturale.com/  (Shopify)
- https://bcloud.ai/  (WordPress)
- https://kcloudhubs.com/  (WordPress)
- https://pcloudhostings.com/  (WordPress)
- https://digitalrt.com/  (WordPress)
- https://bartsparts.com/  (WordPress)
- http://globalultrasoundinstitute.com/  (WordPress / WooCommerce related work)
- Stock Sense App (Shopify App)
- GUSI LMS System

IMPORTANT RESPONSE RULES:
- Answer only about Vishwanath Ray
- Be friendly, confident, and concise
- Use headings and bullets when needed
- For CTC questions, clearly show both current and expected
- If asked for project links, provide the links above with short summaries
- If asked about hosting experience, mention AWS EC2 and GoDaddy
- If asked about ecommerce, include Shopify, BigCommerce, WordPress, and WooCommerce where relevant
- If asked about anything unrelated, politely redirect back to Vishwanath's profile
`;

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Achievements",
  "Interests",
  "Contact",
];

const SKILLS_DATA = [
  {
    cat: "Front-End",
    items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "jQuery", "Bootstrap"],
  },
  {
    cat: "Back-End",
    items: ["PHP", "Laravel", "MySQL", "PostgreSQL", "Node.js (Basic)", "REST APIs"],
  },
  {
    cat: "CMS / Platforms",
    items: ["WordPress", "Shopify", "BigCommerce", "WooCommerce"],
  },
  {
    cat: "Shopify",
    items: ["Remix.js", "Liquid", "Storefront API", "Klaviyo", "Theme Development"],
  },
  {
    cat: "WordPress / WooCommerce",
    items: [
      "Theme Customization",
      "Plugin Integration",
      "WooCommerce Setup",
      "Checkout Customization",
      "Payment / Shipping Integration",
    ],
  },
  {
    cat: "DevOps / Deployment",
    items: [
      "AWS EC2",
      "Linux Server",
      "Git Deployment",
      "SSL",
      "DNS Configuration",
      "GoDaddy Hosting",
      "cPanel",
    ],
  },
  {
    cat: "Other",
    items: [
      "SEO",
      "Cross-Browser Compatibility",
      "Database Optimization",
      "N8n",
      "OpenAI API",
    ],
  },
];

const PROJECTS = [
  {
    title: "Stock Sense — AI Shopify App",
    category: "Shopify App Development",
    icon: "🛒",
    color: "#00e5ff",
    tags: ["Remix.js", "Shopify API", "AI"],
    summary:
      "AI-powered Shopify app for demand forecasting and inventory planning to help merchants reduce overstock and understock issues.",
    contribution: [
      "Worked on Shopify app development using Remix.js",
      "Integrated Shopify-related app logic and backend flow",
      "Focused on scalable structure and real-world ecommerce use case",
      "Contributed to building AI-based inventory planning workflow",
    ],
    impact: [
      "Better inventory planning support",
      "Useful for merchant decision-making",
      "Strong portfolio project in Shopify app ecosystem",
    ],
    links: [],
  },
  {
    title: "Venue Marketplace / Venue Outlet / Everything4TheLow",
    category: "BigCommerce + AWS",
    icon: "⚡",
    color: "#7c4dff",
    tags: ["BigCommerce", "Stencil", "Storefront API", "AWS"],
    summary:
      "Built and customized BigCommerce storefront features, integrated transactional templates, worked on dynamic PDP behavior, and supported hosting/deployment workflows.",
    contribution: [
      "Developed BigCommerce storefront features using Stencil",
      "Implemented dynamic PDP behavior and contextual UI sections",
      "Worked with Storefront API for product and order data",
      "Supported AWS deployment and hosting-side reliability",
    ],
    impact: [
      "Improved storefront functionality",
      "Enabled more dynamic frontend experiences",
      "Delivered stable hosted ecommerce workflows",
    ],
    links: [
      "https://venuemarketplace.com/",
      "https://venueoutlet.mybigcommerce.com/",
      "https://everything4thelow.com/",
    ],
  },
  {
    title: "Digitalroot / Bcloud.ai / Kcloudhubs / Pcloud Hostings / Bartsparts",
    category: "WordPress Development",
    icon: "🌐",
    color: "#ff4081",
    tags: ["WordPress", "PHP", "SEO", "GoDaddy"],
    summary:
      "Developed and customized responsive WordPress business websites with theme setup, plugin integration, deployment support, SEO optimization, and performance improvements.",
    contribution: [
      "Built and customized WordPress themes and templates",
      "Integrated custom PHP-based functionality and plugins",
      "Worked on page speed, SEO, and deployment setup",
      "Handled GoDaddy hosting, domain mapping, SSL, and live deployment support",
    ],
    impact: [
      "Improved performance and loading speed",
      "Delivered production-ready business sites",
      "Enhanced SEO readiness and user experience",
    ],
    links: [
      "https://bcloud.ai/",
      "https://kcloudhubs.com/",
      "https://pcloudhostings.com/",
      "https://digitalrt.com/",
      "https://bartsparts.com/",
    ],
  },
  {
    title: "PinkNoire / Crown Naturale",
    category: "Shopify Theme Development",
    icon: "🎨",
    color: "#ff6d00",
    tags: ["Liquid", "HTML", "CSS", "JavaScript", "Klaviyo"],
    summary:
      "Customized Shopify themes with Liquid, HTML/CSS, and JavaScript while integrating third-party features and marketing automation tools like Klaviyo.",
    contribution: [
      "Built and customized theme sections in Liquid",
      "Enhanced storefront UI and responsiveness",
      "Integrated Klaviyo newsletter and email flow setup",
      "Improved overall user experience for ecommerce storefront",
    ],
    impact: [
      "Better storefront presentation",
      "Improved email marketing integration",
      "Conversion-supportive front-end enhancements",
    ],
    links: ["https://pinknoire.com/", "https://crownnaturale.com/"],
  },
  {
    title: "GUSI LMS System / Global Ultrasound Institute",
    category: "WordPress + PHP + MySQL + WooCommerce",
    icon: "📚",
    color: "#69ff47",
    tags: ["PHP", "MySQL", "LMS", "WordPress", "WooCommerce"],
    summary:
      "Worked on LMS-related and WordPress-based functionality for Global Ultrasound Institute, including backend features, database optimization, and ecommerce/course-related flows.",
    contribution: [
      "Built LMS-related backend functionality",
      "Enhanced exam listing and filtering experience",
      "Designed optimized SQL queries for reporting and retrieval",
      "Worked on authentication, roles, and structured content/course flows",
      "Handled WordPress / WooCommerce related customization where required",
    ],
    impact: [
      "Supported scalable learning platform requirements",
      "Improved performance with optimized database queries",
      "Delivered secure and structured LMS functionality",
    ],
    links: ["http://globalultrasoundinstitute.com/"],
  },
];

const ACHIEVEMENTS = [
  { number: "33+", label: "Projects Delivered" },
  { number: "4+", label: "Years of Experience" },
  { number: "~40%", label: "Automation Effort Reduced" },
  { number: "AWS + GoDaddy", label: "Hosting Experience" },
  { number: "20%", label: "SEO Growth Contribution" },
];

const INTERESTS = [
  "Shopify app development",
  "Backend architecture",
  "AI workflow automation",
  "Ecommerce systems",
  "WooCommerce customization",
  "API integrations",
  "Database optimization",
  "Production deployment",
];

function SectionHeader({ title, sub }) {
  return (
    <div className="section-header">
      <div className="section-sub">{sub}</div>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}

function CardTitle({ title, color }) {
  return (
    <h4 className="card-title" style={{ color }}>
      {title}
    </h4>
  );
}

function HeroSection({ setActive }) {
  const roles = [
    "Backend Web Developer",
    "Shopify App Builder",
    "WordPress, BigCommerce & WooCommerce Developer",
    "AI Automation Integrator",
  ];

  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);

  useEffect(() => {
    let i = 0;
    let adding = true;

    const iv = setInterval(() => {
      const word = roles[ri];

      if (adding) {
        setTyped(word.slice(0, i + 1));
        i++;
        if (i >= word.length) {
          adding = false;
          i = word.length;
        }
      } else {
        setTyped(word.slice(0, i - 1));
        i--;
        if (i <= 0) {
          adding = true;
          setRi((r) => (r + 1) % roles.length);
        }
      }
    }, 85);

    return () => clearInterval(iv);
  }, [ri]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" />
      <div className="container hero-content">
        <div className="availability-wrap">
          <span className="availability-badge">Available for hire</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-white">Vishwanath</span>{" "}
          <span className="hero-title-accent">Ray</span>
        </h1>

        <div className="hero-typed-wrap">
          <span className="hero-typed">
            {typed}
            <span className="blink-cursor" />
          </span>
        </div>

        <p className="hero-description">
          Backend-focused Web Developer with 4+ years of experience building scalable web
          applications using PHP, Laravel, WordPress, Shopify, BigCommerce, and
          WooCommerce. Experienced in REST API integrations, database optimization,
          ecommerce development, hosting support, and automation systems.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setActive("Projects");
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setActive("Contact");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in Touch
          </button>
        </div>

        <div className="stats-grid">
          {[
            ["33+", "Projects Delivered"],
            ["4+", "Years Experience"],
            ["5.4 LPA", "Current CTC"],
            ["AWS + GoDaddy", "Hosting Experience"],
          ].map(([n, l]) => (
            <div key={l} className="stat-card">
              <div className="stat-number">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <SectionHeader title="About Me" sub="Who I Am" />
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-visual-pattern" />
          <span className="about-emoji">👨‍💻</span>
        </div>

        <div>
          <h3 className="about-heading">
            Developer with a <span className="text-accent">backend-first</span> and
            delivery-focused mindset
          </h3>

          <p className="muted-text">
            I work across backend development, ecommerce customization, API integrations,
            automation workflows, and deployment support. My experience includes
            WordPress development, WooCommerce customization, Shopify theme and app work,
            BigCommerce storefront customization, and database-driven PHP/Laravel applications.
          </p>

          <p className="muted-text about-gap">
            I enjoy building practical, scalable, and business-focused systems — whether it
            is a client website, ecommerce customization, admin workflow, or automation pipeline.
          </p>

          <div className="info-grid">
            {[
              ["📍", "Current Location", "Noida, India"],
              ["💼", "Primary Focus", "Backend, Ecommerce, Automation"],
              ["📧", "Email", "rayvishu93@gmail.com"],
              ["📞", "Phone", "+91-9304423628"],
            ].map(([icon, label, text]) => (
              <div key={label} className="info-card">
                <div className="info-icon">{icon}</div>
                <div className="info-label">{label}</div>
                <div className="info-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-pad section-alt">
      <SectionHeader title="Skills" sub="Tech Stack" />
      <div className="container skills-grid">
        {SKILLS_DATA.map(({ cat, items }) => (
          <div key={cat} className="skill-card">
            <h4 className="skill-title">{cat}</h4>
            <div className="skill-tags">
              {items.map((i) => (
                <span key={i} className="tag">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const jobs = [
    {
      company: "ATH Infosystem",
      role: "Web Developer",
      period: "May 2025 – Present",
      location: "Noida, India",
      color: "#00e5ff",
      points: [
        "Delivered projects across WordPress, Shopify, BigCommerce, WooCommerce, and custom Shopify app development.",
        "Worked on speed optimization, SEO enhancements, and deployment-related configurations.",
        "Managed AWS EC2 deployment, SSL setup, DNS configuration, and Linux server tasks.",
        "Worked with hosting environments including GoDaddy for website/domain support and maintenance.",
        "Architected N8n workflows integrating OpenAI API and WhatsApp Business API.",
      ],
    },
    {
      company: "Tech Prastish Software Solutions",
      role: "PHP Developer",
      period: "Jun 2022 – Apr 2025",
      location: "Chandigarh, India",
      color: "#7c4dff",
      points: [
        "Built scalable backend applications using PHP, Laravel, MySQL, and REST APIs.",
        "Converted Figma designs into fully functional websites across WordPress, Shopify, BigCommerce, and WooCommerce.",
        "Delivered multiple client projects including WordPress plugins, Shopify themes, BigCommerce storefronts, and ecommerce customizations.",
        "Collaborated on SEO, performance, and production deployment improvements.",
      ],
    },
    {
      company: "Solitaire Infotech",
      role: "PHP Web Development Intern",
      period: "Mar 2021 – Jul 2022",
      location: "Mohali, Punjab",
      color: "#69ff47",
      points: [
        "Assisted in building and deploying scalable web applications using PHP, MySQL, HTML5, and CSS3.",
        "Integrated APIs and managed database interactions to improve backend efficiency.",
        "Supported front-end work using HTML, CSS, JavaScript, and jQuery.",
      ],
    },
  ];

  return (
    <section id="experience" className="section-pad">
      <SectionHeader title="Experience" sub="Work History" />
      <div className="container timeline-wrap">
        <div className="timeline-line" />
        <div className="timeline-list">
          {jobs.map((j) => (
            <div key={j.company} className="timeline-item">
              <div
                className="timeline-dot"
                style={{ background: j.color, boxShadow: `0 0 12px ${j.color}` }}
              />
              <div className="timeline-card" style={{ borderColor: `${j.color}22` }}>
                <div className="timeline-head">
                  <div>
                    <h3 className="timeline-company">{j.company}</h3>
                    <div className="timeline-role" style={{ color: j.color }}>
                      {j.role}
                    </div>
                  </div>

                  <div className="timeline-meta">
                    <div>{j.period}</div>
                    <div>{j.location}</div>
                  </div>
                </div>

                <ul className="timeline-points">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="section-pad section-alt">
      <SectionHeader title="Education" sub="Academic Background" />
      <div className="container">
        <div className="education-card">
          <div className="education-head">
            <div>
              <h3 className="education-title">Himachal Pradesh Technical University</h3>
              <div className="education-sub">
                Bachelor of Technology – Computer Science and Engineering
              </div>
            </div>

            <div className="education-meta">
              <div>Aug 2018 – Sep 2022</div>
              <div>CGPA: 7.0</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const current = PROJECTS[index];

  const prevProject = () => {
    setIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="section-pad">
      <SectionHeader title="Projects" sub="Featured Work" />
      <div className="container project-shell">
        <div className="project-top">
          <div>
            <div className="project-category-row">
              <span className="project-icon">{current.icon}</span>
              <span className="project-category" style={{ color: current.color }}>
                {current.category}
              </span>
            </div>

            <h3 className="project-main-title">{current.title}</h3>

            <div className="project-tag-row">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="project-chip"
                  style={{
                    background: `${current.color}18`,
                    color: current.color,
                    borderColor: `${current.color}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {!!current.links?.length && (
              <div className="project-links-row">
                {current.links.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-live-link"
                    style={{
                      color: current.color,
                      borderColor: `${current.color}45`,
                      background: `${current.color}12`,
                    }}
                  >
                    🔗 Live
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="project-nav">
            <button className="slider-btn" onClick={prevProject}>
              ←
            </button>
            <button className="slider-btn" onClick={nextProject}>
              →
            </button>
          </div>
        </div>

        <div className="project-grid">
          <div className="project-card">
            <CardTitle title="Project Summary" color={current.color} />
            <p className="project-text">{current.summary}</p>
          </div>

          <div className="project-card">
            <CardTitle title="My Contribution" color={current.color} />
            <ul className="project-list">
              {current.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-card">
            <CardTitle title="Project Impact" color={current.color} />
            <ul className="project-list">
              {current.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-dots">
          {PROJECTS.map((project, i) => (
            <button
              key={project.title}
              onClick={() => setIndex(i)}
              className={`dot-btn ${i === index ? "active" : ""}`}
              style={{
                background: i === index ? current.color : "rgba(255,255,255,0.18)",
                width: i === index ? 34 : 12,
              }}
              title={project.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="section-pad section-alt">
      <SectionHeader title="Achievements" sub="Highlights" />
      <div className="container achievement-grid">
        {ACHIEVEMENTS.map((item) => (
          <div key={item.label} className="achievement-card">
            <div className="achievement-number">{item.number}</div>
            <div className="achievement-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestsSection() {
  return (
    <section id="interests" className="section-pad">
      <SectionHeader title="Interests" sub="What I Enjoy Building" />
      <div className="container interest-grid">
        {INTERESTS.map((item, i) => (
          <div key={item} className="interest-card">
            <div className="interest-index">{i + 1}</div>
            <div className="interest-text">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;

    window.location.href = `mailto:rayvishu93@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(
      form.name
    )}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;

    setSent(true);
  };

  return (
    <section id="contact" className="section-pad section-alt contact-section">
      <SectionHeader title="Contact" sub="Get in Touch" />
      <div className="container contact-shell">
        {sent ? (
          <div className="contact-success">
            <div className="contact-success-icon">✅</div>
            <h3>Email client opened!</h3>
            <p>
              Or reach directly at <span className="text-accent">rayvishu93@gmail.com</span>
            </p>
            <button className="contact-reset-btn" onClick={() => setSent(false)}>
              Send Another
            </button>
          </div>
        ) : (
          <div className="contact-form-wrap">
            <div className="contact-grid">
              {[
                ["Your Name", "name", "text"],
                ["Your Email", "email", "email"],
              ].map(([ph, key, type]) => (
                <input
                  key={key}
                  type={type}
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="field"
                />
              ))}
            </div>

            <textarea
              placeholder="Your Message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="field"
            />

            <button onClick={handleSubmit} className="contact-submit-btn">
              Send Message →
            </button>

            <div className="contact-links">
              {[
                ["📧", "rayvishu93@gmail.com", "mailto:rayvishu93@gmail.com"],
                ["💼", "LinkedIn", "https://in.linkedin.com/in/vishwanath-ray-594660230"],
                ["🐙", "GitHub", "https://github.com/vishwanathray93"],
              ].map(([icon, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-link">
                  <span>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-copy">
        © 2025 <span className="text-accent">Vishwanath Ray</span>. All rights reserved.
      </div>

      <div className="footer-links">
        <a className="footer-link" href="https://github.com/vishwanathray93" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="footer-link" href="https://in.linkedin.com/in/vishwanath-ray-594660230" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="footer-link" href="mailto:rayvishu93@gmail.com">
          Email
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const ids = NAV_LINKS.map((item) => item.toLowerCase());
      const scrollY = window.scrollY + 120;

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(NAV_LINKS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-shell">
      <Navbar active={active} setActive={setActive} />

      <div className="breadcrumb">{active}</div>

      <HeroSection setActive={setActive} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <AchievementsSection />
      <InterestsSection />
      <ContactSection />
      <Footer />
      <ScrollButtons />
      <ChatWidget resumeContext={RESUME_CONTEXT} />
    </div>
  );
}