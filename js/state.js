/**
 * GAMETECH - STATE MANAGEMENT (API-FIRST + LOCALSTORAGE FALLBACK)
 * Empresa fundada por Estefany da Cunha
 * Slogan: "Jogar é evoluir!"
 *
 * Quando o MySQL está conectado, todas as operações (cadastro, login, produtos,
 * carrinho, pedidos, controle parental etc.) vão direto para o banco de dados.
 * Quando não está, funciona normalmente com localStorage como fallback.
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'gametech_current_user',
  USERS: 'gametech_users',
  PRODUCTS: 'gametech_products',
  CART: 'gametech_cart',
  ORDERS: 'gametech_orders',
  PARENTAL_CHILDREN: 'gametech_parental_children',
  SERVICES_REQUESTS: 'gametech_services_requests',
  COMPANY_INFO: 'gametech_company_info',
  SETTINGS: 'gametech_settings',
  NOTIFICATIONS: 'gametech_notifications'
};

// ======================================================================
// Dados iniciais de fallback (usados SOMENTE quando não há MySQL)
// ======================================================================
const INITIAL_USERS = [
  { id: 'usr_admin', name: 'Estefany da Cunha', email: 'admin@gametech.com', password: 'admin', role: 'admin', roleLabel: 'Fundadora & Administradora', avatar: '👩‍💻', createdAt: '2025-01-15' },
  { id: 'usr_parent', name: 'Carlos & Mariana Rocha', email: 'pais@gametech.com', password: 'pais', role: 'parent', roleLabel: 'Responsável (Controle Parental)', avatar: '👨‍👩‍👧‍👦', createdAt: '2025-02-10' },
  { id: 'usr_gamer', name: 'Lucas Silva', email: 'gamer@gametech.com', password: 'gamer', role: 'user', roleLabel: 'Usuário Gamer & Cliente', avatar: '🎮', createdAt: '2025-03-01' }
];

const INITIAL_PRODUCTS = [
  { id: 'prod_1', name: 'CyberOdyssey: Eclipse 2077', category: 'jogos', categoryLabel: 'Jogos Digitais', price: 40.00, rating: 4.9, reviews: 1420, badge: 'Mais Vendido', description: 'RPG de ação futurista em mundo aberto com gráficos ray tracing, combates cibernéticos e escolhas que moldam o destino da megacidade Nova Neo.', specs: ['Gênero: RPG de Ação', 'Plataformas: PC, PS5, Xbox Series, Cloud', 'Multiplayer: Cooperativo até 4 jogadores', 'Classificação: 14 anos'], imageType: 'game_cyber', stock: 999 },
  { id: 'prod_2', name: 'Neon Blade: Awakening', category: 'jogos', categoryLabel: 'Jogos Digitais', price: 40.00, rating: 4.8, reviews: 890, badge: 'Destaque', description: 'Hack and slash dinâmico com trilha sonora synthwave empolgante, acrobacias gravitacionais e combate tático contra inteligências artificiais corrompidas.', specs: ['Gênero: Hack & Slash / Ação', 'Plataformas: PC, Nintendo Switch, Console', 'Taxa de Quadros: 120 FPS suporte', 'Classificação: 12 anos'], imageType: 'game_blade', stock: 999 },
  { id: 'prod_3', name: 'PixelQuest: Guardiões da Lógica', category: 'jogos', categoryLabel: 'Jogos Digitais', price: 35.00, rating: 5.0, reviews: 630, badge: 'Educativo', description: 'Aventura educativa e divertida focada em ensinar raciocínio lógico, noções de programação e segurança na internet para crianças e jovens.', specs: ['Gênero: Quebra-Cabeça / Aventura', 'Plataformas: Mobile, Tablet, PC', 'Certificação: Recomendado para Famílias', 'Classificação: Livre'], imageType: 'game_kids', stock: 999 },
  { id: 'prod_4', name: 'GameTech VR Vision X1 Ultra', category: 'vr', categoryLabel: 'Óculos de Realidade Virtual', price: 2490.00, rating: 4.9, reviews: 312, badge: 'Inovação', description: 'Headset VR de última geração com resolução 4K por olho, taxa de atualização de 120Hz, rastreamento ocular e áudio espacial tridimensional.', specs: ['Resolução: 4K HDR por olho', 'Taxa de Atualização: 90Hz - 120Hz', 'Conectividade: Wi-Fi 6E & Cabo UltraSpeed', 'Peso: 420g ergonômico'], imageType: 'vr_headset', stock: 24 },
  { id: 'prod_5', name: 'GameTech HoloLens Light', category: 'vr', categoryLabel: 'Óculos de Realidade Virtual', price: 1850.00, rating: 4.7, reviews: 185, badge: 'Lançamento', description: 'Óculos de realidade mista e aumentada ultra leve para produtividade, estudos imersivos e jogos espaciais interativos.', specs: ['FOV: 110 graus panorâmico', 'Bateria: até 4 horas contínuas', 'Controles: Rastreamento por gestos das mãos', 'Sensores: LiDAR de precisão'], imageType: 'vr_holo', stock: 18 },
  { id: 'prod_6', name: 'Robô Educativo RobiTech 3000', category: 'brinquedos', categoryLabel: 'Brinquedos Tecnológicos', price: 380.00, rating: 4.9, reviews: 420, badge: 'Educacional', description: 'Robô programável em blocos e Python com sensores infravermelho, display LED expressivo e módulos de IA para ensinar robótica na prática.', specs: ['Idade recomendada: 7 a 16 anos', 'Programação: Scratch e Python', 'Conexão: Bluetooth e App GameTech', 'Material: Plástico sustentável resistente'], imageType: 'toy_robot', stock: 45 },
  { id: 'prod_7', name: 'Drone Gamer CyberFly Mini', category: 'brinquedos', categoryLabel: 'Brinquedos Tecnológicos', price: 290.00, rating: 4.6, reviews: 215, badge: 'Popular', description: 'Mini drone acrobático com sensores anticolisão 360°, câmera HD para transmissão no celular e modo voo assistido seguro para iniciantes.', specs: ['Alcance: 100 metros', 'Câmera: 1080p Full HD com estabilização', 'Modo: Proteção de hélice integral', 'Bateria: 2 baterias inclusas'], imageType: 'toy_drone', stock: 32 },
  { id: 'prod_8', name: 'Teclado Mecânico NeonPulse RGB', category: 'acessorios', categoryLabel: 'Acessórios para Gamers', price: 320.00, rating: 4.9, reviews: 580, badge: 'Pro Gamer', description: 'Teclado mecânico compacto com switches ópticos ultra velozes, iluminação RGB roxo neon personalizável e chassi em alumínio aeroespacial.', specs: ['Switches: Óptico-Mecânico Roxo', 'Conexão: USB-C destacável e Wireless 2.4GHz', 'Keycaps: PBT Double-shot', 'Anti-Ghosting: 100% N-Key'], imageType: 'acc_keyboard', stock: 60 },
  { id: 'prod_9', name: 'Headset 7.1 CyberSound Immersive', category: 'acessorios', categoryLabel: 'Acessórios para Gamers', price: 260.00, rating: 4.8, reviews: 440, badge: 'Áudio Espacial', description: 'Headset gamer sem fio com cancelamento de ruído inteligente, drivers de titânio de 50mm e microfone com cancelamento de ruído por IA.', specs: ['Áudio: 7.1 Virtual Surround Sound', 'Autonomia: 35 horas de bateria', 'Conforto: Almofadas de gel refrescante', 'Compatibilidade: PC, Console, Celular'], imageType: 'acc_headset', stock: 50 },
  { id: 'prod_10', name: 'Moletom CyberTech Neon Hoodie', category: 'roupas', categoryLabel: 'Roupas Personalizadas', price: 199.90, rating: 4.9, reviews: 210, badge: 'Exclusivo', description: 'Moletom premium preto com detalhes em roxo neon reflexivo, capuz tecnológico reforçado e estampa exclusiva "Jogar é Evoluir".', specs: ['Composição: 100% Algodão 3 Cabos Premium', 'Estampa: Silk Screen Neon Termorreativo', 'Bolsos: Bolso oculto para celular e fones', 'Tamanhos: P, M, G, GG, XG'], imageType: 'apparel_hoodie', stock: 80 },
  { id: 'prod_11', name: 'Camiseta GameTech "Jogar é Evoluir"', category: 'roupas', categoryLabel: 'Roupas Personalizadas', price: 89.90, rating: 4.8, reviews: 320, badge: 'Oficial', description: 'Camiseta oficial da GameTech criada para amantes de tecnologia e inovação, tecido respirável dry-tech com corte moderno.', specs: ['Tecido: Dry-Tech Antibacteriano', 'Acabamento: Costuras reforçadas', 'Cor: Preto Blackout com detalhes lilás', 'Tamanhos: Infantil ao Adulto GG'], imageType: 'apparel_tshirt', stock: 120 },
  { id: 'prod_12', name: 'GameTech Token Guard FIDO2', category: 'tecnologicos', categoryLabel: 'Produtos Tecnológicos', price: 175.00, rating: 5.0, reviews: 190, badge: 'Segurança Máxima', description: 'Chave física de autenticação e criptografia para segurança digital, proteção contra phishing e autenticação em dois fatores de grau militar.', specs: ['Padrões: FIDO2, WebAuthn, U2F', 'Interface: USB-C e NFC sem contato', 'Compatibilidade: Google, Windows, Apple, Linux', 'Construção: Chassi em titânio e resina epóxi'], imageType: 'tech_token', stock: 75 },
  { id: 'prod_13', name: 'Lâmpada Gamer Smart Sync Neon', category: 'tecnologicos', categoryLabel: 'Produtos Tecnológicos', price: 145.00, rating: 4.7, reviews: 260, badge: 'Iluminação Smart', description: 'Barra de luz LED inteligente que sincroniza com os jogos da GameTech, sons ambientes e cria atmosferas roxo/lilás de imersão total.', specs: ['Cores: 16 milhões de cores RGBIC', 'Controle: App GameTech & Assistentes de Voz', 'Sincronização: Áudio em tempo real', 'Alimentação: USB 5V'], imageType: 'tech_light', stock: 90 }
];

const INITIAL_CHILDREN = [
  { id: 'child_1', name: 'Lucas Rocha', age: 12, avatar: '👦', todayMinutesUsed: 165, dailyLimitMinutes: 210, status: 'online', currentApp: 'CyberOdyssey: Eclipse 2077', device: 'PC Gamer GameTech', habitScore: 92, studyHoursStart: '14:00', studyHoursEnd: '17:30', bedtime: '21:30', studyLockActive: false, emergencyLockActive: false, appsHistory: [ { name: 'CyberOdyssey 2077', category: 'Jogo Digital', minutes: 80, blocked: false, icon: '🎮' }, { name: 'PixelQuest: Lógica', category: 'Educativo / Código', minutes: 50, blocked: false, icon: '🧩' }, { name: 'RobiTech Studio', category: 'Robótica Criativa', minutes: 35, blocked: false, icon: '🤖' } ], weeklyUsage: [ { day: 'Seg', minutes: 120 }, { day: 'Ter', minutes: 135 }, { day: 'Qua', minutes: 150 }, { day: 'Qui', minutes: 140 }, { day: 'Sex', minutes: 180 }, { day: 'Sáb', minutes: 210 }, { day: 'Dom', minutes: 165 } ] },
  { id: 'child_2', name: 'Sophia Rocha', age: 8, avatar: '👧', todayMinutesUsed: 75, dailyLimitMinutes: 120, status: 'online', currentApp: 'PixelQuest: Guardiões da Lógica', device: 'Tablet Kids Pro', habitScore: 96, studyHoursStart: '13:30', studyHoursEnd: '16:00', bedtime: '20:30', studyLockActive: false, emergencyLockActive: false, appsHistory: [ { name: 'PixelQuest: Lógica', category: 'Educativo', minutes: 45, blocked: false, icon: '🧩' }, { name: 'GameTech Kids Lab', category: 'Ciência & Arte', minutes: 30, blocked: false, icon: '🎨' } ], weeklyUsage: [ { day: 'Seg', minutes: 60 }, { day: 'Ter', minutes: 70 }, { day: 'Qua', minutes: 65 }, { day: 'Qui', minutes: 80 }, { day: 'Sex', minutes: 90 }, { day: 'Sáb', minutes: 110 }, { day: 'Dom', minutes: 75 } ] }
];

const INITIAL_ORDERS = [
  { id: 'ORD-84920', date: '16/11/2026', customerName: 'Lucas Silva', customerEmail: 'gamer@gametech.com', items: [ { name: 'CyberOdyssey: Eclipse 2077', qty: 1, price: 40.00 }, { name: 'Mousepad Gamer NeonPulse', qty: 1, price: 65.00 } ], total: 105.00, status: 'Entregue', paymentMethod: 'PIX Instantâneo' },
  { id: 'ORD-84921', date: '17/11/2026', customerName: 'Carlos Rocha', customerEmail: 'pais@gametech.com', items: [ { name: 'Robô Educativo RobiTech 3000', qty: 1, price: 380.00 }, { name: 'PixelQuest: Guardiões da Lógica', qty: 1, price: 35.00 } ], total: 415.00, status: 'Em Transporte', paymentMethod: 'Cartão de Crédito (12x)' }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif_1', type: 'parental', title: 'Alerta de Tempo de Tela - Lucas', message: 'Lucas atingiu 80% do limite diário estabelecido (2h 45m de 3h 30m).', time: 'Há 15 minutos', read: false, icon: '⏳' },
  { id: 'notif_2', type: 'finance', title: 'Meta Mensal Atingida!', message: 'O faturamento mensal atingiu a marca de R$ 14.980,00 estimada para este mês.', time: 'Há 2 horas', read: false, icon: '🎉' },
  { id: 'notif_3', type: 'security', title: 'Escudo de Segurança Ativo', message: 'Nenhuma vulnerabilidade detectada na infraestrutura da GameTech nas últimas 24h.', time: 'Hoje, 06:00', read: true, icon: '🛡️' }
];

// ======================================================================
// Simulação Financeira Oficial (sempre estática conforme solicitado)
// ======================================================================
const FINANCIAL_DATA = {
  monthlySimulation: {
    subscribersCount: 200, subscribersPrice: 19.90, subscribersTotal: 3980.00,
    gamesCount: 50, gamesPrice: 40.00, gamesTotal: 2000.00,
    servicesCount: 10, servicesPrice: 500.00, servicesTotal: 5000.00,
    productsTotal: 4000.00,
    estimatedMonthlyRevenue: 14980.00, estimatedAnnualRevenue: 179760.00,
    estimatedExpenses: 6030.00, estimatedProfit: 8950.00, investments: 3500.00
  },
  monthlyHistory: [
    { month: 'Junho', receita: 11200, despesa: 4800, lucro: 6400 },
    { month: 'Julho', receita: 12500, despesa: 5100, lucro: 7400 },
    { month: 'Agosto', receita: 13100, despesa: 5400, lucro: 7700 },
    { month: 'Setembro', receita: 13900, despesa: 5600, lucro: 8300 },
    { month: 'Outubro', receita: 14450, despesa: 5850, lucro: 8600 },
    { month: 'Novembro (Atual)', receita: 14980, despesa: 6030, lucro: 8950 }
  ],
  transactions: [
    { id: 'TRX-901', date: '16/11/2026', desc: 'Assinaturas do Clube GameTech VIP (200 membros)', type: 'entrada', amount: 3980.00, status: 'Confirmado' },
    { id: 'TRX-902', date: '15/11/2026', desc: 'Venda de Lote de Jogos Digitais (50 unidades)', type: 'entrada', amount: 2000.00, status: 'Confirmado' },
    { id: 'TRX-903', date: '14/11/2026', desc: 'Serviços de Desenvolvimento e Segurança (10 sprints)', type: 'entrada', amount: 5000.00, status: 'Confirmado' },
    { id: 'TRX-904', date: '13/11/2026', desc: 'Vendas Loja Hardware e Produtos Tecnológicos', type: 'entrada', amount: 4000.00, status: 'Confirmado' },
    { id: 'TRX-905', date: '10/11/2026', desc: 'Servidores Cloud AWS & Infraestrutura GameTech', type: 'saida', amount: 2450.00, status: 'Pago' },
    { id: 'TRX-906', date: '08/11/2026', desc: 'Licenças de Softwares (Unreal, Unity Pro & Dev)', type: 'saida', amount: 1580.00, status: 'Pago' },
    { id: 'TRX-907', date: '05/11/2026', desc: 'Pesquisa e Desenvolvimento em Realidade Virtual', type: 'saida', amount: 2000.00, status: 'Pago' }
  ]
};

const SERVICES_CATALOG = [
  { id: 'srv_jogos', title: 'Desenvolvimento de Jogos Digitais', tagline: 'Criamos universos épicos com mecânicas envolventes e visuais surpreendentes.', icon: '🎮', technologies: ['Unreal Engine 5', 'Unity', 'C#', 'C++', 'Blender', 'Áudio Espacial'], highlights: ['Jogos 2D e 3D para PC, Consoles e Mobile', 'Gamificação corporativa para engajamento', 'Mecânicas multiplayer em tempo real'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_apps', title: 'Criação de Aplicativos Mobile & Web', tagline: 'Aplicativos velozes, intuitivos e modernos que encantam usuários em iOS e Android.', icon: '📱', technologies: ['React Native', 'Flutter', 'iOS / Swift', 'Android / Kotlin', 'Cloud APIs'], highlights: ['Design centrado no usuário (UX/UI)', 'Integração com inteligência artificial', 'Sincronização offline e segurança nativa'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_sites', title: 'Desenvolvimento de Sites & Portais', tagline: 'Presença digital de alta performance com design futurista e conversão garantida.', icon: '🌐', technologies: ['HTML5 / CSS3 / JS', 'WebGL', 'Tailwind', 'Next.js', 'SEO Avançado'], highlights: ['Efeitos visuais e animações fluidas', 'Adaptação perfeita para mobile e desktop', 'Painéis administrativos intuitivos'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_sistemas', title: 'Sistemas Personalizados de Gestão', tagline: 'Automação inteligente e softwares sob medida para alavancar a eficiência do seu negócio.', icon: '⚡', technologies: ['Node.js', 'PostgreSQL', 'Docker', 'Microsserviços', 'Dashboards'], highlights: ['Automatização de rotinas e relatórios', 'Arquitetura escalável e segura', 'Controle de acessos baseado em perfis'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_seguranca', title: 'Soluções de Segurança Digital', tagline: 'Blindagem cibernética completa, proteção de dados e conformidade total com a LGPD.', icon: '🛡️', technologies: ['Pentests Éticos', 'Criptografia Ponta a Ponta', 'MFA / FIDO2', 'Auditoria LGPD', 'Firewall AI'], highlights: ['Análise de vulnerabilidades em sistemas', 'Proteção contra ataques DDoS e ransomware', 'Treinamento e conscientização digital'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_vr', title: 'Projetos com Realidade Virtual (VR/AR)', tagline: 'Experiências imersivas que transportam pessoas para novas dimensões de aprendizado e treino.', icon: '🥽', technologies: ['OpenXR', 'Meta Quest SDK', 'Apple Vision Pro', 'Modelagem 3D', 'Spatial Audio'], highlights: ['Simuladores profissionais para indústrias', 'Treinamentos cirúrgicos e técnicos', 'Ambientes virtuais interativos e showrooms'], startingPrice: 'A partir de R$ 500,00' },
  { id: 'srv_hardware', title: 'Desenvolvimento de Produtos Tecnológicos', tagline: 'Transformamos conceitos inovadores em protótipos funcionais de hardware e dispositivos IoT.', icon: '🤖', technologies: ['Arduino & ESP32', 'Impressão 3D', 'Circuitos PCB', 'Sensores IoT', 'Firmware C++'], highlights: ['Prototipagem rápida e testes funcionais', 'Dispositivos inteligentes conectados à nuvem', 'Brinquedos interativos e wearables'], startingPrice: 'A partir de R$ 500,00' }
];


// ======================================================================
// HELPER: Chamadas Fetch para a API REST do Backend
// ======================================================================
async function apiFetch(endpoint, options = {}) {
  const defaults = {
    headers: { 'Content-Type': 'application/json' }
  };
  const config = { ...defaults, ...options };
  const response = await fetch(endpoint, config);
  const data = await response.json();
  if (!response.ok && response.status !== 404) {
    throw new Error(data.error || `Erro ${response.status}`);
  }
  return { status: response.status, data };
}


// ======================================================================
// STATE MANAGER (API-FIRST + LOCALSTORAGE FALLBACK)
// ======================================================================
class StateManager {
  constructor() {
    this.apiEnabled = false;  // Será atualizado no init()
    this._cache = {};         // Cache local para dados vindos da API
  }

  // --- Inicialização: detecta se o MySQL está disponível ---
  async init() {
    // Seed localStorage como fallback
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    if (!localStorage.getItem(STORAGE_KEYS.PARENTAL_CHILDREN)) localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(INITIAL_CHILDREN));
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    if (!localStorage.getItem(STORAGE_KEYS.CART)) localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ soundEnabled: true, highContrast: false, particlesEnabled: true, twoFactorAuth: true, emailNotifications: true, autoLockNight: true }));

    // Verificar se a API MySQL está disponível
    try {
      const { data } = await apiFetch('/api/status');
      this.apiEnabled = data.dbConnected === true;
      if (this.apiEnabled) {
        console.log('🗄️ GameTech: MySQL CONECTADO – dados vão para o banco de dados!');
        await this._loadAllFromApi();
      } else {
        console.log('💾 GameTech: MySQL offline – usando localStorage como fallback.');
      }
    } catch (err) {
      this.apiEnabled = false;
      console.log('💾 GameTech: API indisponível – usando localStorage.');
    }

    return this.apiEnabled;
  }

  // Carrega todos os dados do MySQL para o cache local
  async _loadAllFromApi() {
    try {
      const [prodRes, usersRes] = await Promise.all([
        apiFetch('/api/products'),
        apiFetch('/api/users')
      ]);
      // Normaliza os campos snake_case → camelCase nos produtos
      this._cache.products = prodRes.data.map(p => this._normalizeProduct(p));
      this._cache.users = usersRes.data.map(u => this._normalizeUser(u));
      // Salva no localStorage também como cache de leitura rápida
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this._cache.products));
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this._cache.users));
    } catch (err) {
      console.warn('⚠️ Falha ao carregar dados da API, usando localStorage:', err.message);
    }
  }

  _normalizeProduct(p) {
    return {
      id: p.id, name: p.name,
      category: p.category,
      categoryLabel: p.category_label || p.categoryLabel,
      price: parseFloat(p.price),
      rating: parseFloat(p.rating), reviews: p.reviews,
      badge: p.badge, description: p.description,
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs || []),
      imageType: p.image_type || p.imageType,
      stock: p.stock
    };
  }

  _normalizeUser(u) {
    return {
      id: u.id, name: u.name, email: u.email,
      password: u.password,
      role: u.role,
      roleLabel: u.role_label || u.roleLabel,
      avatar: u.avatar,
      createdAt: u.created_at || u.createdAt
    };
  }

  // ========================================
  // USUÁRIO ATUAL (sempre localStorage)
  // ========================================
  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  setCurrentUser(user) {
    if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  logout() { localStorage.removeItem(STORAGE_KEYS.CURRENT_USER); }

  // ========================================
  // LOGIN (API → MySQL quando disponível)
  // ========================================
  async loginUser(email, password) {
    if (this.apiEnabled) {
      const { status, data } = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (status === 401) return null;
      const user = this._normalizeUser(data.user);
      user.password = password; // Manter para demo quick login
      this.setCurrentUser(user);
      return user;
    }
    // Fallback localStorage
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) this.setCurrentUser(user);
    return user || null;
  }

  // ========================================
  // CADASTRO (API → MySQL quando disponível)
  // ========================================
  async registerUser(userData) {
    if (this.apiEnabled) {
      const { status, data } = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      if (status === 409) return { error: data.error };
      const user = this._normalizeUser(data.user);
      user.password = userData.password;
      this.setCurrentUser(user);
      // Atualiza cache
      await this._loadAllFromApi();
      return user;
    }
    // Fallback localStorage
    return this.addUser(userData);
  }

  // ========================================
  // USUÁRIOS
  // ========================================
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }

  addUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: 'usr_' + Date.now(), name: userData.name, email: userData.email, password: userData.password,
      role: userData.role || 'user',
      roleLabel: userData.role === 'admin' ? 'Administrador' : userData.role === 'parent' ? 'Responsável' : 'Usuário Gamer',
      avatar: userData.role === 'admin' ? '👩‍💻' : userData.role === 'parent' ? '👨‍👩‍👧‍👦' : '🎮',
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  async updateUserRole(userId, newRole) {
    if (this.apiEnabled) {
      await apiFetch(`/api/users/${userId}/role`, {
        method: 'PUT', body: JSON.stringify({ role: newRole })
      });
      await this._loadAllFromApi();
    }
    // Sempre atualizar localStorage também
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      user.roleLabel = newRole === 'admin' ? 'Administrador' : newRole === 'parent' ? 'Responsável' : 'Usuário Gamer';
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      const current = this.getCurrentUser();
      if (current && current.id === userId) { current.role = newRole; current.roleLabel = user.roleLabel; this.setCurrentUser(current); }
    }
  }

  // ========================================
  // PRODUTOS
  // ========================================
  getProducts() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]'); }

  async addProduct(product) {
    if (this.apiEnabled) {
      await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(product) });
      await this._loadAllFromApi();
      return this.getProducts()[0]; // O mais recente
    }
    const products = this.getProducts();
    const newProd = { id: 'prod_' + Date.now(), ...product, rating: 5.0, reviews: 1, stock: parseInt(product.stock) || 10 };
    products.unshift(newProd);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return newProd;
  }

  async updateProduct(id, updatedData) {
    if (this.apiEnabled) {
      await apiFetch(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(updatedData) });
      await this._loadAllFromApi();
      return this.getProducts().find(p => p.id === id);
    }
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) { products[index] = { ...products[index], ...updatedData }; localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)); return products[index]; }
    return null;
  }

  async deleteProduct(id) {
    if (this.apiEnabled) {
      await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
      await this._loadAllFromApi();
      return;
    }
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }

  // ========================================
  // CARRINHO
  // ========================================
  getCart() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]'); }

  async addToCart(productId, qty = 1) {
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      await apiFetch('/api/cart', { method: 'POST', body: JSON.stringify({ userId: user.id, productId, quantity: qty }) });
      return await this._refreshCart(user.id);
    }
    const cart = this.getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) { existing.quantity += qty; }
    else {
      const product = this.getProducts().find(p => p.id === productId);
      if (product) cart.push({ productId: product.id, name: product.name, price: product.price, category: product.category, categoryLabel: product.categoryLabel, quantity: qty });
    }
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    return cart;
  }

  async updateCartQty(productId, qty) {
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      const cartItems = await this._getApiCart(user.id);
      const item = cartItems.find(i => i.productId === productId);
      if (item) await apiFetch(`/api/cart/${item.id}`, { method: 'PUT', body: JSON.stringify({ quantity: qty }) });
      return await this._refreshCart(user.id);
    }
    let cart = this.getCart();
    if (qty <= 0) { cart = cart.filter(item => item.productId !== productId); }
    else { const item = cart.find(i => i.productId === productId); if (item) item.quantity = qty; }
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    return cart;
  }

  async removeFromCart(productId) { return this.updateCartQty(productId, 0); }

  async clearCart() {
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      await apiFetch(`/api/cart/clear/${user.id}`, { method: 'DELETE' });
    }
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }

  async _getApiCart(userId) {
    const { data } = await apiFetch(`/api/cart/${userId}`);
    return data;
  }

  async _refreshCart(userId) {
    const data = await this._getApiCart(userId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(data));
    return data;
  }

  // ========================================
  // PEDIDOS
  // ========================================
  getOrders() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'); }

  async loadOrders() {
    if (this.apiEnabled) {
      const { data } = await apiFetch('/api/orders');
      const normalized = data.map(o => ({
        id: o.id, date: o.date || o.date_label, customerName: o.customer_name || o.customerName,
        customerEmail: o.customer_email || o.customerEmail, items: o.items || [],
        total: parseFloat(o.total), status: o.status, paymentMethod: o.payment_method || o.paymentMethod
      }));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(normalized));
      return normalized;
    }
    return this.getOrders();
  }

  async addOrder(orderData) {
    const user = this.getCurrentUser();
    if (this.apiEnabled) {
      const { data } = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ ...orderData, userId: user ? user.id : null })
      });
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
      await this.loadOrders();
      return data;
    }
    const orders = this.getOrders();
    const newOrder = { id: 'ORD-' + Math.floor(10000 + Math.random() * 90000), date: new Date().toLocaleDateString('pt-BR'), status: 'Processando Pedido', ...orderData };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    return newOrder;
  }

  async updateOrderStatus(orderId, newStatus) {
    if (this.apiEnabled) {
      await apiFetch(`/api/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
      await this.loadOrders();
      return;
    }
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) { order.status = newStatus; localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)); }
  }

  // ========================================
  // CONTROLE PARENTAL (FILHOS)
  // ========================================
  getChildren() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.PARENTAL_CHILDREN) || '[]'); }

  async loadChildren() {
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      const { data } = await apiFetch(`/api/children/${user.id}`);
      localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(data));
      return data;
    }
    return this.getChildren();
  }

  async addChild(childData) {
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      await apiFetch('/api/children', { method: 'POST', body: JSON.stringify({ ...childData, parentId: user.id }) });
      await this.loadChildren();
      return;
    }
    const children = this.getChildren();
    const newChild = {
      id: 'child_' + Date.now(), name: childData.name, age: parseInt(childData.age) || 10, avatar: childData.avatar || '🧒',
      todayMinutesUsed: 0, dailyLimitMinutes: parseInt(childData.dailyLimitMinutes) || 180,
      status: 'offline', currentApp: 'Nenhum app em execução', device: childData.device || 'Dispositivo GameTech',
      habitScore: 100, studyHoursStart: childData.studyHoursStart || '14:00', studyHoursEnd: childData.studyHoursEnd || '17:30',
      bedtime: childData.bedtime || '21:30', studyLockActive: false, emergencyLockActive: false,
      appsHistory: [ { name: 'PixelQuest: Lógica', category: 'Educativo', minutes: 0, blocked: false, icon: '🧩' }, { name: 'CyberOdyssey 2077', category: 'Jogo Digital', minutes: 0, blocked: false, icon: '🎮' } ],
      weeklyUsage: [ { day: 'Seg', minutes: 0 }, { day: 'Ter', minutes: 0 }, { day: 'Qua', minutes: 0 }, { day: 'Qui', minutes: 0 }, { day: 'Sex', minutes: 0 }, { day: 'Sáb', minutes: 0 }, { day: 'Dom', minutes: 0 } ]
    };
    children.push(newChild);
    localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(children));
    return newChild;
  }

  async updateChildLimit(childId, limitMinutes) {
    if (this.apiEnabled) {
      await apiFetch(`/api/children/${childId}/limit`, { method: 'PUT', body: JSON.stringify({ limitMinutes }) });
    }
    const children = this.getChildren();
    const child = children.find(c => c.id === childId);
    if (child) { child.dailyLimitMinutes = parseInt(limitMinutes); localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(children)); }
  }

  async toggleChildEmergencyLock(childId) {
    if (this.apiEnabled) {
      const { data } = await apiFetch(`/api/children/${childId}/emergency-lock`, { method: 'PUT' });
      await this.loadChildren();
      return data.locked;
    }
    const children = this.getChildren();
    const child = children.find(c => c.id === childId);
    if (child) { child.emergencyLockActive = !child.emergencyLockActive; localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(children)); return child.emergencyLockActive; }
    return false;
  }

  async toggleChildAppBlock(childId, appName) {
    if (this.apiEnabled) {
      const { data } = await apiFetch(`/api/children/${childId}/app-block`, { method: 'PUT', body: JSON.stringify({ appName }) });
      await this.loadChildren();
      return data.blocked;
    }
    const children = this.getChildren();
    const child = children.find(c => c.id === childId);
    if (child) { const app = child.appsHistory.find(a => a.name === appName); if (app) { app.blocked = !app.blocked; localStorage.setItem(STORAGE_KEYS.PARENTAL_CHILDREN, JSON.stringify(children)); return app.blocked; } }
    return false;
  }

  // ========================================
  // ORÇAMENTOS DE SERVIÇO
  // ========================================
  async addServiceQuote(quoteData) {
    const user = this.getCurrentUser();
    if (this.apiEnabled) {
      const { data } = await apiFetch('/api/service-quotes', {
        method: 'POST', body: JSON.stringify({ ...quoteData, userId: user ? user.id : null })
      });
      return data;
    }
    const quotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES_REQUESTS) || '[]');
    const newQuote = { id: 'ORC-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toLocaleDateString('pt-BR'), ...quoteData, status: 'Em Análise pela Equipe GameTech' };
    quotes.unshift(newQuote);
    localStorage.setItem(STORAGE_KEYS.SERVICES_REQUESTS, JSON.stringify(quotes));
    return newQuote;
  }

  getServiceQuotes() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES_REQUESTS) || '[]'); }

  // ========================================
  // CONFIGURAÇÕES
  // ========================================
  getSettings() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}'); }

  async updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      await apiFetch(`/api/settings/${user.id}`, { method: 'PUT', body: JSON.stringify(newSettings) });
    }
    return updated;
  }

  // ========================================
  // NOTIFICAÇÕES
  // ========================================
  getNotifications() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]'); }

  async markNotificationsAsRead() {
    const notifs = this.getNotifications();
    notifs.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    const user = this.getCurrentUser();
    if (this.apiEnabled && user) {
      await apiFetch(`/api/notifications/read/${user.id}`, { method: 'PUT' });
    }
  }

  addNotification(notif) {
    const notifs = this.getNotifications();
    notifs.unshift({ id: 'notif_' + Date.now(), time: 'Agora mesmo', read: false, ...notif });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  // ========================================
  // DADOS FINANCEIROS (do MySQL quando disponível)
  // ========================================
  async loadFinancialData() {
    if (this.apiEnabled) {
      try {
        const [txRes, monthRes] = await Promise.all([
          apiFetch('/api/financial/transactions'),
          apiFetch('/api/financial/monthly')
        ]);
        FINANCIAL_DATA.transactions = txRes.data;
        FINANCIAL_DATA.monthlyHistory = monthRes.data;
      } catch (err) { /* usar dados estáticos */ }
    }
  }
}

// Instância global
window.gameTechState = new StateManager();
window.FINANCIAL_DATA = FINANCIAL_DATA;
window.SERVICES_CATALOG = SERVICES_CATALOG;
