import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ExperienceSection({ experiences, onInteraction }) {
  const sortedExperiences = [...experiences].sort((a, b) => 
    new Date(b.start_date) - new Date(a.start_date)
  );

  return (
    <section id="experience" className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full mb-6">
            <Briefcase className="w-5 h-5 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-semibold">Parcours</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Mon <span className="text-[#F5AD27]">Expérience</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Un parcours riche en défis techniques et en collaborations enrichissantes
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F5AD27] via-[#F5AD27]/50 to-transparent" />

          {sortedExperiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onViewportEnter={() => onInteraction('experience_viewed', 10)}
                className={`relative flex items-center mb-12 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full border-4 ${
                    exp.current 
                      ? 'bg-[#F5AD27] border-slate-950 shadow-lg shadow-[#F5AD27]/50 animate-pulse' 
                      : 'bg-slate-800 border-slate-950'
                  }`} />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ml-20 md:ml-0 ${
                  isLeft ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-[#F5AD27]/50 transition-all"
                  >
                    {/* Current Badge */}
                    {exp.current && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5AD27]/10 border border-[#F5AD27]/30 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#F5AD27] animate-pulse" />
                        <span className="text-[#F5AD27] text-xs font-bold">ACTUELLEMENT</span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#F5AD27] transition-colors">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-slate-400">
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

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(exp.start_date), 'MMMM yyyy', { locale: fr })}
                        {' — '}
                        {exp.current 
                          ? "Aujourd'hui" 
                          : exp.end_date 
                            ? format(new Date(exp.end_date), 'MMMM yyyy', { locale: fr })
                            : "Présent"
                        }
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-slate-400 mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-[#F5AD27] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}