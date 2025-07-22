import React, { useState, useEffect } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, Clock, Trophy, Medal, Star, Download, Eye, Loader2, RefreshCw, ArrowLeft, Home } from 'lucide-react';

const CertificationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0
  });

  // Fetch certifications from JSON file
  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from public folder - the path should be relative to public folder
      const response = await fetch('/certifications.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch certifications data`);
      }
      
      const data = await response.json();
      
      // Set the data from JSON file
      setCertifications(data.certifications || []);
      setCategories(data.categories || []);
      
      // Calculate stats
      const completed = (data.certifications || []).filter(c => c.status === 'Completed').length;
      const inProgress = (data.certifications || []).filter(c => c.status === 'In Progress').length;
      const participated = (data.certifications || []).filter(c => c.status === 'Participated').length;
      
      setStats({
        total: data.certifications?.length || 0,
        completed: completed,
        inProgress: inProgress,
        participated: participated
      });
      
    } catch (err) {
      console.error('Error fetching certifications:', err);
      setError(`Failed to load certifications: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    // You can customize this to your home route
    window.location.href = '/';
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const filteredCertifications = filter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === filter);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'Participated': return <Trophy className="w-5 h-5 text-blue-400" />;
      default: return <Award className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Participated': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return certifications.length;
    return certifications.filter(cert => cert.category === categoryId).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading certifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-red-400 mb-2">Failed to Load Data</h2>
            <p className="text-red-300 text-sm mb-4">{error}</p>
            <button 
              onClick={fetchCertifications}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Make sure the certifications.json file is in the public folder of your project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-40">
        <button 
          onClick={handleGoHome}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:border-blue-500/50 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <ArrowLeft className="w-5 h-5" />
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
      </div>

      {/* Refresh Button */}
      <div className="fixed top-6 right-6 z-40">
        <button 
          onClick={fetchCertifications}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:border-blue-500/50 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/10"
          title="Refresh certifications data"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r bg-black/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certifications & Achievements
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              My journey of continuous learning and professional growth through various certifications, courses, and competitive achievements
            </p>
            <div className="mt-8 flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.completed}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.inProgress}</div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.total}</div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
              title={category.description}
            >
              {category.label} ({getCategoryCount(category.id)})
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-gray-900 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
            >
              {/* Certificate Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(cert.status)}`}>
                    {getStatusIcon(cert.status)}
                    <span className="text-sm font-medium">{cert.status}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{cert.issueDate}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-blue-400 font-medium">{cert.provider}</p>
                  </div>
                  <Medal className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Grade:</span>
                    <span className="text-white font-medium">{cert.grade}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white font-medium">{cert.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Credential ID:</span>
                    <span className="text-white font-medium text-xs">{cert.credentialId}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  {cert.status === 'Completed' && (
                    <button className="bg-gray-700/50 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600/50 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <p className="text-xl text-gray-400">No certifications found in this category</p>
            <p className="text-gray-500 mt-2">Try selecting a different category or check back later</p>
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h2>
                  <p className="text-blue-400 font-medium">{selectedCert.provider}</p>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedCert.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Skills Acquired</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Issue Date</h4>
                    <p className="text-white">{selectedCert.issueDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Grade</h4>
                    <p className="text-white">{selectedCert.grade}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Duration</h4>
                    <p className="text-white">{selectedCert.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(selectedCert.status)}`}>
                      {getStatusIcon(selectedCert.status)}
                      <span>{selectedCert.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Credential ID</h4>
                  <p className="text-white font-mono text-sm">{selectedCert.credentialId}</p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>Verify Certificate</span>
                  </button>
                  {selectedCert.status === 'Completed' && (
                    <button className="bg-gray-700/50 text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-600/50 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;