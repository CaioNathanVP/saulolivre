import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (produto) => {
    setFavorites(prev => {
      const existe = prev.find(p => p.id === produto.id);
      if (existe) return prev.filter(p => p.id !== produto.id);
      return [...prev, produto];
    });
  };

  const isFavorite = (produtoId) => favorites.some(p => p.id === produtoId);

  const [language, setLanguage] = useState('pt-BR');

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const logout = () => {
    setUser(null);
    clearCart();
    setFavorites([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        language,
        setLanguage,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
