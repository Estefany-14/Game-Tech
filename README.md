# 🎮 GameTech – Jogar é evoluir!

> **Aplicativo e Plataforma Tecnológica Oficial da GameTech**  
> Empresa criada por **Estefany da Cunha**  
> Especializada em jogos digitais, aplicativos, realidade virtual, produtos tecnológicos e segurança digital.

---

## 🌟 Identidade Visual

O aplicativo foi desenhado com estética futurista de alta tecnologia (cyberpunk/corporate tech):
- **Preto Profundo (`#06050a`)**: Cor principal de fundo com grade tecnológica e partículas de luz.
- **Roxo Neon (`#a855f7` / `#c084fc`)**: Detalhes luminosos, botões, bordas com glow e destaques.
- **Tons de Lilás e Azul Neon (`#38bdf8` / `#06b6d4` / `#d8b4fe`)**: Efeitos visuais e contraste cibernético.
- **Branco Cristal e Cinza Tecnológico (`#ffffff` / `#94a3b8`)**: Tipografia nítida e legível.
- **Efeitos de Som Cibernéticos (Web Audio API)**: Sons sintetizados nativamente sem necessidade de arquivos externos ou conexões pesadas.

---

## 🚀 Como Executar o Aplicativo

### Opção 1: Servidor Local Node.js
No terminal, dentro da pasta do projeto (`c:\Users\aluno\Documents\estefany\GameTech`):
```bash
npm start
```
Ou:
```bash
node server.js
```
Abra seu navegador em: **`http://localhost:3000`**

### Opção 2: Abertura Direta no Navegador
Você também pode simplesmente abrir o arquivo **`index.html`** com dois cliques em qualquer navegador (Chrome, Edge, Firefox, Safari). O aplicativo é 100% autossuficiente e funciona perfeitamente sem dependências externas!

---

## 👥 Acessos e Perfis de Demonstração (1 Clique)

O aplicativo conta com Controle de Acesso Baseado em Perfis (**RBAC**). Você pode alternar instantaneamente entre qualquer um dos perfis com os botões de 1 clique no topo ou no modal de login:

| Perfil | Nome | E-mail | Senha | Permissões |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador** | **Estefany da Cunha** | `admin@gametech.com` | `admin` | Acesso total: Painel Admin, Financeiro, Gestão de Produtos, Clientes e Pedidos. |
| **Responsável** | **Carlos & Mariana** | `pais@gametech.com` | `pais` | Acesso à Área dos Pais (Controle Parental), Loja, Serviços, Perfil. |
| **Usuário Gamer** | **Lucas Silva** | `gamer@gametech.com` | `gamer` | Acesso à Loja Virtual, Jogos, Orçamento de Serviços, Histórico de Pedidos. |

---

## 📱 As 10 Áreas Completas do Aplicativo

### 1. Tela Inicial de Apresentação
- Logo holográfica animada da GameTech.
- Slogan em destaque: **"Jogar é evoluir!"**.
- Apresentação da fundadora Estefany da Cunha.
- Ações rápidas de login, cadastro e alternância de perfis.
- Vitrine dos principais pilares tecnológicos.

### 2. Sobre a GameTech
- História inspiradora da criação da empresa por Estefany da Cunha.
- **Missão:** "Unir tecnologia, criatividade, entretenimento e segurança digital para facilitar a vida das pessoas."
- **Visão:** "Nos tornarmos uma referência no mercado tecnológico, desenvolvendo produtos e serviços inovadores."
- **Valores:** Criatividade, inovação, responsabilidade, segurança, qualidade e compromisso.
- Linha do tempo interativa e biografia da CEO.

### 3. Produtos (Loja Virtual Completa)
Catálogo com as 6 categorias solicitadas:
1. **Jogos digitais** (*CyberOdyssey 2077*, *Neon Blade*, *PixelQuest Kids*)
2. **Óculos de realidade virtual** (*GameTech VR Vision X1*, *HoloLens Light*)
3. **Brinquedos tecnológicos** (*Robô Educativo RobiTech 3000*, *Drone Gamer CyberFly*)
4. **Acessórios para gamers** (*Teclado Mecânico NeonPulse RGB*, *Headset 7.1 CyberSound*)
5. **Roupas personalizadas** (*Moletom CyberTech Neon*, *Camisetas Oficiais*)
6. **Produtos tecnológicos** (*Token Guard FIDO2*, *Lâmpada Gamer Smart Sync*)
- Filtros dinâmicos por categoria e busca em tempo real.
- Modal com especificações técnicas detalhadas de cada produto.
- **Carrinho de Compras Interativo** com cupom promocional (`GAMETECH10`), cálculo de frete e totalizador.
- **Checkout Completo** com PIX (QR Code gerado + Chave Copia e Cola), Cartão de Crédito e Boleto.

