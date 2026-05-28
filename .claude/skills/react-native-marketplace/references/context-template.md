# AppContext — Template Completo

## context/AppContext.js

```js
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { BASE_URL } from '../utils/constants';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  // ── Usuário ──────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);

  // ── Carrinho ─────────────────────────────────────────────────────────
  const [cart, setCart] = useState([]);

  const addToCart = (produto) => {
    setCart(prev => {
      const existe = prev.find(p => p.id === produto.id);
      if (existe) {
        return prev.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removeFromCart = (produtoId) => {
    setCart(prev => prev.filter(p => p.id !== produtoId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade, 0
  );

  // ── Favoritos ────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (produto) => {
    setFavorites(prev => {
      const existe = prev.find(p => p.id === produto.id);
      if (existe) return prev.filter(p => p.id !== produto.id);
      return [...prev, produto];
    });
  };

  const isFavorite = (produtoId) => favorites.some(p => p.id === produtoId);

  // ── Idioma ───────────────────────────────────────────────────────────
  const [language, setLanguage] = useState('pt-BR');

  // ── Loading global ───────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);

  // ── useEffect: restaurar sessão / dados persistidos ──────────────────
  useEffect(() => {
    // Exemplo: restaurar usuário salvo (AsyncStorage, etc.)
    // const restoreSession = async () => { ... }
    // restoreSession();
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    clearCart();
    setFavorites([]);
  };

  return (
    <AppContext.Provider
      value={{
        // Usuário
        user,
        setUser,
        logout,
        // Carrinho
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        // Favoritos
        favorites,
        toggleFavorite,
        isFavorite,
        // Idioma
        language,
        setLanguage,
        // Loading
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
```

---

## App.js — Envolva tudo com AppProvider

```js
import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AppProvider>
    <AppNavigator />
  </AppProvider>
);

export default App;
```

---

## Como consumir em qualquer tela ou componente

```js
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MinhasTela = () => {
  const { user, cart, addToCart, favorites, toggleFavorite, language } = useContext(AppContext);
  // use as variáveis normalmente
};
```
