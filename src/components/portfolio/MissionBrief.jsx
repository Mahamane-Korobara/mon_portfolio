import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowDown, Sparkles, Crosshair } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function MissionBrief({ profile, onStart }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5AD2710_1px,transparent_1px),linear-gradient(to_bottom,#F5AD2710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        {/* Animated Scanlines */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5AD27]/5 to-transparent h-32"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border-2 border-[#F5AD27]/30 rounded-2xl"
          >
            <Terminal className="w-6 h-6 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-mono font-bold text-lg">MISSION_ACTIVE.exe</span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-[#F5AD27] rounded-full"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            <span className="text-slate-400">MISSION:</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5AD27] via-yellow-400 to-[#F5AD27]">
              Trouver le Développeur Parfait
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <Crosshair className="w-6 h-6 text-[#F5AD27] mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">OBJECTIF DE LA MISSION</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Vous êtes <span className="text-[#F5AD27] font-semibold">recruteur</span>, 
                    <span className="text-[#F5AD27] font-semibold"> chef de projet</span>, ou 
                    <span className="text-[#F5AD27] font-semibold"> entrepreneur</span>. 
                    Votre mission : explorer ce portfolio interactif pour découvrir si je suis 
                    <span className="text-[#F5AD27] font-bold"> LE développeur</span> qu'il vous faut.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-[#F5AD27] mb-1">3</div>
                  <div className="text-slate-400 text-sm">Zones à explorer</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-[#F5AD27] mb-1">500+</div>
                  <div className="text-slate-400 text-sm">XP à débloquer</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-3xl font-bold text-[#F5AD27] mb-1">1</div>
                  <div className="text-slate-400 text-sm">Décision à prendre</div>
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-4 border border-[#F5AD27]/20">
                <p className="text-slate-300 text-sm">
                  <Sparkles className="w-4 h-4 text-[#F5AD27] inline mr-2" />
                  <span className="font-semibold text-[#F5AD27]">BONUS :</span> Chaque interaction vous rapporte des XP. 
                  Atteignez niveau 5 pour débloquer une surprise exclusive !
                </p>
              </div>
            </div>

            {/* Quick Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F5AD27]">{profile?.years_experience || 7}+</div>
                <div className="text-slate-500 text-sm">Ans XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F5AD27]">{profile?.projects_completed || 65}+</div>
                <div className="text-slate-500 text-sm">Projets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F5AD27]">100%</div>
                <div className="text-slate-500 text-sm">Satisfait</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button
              onClick={onStart}
              className="group bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-bold px-12 py-8 rounded-2xl text-xl shadow-2xl shadow-[#F5AD27]/30 hover:shadow-[#F5AD27]/50 transition-all duration-300"
            >
              <span className="mr-3">🎮 DÉMARRER LA MISSION</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                →
              </motion.div>
            </Button>
            
            <p className="text-slate-500 text-sm mt-6">
              Cliquez pour commencer votre exploration interactive
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-600 flex flex-col items-center gap-2"
            >
              <span className="text-xs">ou descendez pour explorer</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#F5AD27]/20 rounded-lg rotate-12" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#F5AD27]/20 rounded-lg -rotate-12" />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#F5AD27] rounded-full animate-pulse" />
      <div className="absolute top-1/3 left-20 w-2 h-2 bg-[#F5AD27] rounded-full animate-pulse" />
    </section>
  );
}