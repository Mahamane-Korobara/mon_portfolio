import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Users, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function AvailabilityStatus({ onInteraction }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Simulate availability (you can make this dynamic later)
  const availability = {
    status: 'available', // 'available', 'partially', 'booked'
    nextAvailable: new Date(2026, 1, 15), // Feb 15, 2026
    currentProjects: 2,
    capacity: 3,
    responseTime: '< 24h',
  };

  const getStatusConfig = () => {
    switch (availability.status) {
      case 'available':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          label: '🟢 Disponible',
          message: 'Prêt à démarrer un nouveau projet dès maintenant !',
        };
      case 'partially':
        return {
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: '🟡 Partiellement disponible',
          message: 'Capacité limitée, contact me pour discuter',
        };
      case 'booked':
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: '🔴 Complet',
          message: `Prochaine disponibilité : ${availability.nextAvailable.toLocaleDateString('fr-FR')}`,
        };
      default:
        return {
          color: 'text-slate-500',
          bgColor: 'bg-slate-500/10',
          borderColor: 'border-slate-500/30',
          label: 'Statut inconnu',
          message: '',
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => onInteraction('availability_viewed', 10)}
      className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-[#F5AD27]" />
            <h3 className="text-2xl font-bold text-white">Disponibilité</h3>
          </div>
          <p className="text-slate-400 text-sm">Statut en temps réel</p>
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Badge className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} border-2 text-sm font-bold px-4 py-2`}>
            {statusConfig.label}
          </Badge>
        </motion.div>
      </div>

      <p className="text-slate-300 mb-8">{statusConfig.message}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <Users className="w-5 h-5 text-[#F5AD27] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{availability.currentProjects}/{availability.capacity}</div>
          <div className="text-xs text-slate-500 mt-1">Projets actifs</div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <Clock className="w-5 h-5 text-[#F5AD27] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{availability.responseTime}</div>
          <div className="text-xs text-slate-500 mt-1">Temps de réponse</div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <TrendingUp className="w-5 h-5 text-[#F5AD27] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-xs text-slate-500 mt-1">Taux de satisfaction</div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[#F5AD27]"
        />
        <span>Mis à jour en temps réel • {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </motion.div>
  );
}