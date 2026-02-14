import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const interactiveFlow = {
  initial: {
    question: "Pour mieux vous aider, quel type de projet recherchez-vous ?",
    options: [
      { id: 'web', label: '🌐 Site Web / Application', next: 'budget' },
      { id: 'mobile', label: '📱 Application Mobile', next: 'budget' },
      { id: 'api', label: '⚙️ API / Backend', next: 'budget' },
      { id: 'consulting', label: '💡 Conseil / Audit', next: 'priority' },
    ]
  },
  budget: {
    question: "Quel est votre budget approximatif ?",
    options: [
      { id: 'small', label: '< 5K €', next: 'priority' },
      { id: 'medium', label: '5K - 20K €', next: 'priority' },
      { id: 'large', label: '20K - 50K €', next: 'priority' },
      { id: 'enterprise', label: '50K+ €', next: 'priority' },
    ]
  },
  priority: {
    question: "Quelle est votre priorité principale ?",
    options: [
      { id: 'speed', label: '⚡ Rapidité de livraison', next: 'recommendation' },
      { id: 'quality', label: '✨ Qualité maximale', next: 'recommendation' },
      { id: 'innovation', label: '🚀 Innovation technique', next: 'recommendation' },
      { id: 'support', label: '🤝 Support long terme', next: 'recommendation' },
    ]
  },
};

export default function AssistantChat({ isOpen, onClose, profile, onInteraction, projects }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Bonjour ! 👋 Je suis l'assistant de ${profile?.full_name || 'ce portfolio'}. Je vais vous poser quelques questions pour mieux comprendre votre projet.` }
  ]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState('initial');
  const [userChoices, setUserChoices] = useState({});
  const [showFinalCTA, setShowFinalCTA] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      // Show initial question after a delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: interactiveFlow.initial.question,
          options: interactiveFlow.initial.options 
        }]);
      }, 800);
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    const newChoices = { ...userChoices, [currentStep]: option.id };
    setUserChoices(newChoices);
    
    // Add user choice
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: option.label 
    }]);

    onInteraction('chat_option_selected', 10);

    // Move to next step or show recommendation
    if (option.next === 'recommendation') {
      setTimeout(() => {
        const recommendation = generateRecommendation(newChoices);
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: recommendation.message 
        }]);
        setShowFinalCTA(true);
      }, 500);
    } else {
      const nextStep = interactiveFlow[option.next];
      setCurrentStep(option.next);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: nextStep.question,
          options: nextStep.options 
        }]);
      }, 500);
    }
  };

  const generateRecommendation = (choices) => {
    const projectType = choices.initial;
    const budget = choices.budget;
    const priority = choices.priority;

    let message = "Parfait ! Voici ce que je peux vous proposer :\n\n";

    // Project type specific message
    if (projectType === 'web') {
      message += "🌐 Pour votre projet web, je recommande une stack moderne (React/Next.js) qui garantit performance et évolutivité.\n\n";
    } else if (projectType === 'mobile') {
      message += "📱 Pour votre app mobile, React Native est idéal pour cibler iOS et Android avec un seul code.\n\n";
    } else if (projectType === 'api') {
      message += "⚙️ Pour votre backend, Node.js avec Express/NestJS offre robustesse et scalabilité.\n\n";
    } else if (projectType === 'consulting') {
      message += "💡 Je peux auditer votre architecture actuelle et proposer des optimisations concrètes.\n\n";
    }

    // Budget consideration
    if (budget === 'small') {
      message += "💼 Avec votre budget, je vous propose un MVP fonctionnel en 2-4 semaines.\n\n";
    } else if (budget === 'medium') {
      message += "🚀 Votre budget permet un développement complet avec plusieurs fonctionnalités avancées.\n\n";
    } else if (budget === 'large' || budget === 'enterprise') {
      message += "⭐ Excellent budget ! Nous pouvons envisager une solution sur-mesure avec intégrations complexes.\n\n";
    }

    // Priority based recommendation
    if (priority === 'speed') {
      message += "⚡ Je m'engage sur des sprints courts avec livraisons fréquentes.\n\n";
    } else if (priority === 'quality') {
      message += "✨ Je privilégierai tests, code reviews et architecture solide.\n\n";
    } else if (priority === 'innovation') {
      message += "🚀 Nous utiliserons les dernières technologies et patterns.\n\n";
    } else if (priority === 'support') {
      message += "🤝 Je propose un contrat de maintenance pour assurer la pérennité.\n\n";
    }

    // Suggest relevant projects
    const relevantProjects = projects?.filter(p => p.category === projectType).slice(0, 2);
    if (relevantProjects?.length > 0) {
      message += `📂 Projets similaires réalisés : ${relevantProjects.map(p => p.title).join(', ')}\n\n`;
    }

    message += "👉 Prêt à démarrer ? Cliquez sur le bouton ci-dessous pour me contacter directement !";

    return { message };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, 
      { role: 'user', text: input },
      { role: 'bot', text: "Merci pour votre question ! Pour une réponse détaillée et personnalisée, je vous invite à compléter le formulaire de contact. Je vous répondrai sous 24h !" }
    ]);
    onInteraction('chat_message', 10);
    setInput('');
  };

  const scrollToContact = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    onInteraction('chat_cta_clicked', 50);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-end p-0 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 w-full md:w-[450px] md:h-[700px] h-full md:rounded-3xl border-2 border-[#F5AD27]/30 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 md:rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5AD27] to-yellow-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-slate-900" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"
                />
              </div>
              <div>
                <h3 className="text-white font-bold">Assistant Mission</h3>
                <p className="text-slate-500 text-xs">En ligne • Réponse instantanée</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-[#F5AD27] text-slate-900 font-medium' 
                      : 'bg-slate-800 text-white border border-slate-700'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Interactive Options */}
                  {msg.options && (
                    <div className="space-y-2 mt-3">
                      {msg.options.map((option, optIndex) => (
                        <motion.button
                          key={optIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: optIndex * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-[#F5AD27]/20 border border-slate-600 hover:border-[#F5AD27] rounded-xl text-white text-sm transition-all group"
                        >
                          <span className="group-hover:text-[#F5AD27] transition-colors">
                            {option.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Final CTA */}
            {showFinalCTA && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-4"
              >
                <Button
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-[#F5AD27] to-yellow-500 hover:from-[#F5AD27]/90 hover:to-yellow-500/90 text-slate-900 font-bold h-12 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Contactez-moi maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <div className="flex gap-2">
              <Input
                placeholder="Votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-800 border-slate-700 text-white rounded-xl h-12"
              />
              <Button
                onClick={handleSend}
                className="bg-[#F5AD27] hover:bg-[#F5AD27]/90 text-slate-900 h-12 px-6 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}