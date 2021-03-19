import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { PauseState } from '../features/timer/Timer';
import { useKeepAwake } from 'expo-keep-awake';

// Utils
const minutesToMillis = (min: number) => min * 1000 * 60;
const millisToMins = (millis: number) => Math.floor(millis / 1000 / 60) % 60;
const millisToSeconds = (millis: number) => Math.floor(millis / 1000) % 60;
const formatSecs = (t: number) => (t < 10 ? `${t}0` : `${t}`);
const formatMins = (t: number) => (t < 10 ? `0${t}` : `${t}`);

export const Countdown = ({
  minutes = 20,
  pauseState = 'paused',
  onProgress,
  onEnd,
}: {
  minutes: number;
  onProgress: (p: number) => void;
  pauseState: PauseState;
  onEnd: () => void;
}) => {
  useKeepAwake();
  const [millis, setMillis] = useState(minutesToMillis(minutes)); // this is a shadow of Timer's minutes state...
  const mins = formatMins(millisToMins(millis));
  const secs = formatSecs(millisToSeconds(millis));
  const countdownInterval = useRef<null | void | NodeJS.Timeout>(null);

  useEffect(() => {
    if (pauseState === 'paused') {
      countdownInterval.current && clearInterval(countdownInterval.current);
      return;
    }

    if (pauseState === 'reset') {
      setMillis(minutesToMillis(minutes));
      countdownInterval.current && clearInterval(countdownInterval.current);
      return;
    }

    countdownInterval.current = setInterval(countdown, 1000);
    return () => {
      countdownInterval.current && clearInterval(countdownInterval.current);
    };
  }, [pauseState]);

  // if minutes prop changes, reset the countdown milliseconds
  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  // setState in the parent component only in useEffect
  useEffect(() => {
    let progress = 1 - millis / minutesToMillis(minutes);
    onProgress(progress);
  }, [millis]);

  const countdown = () => {
    // t is the previous / current actual state, which setState has access to:
    //  setState((prevState, propsWhenUpdating) => prevState + 1 ... etc)
    setMillis((t: number) => {
      if (t === 0) {
        countdownInterval.current && clearInterval(countdownInterval.current);

        onEnd(); // end the focus time on this component
        return t;
      }
      const timeLeft = t - 1000;
      // set millis to be the new, decremented millis
      return timeLeft;
    });
  };

  return (
    <Text style={styles.text}>
      {mins}:{secs}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: fontSizes.xxxl,
    color: colors.white,
    padding: spacing.lg,
    fontWeight: 'bold',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
