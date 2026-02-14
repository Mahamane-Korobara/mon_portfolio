import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ExperienceTimeline({ experiences, onInteraction }) {
  const [unlockedExp, setUnlockedExp] = useState(new Set([0]));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sortedExperiences = [...experiences].sort((a, b) => 
    new Date(b.start_date) - new Date(a.start_date)
  );

  const handleExpClick = (index) => {
    if (!unlockedExp.has(index)) {
      setUnlockedExp(prev => new Set([...prev, index]));
      onInteraction('experience_unlocked', 40);
    }
  };

  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border-2 border-[#F5AD27]/50 rounded-2xl mb-6">
            <Briefcase className="w-6 h-6 text-[#F5AD27]" />
            <span className="text-white font-semibold">PARCOURS PROFESSIONNEL</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Timeline <span className="text-[#F5AD27]">Interactive</span>
          </h2>
          <p className="text-slate-400">Cliquez sur chaque expérience pour révéler les détails</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F5AD27] via-[#F5AD27]/50 to-transparent" />

          {sortedExperiences.map((exp, index) => {
            const isUnlocked = unlockedExp.has(index);
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-center mb-12 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleExpClick(index)}
                    className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                      isUnlocked
                        ? 'bg-[#F5AD27] border-slate-950 shadow-lg shadow-[#F5AD27]/50'
                        : 'bg-slate-800 border-slate-950 cursor-pointer hover:bg-slate-700'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle className="w-4 h-4 text-slate-900" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </motion.button>
                </div>

                {/* Content Card */}
                <motion.div
                  onClick={() => handleExpClick(index)}
                  whileHover={{ y: -5 }}
                  className={`w-full md:w-[calc(50%-3rem)] ml-20 md:ml-0 ${
                    isLeft ? 'md:pr-12' : 'md:pl-12'
                  } cursor-pointer`}
                >
                  <div className={`relative rounded-2xl p-6 border-2 transition-all duration-500 ${
                    isUnlocked
                      ? 'bg-slate-900 border-[#F5AD27]/30 hover:border-[#F5AD27]'
                      : 'bg-slate-900/30 border-slate-800'
                  }`}>
                    {/* Lock Overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-[#F5AD27] mx-auto mb-2" />
                          <p className="text-[#F5AD27] font-bold text-sm">Cliquez pour débloquer</p>
                          <p className="text-slate-500 text-xs">+40 XP</p>
                        </div>
                      </div>
                    )}

                    {/* Current Badge */}
                    {exp.current && isUnlocked && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5AD27]/10 border border-[#F5AD27]/30 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#F5AD27] animate-pulse" />
                        <span className="text-[#F5AD27] text-xs font-bold">ACTUELLEMENT</span>
                      </div>
                    )}

                    <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                      {exp.title}
                    </h3>

                    <div className={`flex flex-wrap items-center gap-3 mb-3 text-sm ${isUnlocked ? 'text-slate-400' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#F5AD27]" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {isUnlocked && (
                      <>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(exp.start_date), 'MMM yyyy', { locale: fr })}
                            {' — '}
                            {exp.current ? "Aujourd'hui" : exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy', { locale: fr }) : "Présent"}
                          </span>
                        </div>

                        {exp.description && (
                          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-[#F5AD27] flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            <Sparkles className="w-4 h-4 inline text-[#F5AD27] mr-2" />
            {unlockedExp.size} / {sortedExperiences.length} expériences découvertes
          </p>
        </motion.div>
      </div>
    </section>
  );
}