import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../styles/tokens';

export const AncientPattern = () => {
  return (
    <View style={styles.container}>
      {/* Greek Key Pattern */}
      <View style={styles.greekKey}>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={styles.keySegment} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    overflow: 'hidden',
    opacity: 0.3,
  },
  greekKey: {
    flexDirection: 'row',
    height: 4,
  },
  keySegment: {
    width: 20,
    height: 4,
    backgroundColor: tokens.colors.bronze,
    marginRight: 4,
    borderRadius: 1,
  },
});
