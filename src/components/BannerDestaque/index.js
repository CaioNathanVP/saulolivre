import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const BannerDestaque = ({ banners = [] }) => {
  const [ativo, setAtivo] = useState(0);
  const flatRef = useRef(null);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      const proximo = (ativo + 1) % banners.length;
      flatRef.current?.scrollToIndex({ index: proximo, animated: true });
      setAtivo(proximo);
    }, 3000);
    return () => clearInterval(interval);
  }, [ativo, banners.length]);

  if (!banners.length) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={banners}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.banner, { width }]} resizeMode="cover" />
        )}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setAtivo(index);
        }}
      />
      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, i === ativo && styles.dotAtivo]} />
        ))}
      </View>
    </View>
  );
};

export default BannerDestaque;
