import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const LinkTexto = ({ texto, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};

export default LinkTexto;
