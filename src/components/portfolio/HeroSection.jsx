import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Download, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function HeroSection({ profile }) {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F5AD27]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#F5AD27]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#F5AD27]/5 to-transparent rounded-full" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFMwIDguMDYgMCAxOHY0MmMwIDkuOTQgOC4wNiAxOCAxOCAxOHMxOC04LjA2IDE4LTE4VjE4eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F5AD27]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5AD27]/10 border border-[#F5AD27]/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#F5AD27]" />
              <span className="text-[#F5AD27] text-sm font-medium">Disponible pour de nouveaux projets</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Bonjour, je suis
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5AD27] via-yellow-400 to-[#F5AD27]">
                {profile?.full_name || "Développeur"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-400 mb-4 font-light"
            >
              {profile?.title || "Développeur Full-Stack"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0"
            >
              {profile?.bio || "Je crée des expériences web exceptionnelles qui combinent design élégant et code performant."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={scrollToProjects}
                className="bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-semibold px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#F5AD27]/20 hover:shadow-[#F5AD27]/40 transition-all duration-300"
              >
                Voir mes projets
              </Button>
              {profile?.cv_url && (
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 rounded-xl text-lg"
                  asChild
                >
                  <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger CV
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-10 justify-center lg:justify-start"
            >
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile?.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Avatar/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F5AD27] via-yellow-500 to-[#F5AD27] blur-2xl opacity-30 animate-pulse" />
              
              {/* Avatar Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#F5AD27]/30 shadow-2xl shadow-[#F5AD27]/20">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-8xl font-bold text-[#F5AD27]/30">
                      {profile?.full_name?.charAt(0) || "D"}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-[#F5AD27]">{profile?.years_experience || "5"}+</div>
                <div className="text-xs text-slate-400">Années d'expérience</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-[#F5AD27]">{profile?.projects_completed || "50"}+</div>
                <div className="text-xs text-slate-400">Projets réalisés</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-500 flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToProjects}
          >
            <span className="text-sm">Découvrir</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}