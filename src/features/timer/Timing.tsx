import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const Timing = ({ changeTime }: { changeTime: (t: number) => void }) => {
  return (
    <View style={styles.timingWrapper}>
      <View style={styles.timingBtn}>
        <RoundedButton size={75} title="10" onPress={() => changeTime(10)} />
      </View>
      <View style={styles.timingBtn}>
        <RoundedButton size={75} title="20" onPress={() => changeTime(20)} />
      </View>
      <View style={styles.timingBtn}>
        <RoundedButton size={75} title="25" onPress={() => changeTime(25)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  timingBtn: {
    padding: spacing.sm,
  },
});
