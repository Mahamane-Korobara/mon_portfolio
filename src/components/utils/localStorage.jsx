// Gestion du système de gamification avec localStorage

const STORAGE_KEYS = {
  SCORE: 'portfolio_score',
  LEVEL: 'portfolio_level',
  INTERACTIONS: 'portfolio_interactions'
};

export const getScore = () => {
  const score = localStorage.getItem(STORAGE_KEYS.SCORE);
  return score ? parseInt(score, 10) : 0;
};

export const setScore = (score) => {
  localStorage.setItem(STORAGE_KEYS.SCORE, score.toString());
};

export const getLevel = () => {
  const level = localStorage.getItem(STORAGE_KEYS.LEVEL);
  return level ? parseInt(level, 10) : 1;
};

export const setLevel = (level) => {
  localStorage.setItem(STORAGE_KEYS.LEVEL, level.toString());
};

export const getInteractions = () => {
  const interactions = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
  return interactions ? JSON.parse(interactions) : [];
};

export const addInteraction = (type, points) => {
  const interactions = getInteractions();
  interactions.push({
    type,
    points,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));
};

export const clearGameData = () => {
  localStorage.removeItem(STORAGE_KEYS.SCORE);
  localStorage.removeItem(STORAGE_KEYS.LEVEL);
  localStorage.removeItem(STORAGE_KEYS.INTERACTIONS);
};

// Système de contact messages (optionnel)
export const saveContactMessage = (message) => {
  const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
  messages.push({
    ...message,
    id: Date.now(),
    created_date: new Date().toISOString(),
    status: 'new'
  });
  localStorage.setItem('contact_messages', JSON.stringify(messages));
};

export const getContactMessages = () => {
  return JSON.parse(localStorage.getItem('contact_messages') || '[]');
};