import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// localStorage utils
import { getScore, setScore as saveScore, getLevel, setLevel as saveLevel, addInteraction } from '@/components/utils/localStorage';

export default function Home() {
  const [missionStarted, setMissionStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Données locales (pas de loading)
  const profile = profileData;
  const projects = projectsData;
  const skills = skillsData;
  const experiences = experiencesData;
  
  useEffect(() => {
    setScore(getScore());
    setLevel(getLevel());
  }, []);

  useEffect(() => {
    let newLevel = 1;
    if (score >= 500) newLevel = 5;
    else if (score >= 400) newLevel = 4;
    else if (score >= 250) newLevel = 3;
    else if (score >= 100) newLevel = 2;
    
    setLevel(newLevel);
    saveLevel(newLevel);
    saveScore(score);
  }, [score]);



  const handleInteraction = (type, points) => {
    setScore(prev => prev + points);
    addInteraction(type, points);
    console.log(`🎮 Interaction: ${type} (+${points} XP)`);
  };

  return (
    <div className="bg-slate-950">
      {/* SEO Component */}
      <SEO profile={profile} />
      
      {/* Hidden SEO Headers */}
      <header style={{ display: 'none' }}>
        <h1>{profile?.full_name} - {profile?.title}</h1>
        <h2>Portfolio Développeur Full-Stack à {profile?.location}</h2>
        <p>{profile?.bio_long}</p>
      </header>

      <AnimatePresence mode="wait">
        {!missionStarted ? (
          <MissionBrief 
            key="brief" 
            profile={profile} 
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
            transition={{ duration: 0.5 }}
          >
            <GameHeader 
              score={score} 
              level={level}
              onChatToggle={() => {
                setIsChatOpen(!isChatOpen);
                if (!isChatOpen) handleInteraction('chat_opened', 10);
              }}
            />
            
            <div className="pt-24">
              <ProjectsSection 
                projects={projects} 
                onInteraction={handleInteraction}
              />
              
              <SkillsSection 
                skills={skills}
                onInteraction={handleInteraction}
              />

              <ProjectCalculator 
                onInteraction={handleInteraction}
              />

              {/* Side by Side Section */}
              <section className="py-20 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <AvailabilityStatus onInteraction={handleInteraction} />
                    <TechRadar onInteraction={handleInteraction} />
                  </div>
                </div>
              </section>
              
              <ExperienceSection 
                experiences={experiences}
                onInteraction={handleInteraction}
              />
              
              <ContactSection 
                profile={profile}
                onInteraction={handleInteraction}
              />
            </div>

            <AssistantChat 
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              profile={profile}
              projects={projects}
              onInteraction={handleInteraction}
            />

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800 py-8">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-slate-500 text-sm">
                  © {new Date().getFullYear()} {profile?.full_name || 'Portfolio'}. 
                  Conçu et développé avec passion 🚀
                </p>
                <p className="text-slate-600 text-xs mt-2">
                  Portfolio interactif gamifié • Tous droits réservés
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}