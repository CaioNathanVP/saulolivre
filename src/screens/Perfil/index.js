import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { UserService } from '../../api/mockapi';
import AvatarUsuario from '../../components/AvatarUsuario';
import InputCampo from '../../components/InputCampo';
import BotaoPrimario from '../../components/BotaoPrimario';
import styles from './styles';

const Perfil = ({ navigation }) => {
  const { user, setUser, logout } = useContext(AppContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setEmail(user.email || '');
      setTelefone(user.telefone || '');
    }
  }, [user]);

  const handleSalvar = async () => {
    try {
      setLoading(true);
      const data = await UserService.update(user.id, { nome, email, telefone });
      setUser(data);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleSair = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <AvatarUsuario uri={user?.avatar} nome={user?.nome} tamanho={80} />
          <InputCampo label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
          <InputCampo label="E-mail" value={email} onChangeText={setEmail} tipo="email-address" placeholder="seu@email.com" />
          <InputCampo label="Telefone" value={telefone} onChangeText={setTelefone} tipo="phone-pad" placeholder="(11) 99999-9999" />
          <BotaoPrimario titulo="Salvar" onPress={handleSalvar} loading={loading} />
          <BotaoPrimario titulo="Sair" onPress={handleSair} variante="secundario" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Perfil;
