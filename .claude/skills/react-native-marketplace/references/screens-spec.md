# Especificação Funcional das 13 Telas

---

## 1. Login (`screens/Login/`)

**Objetivo:** Autenticar usuário via MockAPI.

**Componentes filhos:**
- `InputCampo` — campo de e-mail e senha
- `BotaoPrimario` — botão "Entrar"
- `LinkTexto` — link "Criar conta"

**Lógica principal:**
- `useEffect`: verificar se usuário já está logado no Context (redireciona automaticamente)
- Chamar `UserService.login(email, senha)`
- Se encontrado: `setUser(data)` no Context → navega para `App`
- Se não encontrado: `Alert.alert('Erro', 'Credenciais inválidas')`

**Navegação:**
- Sucesso → `navigation.replace('App')`
- Link cadastro → `navigation.navigate('Cadastro')`

---

## 2. Cadastro (`screens/Cadastro/`)

**Objetivo:** Criar nova conta no MockAPI.

**Componentes filhos:**
- `InputCampo` — nome, e-mail, senha, telefone
- `BotaoPrimario` — botão "Criar Conta"

**Lógica principal:**
- Validar campos obrigatórios antes de enviar
- `useEffect`: limpeza de formulário ao montar
- `UserService.create(formData)` → `setUser(data)` → navega para `App`

---

## 3. Dashboard (`screens/Dashboard/`)

**Objetivo:** Tela principal com listagem de produtos, busca e filtro por categoria.

**Componentes filhos:**
- `CardProduto` — card com imagem, título, preço, botão favoritar
- `BarraBusca` — campo de busca por texto
- `BannerDestaque` — banner rotativo de promoções

**Lógica principal:**
- `useEffect`: buscar todos os produtos ao montar
- Filtro por categoria com `RNPickerSelect` (pai) + `FlatList` renderizando `CardProduto` (filho)
- Busca por texto filtra em memória: `produtos.filter(p => p.titulo.includes(busca))`

**Navegação:**
- Tap no card → `navigation.navigate('Produto', { productId: item.id })`

---

## 4. Idiomas (`screens/Idiomas/`)

**Objetivo:** Selecionar idioma do app.

**Componentes filhos:**
- `ItemIdioma` — linha com bandeira, nome, radio selecionado

**Lógica principal:**
- Lista hardcoded de idiomas: `[{ label: 'Português', value: 'pt-BR', flag: '🇧🇷' }, ...]`
- `useEffect`: ler `language` do Context e pré-selecionar
- `setLanguage(valor)` no Context ao selecionar

---

## 5. Perfil (`screens/Perfil/`)

**Objetivo:** Exibir e editar dados do usuário autenticado.

**Componentes filhos:**
- `AvatarUsuario` — foto + nome
- `InputCampo` — campos editáveis
- `BotaoPrimario` — "Salvar" e "Sair"

**Lógica principal:**
- `useEffect`: carregar `user` do Context e preencher formulário
- `UserService.update(user.id, formData)` → `setUser(data)` no Context
- Botão sair: `logout()` do Context → navega para `Login`

---

## 6. Produto (`screens/Produto/`)

**Objetivo:** Exibir detalhes de um produto específico.

**Componentes filhos:**
- `GaleriaImagem` — imagem do produto (grande)
- `InfoProduto` — título, preço, categoria, descrição
- `BotaoPrimario` — "Adicionar ao Carrinho" e "Favoritar"

**Lógica principal:**
- Recebe `productId` via `route.params`
- `useEffect`: `ProductService.getById(productId)`
- `addToCart(produto)` → navega para `Carrinho` ou permanece
- `toggleFavorite(produto)` via Context

---

## 7. AnunciarProduto (`screens/AnunciarProduto/`)

**Objetivo:** Criar novo produto/anúncio.

**Componentes filhos:**
- `InputCampo` — título, descrição, preço, estoque
- `SeletorImagem` — selecionar imagem (expo-image-picker)
- `BotaoPrimario` — "Publicar Anúncio"

**Lógica principal:**
- `useEffect`: limpar formulário ao montar
- Validar campos
- `ProductService.create({ ...formData, userId: user.id })` → navega para `MeusProdutos`

---

## 8. MeusProdutos (`screens/MeusProdutos/`)

**Objetivo:** Listar produtos anunciados pelo usuário logado.

