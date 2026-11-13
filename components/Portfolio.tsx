"use client";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Monitor,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Star,
  BriefcaseBusiness,
  X,
  Zap,
} from "lucide-react";
import {
  profile,
  projects,
  services,
  skills,
} from "../lib/content";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToReducedMotion = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};
const getReducedMotionSnapshot = () =>
  window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotionSnapshot = () => false;
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}
const whatsappUrl = profile.phone
  ? `https://wa.me/${profile.phone.replace(/\D/g, "")}`
  : "";

const nav = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];
const iconMap = {
  code: Code2,
  layers: Layers3,
  monitor: Monitor,
  database: Database,
  frontend: Monitor,
  backend: Braces,
  tools: Terminal,
  cart: ShoppingCart,
} as const;
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
function SectionHeading({
  first,
  accent,
  sub,
}: {
  first: string;
  accent: string;
  sub?: string;
}) {
  return (
    <Reveal className="section-heading">
      <h2>
        {first} <span>{accent}</span>
      </h2>
      {sub && <p>{sub}</p>}
      <i />
    </Reveal>
  );
}
function SocialLinks() {
  return (
    <div className="social-links">
      {profile.github ? (
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github size={19} />
        </a>
      ) : (
        <span
          className="social-placeholder"
          title="Add your GitHub URL in lib/content.ts"
          aria-label="GitHub link not configured"
        >
          <Github size={19} />
        </span>
      )}
      {profile.linkedin && (
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={19} />
        </a>
      )}
      {profile.email ? (
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail size={19} />
        </a>
      ) : (
        <span
          className="social-placeholder"
          title="Add your email in lib/content.ts"
          aria-label="Email not configured"
        >
          <Mail size={19} />
        </span>
      )}
    </div>
  );
}
function Resume({ className = "" }: { className?: string }) {
  return profile.resume ? (
    <a href={profile.resume} download className={className}>
      <Download size={17} /> Download Resume
    </a>
  ) : (
    <button
      type="button"
      className={className}
      disabled
      title="Add a résumé in lib/content.ts"
    >
      <Download size={17} /> Resume coming soon
    </button>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduceMotion = usePrefersReducedMotion();
  useEffect(() => {
    const handler = () => {
      let current = "home";
      for (const [, href] of nav) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top < 180) current = href.slice(1);
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 851px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  return (
    <header className="header">
      <div className="nav-pill">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <strong>{profile.shortName}</strong>
          <small>CREATIVE DEVELOPER</small>
        </a>
        <span className="nav-tagline">You Think We Build</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([name, href]) => (
            <a
              key={href}
              className={active === href.slice(1) ? "active" : ""}
              href={href}
            >
              {name}
            </a>
          ))}
        </nav>
        <a className="hire-button" href="#contact">
          Hire Me <Sparkles size={15} />
        </a>
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {nav.map(([name, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {name}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a
              className="mobile-hire"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              Hire Me <Sparkles size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
function Hero() {
  const roles = ["Full Stack Developer", "Software Engineer", "Web Developer"];
  const [word, setWord] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce) {
      setWord(roles[0]);
      return;
    }
    let current = roles[index];
    let timer = setTimeout(
      () => {
        if (!deleting) {
          if (word.length < current.length)
            setWord(current.slice(0, word.length + 1));
          else setDeleting(true);
        } else if (word.length > 0) setWord(current.slice(0, word.length - 1));
        else {
          setDeleting(false);
          setIndex((index + 1) % roles.length);
        }
      },
      !deleting && word === current ? 1700 : deleting ? 45 : 85,
    );
    return () => clearTimeout(timer);
  }, [word, index, deleting, reduce]);
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7 }}
        >
          <h1>
            <small>Hi, I’m</small>
            <span>{profile.name}</span>
          </h1>
          <div className="role-label">A PASSIONATE</div>
          <div className="type-line" aria-label={profile.role}>
            {word}
            <span className="type-cursor">|</span>
          </div>
          <p>{profile.intro}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary">
              View My Work
            </a>
            <a href="#contact" className="btn outline">
              Get In Touch
            </a>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                className="btn outline whatsapp-button"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Talk on WhatsApp
              </a>
            )}
            <Resume className="btn resume" />
          </div>
          <SocialLinks />
        </motion.div>
        <motion.div
          className="hero-portrait"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15 }}
        >
          <div className="portrait-glow" />
          <div className="portrait-backdrop" />
          <div className="portrait-image">
            <img
              src={profile.photo || "/images/profile-placeholder.svg"}
              fetchPriority="high"
              decoding="async"
              alt={
                profile.photo
                  ? `Portrait of ${profile.name}`
                  : "Profile photo placeholder"
              }
            />
          </div>
        </motion.div>
      </div>
      <a className="scroll-down" href="#about" aria-label="Scroll to About">
        <ArrowDown size={26} />
      </a>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading first="About" accent="Me" />
        <div className="about-simple">
          <Reveal className="about-intro">
            <h3>{profile.name}</h3>
            <p className="about-role">{profile.role}</p>
            <p>{profile.about}</p>
          </Reveal>
          <Reveal className="about-details" delay={0.12}>
            <div className="about-detail">
              <GraduationCap size={27} />
              <div>
                <strong>Education</strong>
                <p>{profile.education}</p>
              </div>
            </div>
            <div className="about-detail">
              <Code2 size={27} />
              <div>
                <strong>Focus</strong>
                <p>{profile.focus}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <SectionHeading
          first="What I"
          accent="Offer"
          sub="High-quality services to build, scale and ship your product."
        />
        <div className="service-grid">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <Reveal key={s.title} className="service-card" delay={i * 0.06}>
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <a href="#contact">
                  Get in touch <ArrowRight size={15} />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function SkillCard({
  category,
  index,
}: {
  category: (typeof skills)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const reduce = usePrefersReducedMotion();
  return (
    <Reveal className="skill-card" delay={index * 0.07}>
      <img
        className="skill-category-icon"
        src={`/images/skill-icons/${category.icon}.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <h3>{category.name}</h3>
      <div className="skill-list">
        {[...category.items, ...(expanded ? category.more : [])].map((item) => {
          return (
            <div className="skill-item" key={item.name}>
              <div className="skill-row">
                <span>{item.name}</span>
                {item.level !== null && (
                  <b>{Math.max(0, Math.min(100, item.level))}%</b>
                )}
              </div>
              {item.level !== null && (
                <div
                  className="skill-track"
                  role="progressbar"
                  aria-label={`${item.name} proficiency`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.max(0, Math.min(100, item.level))}
                >
                  <motion.span
                    className="skill-fill"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${Math.max(0, Math.min(100, item.level))}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduce ? 0 : 1,
                      delay: reduce ? 0 : 0.1,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {expanded && category.more.length === 0 && (
        <p className="skills-complete">
          All skills in this category are shown.
        </p>
      )}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="skill-button"
      >
        {expanded ? "Show Less" : "View All"}
      </button>
    </Reveal>
  );
}
function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeading
          first="Technical"
          accent="Expertise"
          sub="Technologies across the full stack with continuous learning and growth"
        />
        <div className="skills-grid">
          {skills.map((s, i) => (
            <SkillCard category={s} index={i} key={s.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          first="Showcase"
          accent="Projects"
          sub="Ideas and solutions, brought to life with modern technology"
        />
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal
              key={i}
              className={`project-card project-color-${i + 1}`}
              delay={(i % 2) * 0.08}
            >
              <div className="project-image">
                <img
                  src={p.image}
                  alt={`${p.name} project screenshot`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-content">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="project-tags">
                  {p.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-buttons">
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-live"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      title="Add the live demo URL in lib/content.ts"
                      className="project-live"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </button>
                  )}
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-code"
                    >
                      <Github size={16} /> Code
                    </a>
                  ) : (
                    <button
                      disabled
                      title="Add the repository URL in lib/content.ts"
                      className="project-code"
                    >
                      <Github size={16} /> Code
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="placeholder-note">
          Project images and links are placeholders, ready for your updates.
        </p>
      </div>
    </section>
  );
}
function Explore() {
  const cards = [
    [
      `About ${profile.shortName}`,
      `Background, technical focus and where to find ${profile.shortName} online.`,
      "#about",
    ],
    [
      "Development Services",
      "Full-stack, front-end, and API development work.",
      "#services",
    ],
    [
      "Skills & Technologies",
      "Explore the technologies and tools used across the stack.",
      "#skills",
    ],
    ["Projects", "Web applications and project details.", "#projects"],
  ];
  const questions = [
    [
      `Who is ${profile.name}?`,
      `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location}.`,
    ],
    [
      `What does ${profile.shortName} do?`,
      `He is studying ${profile.education} and focuses on ${profile.focus.toLowerCase()}.`,
    ],
    [
      `What technologies does ${profile.shortName} use?`,
      `${skills.flatMap((group) => group.items.map((item) => item.name)).join(", ")}.`,
    ],
    [
      `What projects has ${profile.shortName} built?`,
      `Featured projects: ${projects.map((project) => project.name).join(", ")}.`,
    ],
    [
      `What services does ${profile.shortName} offer?`,
      "Full stack development, frontend development, backend APIs, and custom software.",
    ],
    [
      `Where can I find ${profile.shortName} online?`,
      "Use the GitHub, LinkedIn and email links in the contact section.",
    ],
  ];
  return (
    <section id="explore" className="section explore">
      <div className="container">
        <SectionHeading
          first="Explore this"
          accent="portfolio"
          sub={`${profile.name} is a software engineer and full stack developer based in ${profile.location}.`}
        />
        <Reveal className="explore-intro">
          Detailed sections covering who {profile.shortName} is, the services he offers, the
          technologies he works with and the applications he builds.
        </Reveal>
        <div className="explore-grid">
          {cards.map(([title, desc, href]) => (
            <a key={title} href={href}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </a>
          ))}
        </div>
        <div className="explore-lists">
          <div>
            <h3>Services</h3>
            {services.map((s) => (
              <a key={s.title} href="#services">
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <h3>Projects</h3>
            {projects.map((p) => (
              <a key={p.name} href="#projects">
                {p.name}
              </a>
            ))}
          </div>
        </div>
        <Reveal className="faq">
          <h3>Common questions about {profile.shortName}</h3>
          {questions.map(([q, a]) => (
            <div key={q}>
              <h4>{q}</h4>
              <p>{a}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-row">
        <span>
          Full Stack Developer ✱ From Azad Kashmir ✱ Full Stack Developer ✱ From
          Pakistan ✱
        </span>
        <span>
          Full Stack Developer ✱ From Azad Kashmir ✱ Full Stack Developer ✱ From
          Pakistan ✱
        </span>
      </div>
      <div className="marquee-row reverse">
        <span>
          Let’s Work Together ✱ I’m Open for New Projects ✱ Let’s Work Together
          ✱ I’m Open for New Projects ✱
        </span>
        <span>
          Let’s Work Together ✱ I’m Open for New Projects ✱ Let’s Work Together
          ✱ I’m Open for New Projects ✱
        </span>
      </div>
    </div>
  );
}
function Contact() {
  const [feedback, setFeedback] = useState("");
  const [preparing, setPreparing] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (!profile.email) {
      setFeedback(
        "Contact email is not configured. Please add it in lib/content.ts.",
      );
      return;
    }
    const d = new FormData(form);
    const body = encodeURIComponent(
      `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`,
    );
    const subject = encodeURIComponent("Portfolio enquiry");
    setPreparing(true);
    setFeedback("Preparing your email…");
    window.setTimeout(() => {
      try {
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setFeedback(
          "Your email app should open with a prepared message. Please send it from there.",
        );
      } catch {
        setFeedback(
          "Could not open an email app. Please email the address above directly.",
        );
      } finally {
        setPreparing(false);
      }
    }, 300);
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeading
          first="Get In"
          accent="Touch"
          sub="Let’s build something amazing."
        />
        <div className="contact-cards">
          <Reveal className="contact-card contact-blue">
            <span>
              <Mail size={25} />
            </span>
            <h3>Email</h3>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </Reveal>
          {profile.phone && (
            <Reveal className="contact-card contact-purple">
              <span>
                <MessageCircle size={25} />
              </span>
              <h3>WhatsApp</h3>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                {profile.phone}
              </a>
            </Reveal>
          )}
          <Reveal className="contact-card contact-green">
            <span>
              <MapPin size={25} />
            </span>
            <h3>Location</h3>
            <p>{profile.location}</p>
          </Reveal>
          <Reveal className="contact-card contact-github">
            <span>
              <Github size={25} />
            </span>
            <h3>GitHub</h3>
            {profile.github ? (
              <a href={profile.github} target="_blank" rel="noreferrer">
                View GitHub profile
              </a>
            ) : (
              <p>GitHub profile not provided</p>
            )}
          </Reveal>
        </div>
        <Reveal className="form-card">
          <form onSubmit={submit}>
            <label>
              Full Name
              <input
                name="name"
                placeholder="John Doe"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email Address
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                maxLength={254}
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                required
                rows={5}
                maxLength={5000}
              />
            </label>
            <button type="submit" disabled={preparing}>
              <Send size={18} />{" "}
              {preparing ? "Preparing email…" : "Send Message"}
            </button>
            <p className="form-note" role="status" aria-live="polite">
              {feedback ||
                "This form opens your email app with a prepared message; it does not send email directly."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-about">
            <h3>{profile.shortName} — Full-Stack Developer</h3>
            <div className="footer-line" />
            <p>
              Building thoughtful web applications with clean architecture,
              smooth interactions, and modern user experiences.
            </p>
            <a href="#contact" className="footer-cta">
              Get in Touch <ArrowRight size={17} />
            </a>
          </div>
          <div className="footer-nav">
            <h4>Site Navigation</h4>
            {nav.slice(1).map(([name, href]) => (
              <a href={href} key={href}>
                {name}
              </a>
            ))}
          </div>
          <div>
            <h4>Follow Me</h4>
            <SocialLinks />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {new Date().getFullYear()} {profile.name}.
            <br />
            <small>Designed and built with React & Framer Motion.</small>
          </span>
          <span>Azad Jammu & Kashmir</span>
        </div>
      </div>
    </footer>
  );
}
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;
  return (
    <a href="#home" className="back-top" aria-label="Back to top">
      <ArrowUp size={20} />
    </a>
  );
}
export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Explore />
        <Marquee />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
