// Your portfolio content is centralized here. Empty links remain visibly unavailable.
export const profile = {
  name: "Muzaffar Ali",
  shortName: "Muzaffar",
  role: "Software Engineer | Full Stack Developer",
  intro:
    "Muzaffar Ali is a sixth-semester BS Software Engineering student from Bhimber, AJK, focused on full-stack development.",
  about:
    "I am a sixth-semester BS Software Engineering student based in Bhimber, Azad Jammu and Kashmir. I focus on full-stack development and building modern, responsive, and user-friendly web applications.",
  education: "BS Software Engineering, 6th semester",
  focus: "Full-Stack Development",
  location: "Bhimber, AJK",
  email: "muzaffarcom096@gmail.com",
  phone: "+92 344 5776317",
  github: "https://github.com/Muzaffar0123",
  linkedin: "https://www.linkedin.com/in/muzaffar-ali/", // Optional; verify the URL.
  resume: "", // Add e.g. /resume.pdf after placing your résumé in public/.
  photo: "/images/profile.webp", // Set to '' to use /images/profile-placeholder.svg.
  aboutImage: "/images/about-placeholder.svg",
};
// Omit the level when the owner has not provided a proficiency rating.
type Skill = { name: string; level: number | null };
const skill = (name: string, level: number | null = null): Skill => ({
  name,
  level,
});
export const skills = [
  {
    name: "Frontend",
    icon: "frontend",
    items: [
      skill("React", 95),
      skill("TypeScript", 90),
      skill("Tailwind CSS", 92),
      skill("Next.js", 85),
      skill("HTML", 100),
      skill("CSS", 90),
      skill("JavaScript", 80),
      skill("Bootstrap", 70),
    ],
    more: [] as Skill[],
  },
  {
    name: "Backend & Programming",
    icon: "backend",
    items: [
      skill("Node.js", 90),
      skill("Express", 90),
      skill("MongoDB", 88),
      skill("REST APIs", 93),
      skill("Python", 80),
      skill("C++", 80),
    ],
    more: [] as Skill[],
  },
  {
    name: "Tools",
    icon: "tools",
    items: [
      skill("Git", 95),
      skill("Docker", 88),
      skill("Vite", 90),
      skill("AWS", 80),
      skill("Microsoft Azure", 90),
    ],
    more: [] as Skill[],
  },
  {
    name: "Databases",
    icon: "databases",
    items: [
      skill("MongoDB", 92),
      skill("Mongoose", 90),
      skill("MySQL", 82),
      skill("PostgreSQL", 78),
    ],
    more: [] as Skill[],
  },
];
export const projects = [
 {
  name: "TaskFlow – Task and Notes Manager",
  description:
    "A microservices-based productivity and collaboration platform for managing tasks, sharing notes, and connecting with a community.",
  technologies: [
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "RabbitMQ",
    "Docker"
  ],
  image: "/images/task-and-notes-manager.png",
  github: "https://github.com/Muzaffar0123/task-and-notes-manager",
  live: "",
},
];
export const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive web applications built with thoughtful interfaces and maintainable architecture.",
    icon: "code",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions designed to solve real-world problems with clean and maintainable code.",
    icon: "layers",
  },
  {
    title: "E-Commerce Web Applications",
    description:
      "Online shopping experiences with responsive storefronts and maintainable application architecture.",
    icon: "cart",
  },
  {
    title: "Backend & REST API Development",
    description:
      "Backend systems, REST APIs, and databases that bring applications together.",
    icon: "database",
  },
];
