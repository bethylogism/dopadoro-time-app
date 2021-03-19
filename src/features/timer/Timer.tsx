import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { Timing } from './Timing';

// vibrate is platform specific
const vibrate = () => {
  if (Platform.OS == 'ios') {
    // can't modify ios as easily as on android
    const loop = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(loop), 10000);
  } else {
    Vibration.vibrate(10000);
  }
};

export type PauseState = 'paused' | 'reset' | 'counting';
const DEFAULT_TIME = 2;
const DEFAULT_PROGRESS = 0.001;

export const Timer = ({
  focusSubject,
  onTimerEnd,
}: {
  focusSubject: string;
  onTimerEnd: () => void;
}) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [pauseState, setPauseState] = useState<PauseState>('paused');
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  const reset = () => {
    setPauseState('reset');
    setProgress(DEFAULT_PROGRESS);
  };

  const onProgress = (p: number) => setProgress(p);

  const changeTime = (t: number) => setMinutes(t);

  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(DEFAULT_PROGRESS);
    vibrate();
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          pauseState={pauseState}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <Text style={styles.focusTitle}>Focussing on:</Text>
      <Text style={styles.focusText}>{focusSubject}</Text>

      <ProgressBar
        progress={progress}
        color={colors.lightBlue}
        style={{ height: spacing.md }}
      />

      <View style={styles.buttonWrapper}>
        <RoundedButton
          onPress={() =>
            setPauseState(pauseState == 'counting' ? 'paused' : 'counting')
          }
          title={pauseState !== 'counting' ? 'Start' : 'Pause'}
          size={spacing.sumo}
          textStyle={{ fontSize: fontSizes.xl, fontWeight: 'bold' }}
        />
      </View>
      <Button onPress={reset}>{'Reset'}</Button>
      <Timing changeTime={changeTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  focusText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: spacing.lg,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  focusTitle: {
    textAlign: 'center',
    color: colors.lightBlue,
    fontSize: fontSizes.md,
    margin: spacing.sm,
    textTransform: 'uppercase',
  },
});
