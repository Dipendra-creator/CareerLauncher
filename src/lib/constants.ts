export const DEPARTMENT_PRESETS = {
    "Software Engineer": {
      "Programming Languages": 100,
      "Web Development": 90,
      "Cloud Computing & DevOps": 80,
      "Database Technologies": 70,
      "Software Engineering & Methodologies": 85,
      "Operating Systems & Networking": 60,
      "Machine Learning & AI": 40,
      "Data Science & Analytics": 30,
      "Cybersecurity": 50,
      "Mobile Development": 45,
      "Emerging Technologies": 35
    },
    "Data Scientist": {
      "Data Science & Analytics": 100,
      "Machine Learning & AI": 90,
      "Programming Languages": 70,
      "Database Technologies": 80,
      "Cloud Computing & DevOps": 50,
      "Software Engineering & Methodologies": 60,
      "Web Development": 30,
      "Operating Systems & Networking": 40,
      "Cybersecurity": 35,
      "Mobile Development": 20,
      "Emerging Technologies": 45
    },
    "ML Engineer": {
      "Machine Learning & AI": 100,
      "Data Science & Analytics": 90,
      "Programming Languages": 80,
      "Cloud Computing & DevOps": 70,
      "Database Technologies": 65,
      "Software Engineering & Methodologies": 60,
      "Operating Systems & Networking": 50,
      "Web Development": 40,
      "Cybersecurity": 45,
      "Mobile Development": 30,
      "Emerging Technologies": 55
    }
  } as const;
  
  export const DEFAULT_WEIGHTS = {
    "Programming Languages": 70,
    "Web Development": 70,
    "Cloud Computing & DevOps": 70,
    "Database Technologies": 70,
    "Software Engineering & Methodologies": 70,
    "Operating Systems & Networking": 70,
    "Machine Learning & AI": 70,
    "Data Science & Analytics": 70,
    "Cybersecurity": 70,
    "Mobile Development": 70,
    "Emerging Technologies": 70
  };
  
  export type DepartmentPreset = keyof typeof DEPARTMENT_PRESETS;
  export type CategoryWeights = typeof DEFAULT_WEIGHTS;