# MockAPI — Serviços e Padrões

## api/mockapi.js — Configuração base

```js
// Substitua pelo seu ID real do MockAPI
export const BASE_URL = 'https://[SEU_ID].mockapi.io/api/v1';

// ── Usuários ─────────────────────────────────────────────────────────────
export const UserService = {
  getAll: () => fetch(`${BASE_URL}/users`).then(r => r.json()),

  getById: (id) => fetch(`${BASE_URL}/users/${id}`).then(r => r.json()),

  create: (data) =>
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  update: (id, data) =>
    fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  login: async (email, senha) => {
    const users = await fetch(`${BASE_URL}/users`).then(r => r.json());
    return users.find(u => u.email === email && u.senha === senha) || null;
  },
};

// ── Produtos ──────────────────────────────────────────────────────────────
export const ProductService = {
  getAll: () => fetch(`${BASE_URL}/products`).then(r => r.json()),

  getById: (id) => fetch(`${BASE_URL}/products/${id}`).then(r => r.json()),

  getByUser: async (userId) => {
    const products = await fetch(`${BASE_URL}/products`).then(r => r.json());
    return products.filter(p => p.userId === userId);
  },

  create: (data) =>
    fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  update: (id, data) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  delete: (id) =>
    fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' }).then(r => r.json()),
};

// ── Pedidos ───────────────────────────────────────────────────────────────
export const OrderService = {
  getByUser: async (userId) => {
    const orders = await fetch(`${BASE_URL}/orders`).then(r => r.json());
    return orders.filter(o => o.userId === userId);
  },

  create: (data) =>
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
};

// ── Cartões ───────────────────────────────────────────────────────────────
export const CardService = {
  getByUser: async (userId) => {
    const cards = await fetch(`${BASE_URL}/cards`).then(r => r.json());
    return cards.filter(c => c.userId === userId);
  },

  create: (data) =>
    fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  delete: (id) =>
    fetch(`${BASE_URL}/cards/${id}`, { method: 'DELETE' }).then(r => r.json()),
};

// ── Favoritos ─────────────────────────────────────────────────────────────
export const FavoriteService = {
  getByUser: async (userId) => {
    const favs = await fetch(`${BASE_URL}/favorites`).then(r => r.json());
    return favs.filter(f => f.userId === userId);
  },

  create: (data) =>
    fetch(`${BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  delete: (id) =>
    fetch(`${BASE_URL}/favorites/${id}`, { method: 'DELETE' }).then(r => r.json()),
};
```

---

## Schemas MockAPI (configure no painel)

### /users
```json
{
  "id": "string (auto)",
  "nome": "string",
  "email": "string",
  "senha": "string",
  "avatar": "string (url)",
  "telefone": "string",
  "createdAt": "datetime"
}
```

### /products
```json
{
  "id": "string (auto)",
  "userId": "string",
  "titulo": "string",
  "descricao": "string",
  "preco": "number",
  "categoria": "string",
  "imagem": "string (url)",
  "estoque": "number",
  "createdAt": "datetime"
}
```

### /orders
```json
{
  "id": "string (auto)",
  "userId": "string",
  "itens": "array",
  "total": "number",
  "status": "string",
  "cartaoId": "string",
  "createdAt": "datetime"
}
```

### /cards
```json
{
  "id": "string (auto)",
  "userId": "string",
  "numero": "string",
  "titular": "string",
  "validade": "string",
  "bandeira": "string",
  "tipo": "string (credito|debito)"
}
```

### /favorites
```json
{
  "id": "string (auto)",
  "userId": "string",
  "productId": "string"
}
```

---

## Padrão obrigatório de uso (dentro de useEffect)

```js
useEffect(() => {
  let cancelled = false; // cleanup flag

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAll();
      if (!cancelled) setProducts(data);
    } catch (error) {
      if (!cancelled) {
        console.error('fetchData:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  fetchData();

  return () => { cancelled = true; }; // cleanup: evita setState em componente desmontado
}, []);
```
