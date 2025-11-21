import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface InstructionsListProps {
  instructions: string[];
}

export const InstructionsList = ({ instructions }: InstructionsListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <FlatList
        data={instructions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>{index + 1}</Text>
            </View>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

