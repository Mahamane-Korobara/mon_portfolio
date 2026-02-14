import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#F5AD27]/10 border border-[#F5AD27]/20">
                  <Code2 className="w-6 h-6 text-[#F5AD27]" />
                </div>
                <span className="text-xl font-bold text-white">
                  {profile?.full_name || 'Portfolio'}
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                {profile?.bio || "Développeur full-stack passionné par la création d'expériences web exceptionnelles."}
              </p>
              <div className="flex gap-4">
                {profile?.github_url && (
                  <motion.a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                {profile?.linkedin_url && (
                  <motion.a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
                {profile?.twitter_url && (
                  <motion.a
                    href={profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">Navigation</h3>
              <div className="space-y-3">
                {['À propos', 'Projets', 'Compétences', 'Expérience', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const sectionId = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', '-');
                      document.getElementById(sectionId === 'a-propos' ? 'about' : sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-slate-400 hover:text-[#F5AD27] transition-colors duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-6">Contact</h3>
              <div className="space-y-3 text-slate-400">
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} className="block hover:text-[#F5AD27] transition-colors">
                    {profile.email}
                  </a>
                )}
                {profile?.phone && (
                  <a href={`tel:${profile.phone}`} className="block hover:text-[#F5AD27] transition-colors">
                    {profile.phone}
                  </a>
                )}
                {profile?.location && (
                  <p>{profile.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            © {currentYear} {profile?.full_name || 'Portfolio'}. Fait avec 
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> en France
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}