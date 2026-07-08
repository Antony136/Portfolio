import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    title: "AI-Driven Traffic Management System",
    subtitle: "Team Reboot Crew | Problem Statement: Ps-1 (Hardware)",
    description: "A smart mobility platform that combines computer vision, IoT, and real-time analytics to improve traffic flow, safety, and decision-making.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Computer Vision", "YOLOv8s", "ESP32", "IoT Sensors"],
    github: "https://github.com/Antony136/Roadzen-view",
    live: "#",
    details: {
      problemStatement: "Enhance Urban Living Through AI-Driven Traffic Management System. Urban areas face severe traffic congestion leading to increased pollution, delayed emergency responses, and economic losses. Traditional timed signals cannot adapt to dynamic traffic flows.",
      features: [
        { title: "Real-Time Traffic Monitoring", desc: "AI cameras continuously monitor vehicle flow, speed, and lane density in real time using YOLOv8s bounding box detection." },
        { title: "AI Traffic Analysis", desc: "Reinforcement models analyze traffic patterns to detect congestion and abnormal vehicle behavior, feeding data back to a centralized server." },
        { title: "Dynamic Signal Control", desc: "Traffic signals automatically adjust green and red timings based on real-time traffic density calculated by the AI script." },
        { title: "Emergency Vehicle Priority", desc: "Accurately tracks emergency vehicles and creates a green corridor for faster response times for ambulances and fire trucks." },
        { title: "Accident & Pedestrian Safety", desc: "AI anticipates accidents and pedestrians to improve road safety and prevent traffic disruptions." },
        { title: "Smart Dashboard & Routing", desc: "Live admin dashboard displays traffic status, congestion, and optimized travel routes." }
      ],
      challenges: [
        "Handling low-light CCTV footage with high accuracy using YOLOv8 optimized for night conditions.",
        "Reducing YOLO detection latency to achieve sub-100ms processing for real-time responsiveness.",
        "Synchronizing signal timing across multiple complex junctions to prevent systemic gridlock.",
        "Ensuring reliable communication between edge sensors and central server over intermittent networks."
      ],
      futureImprovements: [
        "Integration with public transport GPS for systemic priority.",
        "Predictive AI for holiday and event-based traffic surges.",
        "Implementation of V2I (Vehicle-to-Infrastructure) communication.",
        "Advanced air quality sensor integration to reroute traffic based on pollution levels."
      ],
      feasibility: [
        "Low-Cost & Accessible Hardware: Uses affordable components (ESP32, standard IP cameras, LED signals).",
        "Minimal Infrastructure: Does not require tearing up roads; can be retrofitted onto existing Cisco CCTV infrastructure.",
        "Scalable Architecture: Supports live traffic analysis via cloud servers or edge nodes."
      ],
      novelty: [
        "AI-Based Adaptive Control: Signals adjust purely on real-time vision density, not pre-programmed loops.",
        "Emergency Vehicle Tracking: Dedicated tracking to prioritize critical response vehicles.",
        "Predictive Recommendation: Uses historical and real-time data to forecast congestion."
      ],
      business: {
        model: "B2G (Business to Government) & PPP (Public-Private Partnership) targeting National Highway Authorities & Municipal Corporations.",
        valueProps: [
          "Wait Time Reduction: Dynamic signal control reduces junction waiting times by 30% to 40% (per MORTH data).",
          "Sustainability: Optimization lowers fuel consumption and CO2 emissions by over 20%.",
          "Data Harvesting: Generates a 5-6% yearly dataset increase for government research and infrastructure action."
        ],
        roi: "Estimated ROI of 6-12 months for municipalities upon achieving 20-30% model efficiency, given per-junction implementation costs (~Rs.25,000+)."
      }
    }
  },
  {
    title: "Campus Event Tracking System (CampusFlow)",
    subtitle: "Team Ignitron | Theme: Student Innovation",
    description: "A campus engagement platform that digitizes event discovery, registration, attendance, and OD approvals for students and organizers.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "MERN Stack"],
    github: "https://github.com/Antony136/Eventide-portal",
    live: "#",
    details: {
      problemStatement: "Managing campus events, tracking student participation, and approving on-duty requests is traditionally slow and tedious. This project creates a centralized digital hub to digitize the entire workflow—from event discovery to final OD certificate generation.",
      features: [
        { title: "Centralized Discovery", desc: "A single digital hub for students to discover and register for campus fests, workshops, and seminars." },
        { title: "Digital Registration & QR Passes", desc: "Students register in the app and receive a generated QR code pass for quick, seamless entry validation." },
        { title: "Automated OD Requests", desc: "After QR validation, students are automatically added to the On-Duty (OD) approval list on the admin dashboard." },
        { title: "Student Profiles", desc: "Provides a single place to view past events, attendance records, and generated certificates." },
        { title: "Organizer & Admin Tools", desc: "Faculty can manage event CRUD operations, verify attendance via scanning, approve ODs, and view analytics." },
        { title: "Role-Based Access Control", desc: "Secure JWT-based authentication separating student, organizer, and administrator privileges to ensure data integrity." }
      ],
      challenges: [
        "Synchronizing large datasets of student records in real-time without database contention.",
        "Securing QR code generation with ephemeral tokens to prevent unauthorized attendance copying.",
        "Designing a responsive UI that works across various mobile devices for field use.",
        "Handling high traffic loads during major campus festival registrations."
      ],
      futureImprovements: [
        "Mobile app for easier QR scanning and notifications.",
        "Integration with university ERP systems for automatic credential verification.",
        "AI-based event recommendations for students.",
        "Digital badge and reward system for active participants."
      ],
      feasibility: [
        "Technical: Built using established web tech (Next.js, PostgreSQL, Firebase) with integrated QR and PDF generation.",
        "Operational: Mirrors existing manual campus workflows digitally, ensuring easy adoption by coordinators.",
        "Economic & Sustainable: Low development costs leveraging open-source tools; promotes a paperless eco-friendly campus."
      ],
      novelty: [
        "Automated On-Duty Processing: Completely removes the need for paper-based permission slips.",
        "QR-Based Attendance Verification: Instant validation replacing manual roll calls.",
        "Centralized Analytics: Gives administrators a bird's-eye view of campus engagement."
      ],
      business: {
        model: "Institutional Integration (B2B) - deployed for college administrations to organize campus culture.",
        valueProps: [
          "Time Efficiency & Automation: Eliminates manual paperwork, saving vast administrative effort for faculty.",
          "Transparency: Ensures clear, indisputable tracking of attendance and OD approvals.",
          "Student Engagement: Simplified discovery encourages massive participation in extracurriculars."
        ],
        roi: "Creates a highly organized digital event culture while completely automating administrative overhead."
      }
    }
  },
  {
    title: "IoT-Blockchain Integrated Smart Supply Chain",
    subtitle: "Ensuring transparency, security, and efficiency in the supply chain of perishable goods.",
    description: "A supply-chain prototype focused on monitoring perishable goods in real time and exploring transparency through IoT and blockchain-inspired design.",
    tech: ["Node.js", "React.js", "Express", "MongoDB", "Blockchain (Basic)", "IoT Sensors (DHT22, GPS)"],
    github: "https://github.com/Antony136/iot-blockchain-supply-chain",
    live: "#",
    details: {
      problemStatement: "The supply chain for perishable goods suffers from a lack of transparency, security, and efficiency. Spoilage occurs when temperature or humidity breaches go unnoticed. This project introduces a tamper-proof system using IoT sensors and a foundational Blockchain architecture to track the entire journey.",
      features: [
        { title: "IoT Sensor Integration", desc: "Hardware integration of DHT22 (temperature/humidity), GPS, and accelerometers with ESP32 microcontrollers to continuously monitor transit conditions." },
        { title: "Automated Alert System", desc: "If sensors detect anomalous conditions (e.g., temperature breach), the backend (Node/Express) immediately triggers real-time alerts." },
        { title: "Blockchain Immutability (Basic)", desc: "Essential supply chain records are formatted as JSON and hashed to create a tamper-proof, time-stamped log of the entire journey." },
        { title: "Compliance Automation", desc: "Foundational smart contract logic concepts implemented to automatically verify if the goods arrived safely within predefined condition thresholds before authorizing final compliance." },
        { title: "Real-Time Dashboard", desc: "A React.js based dashboard that visualizes real-time sensor metrics and compliance status, giving full transparency to both buyers and sellers." },
        { title: "Historical Data Analytics", desc: "Analyzes past shipment data stored in MongoDB to identify transit bottlenecks and optimize future delivery routes." }
      ],
      challenges: [
        "Optimizing data transmission frequency to conserve IoT battery life during long-haul transit.",
        "Efficiently managing blockchain-style hashing on limited edge hardware resource constraints.",
        "Ensuring data integrity in areas with poor GPS/Network connectivity using local buffering.",
        "Balancing blockchain security with the performance needs of high-velocity real-time monitoring."
      ],
      futureImprovements: [
        "Full Ethereum smart contract integration for automated payments.",
        "Scaling IoT network with LoRaWAN for longer-range communication.",
        "Advanced predictive analytics for shelf-life estimation based on sensor history.",
        "Multi-signature approvals for handoffs between different logistics partners."
      ],
      feasibility: [
        "Data Storage: Uses a primary backend database (MongoDB) interfaced alongside basic Blockchain-hashing concepts for data integrity.",
        "Custom Scalable API: Node.js and Express handle the high-frequency MQTT/HTTP requests coming from the active IoT microcontrollers.",
        "Hardware: Utilizes accessible ESP32 microcontrollers and DHT22 sensors, providing an accurate, low-cost hardware simulation."
      ],
      novelty: [
        "Cryptographic Data Hashing: Securing conventional database records against tampering by unauthorized actors.",
        "Automated Quality Assurance: Evaluating perishable states without manual human intervention based on hard sensor thresholds.",
        "Hybrid Architecture: Combining legacy MERN robustness with foundational decentralization concepts."
      ],
      business: {
        model: "Logistics and Shipping Companies focused on perishable goods (Food, Medicine).",
        valueProps: [
          "Spoilage Prevention: Automated anomaly alerts allow drivers/logistics to intervene before total spoilage.",
          "Tamper-Proof Transparency: The continuous, hashed record prevents disputes between buyers and shippers regarding when/where the goods were damaged.",
          "Automated Compliance: Smart thresholds drastically reduce the time spent manually inspecting quality upon delivery."
        ]
      }
    }
  },
  {
    title: "Diabetic Retinopathy Screening Suite",
    subtitle: "Desktop AI App | Electron + FastAPI + React",
    description: "A clinician-focused desktop platform for diabetic retinopathy screening with offline inference, explainable AI, patient tracking, and cloud sync.",
    tech: ["Electron", "React.js", "FastAPI", "Python", "PyTorch", "SQLite", "PostgreSQL", "Grad-CAM"],
    github: "https://github.com/Antony136/Diabetic-Retinopathy-v2",
    live: "#",
    details: {
      problemStatement: "Diabetic retinopathy screening often depends on limited access to specialist review and reliable connectivity. This project creates a professional medical AI solution that empowers clinicians to screen, track, and prioritize patients even in offline environments.",
      features: [
        { title: "AI-Based Screening", desc: "Classifies fundus images into the five standard diabetic retinopathy stages with locally run inference." },
        { title: "Explainable AI", desc: "Displays Grad-CAM heatmaps so clinicians can understand which regions influenced the model's diagnosis." },
        { title: "Offline-First Workflow", desc: "Runs full screening and patient management locally, with sync to a cloud server when internet access is available." },
        { title: "Patient Management", desc: "Maintains longitudinal patient records, history, and screening data in a structured clinical workflow." },
        { title: "Clinical Safety Controls", desc: "Highlights severe cases for immediate referral and supports adaptive screening modes for better sensitivity." },
        { title: "Modern Desktop UX", desc: "Delivers a premium, responsive interface with polished animations and a clinical aesthetic built for real-world use." }
      ],
      challenges: [
        "Designing a reliable offline-first architecture that still supports later synchronization without data loss.",
        "Integrating local AI inference with a desktop application and cross-platform deployment.",
        "Balancing medical-grade usability with a polished and approachable user experience.",
        "Managing data consistency between local SQLite storage and cloud PostgreSQL/Supabase sync." 
      ],
      futureImprovements: [
        "Expanded model support for additional retinal conditions.",
        "Cloud-based collaboration for multi-clinic screening workflows.",
        "Advanced reporting and export features for doctors and hospitals.",
        "More rigorous evaluation against larger clinical image datasets."
      ],
      feasibility: [
        "The system uses a decoupled architecture with Electron for the desktop shell, FastAPI for inference, and SQLite/PostgreSQL for data persistence.",
        "It is designed for real-world deployment in low-connectivity environments where local-first functionality is essential.",
        "The project combines practical medical relevance with a modern full-stack and AI-driven implementation approach."
      ],
      novelty: [
        "Offline-first medical AI experience in a desktop desktop application, not only a web demo.",
        "Explainable AI support through Grad-CAM makes the screening process more transparent for clinicians.",
        "A complete workflow from screening to patient management and synchronization in one platform."
      ],
      business: {
        model: "Designed for ophthalmology clinics, screening centers, and healthcare technology use cases where AI-assisted diagnostics can improve triage and referral workflows.",
        valueProps: [
          "Improved screening reach in low-connectivity environments.",
          "Faster triage for patients with severe diabetic retinopathy.",
          "A more transparent and professional AI-assisted clinical workflow."
        ]
      }
    }
  },
  {
    title: "Mini CRM — Client Lead Management System",
    subtitle: "MERN Stack | Lead Tracking & Analytics",
    description: "A production-ready CRM for managing leads, tracking pipeline status, adding follow-ups, and analyzing conversion performance.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Recharts", "Tailwind CSS"],
    github: "#",
    live: "#",
    details: {
      problemStatement: "Small businesses and agencies often lose leads because there is no structured way to manage incoming inquiries. This project solves that by combining a public lead capture flow with a secure admin dashboard for full pipeline oversight.",
      features: [
        { title: "Lead Capture Form", desc: "Visitors can submit leads through a polished public form and instantly create a new record in the system." },
        { title: "Admin Dashboard", desc: "Provides an analytics-focused workspace with KPI cards, charts, and activity tracking for decision-making." },
        { title: "Pipeline Management", desc: "Allows admins to track leads across statuses such as new, contacted, and converted." },
        { title: "Follow-Up Notes", desc: "Each lead can be enriched with notes and updates that help teams maintain context over time." },
        { title: "Authentication & Security", desc: "Uses JWT authentication and protected routes to ensure only authorized users access the admin experience." },
        { title: "Export & Reporting", desc: "Supports exporting lead data for reporting, follow-up, and business analysis." }
      ],
      challenges: [
        "Designing a smooth experience for both public visitors and internal admins.",
        "Building analytics views that are both visually clear and useful for day-to-day decision-making.",
        "Ensuring secure route handling and auth flow across the full application."
      ],
      futureImprovements: [
        "Advanced role-based permissions for different team members.",
        "Automated reminders and email follow-ups.",
        "Deeper sales forecasting and conversion insights.",
        "Integration with communication and calendar tools."
      ],
      feasibility: [
        "The app uses a practical MERN stack setup that is easy to deploy and maintain.",
        "It focuses on a real business need: structured lead management for growing teams.",
        "The dashboard and workflow are designed to be simple, effective, and immediately useful."
      ],
      novelty: [
        "A complete lead-to-conversion lifecycle within a single dashboard experience.",
        "A polished admin analytics layer that turns leads into meaningful business metrics.",
        "A strong balance of usability, data visibility, and secure full-stack implementation."
      ],
      business: {
        model: "Designed for small businesses, agencies, and service teams that want a lightweight CRM without a heavy enterprise setup.",
        valueProps: [
          "Faster lead follow-up and better team coordination.",
          "Clear visibility into conversion trends and performance.",
          "A simple system that can be adopted quickly without much complexity."
        ]
      }
    }
  },
  {
    title: "Restaurant Management System",
    subtitle: "MERN Stack | Reservations + Admin Dashboard",
    description: "A premium restaurant platform with menu browsing, reservations, order tracking, admin analytics, and a polished digital experience.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Antony136/Restaurant-Website",
    live: "#",
    details: {
      problemStatement: "Restaurants need a modern way to present their brand, manage reservations, handle orders, and give guests a smooth experience from discovery to booking. This project builds that experience into a full-stack web platform.",
      features: [
        { title: "Guest Experience", desc: "Includes a curated digital menu, smart cart, and personalized travel through the restaurant journey." },
        { title: "Reservation System", desc: "Supports table booking with special notes, automated confirmation flow, and guest-specific tracking." },
        { title: "Order & Status Tracking", desc: "Lets users monitor order progress and keeps the experience interactive and engaging." },
        { title: "Admin Intelligence Hub", desc: "Provides analytics, inventory management, order handling, and reservation oversight from one dashboard." },
        { title: "Premium UI", desc: "Uses polished motion, thoughtful spacing, and a refined visual language to match a luxury hospitality brand." },
        { title: "Authentication & Access", desc: "Uses JWT-based authentication to protect admin routes and secure business operations." }
      ],
      challenges: [
        "Creating a premium experience that still feels intuitive and lightweight for users.",
        "Designing a system that covers both guest interaction and administrative operations.",
        "Balancing visual polish with real-world functional workflows like bookings and inventory."
      ],
      futureImprovements: [
        "Online payments and integrated checkout.",
        "Real-time kitchen and delivery updates.",
        "Advanced reservation calendars and staff scheduling.",
        "Loyalty and customer engagement modules."
      ],
      feasibility: [
        "The system is built around real restaurant operations such as menu management, reservations, and order workflows.",
        "It uses a modular MERN stack that can scale into a more complete hospitality platform over time.",
        "The visual design and experience make it suitable for both modern startups and premium dining spaces."
      ],
      novelty: [
        "A strong focus on experience design alongside operational features.",
        "A complete hospitality workflow built into a single product experience.",
        "An elegant interface that makes the platform feel more premium than a basic restaurant site."
      ],
      business: {
        model: "Built for restaurants, cafés, and hospitality brands that want a stylish online presence with operational tools built in.",
        valueProps: [
          "Better guest experience through digital reservations and tracking.",
          "Improved operational visibility for business owners and managers.",
          "A stronger digital brand presence with a polished, modern interface."
        ]
      }
    }
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects">
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '15px' }}>Featured <span className="gradient-text">Projects</span></h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto' }}>A selection of projects where I combine full-stack development, AI, and practical problem-solving to create meaningful digital experiences.</p>
      </div>

      <div className="grid grid-3">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="glass-card"
            style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}
          >
            <h3 style={{ fontSize: '1.5rem' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tech.slice(0, 4).map(t => (
                <span key={t} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--glass-border)', borderRadius: '20px' }}>{t}</span>
              ))}
              {project.tech.length > 4 && <span style={{ fontSize: '0.75rem', padding: '4px 10px', color: 'var(--text-secondary)' }}>+{project.tech.length - 4} more</span>}
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <button 
                onClick={() => setSelectedProject(project)}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: 0 }}
              >
                View Details <ArrowRight size={16} />
              </button>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                {project.github && project.github !== '#' && (
                  <a href={project.github} aria-label={`GitHub repo for ${project.title}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><Github size={20} /></a>
                )}
                {project.live && project.live !== '#' && (
                  <a href={project.live} aria-label={`Live demo for ${project.title}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><ExternalLink size={20} /></a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal overlaying the app */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      
    </section>
  );
};

export default Projects;
