import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { tokens, getDomainColor } from '../styles/tokens';
import { Button } from '../components/Button';
import { useBatchStore } from '../stores/batchStore';
import { ModuleCard as ModuleCardType } from '../types';

const { width } = Dimensions.get('window');

export const BatchScreen = ({ navigation }: any) => {
  const { currentBatch, completeModule } = useBatchStore();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [startTime] = useState(Date.now());

  if (!currentBatch) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No batch available</Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </View>
    );
  }

  const currentModule = currentBatch.modules[currentModuleIndex];
  if (!currentModule || currentModule.completed) {
    // Find next incomplete module
    const nextIncomplete = currentBatch.modules.find(m => !m.completed);
    if (nextIncomplete) {
      const nextIndex = currentBatch.modules.indexOf(nextIncomplete);
      setCurrentModuleIndex(nextIndex);
      setCurrentCardIndex(0);
      return null;
    }
    
    // All modules completed
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Batch Complete!</Text>
        <Text style={styles.text}>
          You completed {currentBatch.completedCount} modules today.
        </Text>
        <Button onPress={() => navigation.navigate('Home')}>Return Home</Button>
      </View>
    );
  }

  const cards = currentModule.module.cards;
  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Module completed
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      completeModule(currentModule.moduleId, 100, timeSpent);
      
      // Move to next module
      if (currentModuleIndex < currentBatch.modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentCardIndex(0);
      } else {
        navigation.navigate('Home');
      }
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Module Info */}
      <View style={styles.moduleInfo}>
        <View
          style={[
            styles.domainBadge,
            { backgroundColor: getDomainColor(currentModule.module.domain) },
          ]}
        >
          <Text style={styles.domainText}>{currentModule.module.domain}</Text>
        </View>
        <Text style={styles.moduleTitle}>{currentModule.module.title}</Text>
      </View>

      {/* Card Content */}
      <ScrollView style={styles.cardContainer} contentContainerStyle={styles.cardContent}>
        <CardRenderer card={currentCard} />
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Button
          onPress={handlePrevious}
          variant="outline"
          disabled={currentCardIndex === 0}
          style={styles.navButton}
        >
          Previous
        </Button>
        <Button onPress={handleNext} style={styles.navButton}>
          {currentCardIndex === cards.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </View>

      {/* Card indicator */}
      <View style={styles.cardIndicator}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentCardIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const CardRenderer = ({ card }: { card: ModuleCardType }) => {
  if (card.type === 'text') {
    return <Text style={styles.cardText}>{card.text}</Text>;
  }
  
  if (card.type === 'animation' && card.lottieUrl) {
    return (
      <View style={styles.animationPlaceholder}>
        <Text style={styles.placeholderText}>🎬 Animation</Text>
        <Text style={styles.cardText}>{card.text}</Text>
      </View>
    );
  }
  
  return <Text style={styles.cardText}>Card content</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.obsidian,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.lg,
    paddingTop: tokens.spacing['2xl'],
  },
  closeButton: {
    fontSize: tokens.fontSizes.xl,
    color: tokens.colors.alabaster,
    marginRight: tokens.spacing.md,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: tokens.colors.stoneGray,
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: tokens.colors.bronze,
  },
  moduleInfo: {
    paddingHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.lg,
  },
  domainBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radius.sm,
    marginBottom: tokens.spacing.sm,
  },
  domainText: {
    fontSize: tokens.fontSizes.sm,
    fontWeight: '600',
    color: tokens.colors.alabaster,
    textTransform: 'uppercase',
  },
  moduleTitle: {
    fontSize: tokens.fontSizes.xl,
    fontWeight: '700',
    color: tokens.colors.alabaster,
  },
  cardContainer: {
    flex: 1,
  },
  cardContent: {
    padding: tokens.spacing.lg,
    minHeight: 400,
  },
  cardText: {
    fontSize: tokens.fontSizes.lg,
    color: tokens.colors.alabaster,
    lineHeight: tokens.fontSizes.lg * 1.6,
  },
  animationPlaceholder: {
    height: 300,
    backgroundColor: tokens.colors.charcoal,
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.lg,
  },
  placeholderText: {
    fontSize: tokens.fontSizes['2xl'],
    marginBottom: tokens.spacing.md,
  },
  navigation: {
    flexDirection: 'row',
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  navButton: {
    flex: 1,
  },
  cardIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: tokens.spacing.lg,
    gap: tokens.spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.colors.stoneGray,
  },
  activeDot: {
    backgroundColor: tokens.colors.bronze,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: tokens.fontSizes['3xl'],
    fontWeight: '700',
    color: tokens.colors.alabaster,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
  },
  text: {
    fontSize: tokens.fontSizes.base,
    color: tokens.colors.silver,
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
  },
});
