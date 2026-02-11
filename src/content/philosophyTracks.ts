// Philosophy Tracks Content
// In production, this would be stored in database or fetched from API

export const philosophyTracks = [
  {
    id: 'stoicism',
    name: 'Stoicism',
    description: 'Master the ancient art of resilience and inner peace through Stoic philosophy.',
    icon: '⚖️',
    totalUnits: 12,
    units: [
      {
        id: 'stoic-unit-1',
        name: 'Foundations of Stoic Thought',
        description: 'Explore the origins and core tenets of Stoicism with Zeno, Cleanthes, and Chrysippus.',
        position: 1,
        cards: [
          {
            id: 'card-1',
            type: 'text',
            text: 'Stoicism began in Athens around 300 BCE, founded by Zeno of Citium.',
          },
          {
            id: 'card-2',
            type: 'text',
            text: 'The name comes from the Stoa Poikile (Painted Porch) where Zeno taught.',
          },
          {
            id: 'card-3',
            type: 'text',
            text: 'Core principle: Virtue (wisdom, courage, justice, temperance) is the only true good.',
          },
          {
            id: 'card-4',
            type: 'text',
            text: 'External things like wealth or health are "preferred indifferents" - nice to have but not essential for happiness.',
          },
        ],
      },
      {
        id: 'stoic-unit-2',
        name: 'Dichotomy of Control',
        description: 'Learn to distinguish what is within your power from what is not.',
        position: 2,
        cards: [
          {
            id: 'card-1',
            type: 'text',
            text: 'The Stoics divided the world into two categories: things within our control and things beyond it.',
          },
          {
            id: 'card-2',
            type: 'text',
            text: 'Within your control: Your thoughts, actions, judgments, values.',
          },
          {
            id: 'card-3',
            type: 'text',
            text: 'Beyond your control: Other people\'s opinions, the weather, the past, death.',
          },
          {
            id: 'card-4',
            type: 'text',
            text: 'Epictetus: "Make the best use of what is in your power, and take the rest as it happens."',
          },
          {
            id: 'card-5',
            type: 'interactive',
            interactionType: 'drag-match',
            text: 'Sort these into "Within Control" or "Beyond Control":',
            options: [
              'Your reaction to criticism',
              'Your boss\'s opinion of you',
              'Your effort at work',
              'Whether you get promoted',
              'Your values',
              'Other people\'s behavior',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'zen',
    name: 'Zen Buddhism',
    description: 'Develop beginner\'s mind and present-moment awareness through Zen practice.',
    icon: '☸️',
    totalUnits: 10,
    units: [
      {
        id: 'zen-unit-1',
        name: 'The Koan Tradition',
        description: 'Explore classic Zen koans that break logical thinking.',
        position: 1,
        cards: [
          {
            id: 'card-1',
            type: 'text',
            text: 'A koan is a paradoxical question or statement used in Zen to provoke enlightenment.',
          },
          {
            id: 'card-2',
            type: 'text',
            text: 'Most famous koan: "What is the sound of one hand clapping?"',
          },
          {
            id: 'card-3',
            type: 'text',
            text: 'Koans cannot be solved through logic. They point beyond conceptual thinking.',
          },
          {
            id: 'card-4',
            type: 'text',
            text: 'Another classic: "Does a dog have Buddha-nature?" Master Zhaozhou answered: "Mu!" (無 - nothing/without)',
          },
        ],
      },
    ],
  },
  {
    id: 'rationalism',
    name: 'Rationalism',
    description: 'Strengthen deductive reasoning and logical clarity.',
    icon: '🧮',
    totalUnits: 10,
    units: [
      {
        id: 'ratio-unit-1',
        name: 'Descartes & Methodological Doubt',
        description: 'Question everything to find indubitable truths.',
        position: 1,
        cards: [
          {
            id: 'card-1',
            type: 'text',
            text: 'René Descartes (1596-1650) sought a foundation of absolute certainty.',
          },
          {
            id: 'card-2',
            type: 'text',
            text: 'His method: Doubt everything that can possibly be doubted.',
          },
          {
            id: 'card-3',
            type: 'text',
            text: 'Can we doubt our senses? Yes - dreams and illusions deceive us.',
          },
          {
            id: 'card-4',
            type: 'text',
            text: 'Can we doubt mathematics? Descartes imagined an "evil demon" manipulating our thoughts.',
          },
          {
            id: 'card-5',
            type: 'text',
            text: 'But one thing cannot be doubted: "I think, therefore I am" (Cogito, ergo sum).',
          },
        ],
      },
    ],
  },
];

export const getTrackById = (id: string) => {
  return philosophyTracks.find(track => track.id === id);
};

export const getAllTracks = () => {
  return philosophyTracks;
};
