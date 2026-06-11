import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { UserService } from '../../api/mockapi';
import InputCampo from '../../components/InputCampo';
import BotaoPrimario from '../../components/BotaoPrimario';
import styles from './styles';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AppContext);

  useEffect(() => {
    setNome('');
    setEmail('');
    setSenha('');
    setTelefone('');
  }, []);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Nome, e-mail e senha são obrigatórios.');
      return;
    }
    try {
      setLoading(true);
      const data = await UserService.create({ nome, email, senha, telefone });
      setUser(data);
      navigation.replace('App');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta.');
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
          <InputCampo label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
          <InputCampo label="E-mail" value={email} onChangeText={setEmail} tipo="email-address" placeholder="seu@email.com" />
          <InputCampo label="Senha" value={senha} onChangeText={setSenha} tipo="password" placeholder="••••••••" />
          <InputCampo label="Telefone" value={telefone} onChangeText={setTelefone} tipo="phone-pad" placeholder="(11) 99999-9999" />
          <BotaoPrimario titulo="Criar Conta" onPress={handleCadastro} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cadastro;
