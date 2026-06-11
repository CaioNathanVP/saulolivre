import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

const InputCampo = ({ label, value, onChangeText, tipo = 'default', erro, placeholder, ...props }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, erro && styles.inputErro]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={tipo}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={tipo === 'password'}
        autoCapitalize="none"
        {...props}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
};

export default InputCampo;
