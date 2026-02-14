import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, MessageCircle } from 'lucide-react';

export default function GameHeader({ score, level, onChatToggle }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore(prev => prev < score ? prev + 1 : prev);
    }, 20);
    return () => clearInterval(interval);
  }, [score]);

  const levelNames = {
    1: '🔍 Visiteur Curieux',
    2: '💼 Recruteur Intéressé',
    3: '🎯 Client Potentiel',
    4: '🚀 Partenaire Premium',
    5: '👑 VIP Absolu'
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b-2 border-[#F5AD27]/30 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Score */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full px-4 py-2"
            >
              <Trophy className="w-5 h-5 text-[#F5AD27]" />
              <span className="text-[#F5AD27] font-bold text-lg">{displayScore}</span>
              <span className="text-slate-400 text-sm hidden sm:inline">XP</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-[#F5AD27]" />
              <span className="text-white text-sm font-medium">{levelNames[level]}</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="hidden lg:flex items-center gap-3 flex-1 max-w-md">
            <span className="text-slate-400 text-sm">Niveau {level}</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score % 100)}%` }}
                className="h-full bg-gradient-to-r from-[#F5AD27] to-yellow-500"
              />
            </div>
            <span className="text-slate-400 text-sm">{level + 1}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onChatToggle}
              className="relative px-4 py-2 bg-[#F5AD27] text-slate-900 font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-[#F5AD27]/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Aide Mission</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Level */}
        <div className="md:hidden mt-2 flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-1.5 w-fit">
          <Star className="w-3 h-3 text-[#F5AD27]" />
          <span className="text-white text-xs font-medium">{levelNames[level]}</span>
        </div>
      </div>
    </motion.div>
  );
}