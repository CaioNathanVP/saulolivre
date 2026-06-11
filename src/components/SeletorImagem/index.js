import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const SeletorImagem = ({ onImagemSelecionada, imagemAtual }) => {
  const selecionar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      onImagemSelecionada(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selecionar} activeOpacity={0.8}>
      {imagemAtual ? (
        <Image source={{ uri: imagemAtual }} style={styles.imagem} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.icone}>📷</Text>
          <Text style={styles.texto}>Selecionar Imagem</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SeletorImagem;
