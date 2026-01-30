import * as React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { Colors } from '../../../constants/Color';

// Export URL of project's index.html (file URI on Windows)
export const INDEX_HTML_URL = 'file:///c:/aurelien/projetDeLaVison/projectgomune.io/index.html';

type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

interface ButtonAppProps {
  title: string;
  onPress: () => void;
  mode?: ButtonMode;
  icon?: string;
  style?: ViewStyle;
  textColor?: string;
  buttonColor?: string;
  loading?: boolean;
  disabled?: boolean;
  hoverColor?: string;
}

const ButtonApp = ({ 
  title, 
  onPress, 
  mode = 'contained', 
  icon, 
  style, 
  textColor,
  buttonColor,
  loading = false,
  disabled = false,
}: ButtonAppProps) => {
  return (

    <Button 
      icon={icon} 
      mode={mode} 
      onPress={onPress}
      style={[styles.button, style]}
      buttonColor={buttonColor || (mode === 'contained' ? Colors.primary : undefined)}
      textColor={textColor || (mode === 'contained' ? Colors.white : Colors.primary)}
      loading={loading}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    borderRadius: 8,
  },
});

export default ButtonApp;