### 4. Serviços Oferecidos & Orçamento Interativo
Apresentação detalhada dos 7 serviços:
- Desenvolvimento de Jogos
- Criação de Aplicativos
- Desenvolvimento de Sites
- Sistemas Personalizados
- Soluções de Segurança Digital
- Projetos com Realidade Virtual
- Desenvolvimento de Produtos Tecnológicos
- **Calculadora de Orçamento Interativo:** permite selecionar porte, prazo e gerar estimativa prévia com envio direto para a equipe de Estefany.

### 5. Área Financeira & Simulação
- Indicadores principais: Faturamento Mensal, Faturamento Anual, Lucro Líquido Estimado, Despesas, Investimentos e Assinantes.
- **Simulação Oficial de Faturamento Mensal**:
  - 200 assinantes pagando R$ 19,90 = **R$ 3.980,00**
  - 50 jogos vendidos por R$ 40,00 = **R$ 2.000,00**
  - 10 serviços de desenvolvimento por R$ 500,00 = **R$ 5.000,00**
  - Vendas de produtos tecnológicos = **R$ 4.000,00**
  - **Faturamento mensal estimado: R$ 14.980,00**
- **Calculadora de Cenários Interativa:** sliders para o usuário testar novas quantidades de assinantes, jogos e serviços com recálculo em tempo real.
- **Gráficos em HTML5 Canvas de Alta Resolução:**
  - Gráfico Donut de distribuição das receitas.
  - Gráfico de Barras semestrais (Receitas vs Despesas).
- Tabela com histórico financeiro recente e botão para exportar extrato.

### 6. Área dos Pais – Controle Parental
Um dos pilares mais inovadores da GameTech para hábitos digitais saudáveis:
- Perfis dos filhos cadastrados (Lucas - 12 anos, Sophia - 8 anos, e opção de adicionar novos).
- **Medidor Circular de Tempo de Tela em Tempo Real** com limite diário configurável.
- **Botão de Emergência:** *"🔒 Bloquear Dispositivos Agora"* para interrupção imediata.
- **Horários Programados:** Modo Estudo e Horário de Dormir com bloqueio automático.
- **Auditoria de Aplicativos:** tabela com tempo de cada app e botão individual para bloquear ou liberar.
- **Gráfico de Barras Semanal:** histórico dos últimos 7 dias de tempo de tela.
- Notificações automáticas quando 80% e 100% do limite forem atingidos.

### 7. Relatórios
- Relatório de Vendas e Faturamento.
- Auditoria de Segurança Cibernética e LGPD.
- Relatório de Hábitos Familiares.
- Métricas de jogadores nos games da GameTech.
- Opção para exportação em PDF simulado.

### 8. Painel Administrativo
Exclusivo para a Administradora (Estefany da Cunha):
- **CRUD de Produtos:** cadastrar novos produtos, editar existentes e excluir itens do catálogo.
- **Gestão de Usuários:** visualizar clientes, datas de registro e alterar níveis de acesso.
- **Monitor de Pedidos:** acompanhar status das vendas (Processando, Em Transporte, Entregue).
- **Dados da Empresa:** edição de slogan, e-mails e comunicados da plataforma.

### 9. Configurações
- Ativar/desativar efeitos sonoros sintetizados.
- Ativar/desativar partículas neon interativas do fundo.
- Configurar autenticação em dois fatores (2FA).
- Configuração de suspensão noturna automática para crianças.

### 10. Perfil do Usuário
- Dados cadastrais do usuário conectado.
- Badge com papel atual na plataforma.
- Histórico completo de pedidos realizados na loja.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 Semântico & Moderno**
- **CSS3 Avançado**: Variáveis CSS, Glassmorphism, Efeitos Neon Glow, Grid & Flexbox Responsivo, Animações Suaves.
- **JavaScript Moderno (ES6+)**:
  - Arquitetura Modular (State, Audio, Charts, Components, Views, App).
  - Canvas 2D Engine próprio para gráficos de rosca, barras e medidores circulares com suporte a telas Retina/HiDPI.
  - Web Audio API para síntese sonora futurista em tempo real sem arquivos externos.
  - LocalStorage para persistência de dados de usuários, produtos, pedidos, carrinho e configurações.
  - Proteção por RBAC (Role-Based Access Control) garantindo privacidade e segurança.
- **Node.js**: Servidor HTTP nativo leve e rápido sem pacotes externos.

---
**GameTech – Jogar é evoluir!**  
*Desenvolvido para Estefany da Cunha e Famílias Conectadas.*

