import api from './api';

export const explainConcept = async (concept, code = '') => {
  const response = await api.post('/ai/explain', { concept, code });
  return response.data;
};

export const getRecommendations = async (solvedTopics, weakTopics) => {
  const response = await api.post('/ai/recommend', {
    solvedTopics,
    weakTopics,
  });
  return response.data;
};
