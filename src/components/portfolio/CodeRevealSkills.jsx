import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Cpu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CodeRevealSkills({ skills, onInteraction }) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedCode, setRevealedCode] = useState('');
  const [hasRevealed, setHasRevealed] = useState(false);

  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'tools';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const generateCode = () => {
    const categories = {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      devops: 'DevOps',
      design: 'Design',
      tools: 'Tools',
    };

    let code = `// 🎯 COMPÉTENCES TECHNIQUES\n\nconst developerSkills = {\n`;

    Object.entries(groupedSkills).forEach(([cat, catSkills]) => {
      code += `  ${cat}: {\n`;
      catSkills.forEach((skill) => {
        code += `    "${skill.name}": ${skill.level}%, // Maîtrise: ${skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Avancé' : 'Intermédiaire'}\n`;
      });
      code += `  },\n`;
    });

    code += `};\n\n`;
    code += `// ✅ Prêt pour mission complexe\n`;
    code += `console.log("Développeur chargé avec succès! 🚀");`;

    return code;
  };

  const revealCode = async () => {
    if (hasRevealed) return;

    setIsRevealing(true);
    setHasRevealed(true);
    onInteraction('skills_revealed', 100);

    const fullCode = generateCode();
    let current = '';

    for (let i = 0; i < fullCode.length; i++) {
      current += fullCode[i];
      setRevealedCode(current);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    setIsRevealing(false);
  };

  return (
    <section
      id="skills"
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5AD27] to-transparent" />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#F5AD27] font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {
              ['{}', '[]', '()', '<>', '/>', '::'][
                Math.floor(Math.random() * 6)
              ]
            }
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-950 border-2 border-[#F5AD27] rounded-2xl mb-6">
            <Terminal className="w-6 h-6 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-bold text-lg">ZONE 2</span>
            <span className="text-slate-400">—</span>
            <span className="text-white font-semibold">ARSENAL TECHNIQUE</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Exécutez le <span className="text-[#F5AD27]">Code</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Lancez la compilation pour révéler mes compétences en temps réel.
            Regardez le code s'écrire sous vos yeux !
          </p>

          {!hasRevealed && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={revealCode}
                size="lg"
                className="bg-gradient-to-r from-[#F5AD27] to-yellow-500 hover:from-[#F5AD27]/90 hover:to-yellow-500/90 text-slate-900 font-black px-12 py-8 rounded-2xl text-xl shadow-2xl shadow-[#F5AD27]/30"
              >
                <Play className="w-6 h-6 mr-3" />
                COMPILER LES COMPÉTENCES
                <Zap className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                +100 XP pour l'exécution
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Terminal Display */}
        <AnimatePresence>
          {(isRevealing || hasRevealed) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="relative"
            >
              {/* Terminal Window */}
              <div className="bg-slate-950 rounded-3xl border-2 border-[#F5AD27]/30 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-slate-900 px-6 py-4 flex items-center gap-3 border-b border-slate-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                    <Terminal className="w-4 h-4 text-[#F5AD27]" />
                    <span>skills.js</span>
                    {isRevealing && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-[#F5AD27]"
                      >
                        ● Compilation en cours...
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-8 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400">
                    {revealedCode}
                    {isRevealing && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-[#F5AD27]"
                      >
                        ▊
                      </motion.span>
                    )}
                  </pre>
                </div>

                {/* Success Message */}
                {hasRevealed && !isRevealing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-8 pb-8"
                  >
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400 font-mono">
                        Compilation réussie! +100 XP débloqués
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Skills Visualization */}
              {hasRevealed && !isRevealing && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                >
                  {Object.entries(groupedSkills).map(
                    ([category, catSkills], index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
                      >
                        <h4 className="text-[#F5AD27] font-bold mb-4 uppercase text-sm flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          {category}
                        </h4>
                        <div className="space-y-3">
                          {catSkills.map((skill, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-white font-medium">
                                  {skill.name}
                                </span>
                                <span className="text-[#F5AD27] font-bold">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.7 + index * 0.1 + i * 0.05,
                                  }}
                                  className="h-full bg-gradient-to-r from-[#F5AD27] to-yellow-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
