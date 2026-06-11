import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const ItemCarrinho = ({ item, onRemover, soLeitura = false }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.imagem || 'https://via.placeholder.com/60' }}
        style={styles.imagem}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.subtotal}>
          {item.quantidade}x R$ {Number(item.preco).toFixed(2)}
        </Text>
      </View>
      {!soLeitura && (
        <TouchableOpacity style={styles.remover} onPress={() => onRemover(item.id)}>
          <Text style={styles.removerTexto}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemCarrinho;
