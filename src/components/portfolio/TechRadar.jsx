import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Star, Code } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const techStack = [
  { name: 'React', category: 'frontend', trend: 'stable', hot: true, using: true },
  { name: 'Next.js', category: 'frontend', trend: 'rising', hot: true, using: true },
  { name: 'TypeScript', category: 'language', trend: 'rising', hot: true, using: true },
  { name: 'Node.js', category: 'backend', trend: 'stable', hot: false, using: true },
  { name: 'Python', category: 'backend', trend: 'stable', hot: false, using: true },
  { name: 'PostgreSQL', category: 'database', trend: 'stable', hot: false, using: true },
  { name: 'MongoDB', category: 'database', trend: 'stable', hot: false, using: true },
  { name: 'Docker', category: 'devops', trend: 'stable', hot: false, using: true },
  { name: 'Kubernetes', category: 'devops', trend: 'rising', hot: true, using: false },
  { name: 'GraphQL', category: 'backend', trend: 'stable', hot: true, using: true },
  { name: 'Tailwind CSS', category: 'frontend', trend: 'rising', hot: true, using: true },
  { name: 'Vue.js', category: 'frontend', trend: 'stable', hot: false, using: true },
  { name: 'Rust', category: 'language', trend: 'rising', hot: true, using: false },
  { name: 'Go', category: 'language', trend: 'rising', hot: true, using: false },
];

const categories = [
  { id: 'all', label: 'Toutes', icon: Code },
  { id: 'frontend', label: 'Frontend', icon: Star },
  { id: 'backend', label: 'Backend', icon: Zap },
  { id: 'database', label: 'Database', icon: TrendingUp },
];

export default function TechRadar({ onInteraction }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTech = activeCategory === 'all' 
    ? techStack 
    : techStack.filter(t => t.category === activeCategory);

  const getTrendIcon = (trend) => {
    if (trend === 'rising') return '📈';
    if (trend === 'declining') return '📉';
    return '➡️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => onInteraction('tech_radar_viewed', 10)}
      className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-[#F5AD27]" />
            <h3 className="text-2xl font-bold text-white">Tech Radar</h3>
          </div>
          <p className="text-slate-400 text-sm">Technologies que j'utilise et surveille</p>
        </div>

        <Badge className="bg-[#F5AD27]/10 border border-[#F5AD27]/30 text-[#F5AD27] text-xs">
          {new Date().getFullYear()} Edition
        </Badge>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(cat.id);
                onInteraction('tech_radar_filter', 5);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#F5AD27] text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredTech.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className={`relative p-4 rounded-xl border transition-all ${
              tech.using
                ? 'bg-slate-800/50 border-slate-700 hover:border-[#F5AD27]/50'
                : 'bg-slate-800/20 border-slate-800 opacity-60'
            }`}
          >
            {/* Hot Badge */}
            {tech.hot && (
              <div className="absolute -top-2 -right-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                    🔥 HOT
                  </Badge>
                </motion.div>
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">{tech.name}</span>
              <span className="text-lg">{getTrendIcon(tech.trend)}</span>
            </div>

            <div className="flex items-center gap-2">
              {tech.using && (
                <Badge variant="outline" className="text-[#F5AD27] border-[#F5AD27]/30 text-xs">
                  Using
                </Badge>
              )}
              {!tech.using && (
                <Badge variant="outline" className="text-slate-500 border-slate-700 text-xs">
                  Watching
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>📈</span>
            <span>En croissance</span>
          </div>
          <div className="flex items-center gap-2">
            <span>➡️</span>
            <span>Stable</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span>Tendance 2026</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}