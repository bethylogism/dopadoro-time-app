import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
      borderColor: '#fff',
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: size / 2,
    },
  });
