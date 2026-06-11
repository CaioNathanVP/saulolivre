import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const AvatarUsuario = ({ uri, nome, tamanho = 64 }) => {
  const inicial = nome ? nome.charAt(0).toUpperCase() : '?';
  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.avatar, { width: tamanho, height: tamanho, borderRadius: tamanho / 2 }]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.placeholder, { width: tamanho, height: tamanho, borderRadius: tamanho / 2 }]}>
          <Text style={[styles.inicial, { fontSize: tamanho * 0.4 }]}>{inicial}</Text>
        </View>
      )}
      {nome ? <Text style={styles.nome}>{nome}</Text> : null}
    </View>
  );
};

export default AvatarUsuario;
