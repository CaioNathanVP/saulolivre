import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const VisualizacaoCartao = ({ numero = '', titular = '', validade = '', tipo = 'credito' }) => {
  const formatarNumero = (n) => {
    const limpo = n.replace(/\D/g, '').padEnd(16, '•');
    return `${limpo.slice(0, 4)} ${limpo.slice(4, 8)} ${limpo.slice(8, 12)} ${limpo.slice(12, 16)}`;
  };

  return (
    <View style={styles.cartao}>
      <Text style={styles.tipo}>{tipo === 'credito' ? 'CRÉDITO' : 'DÉBITO'}</Text>
      <Text style={styles.numero}>{formatarNumero(numero)}</Text>
      <View style={styles.rodape}>
        <View>
          <Text style={styles.rLabel}>TITULAR</Text>
          <Text style={styles.rValor}>{titular.toUpperCase() || '••••• •••••'}</Text>
        </View>
        <View>
          <Text style={styles.rLabel}>VALIDADE</Text>
          <Text style={styles.rValor}>{validade || '••/••'}</Text>
        </View>
      </View>
    </View>
  );
};

export default VisualizacaoCartao;
