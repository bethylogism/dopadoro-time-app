import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';

export const RoundedButton = ({
  title = 'Click',
  style = {},
  textStyle = {},
  size = 70,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles(size).button, style]}
  >
    <Text style={[styles(size).text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = (size: number) =>
  StyleSheet.create({
    button: {
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: colors.white,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: size / 2,
      textTransform: 'uppercase',
    },
  });