**Componentes filhos:**
- `CardMeuProduto` — card com botões editar/deletar
- Filtro por status (ativo/inativo)

**Lógica principal:**
- `useEffect`: `ProductService.getByUser(user.id)`
- Deletar: `ProductService.delete(id)` → atualiza lista
- Filtro via `RNPickerSelect` no pai

---

## 9. Carrinho (`screens/Carrinho/`)

**Objetivo:** Exibir itens no carrinho, ajustar quantidades, ir ao checkout.

**Componentes filhos:**
- `ItemCarrinho` — produto + quantidade + subtotal + remover
- `ResumoCarrinho` — total do carrinho

**Lógica principal:**
- Lê `cart` e `cartTotal` do Context
- `removeFromCart(id)` via Context
- Botão "Finalizar" → `navigation.navigate('Checkout')`

---

## 10. Checkout (`screens/Checkout/`)

**Objetivo:** Revisar pedido e selecionar cartão para pagamento.

**Componentes filhos:**
- `ItemCarrinho` — lista de itens (read-only)
- `CardCartao` — cartão selecionado
- `BotaoPrimario` — "Confirmar Pedido" e "Adicionar Cartão"

**Lógica principal:**
- `useEffect`: buscar cartões do usuário `CardService.getByUser(user.id)`
- Criar pedido: `OrderService.create({ userId, itens: cart, total: cartTotal, cartaoId })`
- `clearCart()` no Context após confirmação
- Exibir confirmação e navegar para `HistoricoCompras`

---

## 11. HistoricoCompras (`screens/HistoricoCompras/`)

**Objetivo:** Listar pedidos anteriores do usuário.

**Componentes filhos:**
- `CardPedido` — número do pedido, data, total, status

**Lógica principal:**
- `useEffect`: `OrderService.getByUser(user.id)`
- Filtro por status via `RNPickerSelect`

---

## 12. Favoritos (`screens/Favoritos/`)

**Objetivo:** Listar produtos favoritados.

**Componentes filhos:**
- `CardProduto` — com botão de desfavoritar

**Lógica principal:**
- Lê `favorites` do Context
- `toggleFavorite(produto)` para remover
- Tap no card → `navigation.navigate('Produto', { productId })`

---

## 13. AdicionarCartao (`screens/AdicionarCartao/`)

**Objetivo:** Adicionar novo cartão de débito/crédito.

**Componentes filhos:**
- `InputCampo` — número, titular, validade, CVV
- `SeletorTipoCartao` — débito/crédito (RNPickerSelect)
- `VisualizacaoCartao` — preview do cartão sendo preenchido
- `BotaoPrimario` — "Salvar Cartão"

**Lógica principal:**
- `useEffect`: limpar form ao montar
- Formatar número do cartão com máscara (grupos de 4 dígitos)
- `CardService.create({ ...formData, userId: user.id })`
- Após salvar: `navigation.goBack()`

---

## Componentes Compartilhados (criar em `components/`)

| Componente          | Props principais                                 |
|---------------------|--------------------------------------------------|
| `BotaoPrimario`     | `titulo`, `onPress`, `loading`, `variante`       |
| `InputCampo`        | `label`, `value`, `onChangeText`, `tipo`, `erro` |
| `CardProduto`       | `produto`, `onPress`, `onFavoritar`, `favoritado`|
| `CardPedido`        | `pedido`, `onPress`                              |
| `ItemCarrinho`      | `item`, `onRemover`, `soLeitura`                 |
| `CardCartao`        | `cartao`, `selecionado`, `onSelecionar`          |
| `BarraBusca`        | `value`, `onChangeText`, `placeholder`           |
| `AvatarUsuario`     | `uri`, `nome`, `tamanho`                         |
| `LinkTexto`         | `texto`, `onPress`                               |
| `ItemIdioma`        | `idioma`, `selecionado`, `onSelecionar`          |
| `BannerDestaque`    | `banners` (array de urls)                        |
| `SeletorImagem`     | `onImagemSelecionada`, `imagemAtual`             |
| `CardMeuProduto`    | `produto`, `onEditar`, `onDeletar`               |
| `ResumoCarrinho`    | `total`, `quantidadeItens`                       |
| `VisualizacaoCartao`| `numero`, `titular`, `validade`, `tipo`          |
| `SeletorTipoCartao` | `value`, `onValueChange`                         |
