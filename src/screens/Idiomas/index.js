import React, { useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, Platform, StatusBar } from 'react-native';
import { AppContext } from '../../context/AppContext';
import ItemIdioma from '../../components/ItemIdioma';
import styles from './styles';

const IDIOMAS = [
  { label: 'Português', value: 'pt-BR', flag: '🇧🇷' },
  { label: 'English', value: 'en-US', flag: '🇺🇸' },
  { label: 'Español', value: 'es-ES', flag: '🇪🇸' },
  { label: 'Français', value: 'fr-FR', flag: '🇫🇷' },
];

const Idiomas = () => {
  const { language, setLanguage } = useContext(AppContext);

  useEffect(() => {}, [language]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={IDIOMAS}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <ItemIdioma
            idioma={item}
            selecionado={language === item.value}
            onSelecionar={() => setLanguage(item.value)}
          />
        )}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
};

export default Idiomas;
