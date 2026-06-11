import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardMeuProduto = ({ produto, onEditar, onDeletar }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: produto.imagem || 'https://via.placeholder.com/70' }}
        style={styles.imagem}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{produto.titulo}</Text>
        <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2)}</Text>
        <Text style={styles.estoque}>Estoque: {produto.estoque}</Text>
      </View>
      <View style={styles.acoes}>
        <TouchableOpacity style={styles.botaoEditar} onPress={onEditar}>
          <Text style={styles.botaoEditarTexto}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoDeletar} onPress={onDeletar}>
          <Text style={styles.botaoDeletarTexto}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardMeuProduto;
