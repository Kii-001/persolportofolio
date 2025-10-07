// Portfolio Configuration
const PortfolioConfig = {
    // Personal Information
    personal: {
        name: "Fathur Rizky",
        title: "Creative Web Developer",
        email: "fathurriski456@gmail.com",
        phone: "+62 812 3456 7890",
        location: "Medan, Indonesia",
        description: "Passionate web developer creating digital experiences that matter. Let's build something amazing together."
    },

    // Social Media Links
    social: {
        github: "https://github.com/fathurrizky",
        linkedin: "https://linkedin.com/in/fathurrizky",
        instagram: "https://instagram.com/fathurrizky",
        twitter: "https://twitter.com/fathurrizky"
    },

    // Skills Configuration
    skills: {
        technical: [
            { name: "HTML5 & CSS3", percentage: 95 },
            { name: "JavaScript", percentage: 90 },
            { name: "React.js", percentage: 85 },
            { name: "Node.js", percentage: 80 },
            { name: "Vue.js", percentage: 75 },
            { name: "TypeScript", percentage: 70 }
        ],
        professional: [
            { name: "Problem Solving", percentage: 90 },
            { name: "Teamwork", percentage: 85 },
            { name: "Communication", percentage: 88 },
            { name: "Creativity", percentage: 82 }
        ]
    },

    // Projects Configuration
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A fully responsive e-commerce platform with modern design, secure payment integration, and excellent user experience.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "https://example-ecommerce.com",
            githubUrl: "https://github.com/fathurrizky/ecommerce"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Productivity application with drag-and-drop interface, real-time collaboration, and advanced task organization.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            technologies: ["Vue.js", "Firebase", "SCSS", "PWA"],
            liveUrl: "https://example-tasks.com",
            githubUrl: "https://github.com/fathurrizky/taskapp"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Real-time weather application with interactive maps, forecasts, and beautiful data visualization.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
            technologies: ["JavaScript", "API", "Chart.js", "CSS3"],
            liveUrl: "https://example-weather.com",
            githubUrl: "https://github.com/fathurrizky/weather"
        }
    ],

    // Experience Configuration
    experience: [
        {
            period: "2022 - Present",
            position: "Senior Web Developer",
            company: "Tech Solutions Inc.",
            description: "Lead frontend development for client projects, mentor junior developers, and implement responsive design principles.",
            achievements: [
                "Improved website performance by 40%",
                "Led a team of 5 developers",
                "Implemented CI/CD pipeline"
            ]
        },
        {
            period: "2020 - 2022",
            position: "Frontend Developer",
            company: "Digital Creative Agency",
            description: "Developed responsive websites, collaborated with design teams, and optimized website performance.",
            achievements: [
                "Built 20+ client websites",
                "Reduced load times by 30%",
                "Implemented accessibility standards"
            ]
        }
    ],

    // Education Configuration
    education: [
        {
            period: "2016 - 2020",
            degree: "Bachelor of Computer Science",
            institution: "University of Indonesia",
            description: "Graduated with honors. Focus on web technologies and user experience design.",
            gpa: "3.8/4.0"
        }
    ],

    // Contact Configuration
    contact: {
        emailService: {
            enabled: true,
            service: "emailjs", // or "formspree"
            publicKey: "YOUR_PUBLIC_KEY",
            serviceID: "YOUR_SERVICE_ID",
            templateID: "YOUR_TEMPLATE_ID"
        },
        formFields: [
            {
                name: "name",
                type: "text",
                placeholder: "Your Name",
                required: true
            },
            {
                name: "email",
                type: "email",
                placeholder: "Your Email",
                required: true
            },
            {
                name: "message",
                type: "textarea",
                placeholder: "Your Message",
                required: true
            }
        ]
    },

    // Animation Configuration
    animations: {
        enabled: true,
        aos: {
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        },
        particles: {
            enabled: true,
            count: 50,
            color: "var(--primary-color)"
        }
    },

    // Theme Configuration
    themes: {
        default: "light",
        available: ["light", "dark"],
        autoDetect: true
    },

    // Performance Configuration
    performance: {
        lazyLoading: true,
        debounceScroll: true,
        preloadCritical: true,
        cacheStrategy: "default"
    }
};

// Make config globally available
window.PortfolioConfig = PortfolioConfig;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioConfig;
}