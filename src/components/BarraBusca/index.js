import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const BarraBusca = ({ value, onChangeText, placeholder = 'Buscar...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        returnKeyType="search"
      />
    </View>
  );
};

export default BarraBusca;
