import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ItemIdioma = ({ idioma, selecionado = false, onSelecionar }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelecionar} activeOpacity={0.8}>
      <Text style={styles.bandeira}>{idioma.flag}</Text>
      <Text style={styles.nome}>{idioma.label}</Text>
      <View style={[styles.radio, selecionado && styles.radioAtivo]}>
        {selecionado && <View style={styles.radioPonto} />}
      </View>
    </TouchableOpacity>
  );
};

export default ItemIdioma;
