import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Eye, Github, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ['all', 'web', 'mobile', 'fullstack', 'api', 'design'];

// Composant galerie d'images
function ImageGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-80 overflow-hidden bg-slate-950">
      {/* Image principale */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 backdrop-blur-sm rounded-full text-white hover:bg-slate-800 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 backdrop-blur-sm rounded-full text-white hover:bg-slate-800 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#F5AD27] w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectsSection({ projects, onInteraction }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    onInteraction('project_viewed', 20);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full mb-6">
            <Rocket className="w-5 h-5 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-semibold">Mes Réalisations</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Projets <span className="text-[#F5AD27]">Récents</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Une sélection de projets qui démontrent mes compétences et mon expertise
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(cat);
                onInteraction('category_changed', 5);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#F5AD27] text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#F5AD27]/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  
                  {project.featured && (
                    <Badge className="absolute top-3 right-3 bg-[#F5AD27] text-slate-900 font-bold">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <Badge variant="outline" className="text-[#F5AD27] border-[#F5AD27]/30 mb-3 uppercase text-xs">
                    {project.category}
                  </Badge>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F5AD27] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.short_description}
                  </p>

                  {/* Tech Stack */}
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
                </div>
              </div>
            </motion.div>
          ))}
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
                {/* Header with Gallery */}
                <div className="relative rounded-t-3xl overflow-hidden">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <ImageGallery images={selectedProject.images} title={selectedProject.title} />
                  ) : (
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={selectedProject.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    </div>
                  )}
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-3 bg-slate-900/80 backdrop-blur-sm rounded-xl text-white hover:bg-slate-800 transition-all z-10"
                  >
                    ✕
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <Badge className="bg-[#F5AD27] text-slate-900 font-bold mb-3">
                      {selectedProject.category?.toUpperCase()}
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">{selectedProject.title}</h3>
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
                        onClick={() => onInteraction('live_demo_clicked', 30)}
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
                        onClick={() => onInteraction('github_clicked', 30)}
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
      </div>
    </section>
  );
}