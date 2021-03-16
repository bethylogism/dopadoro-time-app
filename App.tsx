import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Focus } from './src/features/focus/Focus';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);

  // const addSubject = (input: string) => setFocusSubject(input);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text style={{ color: 'white' }}>Focus: {focusSubject}</Text>
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
