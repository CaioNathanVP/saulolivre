import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { ProductService } from '../../api/mockapi';
import InputCampo from '../../components/InputCampo';
import BotaoPrimario from '../../components/BotaoPrimario';
import SeletorImagem from '../../components/SeletorImagem';
import styles from './styles';

const AnunciarProduto = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagem, setImagem] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppContext);

  useEffect(() => {
    setTitulo('');
    setDescricao('');
    setPreco('');
    setEstoque('');
    setImagem('');
  }, []);

  const handlePublicar = async () => {
    if (!titulo || !preco) {
      Alert.alert('Atenção', 'Título e preço são obrigatórios.');
      return;
    }
    try {
      setLoading(true);
      await ProductService.create({
        titulo,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque, 10) || 0,
        imagem,
        userId: user?.id,
      });
      Alert.alert('Sucesso', 'Anúncio publicado!');
      navigation.navigate('MeusProdutos');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao publicar anúncio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <SeletorImagem onImagemSelecionada={setImagem} imagemAtual={imagem} />
          <InputCampo label="Título" value={titulo} onChangeText={setTitulo} placeholder="Nome do produto" />
          <InputCampo label="Descrição" value={descricao} onChangeText={setDescricao} placeholder="Descreva o produto" multiline />
          <InputCampo label="Preço (R$)" value={preco} onChangeText={setPreco} tipo="numeric" placeholder="0.00" />
          <InputCampo label="Estoque" value={estoque} onChangeText={setEstoque} tipo="numeric" placeholder="0" />
          <BotaoPrimario titulo="Publicar Anúncio" onPress={handlePublicar} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AnunciarProduto;
