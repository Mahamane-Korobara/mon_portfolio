import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; 
import { Sparkles, Gift, Download, X, Trophy, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Composants de l'UI
import GameHeader from '@/components/portfolio/GameHeader';
import MissionBrief from '@/components/portfolio/MissionBrief';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectCalculator from '@/components/portfolio/ProjectCalculator';
import AvailabilityStatus from '@/components/portfolio/AvailabilityStatus';
import TechRadar from '@/components/portfolio/TechRadar';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ContactSection from '@/components/portfolio/ContactSection';
import AssistantChat from '@/components/portfolio/AssistantChat';
import SEO from '@/components/SEO';

// Données locales
import { profileData } from '@/components/data/profileData';
import { projectsData } from '@/components/data/projectsData';
import { skillsData } from '@/components/data/skillsData';
import { experiencesData } from '@/components/data/experiencesData';

// Utilitaires LocalStorage
import { 
  getScore, 
  setScore as saveScore, 
  getLevel, 
  setLevel as saveLevel, 
  addInteraction,
  getInteractions
} from '@/components/utils/localStorage';

export default function Home() {
  // --- ÉTATS INITIAUX (Lecture directe pour éviter le flash à 0) ---
  const [score, setScore] = useState(() => getScore());
  const [level, setLevel] = useState(() => getLevel());
  const [missionStarted, setMissionStarted] = useState(() => getScore() > 0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);

  // --- LOGIQUE DE PROGRESSION & BONUS ---
  useEffect(() => {
    let newLevel = 1;
    if (score >= 500) newLevel = 5;
    else if (score >= 400) newLevel = 4;
    else if (score >= 250) newLevel = 3;
    else if (score >= 100) newLevel = 2;
    
    if (newLevel !== level) {
      // Déclenchement visuel si passage au niveau 5 (VIP)
      if (newLevel === 5) {
        triggerVictory();
        console.log("%c 🎉 MODE VIP ACTIVÉ", "color: #F5AD27; font-size: 20px; font-weight: bold;");
      }
      setLevel(newLevel);
      saveLevel(newLevel);
    }
    saveScore(score);
  }, [score, level]);

  const triggerVictory = () => {
    setShowBonusModal(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // --- GESTION DES INTERACTIONS (Anti-Spam inclus) ---
  const handleInteraction = useCallback((type, points) => {
    const history = getInteractions();
    const now = new Date().getTime();
    
    // On ne donne pas de points si l'action est répétée en moins de 2s
    const isTooFast = history.some(i => 
      i.type === type && (now - new Date(i.timestamp).getTime()) < 2000
    );

    if (isTooFast) return;

    setScore(prev => prev + points);
    addInteraction(type, points);
  }, []);

  // --- FONCTION DE RÉINITIALISATION ---
  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser votre progression et recommencer la mission ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={`bg-slate-950 min-h-screen transition-colors duration-1000 selection:bg-[#F5AD27] selection:text-slate-900 ${level >= 5 ? 'ring-inset ring-4 ring-[#F5AD27]/10' : ''}`}>
      <SEO profile={profileData} />
      
      <header className="sr-only">
        <h1>{profileData?.full_name} - {profileData?.title}</h1>
        <p>{profileData?.bio_long}</p>
      </header>

      <AnimatePresence mode="wait">
        {!missionStarted ? (
          <MissionBrief 
            key="brief" 
            profile={profileData} 
            onStart={() => {
              setMissionStarted(true);
              handleInteraction('mission_started', 10);
            }} 
          />
        ) : (
          <motion.div
            key="mission"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameHeader 
              score={score} 
              level={level}
              onChatToggle={() => {
                setIsChatOpen(!isChatOpen);
                if (!isChatOpen) handleInteraction('chat_opened', 10);
              }}
            />
            
            {/* Conteneur principal sans space-y pour éviter les trous noirs */}
            <main className="pt-24 pb-20">
              <ProjectsSection projects={projectsData} onInteraction={handleInteraction} />
              
              <SkillsSection skills={skillsData} onInteraction={handleInteraction} />
              
              <ProjectCalculator onInteraction={handleInteraction} />

              <section className="py-10 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <AvailabilityStatus onInteraction={handleInteraction} />
                    <TechRadar onInteraction={handleInteraction} />
                  </div>
                </div>
              </section>
              
              <ExperienceSection experiences={experiencesData} onInteraction={handleInteraction} />
              
              <ContactSection profile={profileData} onInteraction={handleInteraction} />
            </main>

            {/* --- MODALE DE BONUS (NIVEAU 5) --- */}
            <AnimatePresence>
              {showBonusModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-slate-950/90 backdrop-blur-md">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-slate-900 border-2 border-[#F5AD27] p-8 rounded-3xl max-w-lg w-full text-center shadow-[0_0_50px_rgba(245,173,39,0.3)]"
                  >
                    <button 
                      onClick={() => setShowBonusModal(false)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="w-20 h-20 bg-gradient-to-tr from-[#F5AD27] to-yellow-300 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-lg shadow-[#F5AD27]/20">
                      <Trophy className="w-10 h-10 text-slate-900" />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Accès VIP Débloqué</h2>
                    <p className="text-[#F5AD27] font-mono text-xs mb-6 tracking-[0.2em]">STATUT : AGENT D'ÉLITE</p>
                    
                    <p className="text-slate-300 mb-8 leading-relaxed text-sm">
                      Félicitations ! Votre exploration minutieuse vous a permis d'atteindre le rang maximum. 
                      Vous avez maintenant accès à mon <span className="text-white font-bold">Dossier Secret</span> contenant mon CV Premium et mes ressources exclusives.
                    </p>

                    <div className="flex flex-col gap-3">
                      <Button 
                        asChild
                        className="bg-[#F5AD27] hover:bg-yellow-500 text-slate-900 font-bold py-7 rounded-xl shadow-xl shadow-[#F5AD27]/20 transition-all active:scale-95"
                      >
                        <a href="/cv-premium-secret.pdf" download>
                          <Download className="w-5 h-5 mr-2" /> TÉLÉCHARGER LE DOSSIER SECRET
                        </a>
                      </Button>
                      <button 
                        onClick={() => setShowBonusModal(false)}
                        className="text-slate-500 hover:text-slate-300 text-xs font-bold uppercase tracking-widest mt-2 transition-colors"
                      >
                        Retourner à la mission
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <AssistantChat 
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              profile={profileData}
              projects={projectsData}
              onInteraction={handleInteraction}
            />

            <footer className="bg-slate-950 border-t border-slate-900 py-16">
              <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                {/* Badge de progression permanent dans le footer */}
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="inline-flex items-center gap-6 px-6 py-3 bg-slate-900/50 rounded-full border border-slate-800 backdrop-blur-sm">
                    <span className={`flex items-center gap-2 font-bold text-xs ${level >= 5 ? 'text-[#F5AD27]' : 'text-slate-500'}`}>
                      <Sparkles className="w-3 h-3" />
                      NIVEAU {level}
                    </span>
                    <span className="text-slate-800">|</span>
                    <span className="text-slate-300 font-mono text-xs">{score} XP TOTAL</span>
                  </div>
                  
                  {/* Bouton CV "Public" toujours accessible pour les recruteurs pressés */}
                  <Button 
                    variant="link" 
                    asChild 
                    className="text-slate-500 hover:text-[#F5AD27] text-xs transition-colors"
                  >
                    <a href="/cv-standard.pdf" download>
                      Besoin d'un CV classique ? Télécharger ici
                    </a>
                  </Button>

                  {/* BOUTON RESET DISCRET */}
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-slate-800 hover:text-red-900/40 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold mt-2"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    Réinitialiser la simulation
                  </button>
                </div>

                <p className="text-slate-700 text-[10px] uppercase tracking-[0.3em] font-medium">
                  © {new Date().getFullYear()} {profileData?.full_name} • Gamified Experience v2.0
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}