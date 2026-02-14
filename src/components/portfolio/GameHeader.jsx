import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, MessageCircle, Download, ShieldCheck } from 'lucide-react';

export default function GameHeader({ score, level, onChatToggle }) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animation fluide du compteur de score
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore(prev => {
        if (prev < score) return prev + 1;
        if (prev > score) return prev - 1;
        return prev;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [score]);

  const levelNames = {
    1: '🔍 Visiteur Curieux',
    2: '💼 Recruteur Intéressé',
    3: '🎯 Client Potentiel',
    4: '🚀 Partenaire Premium',
    5: '👑 VIP Absolu'
  };

  // Calcul du pourcentage de progression vers le prochain niveau (palier de 100 XP)
  const progress = (score % 100);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-[#F5AD27]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Section Gauche : Score & Badge */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 shadow-inner"
            >
              <Trophy className="w-5 h-5 text-[#F5AD27]" />
              <span className="text-white font-mono font-bold text-lg leading-none">
                {displayScore}
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider hidden xs:inline">XP</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-2 bg-[#F5AD27]/5 border border-[#F5AD27]/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-[#F5AD27]" />
              <span className="text-[#F5AD27] text-xs font-bold uppercase tracking-tight">
                {levelNames[level]}
              </span>
            </div>
          </div>

          {/* Section Centre : Barre de progression (Masquée sur mobile) */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xs xl:max-w-md">
            <span className="text-slate-500 text-[10px] font-bold uppercase">LVL {level}</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#F5AD27] to-yellow-400 shadow-[0_0_10px_rgba(245,173,39,0.5)]"
              />
            </div>
            <span className="text-slate-500 text-[10px] font-bold uppercase">{level + 1}</span>
          </div>

          {/* Section Droite : Actions (CV & Aide) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bouton CV Parallèle - Toujours accessible */}
            <motion.a
              href="/cv-standard.pdf" // Remplace par ton vrai chemin
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">CV</span>
            </motion.a>

            {/* Bouton Aide Mission */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onChatToggle}
              className="group relative px-4 py-2 bg-[#F5AD27] hover:bg-yellow-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#F5AD27]/10 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Aide Mission</span>
              
              {/* Point de notification animé */}
              <motion.div
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-slate-950 rounded-full"
              />
            </motion.button>
          </div>
        </div>

        {/* Badge Mobile (Apparaît sous le header sur petit écran) */}
        <div className="md:hidden mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#F5AD27]/10 border border-[#F5AD27]/20 rounded-full px-3 py-1">
                <ShieldCheck className="w-3 h-3 text-[#F5AD27]" />
                <span className="text-[#F5AD27] text-[10px] font-bold uppercase tracking-widest">
                    {levelNames[level].split(' ')[1]} {levelNames[level].split(' ')[2] || ''}
                </span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}