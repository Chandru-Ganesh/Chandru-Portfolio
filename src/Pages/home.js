import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../App.css'
import { 
    Github, 
    Linkedin, 
    Twitter, 
    Mail, 
    Phone, 
    MapPin, 
    Download, 
    ExternalLink,
    Code,
    Star,
    GitFork,
    Eye,
    Loader2,
    Database,
    Award,
    Calendar,
    Send,
    Menu,
    X,
    Wrench,
} from 'lucide-react';

// Navbar Component
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Home', 'About', 'Projects', 'Skills', 'Certifications', 'Contact'];

    return (
        <>
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
            style={{ scaleX }}
        />
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
            scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                CG
                </motion.div>
            
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    {navItems.map((item, index) => (
                    <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {item}
                    </motion.a>
                    ))}
                </div>
            </div>
            
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-300 hover:text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </div>
        
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-900/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
    />
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" 
        initial={{opacity:0}}
        animate={{opacity:0.2}}
        transition={{duration:2, delay:1}}
        />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <div className="text-4xl font-bold text-white">CG</div>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="animate-gradient">
            Chandru Ganesh
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Tech Explorer | Full Stack Learner | B.Tech IT Student
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="#projects"
            className="px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate B.Tech IT student with a deep love for technology and innovation. 
              My journey in tech spans full-stack development, where I enjoy creating seamless 
              user experiences and robust backend solutions.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Always eager to learn and explore new technologies, I believe in the power of code 
              to solve real-world problems and make a positive impact.
            </p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Education</h3>
              <div className="space-y-2">
                <p className="text-gray-300"><span className="font-medium">B.Tech in Information Technology</span></p>
                <p className="text-gray-400">Currently pursuing • Expected 2025</p>
                <p className="text-gray-400">CGPA: 8.5/10</p>
              </div>
            </div>
            
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="text-2xl font-bold text-white mb-2">Full Stack Developer</h3>
                <p className="text-gray-300">Building the future, one line of code at a time</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to determine project category based on languages and topics
  const determineCategory = (languages, topics) => {
    const topicsLower = topics.map(t => t.toLowerCase());
    const languagesLower = languages.map(l => l.toLowerCase());
    
    if (topicsLower.some(t => ['machine-learning', 'ai', 'tensorflow', 'pytorch'].includes(t)) ||
        languagesLower.includes('python') && topicsLower.some(t => ['ml', 'ai', 'data'].includes(t))) {
      return 'Machine Learning';
    }
    
    if (topicsLower.some(t => ['blockchain', 'ethereum', 'web3'].includes(t)) ||
        languagesLower.includes('solidity')) {
      return 'Blockchain';
    }
    
    if (topicsLower.some(t => ['mobile', 'android', 'ios', 'flutter', 'react-native'].includes(t)) ||
        languagesLower.some(l => ['kotlin', 'swift', 'dart', 'java'].includes(l))) {
      return 'Mobile App';
    }
    
    if (topicsLower.some(t => ['iot', 'arduino', 'raspberry-pi', 'sensors'].includes(t)) ||
        languagesLower.includes('c++')) {
      return 'IoT';
    }
    
    if (languagesLower.some(l => ['javascript', 'typescript', 'html', 'css'].includes(l))) {
      return 'Web Application';
    }
    
    return 'Other';
  };

  // Function to generate placeholder image based on category
  const generateImage = (category, name) => {
    const colors = {
      'Machine Learning': '10b981',
      'Web Application': '3b82f6',
      'Mobile App': 'ec4899',
      'Blockchain': '8b5cf6',
      'IoT': 'f59e0b',
      'Other': '6b7280'
    };
    
    const color = colors[category] || '6b7280';
    const title = encodeURIComponent(name.replace(/[-_]/g, ' '));
    return `https://via.placeholder.com/400x250/1f2937/${color}?text=${title}`;
  };

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/Chandru-Ganesh/repos?per_page=50&sort=updated');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter out forks and empty repos, then get detailed info for each
        const filteredRepos = repos.filter(repo => !repo.fork && repo.size > 0);
        
        // Fetch additional details for each repo (languages, topics, etc.)
        const detailedRepos = await Promise.all(
          filteredRepos.slice(0, 8).map(async (repo) => { // Get top 8 to ensure we have 4 good ones
            try {
              // Fetch languages
              const langResponse = await fetch(repo.languages_url);
              const languages = langResponse.ok ? Object.keys(await langResponse.json()) : [];
              
              // Fetch topics and additional repo details
              const repoResponse = await fetch(repo.url, {
                headers: { Accept: 'application/vnd.github.mercy-preview+json' }
              });
              const repoDetails = repoResponse.ok ? await repoResponse.json() : repo;
              
              const category = determineCategory(languages, repoDetails.topics || []);
              
              return {
                id: repo.id,
                title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: repo.description || 'A project showcasing development skills and innovative solutions.',
                tech: languages.slice(0, 5), // Limit to 5 languages
                category,
                image: generateImage(category, repo.name),
                github: repo.html_url,
                demo: repo.homepage || `${repo.html_url}#readme`,
                stats: {
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  views: repo.watchers_count
                },
                lastUpdated: new Date(repo.updated_at),
                featured: repo.stargazers_count > 0 || repo.forks_count > 0
              };
            } catch (err) {
              console.warn(`Error fetching details for ${repo.name}:`, err);
              return null;
            }
          })
        );
        
        // Filter out failed requests and sort by activity (stars + forks + recent updates)
        const validRepos = detailedRepos
          .filter(repo => repo !== null)
          .sort((a, b) => {
            const scoreA = (a.stats.stars * 3) + (a.stats.forks * 2) + (a.lastUpdated.getTime() / 1000000000);
            const scoreB = (b.stats.stars * 3) + (b.stats.forks * 2) + (b.lastUpdated.getTime() / 1000000000);
            return scoreB - scoreA;
          })
          .slice(0, 4); // Only show top 4 projects on home page
        
        setProjects(validRepos);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError(err.message);
        
        // Fallback to static projects if API fails
        const fallbackProjects = [
          {
            id: 1,
            title: "Featured Project",
            description: "Innovative solution showcasing full-stack development skills with modern technologies.",
            tech: ["React", "Node.js", "MongoDB"],
            image: "https://via.placeholder.com/400x250/1f2937/3b82f6?text=Featured+Project",
            github: "https://github.com/Chandru-Ganesh",
            demo: "https://github.com/Chandru-Ganesh",
            stats: { stars: 0, forks: 0, views: 0 }
          }
        ];
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development
            </p>
          </motion.div>
          
          <div className="flex justify-center items-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300">Loading projects from GitHub...</p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-full text-xs font-medium">
                    {project.category || 'Project'}
                  </span>
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span className="text-sm">Code</span>
                    </motion.a>
                  </div>
                  
                  {/* GitHub stats */}
                  <div className="flex items-center space-x-3 text-gray-400 text-xs">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {project.stats.stars}
                    </div>
                    <div className="flex items-center">
                      <GitFork className="w-3 h-3 mr-1" />
                      {project.stats.forks}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {project.stats.views}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link to="/projects">
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Backend",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Python", level: 75 },
        { name: "PHP", level: 70 },
        { name: "Express.js", level: 80 },
        { name: "Django", level: 65 }
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Firebase", level: 70 }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 65 },
        { name: "AWS", level: 60 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My technical expertise spans across various domains of software development
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-blue-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

// Certifications Section
const Certifications = () => {
  const certifications = [
    {
      title: "Full Stack Web Development",
      provider: "NPTEL",
      date: "2024",
      description: "Comprehensive course covering React, Node.js, and database management",
      status: "Completed"
    },
    {
      title: "Python for Data Science",
      provider: "Coursera",
      date: "2024",
      description: "Advanced Python programming with focus on data analysis and visualization",
      status: "Completed"
    },
    {
      title: "Smart India Hackathon",
      provider: "Government of India",
      date: "2023",
      description: "Participated in national-level hackathon with innovative solution for smart cities",
      status: "Participated"
    },
    {
      title: "AWS Cloud Practitioner",
      provider: "Amazon Web Services",
      date: "2023",
      description: "Fundamentals of cloud computing and AWS services",
      status: "In Progress"
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My continuous learning journey and professional achievements
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-bold text-white mb-1 md:mb-0">{cert.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-blue-400 font-medium">{cert.provider}</span>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{cert.date}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3">{cert.description}</p>
                
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : cert.status === 'In Progress'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/certifications">
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Certificate & Achievements
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8">
                Feel free to reach out if you're looking for a developer, have a question, 
                or just want to connect.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">chandru.ganesh@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">+91 9876543210</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/chandru-ganesh"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-6 h-6 text-gray-400 hover:text-blue-400" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/chandru-ganesh"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-400" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Your Name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Chandru Ganesh
            </h3>
            <p className="text-gray-400 mb-4">
              Passionate full-stack developer crafting digital experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/chandru-ganesh"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/chandru-ganesh"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/chandru_ganesh"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>chandru.ganesh@email.com</p>
              <p>+91 9876543210</p>
              <p>Chennai, Tamil Nadu, India</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Chandru Ganesh. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with React, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () =>{
    return(
        <div className='min-h-screen bg-black text-white'>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        </div>
    );
};

export default Home;