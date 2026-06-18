// Camada de dados local — lê os arquivos JSON de src/data/ e mantém as
// alterações (create/update/delete) em memória durante a sessão do app.
// A interface dos Services é a mesma de uma API REST, então as telas
// continuam usando getAll/getById/create/update/delete normalmente.

import usersSeed from '../data/users.json';
import productsSeed from '../data/products.json';
import ordersSeed from '../data/orders.json';
import cardsSeed from '../data/cards.json';
import favoritesSeed from '../data/favorites.json';

// Cópias mutáveis em memória (clonadas dos JSON para não alterar o seed importado)
const db = {
  users: [...usersSeed],
  products: [...productsSeed],
  orders: [...ordersSeed],
  cards: [...cardsSeed],
  favorites: [...favoritesSeed],
};

// Simula latência de rede para manter o comportamento assíncrono das telas
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

// Gera um novo id incremental com base no maior id existente da coleção
const nextId = (colecao) => {
  const maior = colecao.reduce((max, item) => {
    const n = parseInt(item.id, 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return String(maior + 1);
};

// ── Usuários (clientes) ────────────────────────────────────────────────────
export const UserService = {
  getAll: async () => {
    await delay();
    return [...db.users];
  },

  getById: async (id) => {
    await delay();
    return db.users.find(u => u.id === String(id)) || null;
  },

  create: async (data) => {
    await delay();
    const novo = {
      ...data,
      id: nextId(db.users),
      createdAt: new Date().toISOString(),
    };
    db.users.push(novo);
    return novo;
  },

  update: async (id, data) => {
    await delay();
    const index = db.users.findIndex(u => u.id === String(id));
    if (index === -1) throw new Error('Usuário não encontrado');
    db.users[index] = { ...db.users[index], ...data };
    return db.users[index];
  },

  login: async (email, senha) => {
    await delay();
    return db.users.find(u => u.email === email && u.senha === senha) || null;
  },
};

// ── Produtos (itens) ────────────────────────────────────────────────────────
export const ProductService = {
  getAll: async () => {
    await delay();
    return [...db.products];
  },

  getById: async (id) => {
    await delay();
    return db.products.find(p => p.id === String(id)) || null;
  },

  getByUser: async (userId) => {
    await delay();
    return db.products.filter(p => p.userId === String(userId));
  },

  create: async (data) => {
    await delay();
    const novo = {
      ...data,
      id: nextId(db.products),
      userId: data.userId != null ? String(data.userId) : null,
      createdAt: new Date().toISOString(),
    };
    db.products.push(novo);
    return novo;
  },

  update: async (id, data) => {
    await delay();
    const index = db.products.findIndex(p => p.id === String(id));
    if (index === -1) throw new Error('Produto não encontrado');
    db.products[index] = { ...db.products[index], ...data };
    return db.products[index];
  },

  delete: async (id) => {
    await delay();
    db.products = db.products.filter(p => p.id !== String(id));
    return { id: String(id) };
  },
};

// ── Pedidos ───────────────────────────────────────────────────────────────
export const OrderService = {
  getByUser: async (userId) => {
    await delay();
    return db.orders.filter(o => o.userId === String(userId));
  },

  create: async (data) => {
    await delay();
    const novo = {
      ...data,
      id: nextId(db.orders),
      userId: data.userId != null ? String(data.userId) : null,
      createdAt: new Date().toISOString(),
    };
    db.orders.push(novo);
    return novo;
  },
};

// ── Cartões ───────────────────────────────────────────────────────────────
export const CardService = {
  getByUser: async (userId) => {
    await delay();
    return db.cards.filter(c => c.userId === String(userId));
  },

  create: async (data) => {
    await delay();
    const novo = {
      ...data,
      id: nextId(db.cards),
      userId: data.userId != null ? String(data.userId) : null,
    };
    db.cards.push(novo);
    return novo;
  },

  delete: async (id) => {
    await delay();
    db.cards = db.cards.filter(c => c.id !== String(id));
    return { id: String(id) };
  },
};

// ── Favoritos ─────────────────────────────────────────────────────────────
export const FavoriteService = {
  getByUser: async (userId) => {
    await delay();
    return db.favorites.filter(f => f.userId === String(userId));
  },

  create: async (data) => {
    await delay();
    const novo = {
      ...data,
      id: nextId(db.favorites),
      userId: data.userId != null ? String(data.userId) : null,
      productId: data.productId != null ? String(data.productId) : null,
    };
    db.favorites.push(novo);
    return novo;
  },

  delete: async (id) => {
    await delay();
    db.favorites = db.favorites.filter(f => f.id !== String(id));
    return { id: String(id) };
  },
};
