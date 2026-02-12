// Design System Tokens
export const tokens = {
  colors: {
    // Cognitive Domains (Ancient Deep Blues)
    crimson: { reasoning: '#1A237E', hover: '#283593', active: '#0D1B5E' }, // Deep Indigo
    gold: { memory: '#9C7A3C', hover: '#B8941F', active: '#7D5F2E' }, // Ancient Gold
    violet: { creativity: '#4A148C', hover: '#6A1B9A', active: '#38006B' }, // Deep Purple
    emerald: { decision: '#1B5E20', hover: '#2E7D32', active: '#0D4711' }, // Forest Green
    amber: { flexibility: '#BF360C', hover: '#D84315', active: '#9F2C09' }, // Terra Cotta
    sapphire: { philosophy: '#01579B', hover: '#0277BD', active: '#004578' }, // Deep Sapphire
    
    // Base (Ancient Neomorphic Blues)
    obsidian: '#0A1929', // Deep navy base
    charcoal: '#132F4C', // Raised surfaces
    stoneGray: '#1E4976', // Elevated elements
    parchment: '#E3F2FD', // Light accents
    bronze: '#8C6239', // Ancient bronze
    silver: '#B0BEC5', // Stone silver
    alabaster: '#ECEFF1', // Ancient white
    
    // Semantic
    success: '#00A86B',
    warning: '#FF9500',
    danger: '#DC143C',
    info: '#0277BD',
  },
  
  fonts: {
    display: 'System',
    body: 'System',
    mono: 'Courier',
  },
  
  fontSizes: {
    xs: 11,
    sm: 13,
    base: 16,
    md: 18,
    lg: 21,
    xl: 25,
    '2xl': 31,
    '3xl': 39,
    '4xl': 49,
    '5xl': 61,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  shadows: {
    // Neomorphic shadows (light + dark for depth)
    neomorphicInset: {
      shadowColor: '#000814',
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      elevation: -2,
    },
    neomorphicOutset: {
      shadowColor: '#1E4976',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    sm: {
      shadowColor: '#000814',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000814',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000814',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const getDomainColor = (domain: string): string => {
  const map: Record<string, string> = {
    reasoning: tokens.colors.crimson.reasoning,
    memory: tokens.colors.gold.memory,
    creativity: tokens.colors.violet.creativity,
    decision: tokens.colors.emerald.decision,
    flexibility: tokens.colors.amber.flexibility,
    philosophy: tokens.colors.sapphire.philosophy,
  };
  return map[domain] || tokens.colors.bronze;
};
