import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Code, Eye, Github, ExternalLink, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InteractiveProjects({ projects, onInteraction }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [unlockedProjects, setUnlockedProjects] = useState(new Set([0])); // First project unlocked

  const handleProjectClick = (project, index) => {
    if (!unlockedProjects.has(index)) {
      // Unlock the project
      setUnlockedProjects(prev => new Set([...prev, index]));
      onInteraction('project_unlocked', 50);
    }
    setSelectedProject(project);
    onInteraction('project_viewed', 20);
  };

  const handleActionClick = (action) => {
    onInteraction(action, 30);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Zone Title */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5AD27] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border-2 border-[#F5AD27] rounded-2xl mb-6">
            <Rocket className="w-6 h-6 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-bold text-lg">ZONE 1</span>
            <span className="text-slate-400">—</span>
            <span className="text-white font-semibold">PROJETS RÉALISÉS</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Cliquez pour <span className="text-[#F5AD27]">Déverrouiller</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Chaque projet est une énigme à résoudre. Cliquez sur les cartes pour débloquer 
            les détails et gagner des XP !
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => {
            const isLocked = !unlockedProjects.has(index);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: isLocked ? 1.02 : 1.05, y: -5 }}
                onClick={() => handleProjectClick(project, index)}
                className={`relative cursor-pointer group ${isLocked ? 'opacity-75' : ''}`}
              >
                <div className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                  isLocked 
                    ? 'border-slate-700 bg-slate-900/50' 
                    : 'border-[#F5AD27]/50 bg-slate-900'
                }`}>
                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-16 h-16 text-[#F5AD27]" />
                        <p className="text-[#F5AD27] font-bold mt-3">CLIQUEZ POUR DÉBLOQUER</p>
                        <p className="text-slate-500 text-sm mt-1">+50 XP</p>
                      </motion.div>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isLocked ? 'blur-sm grayscale' : 'group-hover:scale-110'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    
                    {/* Featured Badge */}
                    {project.featured && !isLocked && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-[#F5AD27] text-slate-900 font-bold text-xs">
                          ⭐ TOP
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-[#F5AD27] border-[#F5AD27]/30 text-xs uppercase">
                        {project.category}
                      </Badge>
                      {!isLocked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>

                    <h3 className={`text-xl font-bold mb-3 ${isLocked ? 'text-slate-600' : 'text-white group-hover:text-[#F5AD27]'} transition-colors`}>
                      {project.title}
                    </h3>

                    <p className={`text-sm mb-4 line-clamp-2 ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>
                      {project.short_description}
                    </p>

                    {/* Tech Stack */}
                    {!isLocked && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="px-3 py-1 bg-slate-800 text-slate-500 text-xs rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 rounded-3xl border-2 border-[#F5AD27]/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProject.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-3 bg-slate-900/80 backdrop-blur-sm rounded-xl text-white hover:bg-slate-800 transition-all"
                  >
                    ✕
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-[#F5AD27] text-slate-900 font-bold mb-3">
                      {selectedProject.category?.toUpperCase()}
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-black text-white">{selectedProject.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#F5AD27]" />
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies?.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.live_url && (
                      <Button
                        asChild
                        onClick={() => handleActionClick('live_demo_clicked')}
                        className="bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-bold px-8 py-6 rounded-xl"
                      >
                        <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-5 h-5 mr-2" />
                          Voir le Projet Live
                        </a>
                      </Button>
                    )}
                    {selectedProject.github_url && (
                      <Button
                        asChild
                        onClick={() => handleActionClick('github_clicked')}
                        variant="outline"
                        className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 rounded-xl"
                      >
                        <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5 mr-2" />
                          Code Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500">
            <Sparkles className="w-4 h-4 inline text-[#F5AD27] mr-2" />
            {unlockedProjects.size} / {projects.length} projets débloqués
          </p>
        </motion.div>
      </div>
    </section>
  );
}