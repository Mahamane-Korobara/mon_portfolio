import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Sparkles, CheckCircle, Loader2, Star, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';

const budgetRanges = [
  { id: 'small', label: '< 5K €', emoji: '💼', bonus: 20 },
  { id: 'medium', label: '5K - 20K €', emoji: '🚀', bonus: 50 },
  { id: 'large', label: '20K - 50K €', emoji: '⭐', bonus: 100 },
  { id: 'enterprise', label: '50K+ €', emoji: '👑', bonus: 200 },
];

const urgencyLevels = [
  { id: 'flexible', label: 'Flexible', emoji: '🌊', color: 'blue' },
  { id: 'month', label: 'Dans 1 mois', emoji: '⚡', color: 'yellow' },
  { id: 'urgent', label: 'Urgent', emoji: '🔥', color: 'red' },
];

export default function QuestContact({ profile, onInteraction, totalScore }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    urgency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleBudgetSelect = (budgetId) => {
    setFormData({ ...formData, budget: budgetId });
    const budget = budgetRanges.find(b => b.id === budgetId);
    onInteraction('budget_selected', budget.bonus);
    setTimeout(() => setStep(2), 500);
  };

  const handleUrgencySelect = (urgencyId) => {
    setFormData({ ...formData, urgency: urgencyId });
    onInteraction('urgency_selected', 30);
    setTimeout(() => setStep(3), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await base44.entities.ContactMessage.create({
      name: formData.name,
      email: formData.email,
      subject: `[${formData.budget}][${formData.urgency}] ${formData.subject || 'Nouveau projet'}`,
      message: formData.message,
    });

    onInteraction('mission_completed', 500);
    setIsSubmitting(false);
    setIsComplete(true);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5AD27] to-transparent" />
      
      {/* Achievement Banner */}
      {totalScore >= 500 && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-gradient-to-r from-[#F5AD27] to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl">
            <Award className="w-5 h-5" />
            NIVEAU MAXIMUM ATTEINT! 🎉
          </div>
        </motion.div>
      )}

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-950 border-2 border-[#F5AD27] rounded-2xl mb-6">
            <Mail className="w-6 h-6 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-bold text-lg">ZONE 3</span>
            <span className="text-slate-400">—</span>
            <span className="text-white font-semibold">MISSION FINALE</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Lancez le <span className="text-[#F5AD27]">Projet</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complétez cette quête en 3 étapes pour débloquer la collaboration ultime !
          </p>
        </motion.div>

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-[#F5AD27]/30 overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-slate-950/50 px-8 py-6 border-b border-slate-800">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: step >= s ? [1, 1.2, 1] : 1,
                        backgroundColor: step >= s ? '#F5AD27' : '#1e293b',
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                        step >= s ? 'border-[#F5AD27] text-slate-900' : 'border-slate-700 text-slate-600'
                      }`}
                    >
                      {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                    </motion.div>
                    <span className={`text-xs mt-2 ${step >= s ? 'text-[#F5AD27]' : 'text-slate-600'}`}>
                      {s === 1 ? 'Budget' : s === 2 ? 'Urgence' : 'Contact'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full ${step > s ? 'bg-[#F5AD27]' : 'bg-slate-800'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Budget */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Quel est votre budget estimé ?</h3>
                    <p className="text-slate-400">Choisissez une fourchette pour commencer</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {budgetRanges.map((budget) => (
                      <motion.button
                        key={budget.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBudgetSelect(budget.id)}
                        className="relative bg-slate-800/50 hover:bg-slate-800 border-2 border-slate-700 hover:border-[#F5AD27] rounded-2xl p-8 transition-all duration-300 group"
                      >
                        <div className="text-4xl mb-3">{budget.emoji}</div>
                        <div className="text-xl font-bold text-white mb-2">{budget.label}</div>
                        <div className="text-[#F5AD27] text-sm font-semibold">+{budget.bonus} XP</div>
                        
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-[#F5AD27]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Urgency */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Quelle est l'urgence du projet ?</h3>
                    <p className="text-slate-400">Indiquez votre timeline souhaitée</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {urgencyLevels.map((urgency) => (
                      <motion.button
                        key={urgency.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUrgencySelect(urgency.id)}
                        className="bg-slate-800/50 hover:bg-slate-800 border-2 border-slate-700 hover:border-[#F5AD27] rounded-2xl p-8 transition-all duration-300 group"
                      >
                        <div className="text-4xl mb-3">{urgency.emoji}</div>
                        <div className="text-lg font-bold text-white">{urgency.label}</div>
                        <div className="text-[#F5AD27] text-sm font-semibold mt-2">+30 XP</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="text-slate-500 hover:text-slate-300 text-sm"
                    >
                      ← Retour
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Form */}
              {step === 3 && !isComplete && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Dernière étape : Vos coordonnées</h3>
                    <p className="text-slate-400">Recevez une réponse sous 24h</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#F5AD27]"
                      />
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#F5AD27]"
                      />
                    </div>

                    <Input
                      placeholder="Sujet du projet (optionnel)"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#F5AD27]"
                    />

                    <Textarea
                      placeholder="Décrivez votre projet en quelques lignes..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl resize-none focus:border-[#F5AD27]"
                    />

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 h-14 rounded-xl border-slate-700 text-white hover:bg-slate-800"
                      >
                        ← Retour
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-14 bg-gradient-to-r from-[#F5AD27] to-yellow-500 hover:from-[#F5AD27]/90 hover:to-yellow-500/90 text-slate-900 font-bold rounded-xl shadow-xl shadow-[#F5AD27]/30"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Envoi...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            TERMINER LA MISSION (+500 XP)
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Success State */}
              {isComplete && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <Award className="w-24 h-24 text-[#F5AD27] mx-auto mb-6" />
                  </motion.div>
                  
                  <h3 className="text-4xl font-black text-white mb-4">
                    🎉 MISSION ACCOMPLIE !
                  </h3>
                  
                  <p className="text-slate-300 text-xl mb-8 max-w-lg mx-auto">
                    Félicitations ! Vous avez complété toutes les étapes. 
                    Je vous recontacte sous <span className="text-[#F5AD27] font-bold">24 heures</span> !
                  </p>

                  <div className="bg-slate-800/50 rounded-2xl p-8 border border-[#F5AD27]/30 max-w-md mx-auto">
                    <div className="text-6xl font-black text-[#F5AD27] mb-2">{totalScore + 500}</div>
                    <div className="text-slate-400">TOTAL XP GAGNÉ</div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <p className="text-slate-300 mb-4">🎁 Débloquez votre récompense :</p>
                      {profile?.cv_url && (
                        <Button
                          asChild
                          className="w-full bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-bold rounded-xl h-12"
                        >
                          <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                            <Star className="w-5 h-5 mr-2" />
                            Télécharger CV Premium
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                    {profile?.email && (
                      <a href={`mailto:${profile.email}`} className="hover:text-[#F5AD27] transition-colors">
                        📧 {profile.email}
                      </a>
                    )}
                    {profile?.phone && (
                      <a href={`tel:${profile.phone}`} className="hover:text-[#F5AD27] transition-colors">
                        📱 {profile.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}