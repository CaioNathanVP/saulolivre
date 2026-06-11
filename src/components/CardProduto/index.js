import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardProduto = ({ produto, onPress, onFavoritar, favoritado = false }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: produto.imagem || 'https://via.placeholder.com/100' }}
        style={styles.imagem}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{produto.titulo}</Text>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.favoritar} onPress={onFavoritar}>
        <Text style={[styles.heart, favoritado && styles.heartAtivo]}>
          {favoritado ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardProduto;
