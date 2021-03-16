import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onSubmitEditing={({ nativeEvent: { text } }) => setDraft(text)}
          style={{ flex: 1, marginRight: 15 }}
        />
        <RoundedButton onPress={() => addSubject(draft)} title="+" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
