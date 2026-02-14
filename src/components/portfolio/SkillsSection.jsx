import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Database, Cloud, Palette, Wrench } from 'lucide-react';

const categoryIcons = {
  frontend: Code,
  backend: Terminal,
  database: Database,
  devops: Cloud,
  design: Palette,
  tools: Wrench,
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Bases de données',
  devops: 'DevOps',
  design: 'Design',
  tools: 'Outils',
};

export default function SkillsSection({ skills, onInteraction }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'tools';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full mb-6">
            <Terminal className="w-5 h-5 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-semibold">Stack Technique</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Mes <span className="text-[#F5AD27]">Compétences</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions robustes
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, catSkills], index) => {
            const Icon = categoryIcons[category] || Wrench;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onViewportEnter={() => onInteraction('skills_viewed', 10)}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-[#F5AD27]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#F5AD27]/10">
                    <Icon className="w-6 h-6 text-[#F5AD27]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {categoryLabels[category]}
                  </h3>
                </div>

                <div className="space-y-4">
                  {catSkills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-[#F5AD27] font-bold text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 + i * 0.05 }}
                          className="h-full bg-gradient-to-r from-[#F5AD27] to-yellow-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}