import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardCartao = ({ cartao, selecionado = false, onSelecionar }) => {
  const numeroMascarado = `**** **** **** ${cartao.numero?.slice(-4) || '****'}`;
  return (
    <TouchableOpacity
      style={[styles.container, selecionado && styles.selecionado]}
      onPress={onSelecionar}
      activeOpacity={0.85}
    >
      <View style={styles.row}>
        <Text style={styles.numero}>{numeroMascarado}</Text>
        {selecionado && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={styles.titular}>{cartao.titular}</Text>
      <View style={styles.row}>
        <Text style={styles.validade}>Validade: {cartao.validade}</Text>
        <Text style={styles.tipo}>{cartao.tipo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardCartao;
