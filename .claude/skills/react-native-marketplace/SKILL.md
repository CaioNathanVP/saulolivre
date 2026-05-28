---
name: react-native-marketplace
description: >
  Use this skill always when creating, editing, or scaffolding any screen, component, context,
  navigator, or service for the React Native Marketplace project. Triggers on: "criar tela", 
  "criar componente", "implementar tela", "nova tela", "tela de login", "tela de cadastro",
  "tela de produto", "carrinho", "checkout", "favoritos", "perfil", "dashboard", "histórico",
  "anunciar produto", "configuração de idioma", "adicionar cartão", "seus produtos",
  "react native screen", "react native component", "mockapi", "stack navigator", "drawer navigator",
  "useContext", "createContext", "RNPicker", "FlatList". 
  Enforce this skill for ANY file creation in the project, even if the user doesn't explicitly ask —
  all files must follow the patterns defined here.
---

# React Native Marketplace Skill

Padrão completo para o projeto **Marketplace App** em React Native, com MockAPI, navegação Stack+Drawer, Context API, e componentização por diretório.

---

## 1. Estrutura de Diretórios do Projeto

```
src/
├── api/
│   └── mockapi.js              # Configuração base do MockAPI
├── context/
│   └── AppContext.js            # Context global (useContext / createContext)
├── navigation/
│   ├── AppNavigator.js          # Stack + Drawer combinados
│   ├── DrawerNavigator.js       # Drawer com rotas principais
│   └── StackNavigator.js        # Stack para rotas de autenticação e detalhes
├── screens/
│   ├── Login/
│   ├── Cadastro/
│   ├── Dashboard/
│   ├── Idiomas/
│   ├── Perfil/
│   ├── Produto/
│   ├── AnunciarProduto/
│   ├── MeusProdutos/
│   ├── Carrinho/
│   ├── Checkout/
│   ├── HistoricoCompras/
│   ├── Favoritos/
│   └── AdicionarCartao/
├── components/
│   └── [ComponentName]/
│       ├── index.js
│       └── styles.js
└── utils/
    └── constants.js
```

> **Regra:** Cada tela fica em `screens/[NomeTela]/index.js` + `styles.js`. Cada componente reutilizável fica em `components/[NomeComponente]/index.js` + `styles.js`.

---

## 2. Padrão de Arquivo de Tela

Toda tela segue **exatamente** este template. Leia `references/screen-template.md` para o código completo.

Resumo obrigatório:
1. Importar React, hooks (`useState`, `useEffect`, `useContext`)
2. Importar `AppContext` de `../../context/AppContext`
3. Importar componentes filhos de `../../components/`
4. Importar `styles` de `./styles`
5. Exportar `default` com o nome da tela
6. Usar `useEffect` para fetch de dados da MockAPI e tratamento de erros
7. Se tiver lista + filtro: usar `RNPickerSelect` + `FlatList` (pai filtra, filho exibe)

---

## 3. Padrão de Componente

Todo componente em `components/[Nome]/`:

**index.js**
```js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const NomeComponente = ({ prop1, prop2, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{prop1}</Text>
        <Text style={styles.subtitle}>{prop2}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NomeComponente;
```

**styles.js**
```js
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  content: { flex: 1 },
  title: { fontSize: FONTS.size.md, fontWeight: FONTS.weight.bold, color: COLORS.text },
  subtitle: { fontSize: FONTS.size.sm, color: COLORS.textLight, marginTop: SPACING.xs },
});
```

---

## 4. Context Global (AppContext)

Leia `references/context-template.md` para o código completo.

O contexto expõe:
- `user` / `setUser` — usuário autenticado
- `cart` / `addToCart` / `removeFromCart` / `clearCart` — carrinho
- `favorites` / `toggleFavorite` — favoritos
- `language` / `setLanguage` — idioma selecionado
- `loading` / `setLoading` — loading global

---

## 5. Navegação

Leia `references/navigation-template.md` para o código completo.

Regras:
- **Stack Navigator**: Login → Cadastro → App (Drawer) → Produto → Checkout → AdicionarCartao
- **Drawer Navigator**: Dashboard, Perfil, MeusProdutos, HistoricoCompras, Favoritos, Idiomas, Carrinho, AnunciarProduto
- Passagem de parâmetros entre telas: SEMPRE via Context. Parâmetros simples (ex: `productId`) podem ir via `navigation.navigate('Produto', { productId })`.

---

## 6. MockAPI — Padrão de Chamadas

Leia `references/mockapi-template.md` para exemplos completos.

Base URL: `https://[SEU_ID].mockapi.io/api/v1`

Endpoints do projeto:
| Recurso      | Endpoint         |
|-------------|------------------|
| Usuários    | `/users`         |
| Produtos    | `/products`      |
| Pedidos     | `/orders`        |
| Cartões     | `/cards`         |
| Favoritos   | `/favorites`     |

Toda chamada deve estar dentro de `useEffect` com `try/catch`:
```js
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

---

## 7. Padrão de Filtro (RNPicker + FlatList)

**Componente pai** (tela) gerencia o estado do filtro e passa `filteredData` para o filho:

```js
// Tela (pai)
const [categoria, setCategoria] = useState('todos');
const filteredProducts = categoria === 'todos'
  ? products
  : products.filter(p => p.category === categoria);

return (
  <>
    <RNPickerSelect
      onValueChange={setCategoria}
      items={categorias}
      value={categoria}
    />
    <FlatList
      data={filteredProducts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CardProduto produto={item} />}
    />
  </>
);
```

**Componente filho** (CardProduto) apenas exibe — não filtra.

---

## 8. Design System — constants.js

```js
export const COLORS = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
};

export const FONTS = {
  size: { xs: 11, sm: 13, md: 15, lg: 18, xl: 22, xxl: 28 },
  weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
};

export const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const RADIUS = { sm: 6, md: 12, lg: 20, full: 9999 };
```

---

## 9. Checklist por Tela

Ao criar qualquer tela, verificar:

- [ ] Diretório `screens/[NomeTela]/` com `index.js` e `styles.js`
- [ ] Importa `useContext` + `AppContext`
- [ ] `useEffect` para side effects / fetch / limpeza
- [ ] Componentes filhos em `components/[Nome]/index.js` + `styles.js`
- [ ] Se lista: usa `FlatList` com `keyExtractor`
- [ ] Se filtro: usa `RNPickerSelect` no pai, filho só renderiza
- [ ] Estilos usando constantes de `utils/constants.js`
- [ ] Tratamento de erro com `try/catch` + `Alert`
- [ ] Loading state com `ActivityIndicator`

---

## 10. Referências

- `references/screen-template.md` — Template completo de tela com todos os padrões
- `references/context-template.md` — AppContext.js completo
- `references/navigation-template.md` — Navegação Stack + Drawer completa
- `references/mockapi-template.md` — Serviços MockAPI por recurso
- `references/screens-spec.md` — Especificação funcional de cada uma das 13 telas

> **Sempre leia o reference correspondente antes de criar qualquer arquivo.**
