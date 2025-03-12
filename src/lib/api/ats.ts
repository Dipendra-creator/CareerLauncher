import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export interface ATSScoreResponse {
  ats_score: {
    overall_score: number;
    category_scores: {
      [key: string]: {
        score: number;
        breakdown: {
          [key: string]: {
            hits: number;
            score: number;
            suggestion_keywords: string[];
          };
        };
      };
    };
  };
}

export interface ScoringWeights {
  [key: string]: number;
}

export const uploadResumeForATSScore = async (
  file: File,
  selectedFields?: string[],
  weights?: ScoringWeights
): Promise<ATSScoreResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  if (selectedFields?.length) {
    formData.append('fields', JSON.stringify(selectedFields));
  }
  
  if (weights) {
    formData.append('weights', JSON.stringify(weights));
  }

  try {
    const response = await api.post<ATSScoreResponse>('/ats-score', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};