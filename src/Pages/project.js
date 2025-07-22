import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ArrowLeft, 
  Filter, 
  Search,
  Calendar,
  Code,
  Star,
  Eye,
  GitFork,
  Loader2
} from 'lucide-react';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
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
    return `https://via.placeholder.com/600x400/1f2937/${color}?text=${title}`;
  };

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/Chandru-Ganesh/repos?per_page=100&sort=updated');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter out forks and empty repos, then get detailed info for each
        const filteredRepos = repos.filter(repo => !repo.fork && repo.size > 0);
        
        // Fetch additional details for each repo (languages, topics, etc.)
        const detailedRepos = await Promise.all(
          filteredRepos.map(async (repo) => {
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
                description: repo.description || 'No description available',
                fullDescription: repo.description || 'No description available',
                tech: languages.slice(0, 6), // Limit to 6 languages
                category,
                image: generateImage(category, repo.name),
                github: repo.html_url,
                demo: repo.homepage || `${repo.html_url}#readme`,
                featured: repo.stargazers_count > 5 || repo.forks_count > 2,
                stats: {
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  views: repo.watchers_count
                },
                date: new Date(repo.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit' 
                }).replace('/', '-'),
                status: repo.archived ? 'Archived' : 'Active',
                lastUpdated: new Date(repo.updated_at),
                topics: repoDetails.topics || []
              };
            } catch (err) {
              console.warn(`Error fetching details for ${repo.name}:`, err);
              return {
                id: repo.id,
                title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: repo.description || 'No description available',
                fullDescription: repo.description || 'No description available',
                tech: ['JavaScript'], // Default fallback
                category: 'Other',
                image: generateImage('Other', repo.name),
                github: repo.html_url,
                demo: repo.homepage || `${repo.html_url}#readme`,
                featured: false,
                stats: {
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  views: repo.watchers_count
                },
                date: new Date(repo.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit' 
                }).replace('/', '-'),
                status: repo.archived ? 'Archived' : 'Active',
                lastUpdated: new Date(repo.updated_at),
                topics: []
              };
            }
          })
        );
        
        // Sort by last updated date (most recent first)
        const sortedRepos = detailedRepos.sort((a, b) => b.lastUpdated - a.lastUpdated);
        
        setProjects(sortedRepos);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
        
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-full text-xs font-medium">
            {project.category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {project.date}
          </div>
        </div>
        
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
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="text-sm">View</span>
            </motion.a>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-400 text-xs">
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
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-br from-gray-900 via-black to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading projects from GitHub...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Projects</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="relative py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </motion.button>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GitHub Projects
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Live projects from my GitHub repository showcasing real development work
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                <span>{projects.length} Projects</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>{projects.filter(p => p.featured).length} Featured</span>
              </div>
              <div className="flex items-center">
                <Github className="w-5 h-5 mr-2" />
                <span>Live Data</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="py-8 px-4 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex-1 max-w-md"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </motion.div>
            
            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedFilter === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-300">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                  {selectedFilter !== 'All' && ` in ${selectedFilter}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </h2>
                </motion.div>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/50 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {projects.length}
              </div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {projects.reduce((acc, p) => acc + p.stats.stars, 0)}
              </div>
              <div className="text-gray-400">GitHub Stars</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {projects.reduce((acc, p) => acc + p.stats.forks, 0)}
              </div>
              <div className="text-gray-400">Total Forks</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {projects.reduce((acc, p) => acc + p.stats.views, 0)}
              </div>
              <div className="text-gray-400">Total Watchers</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interested in Collaboration?
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:contact@example.com"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="https://github.com/Chandru-Ganesh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 mr-2" />
                View GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;