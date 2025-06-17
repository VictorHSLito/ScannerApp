import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ActionButtonProps {
  onPress: () => void;
  icon?: string;
  color?: string;
}

const IconButton: React.FC<ActionButtonProps> = ({ onPress, icon}) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <View style={styles.content}>
        {icon && <Icon name={icon} size={20} color="#fff"/>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;