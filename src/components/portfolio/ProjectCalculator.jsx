import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, Euro, Zap, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const features = [
  { id: 'design', label: 'Design UI/UX', basePrice: 2000, baseDays: 5 },
  { id: 'frontend', label: 'Frontend (React/Vue)', basePrice: 3000, baseDays: 7 },
  { id: 'backend', label: 'Backend + API', basePrice: 3500, baseDays: 8 },
  { id: 'database', label: 'Base de données', basePrice: 1500, baseDays: 3 },
  { id: 'auth', label: 'Authentification', basePrice: 1000, baseDays: 2 },
  { id: 'payment', label: 'Paiement en ligne', basePrice: 2000, baseDays: 4 },
  { id: 'cms', label: 'CMS / Admin', basePrice: 2500, baseDays: 5 },
  { id: 'mobile', label: 'Version mobile', basePrice: 4000, baseDays: 10 },
  { id: 'seo', label: 'SEO & Analytics', basePrice: 800, baseDays: 2 },
  { id: 'deployment', label: 'Déploiement & CI/CD', basePrice: 1200, baseDays: 3 },
];

const complexityMultipliers = {
  simple: { label: 'Simple', multiplier: 0.7, icon: '🟢' },
  medium: { label: 'Moyen', multiplier: 1.0, icon: '🟡' },
  complex: { label: 'Complexe', multiplier: 1.5, icon: '🔴' },
};

export default function ProjectCalculator({ onInteraction }) {
  const [selectedFeatures, setSelectedFeatures] = useState(new Set(['design', 'frontend']));
  const [complexity, setComplexity] = useState('medium');
  const [urgency, setUrgency] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [selectedFeatures, complexity, urgency]);

  const calculateTotal = () => {
    let price = 0;
    let days = 0;

    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        price += feature.basePrice;
        days += feature.baseDays;
      }
    });

    // Apply complexity multiplier
    const complexityMult = complexityMultipliers[complexity].multiplier;
    price *= complexityMult;
    days *= complexityMult;

    // Apply urgency multiplier
    const urgencyMult = urgency === 1 ? 1 : urgency === 2 ? 1.3 : 1.6;
    price *= urgencyMult;
    days /= urgency;

    setTotalPrice(Math.round(price));
    setTotalDays(Math.round(days));
  };

  const toggleFeature = (featureId) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureId)) {
      newSelected.delete(featureId);
    } else {
      newSelected.add(featureId);
    }
    setSelectedFeatures(newSelected);
    onInteraction('calculator_feature_toggled', 5);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    onInteraction('calculator_cta_clicked', 30);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5AD27]/10 border border-[#F5AD27]/30 rounded-full mb-6">
            <Calculator className="w-5 h-5 text-[#F5AD27]" />
            <span className="text-[#F5AD27] font-semibold">Estimateur Intelligent</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Calculez Votre <span className="text-[#F5AD27]">Projet</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Estimez le coût et la durée de votre projet en quelques clics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F5AD27]" />
                Fonctionnalités souhaitées
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature) => {
                  const isSelected = selectedFeatures.has(feature.id);
                  return (
                    <motion.button
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFeature(feature.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-[#F5AD27]/10 border-[#F5AD27] text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{feature.label}</span>
                        {isSelected && <CheckCircle className="w-5 h-5 text-[#F5AD27]" />}
                      </div>
                      <div className="text-xs text-slate-500">
                        {feature.basePrice}€ • {feature.baseDays}j
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Complexity */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <h3 className="text-xl font-bold text-white mb-6">Niveau de complexité</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(complexityMultipliers).map(([key, value]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setComplexity(key);
                      onInteraction('calculator_complexity_changed', 5);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      complexity === key
                        ? 'bg-[#F5AD27]/10 border-[#F5AD27] text-white'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">{value.icon}</div>
                    <div className="font-semibold text-sm">{value.label}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      x{value.multiplier}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F5AD27]" />
                Urgence du projet
              </h3>
              
              <div className="space-y-4">
                <Slider
                  value={[urgency]}
                  onValueChange={(value) => {
                    setUrgency(value[0]);
                    onInteraction('calculator_urgency_changed', 5);
                  }}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
                
                <div className="flex justify-between text-sm">
                  <span className={urgency === 1 ? 'text-[#F5AD27] font-semibold' : 'text-slate-500'}>
                    Normal
                  </span>
                  <span className={urgency === 2 ? 'text-[#F5AD27] font-semibold' : 'text-slate-500'}>
                    Rapide (+30%)
                  </span>
                  <span className={urgency === 3 ? 'text-[#F5AD27] font-semibold' : 'text-slate-500'}>
                    Express (+60%)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 border-2 border-[#F5AD27]/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Estimation</h3>
              
              <div className="space-y-6 mb-8">
                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2 flex items-center justify-center gap-2">
                    <Euro className="w-4 h-4" />
                    Budget estimé
                  </div>
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-black text-[#F5AD27]"
                  >
                    {totalPrice.toLocaleString()}€
                  </motion.div>
                  <div className="text-slate-500 text-xs mt-2">HT • Estimation indicative</div>
                </div>

                <div className="h-px bg-slate-800" />

                <div className="text-center">
                  <div className="text-slate-400 text-sm mb-2 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Durée estimée
                  </div>
                  <motion.div
                    key={totalDays}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-white"
                  >
                    {totalDays} jours
                  </motion.div>
                  <div className="text-slate-500 text-xs mt-2">≈ {Math.ceil(totalDays / 7)} semaines</div>
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">Inclus :</h4>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#F5AD27]" />
                    Code source propre et documenté
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#F5AD27]" />
                    Tests et debugging
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#F5AD27]" />
                    Support post-lancement (1 mois)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#F5AD27]" />
                    Documentation technique
                  </li>
                </ul>
              </div>

              <Button
                onClick={scrollToContact}
                className="w-full bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 font-bold h-12 rounded-xl shadow-lg"
              >
                Demander un devis détaillé
              </Button>

              <p className="text-center text-xs text-slate-600 mt-4">
                💡 Estimation basée sur mon expérience. Devis personnalisé après discussion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}