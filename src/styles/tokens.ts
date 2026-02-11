// Design System Tokens
export const tokens = {
  colors: {
    // Cognitive Domains
    crimson: { reasoning: '#8B0000', hover: '#A01010', active: '#701010' },
    gold: { memory: '#D4AF37', hover: '#FFD700', active: '#B8941F' },
    violet: { creativity: '#4B0082', hover: '#5B0099', active: '#3B0062' },
    emerald: { decision: '#50C878', hover: '#60D888', active: '#40B868' },
    amber: { flexibility: '#FFBF00', hover: '#FFCF20', active: '#DFAF00' },
    sapphire: { philosophy: '#0F52BA', hover: '#1F62CA', active: '#0F42AA' },
    
    // Base
    obsidian: '#0D0D0D',
    charcoal: '#1A1A1A',
    stoneGray: '#2D2D2D',
    parchment: '#F5E6D3',
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    alabaster: '#F0EAD6',
    
    // Semantic
    success: '#00A86B',
    warning: '#FF9500',
    danger: '#DC143C',
    info: '#00CED1',
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
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
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
