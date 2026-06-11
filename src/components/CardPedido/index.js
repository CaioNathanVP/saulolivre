import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardPedido = ({ pedido, onPress }) => {
  const data = new Date(pedido.createdAt).toLocaleDateString('pt-BR');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <Text style={styles.numero}>Pedido #{pedido.id}</Text>
        <Text style={[styles.status, styles[`status_${pedido.status}`]]}>{pedido.status}</Text>
      </View>
      <Text style={styles.data}>{data}</Text>
      <Text style={styles.total}>Total: R$ {Number(pedido.total).toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default CardPedido;
