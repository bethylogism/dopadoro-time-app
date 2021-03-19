import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({
  addSubject,
}: {
  addSubject: (draft: null | string) => void;
}) => {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onSubmitEditing={({ nativeEvent: { text } }) => setDraft(text)}
          style={{ flex: 1, marginRight: spacing.md }}
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
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
