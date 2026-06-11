import { BASE_URL } from '../utils/constants';

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
