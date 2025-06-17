import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const TextButton: React.FC<Props> = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TextButton;