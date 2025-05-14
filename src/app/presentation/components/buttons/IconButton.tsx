import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ActionButtonProps {
  title?: string;
  onPress: () => void;
  icon?: string;
  color?: string;
}

const IconButton: React.FC<ActionButtonProps> = ({ title, onPress, icon, color = '#d9534f' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.content}>
        {icon && <Icon name={icon} size={18} color="#fff" style={{ marginRight: 6 }} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default IconButton;