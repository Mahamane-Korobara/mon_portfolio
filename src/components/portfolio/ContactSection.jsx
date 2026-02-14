import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveContactMessage } from '@/components/utils/localStorage';

export default function ContactSection({ profile, onInteraction }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sauvegarder dans localStorage
    saveContactMessage(formData);
    console.log('📧 Message de contact sauvegardé:', formData);
    
    onInteraction('contact_sent', 100);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full mb-6">
            <Mail className="w-5 h-5 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-semibold">Contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Travaillons <span className="text-[#F5AD27]">Ensemble</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Un projet en tête ? Contactez-moi et discutons de la meilleure façon de le réaliser
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Informations de contact</h3>
            
            <div className="space-y-6 mb-10">
              {profile?.email && (
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-[#F5AD27]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#F5AD27]/10 group-hover:bg-[#F5AD27]/20 transition-colors">
                    <Mail className="w-6 h-6 text-[#F5AD27]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Email</p>
                    <p className="text-white font-medium">{profile.email}</p>
                  </div>
                </motion.a>
              )}

              {profile?.phone && (
                <motion.a
                  href={`tel:${profile.phone}`}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-[#F5AD27]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#F5AD27]/10 group-hover:bg-[#F5AD27]/20 transition-colors">
                    <Phone className="w-6 h-6 text-[#F5AD27]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Téléphone</p>
                    <p className="text-white font-medium">{profile.phone}</p>
                  </div>
                </motion.a>
              )}

              {profile?.location && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-[#F5AD27]/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-[#F5AD27]/10 group-hover:bg-[#F5AD27]/20 transition-colors">
                    <MapPin className="w-6 h-6 text-[#F5AD27]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Localisation</p>
                    <p className="text-white font-medium">{profile.location}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h4>
              <div className="flex gap-4">
                {profile?.github_url && (
                  <motion.a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800/80 border border-slate-700 hover:border-[#F5AD27]/30 transition-all"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                )}
                {profile?.linkedin_url && (
                  <motion.a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800/80 border border-slate-700 hover:border-[#F5AD27]/30 transition-all"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                )}
                {profile?.twitter_url && (
                  <motion.a
                    href={profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-[#F5AD27] hover:bg-slate-800/80 border border-slate-700 hover:border-[#F5AD27]/30 transition-all"
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#F5AD27] h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john@exemple.com"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#F5AD27] h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-slate-300">Sujet</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Projet de développement web"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#F5AD27] h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-300">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Décrivez votre projet..."
                  rows={6}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#F5AD27] rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full h-14 rounded-xl text-lg font-semibold transition-all ${
                  isSuccess 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900'
                } shadow-lg shadow-[#F5AD27]/20`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}