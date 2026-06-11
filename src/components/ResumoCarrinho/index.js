import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ResumoCarrinho = ({ total, quantidadeItens }) => {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.label}>Itens</Text>
        <Text style={styles.valor}>{quantidadeItens}</Text>
      </View>
      <View style={styles.separador} />
      <View style={styles.linha}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValor}>R$ {Number(total).toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default ResumoCarrinho;
