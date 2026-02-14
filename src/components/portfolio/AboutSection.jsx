import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Target, Heart, Download, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AboutSection({ profile }) {
  const stats = [
    { value: profile?.years_experience || '5', label: "Années d'expérience", suffix: '+' },
    { value: profile?.projects_completed || '50', label: 'Projets réalisés', suffix: '+' },
    { value: profile?.clients_satisfied || '30', label: 'Clients satisfaits', suffix: '+' },
    { value: '24', label: 'Technologies maîtrisées', suffix: '+' },
  ];

  return (
    <section id="about" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5AD27]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5AD27]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-slate-800">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <User className="w-32 h-32 text-slate-700" />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[#F5AD27]/30 rounded-3xl" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#F5AD27]/10 rounded-3xl" />

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -right-8 top-1/4 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#F5AD27]/10">
                    <Award className="w-8 h-8 text-[#F5AD27]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{profile?.years_experience || '5'}+</div>
                    <div className="text-slate-400 text-sm">Années d'expertise</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5AD27]/10 border border-[#F5AD27]/20 mb-6">
              <User className="w-4 h-4 text-[#F5AD27]" />
              <span className="text-[#F5AD27] text-sm font-medium">À propos</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Passionné par le{' '}
              <span className="text-[#F5AD27]">développement web</span>
            </h2>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {profile?.bio_long || 
                "Je suis un développeur full-stack passionné par la création d'expériences web exceptionnelles. Avec plusieurs années d'expérience, je maîtrise les technologies modernes et je m'efforce de livrer des solutions élégantes et performantes. Mon approche combine créativité et rigueur technique pour transformer vos idées en réalité numérique."}
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <Target className="w-5 h-5 text-[#F5AD27]" />
                <span className="text-slate-300">Focus sur la qualité</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <Heart className="w-5 h-5 text-[#F5AD27]" />
                <span className="text-slate-300">Passion pour l'UX</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <Award className="w-5 h-5 text-[#F5AD27]" />
                <span className="text-slate-300">Code propre</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <ArrowRight className="w-5 h-5 text-[#F5AD27]" />
                <span className="text-slate-300">Livraison rapide</span>
              </motion.div>
            </div>

            {/* CTA */}
            {profile?.cv_url && (
              <Button
                asChild
                className="bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-semibold px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#F5AD27]/20"
              >
                <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger mon CV
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-[#F5AD27]/30 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#F5AD27] mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}