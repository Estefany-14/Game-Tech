-- ============================================================
-- GAMETECH - BANCO DE DADOS MYSQL COMPLETO
-- Empresa fundada por Estefany da Cunha
-- Slogan: "Jogar é evoluir!"
-- ============================================================

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS gametech_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gametech_db;

-- ============================================================
-- 1. TABELA DE USUÁRIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR(50)   PRIMARY KEY,
  name        VARCHAR(150)  NOT NULL,
  email       VARCHAR(200)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  role        ENUM('admin', 'parent', 'user') NOT NULL DEFAULT 'user',
  role_label  VARCHAR(100)  DEFAULT 'Usuário Gamer',
  avatar      VARCHAR(20)   DEFAULT '🎮',
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 2. TABELA DE PRODUTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id              VARCHAR(50)     PRIMARY KEY,
  name            VARCHAR(200)    NOT NULL,
  category        VARCHAR(50)     NOT NULL,
  category_label  VARCHAR(100)    NOT NULL,
  price           DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
  rating          DECIMAL(3, 1)   NOT NULL DEFAULT 5.0,
  reviews         INT             NOT NULL DEFAULT 0,
  badge           VARCHAR(80)     DEFAULT 'GameTech',
  description     TEXT            NOT NULL,
  specs           JSON            DEFAULT NULL,
  image_type      VARCHAR(50)     NOT NULL DEFAULT 'game_cyber',
  stock           INT             NOT NULL DEFAULT 10,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 3. TABELA DO CARRINHO DE COMPRAS
-- ============================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  user_id     VARCHAR(50)   NOT NULL,
  product_id  VARCHAR(50)   NOT NULL,
  quantity    INT           NOT NULL DEFAULT 1,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product (user_id, product_id)
) ENGINE=InnoDB;

-- ============================================================
-- 4. TABELA DE PEDIDOS (CABEÇALHO)
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id              VARCHAR(20)     PRIMARY KEY,
  user_id         VARCHAR(50)     DEFAULT NULL,
  customer_name   VARCHAR(150)    NOT NULL,
  customer_email  VARCHAR(200)    NOT NULL,
  total           DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
  status          VARCHAR(60)     NOT NULL DEFAULT 'Processando Pedido',
  payment_method  VARCHAR(80)     DEFAULT 'PIX Instantâneo',
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 5. TABELA DE ITENS DO PEDIDO
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id          INT             AUTO_INCREMENT PRIMARY KEY,
  order_id    VARCHAR(20)     NOT NULL,
  product_id  VARCHAR(50)     DEFAULT NULL,
  product_name VARCHAR(200)   NOT NULL,
  quantity    INT             NOT NULL DEFAULT 1,
  price       DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)  ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 6. TABELA DE FILHOS (CONTROLE PARENTAL)
-- ============================================================
CREATE TABLE IF NOT EXISTS children (
  id                    VARCHAR(50)   PRIMARY KEY,
  parent_id             VARCHAR(50)   NOT NULL,
  name                  VARCHAR(100)  NOT NULL,
  age                   INT           NOT NULL DEFAULT 10,
  avatar                VARCHAR(20)   DEFAULT '🧒',
  today_minutes_used    INT           NOT NULL DEFAULT 0,
  daily_limit_minutes   INT           NOT NULL DEFAULT 180,
  status                VARCHAR(20)   DEFAULT 'offline',
  current_app           VARCHAR(150)  DEFAULT 'Nenhum app em execução',
  device                VARCHAR(100)  DEFAULT 'Dispositivo GameTech',
  habit_score           INT           NOT NULL DEFAULT 100,
  study_hours_start     TIME          DEFAULT '14:00:00',
  study_hours_end       TIME          DEFAULT '17:30:00',
  bedtime               TIME          DEFAULT '21:30:00',
  study_lock_active     TINYINT(1)    NOT NULL DEFAULT 0,
  emergency_lock_active TINYINT(1)    NOT NULL DEFAULT 0,
  created_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 7. TABELA DE HISTÓRICO DE APPS DOS FILHOS
-- ============================================================
CREATE TABLE IF NOT EXISTS child_apps (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  child_id    VARCHAR(50)   NOT NULL,
  app_name    VARCHAR(150)  NOT NULL,
  category    VARCHAR(80)   NOT NULL DEFAULT 'Geral',
  minutes     INT           NOT NULL DEFAULT 0,
  blocked     TINYINT(1)    NOT NULL DEFAULT 0,
  icon        VARCHAR(20)   DEFAULT '📱',
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  UNIQUE KEY unique_child_app (child_id, app_name)
) ENGINE=InnoDB;

-- ============================================================
-- 8. TABELA DE USO SEMANAL DOS FILHOS
-- ============================================================
CREATE TABLE IF NOT EXISTS child_weekly_usage (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  child_id    VARCHAR(50)   NOT NULL,
  day_name    VARCHAR(10)   NOT NULL,
  minutes     INT           NOT NULL DEFAULT 0,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  UNIQUE KEY unique_child_day (child_id, day_name)
) ENGINE=InnoDB;

-- ============================================================
-- 9. TABELA DE SOLICITAÇÕES DE ORÇAMENTO (SERVIÇOS)
-- ============================================================
CREATE TABLE IF NOT EXISTS service_quotes (
  id          VARCHAR(20)   PRIMARY KEY,
  user_id     VARCHAR(50)   DEFAULT NULL,
  service     VARCHAR(200)  NOT NULL,
  name        VARCHAR(150)  NOT NULL,
  email       VARCHAR(200)  NOT NULL,
  description TEXT          DEFAULT NULL,
  scope       VARCHAR(100)  DEFAULT 'Médio Porte',
  deadline    VARCHAR(100)  DEFAULT 'Padrão (1 a 3 meses)',
  status      VARCHAR(100)  DEFAULT 'Em Análise pela Equipe GameTech',
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 10. TABELA DE NOTIFICAÇÕES
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id          VARCHAR(50)   PRIMARY KEY,
  user_id     VARCHAR(50)   DEFAULT NULL,
  type        VARCHAR(30)   NOT NULL DEFAULT 'info',
  title       VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  time_label  VARCHAR(80)   DEFAULT 'Agora mesmo',
  is_read     TINYINT(1)    NOT NULL DEFAULT 0,
  icon        VARCHAR(20)   DEFAULT '⚡',
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 11. TABELA DE CONFIGURAÇÕES DO USUÁRIO
-- ============================================================
CREATE TABLE IF NOT EXISTS user_settings (
  user_id               VARCHAR(50)   PRIMARY KEY,
  sound_enabled         TINYINT(1)    NOT NULL DEFAULT 1,
  high_contrast         TINYINT(1)    NOT NULL DEFAULT 0,
  particles_enabled     TINYINT(1)    NOT NULL DEFAULT 1,
  two_factor_auth       TINYINT(1)    NOT NULL DEFAULT 1,
  email_notifications   TINYINT(1)    NOT NULL DEFAULT 1,
  auto_lock_night       TINYINT(1)    NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 12. TABELA DE TRANSAÇÕES FINANCEIRAS
-- ============================================================
CREATE TABLE IF NOT EXISTS financial_transactions (
  id          VARCHAR(20)     PRIMARY KEY,
  date_label  VARCHAR(20)     NOT NULL,
  description VARCHAR(300)    NOT NULL,
  type        ENUM('entrada', 'saida') NOT NULL,
  amount      DECIMAL(12, 2)  NOT NULL DEFAULT 0.00,
  status      VARCHAR(50)     NOT NULL DEFAULT 'Confirmado',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 13. TABELA DE HISTÓRICO FINANCEIRO MENSAL
-- ============================================================
CREATE TABLE IF NOT EXISTS financial_monthly (
  id          INT             AUTO_INCREMENT PRIMARY KEY,
  month_label VARCHAR(50)     NOT NULL,
  receita     DECIMAL(12, 2)  NOT NULL DEFAULT 0.00,
  despesa     DECIMAL(12, 2)  NOT NULL DEFAULT 0.00,
  lucro       DECIMAL(12, 2)  NOT NULL DEFAULT 0.00
) ENGINE=InnoDB;


-- ============================================================
-- ============================================================
--    DADOS INICIAIS (SEED) - INFORMAÇÕES DE DEMONSTRAÇÃO
-- ============================================================
-- ============================================================


-- =====================
-- USUÁRIOS DE TESTE
-- =====================
INSERT INTO users (id, name, email, password, role, role_label, avatar, created_at) VALUES
  ('usr_admin',  'Estefany da Cunha',    'admin@gametech.com', 'admin', 'admin',  'Fundadora & Administradora',        '👩‍💻', '2025-01-15 10:00:00'),
  ('usr_parent', 'Carlos & Mariana Rocha','pais@gametech.com',  'pais',  'parent', 'Responsável (Controle Parental)',    '👨‍👩‍👧‍👦', '2025-02-10 14:30:00'),
  ('usr_gamer',  'Lucas Silva',           'gamer@gametech.com', 'gamer', 'user',   'Usuário Gamer & Cliente',           '🎮', '2025-03-01 09:15:00')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Configurações padrão dos usuários
INSERT INTO user_settings (user_id, sound_enabled, high_contrast, particles_enabled, two_factor_auth, email_notifications, auto_lock_night) VALUES
  ('usr_admin',  1, 0, 1, 1, 1, 1),
  ('usr_parent', 1, 0, 1, 1, 1, 1),
  ('usr_gamer',  1, 0, 1, 0, 1, 0)
ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);


-- =====================
-- PRODUTOS (13 ITENS NAS 6 CATEGORIAS)
-- =====================

-- Jogos Digitais
INSERT INTO products (id, name, category, category_label, price, rating, reviews, badge, description, specs, image_type, stock) VALUES
  ('prod_1', 'CyberOdyssey: Eclipse 2077', 'jogos', 'Jogos Digitais', 40.00, 4.9, 1420, 'Mais Vendido',
   'RPG de ação futurista em mundo aberto com gráficos ray tracing, combates cibernéticos e escolhas que moldam o destino da megacidade Nova Neo.',
   '["Gênero: RPG de Ação", "Plataformas: PC, PS5, Xbox Series, Cloud", "Multiplayer: Cooperativo até 4 jogadores", "Classificação: 14 anos"]',
   'game_cyber', 999),

  ('prod_2', 'Neon Blade: Awakening', 'jogos', 'Jogos Digitais', 40.00, 4.8, 890, 'Destaque',
   'Hack and slash dinâmico com trilha sonora synthwave empolgante, acrobacias gravitacionais e combate tático contra inteligências artificiais corrompidas.',
   '["Gênero: Hack & Slash / Ação", "Plataformas: PC, Nintendo Switch, Console", "Taxa de Quadros: 120 FPS suporte", "Classificação: 12 anos"]',
   'game_blade', 999),

  ('prod_3', 'PixelQuest: Guardiões da Lógica', 'jogos', 'Jogos Digitais', 35.00, 5.0, 630, 'Educativo',
   'Aventura educativa e divertida focada em ensinar raciocínio lógico, noções de programação e segurança na internet para crianças e jovens.',
   '["Gênero: Quebra-Cabeça / Aventura", "Plataformas: Mobile, Tablet, PC", "Certificação: Recomendado para Famílias", "Classificação: Livre"]',
   'game_kids', 999),

-- Óculos de Realidade Virtual
  ('prod_4', 'GameTech VR Vision X1 Ultra', 'vr', 'Óculos de Realidade Virtual', 2490.00, 4.9, 312, 'Inovação',
   'Headset VR de última geração com resolução 4K por olho, taxa de atualização de 120Hz, rastreamento ocular e áudio espacial tridimensional.',
   '["Resolução: 4K HDR por olho", "Taxa de Atualização: 90Hz - 120Hz", "Conectividade: Wi-Fi 6E & Cabo UltraSpeed", "Peso: 420g ergonômico"]',
   'vr_headset', 24),

  ('prod_5', 'GameTech HoloLens Light', 'vr', 'Óculos de Realidade Virtual', 1850.00, 4.7, 185, 'Lançamento',
   'Óculos de realidade mista e aumentada ultra leve para produtividade, estudos imersivos e jogos espaciais interativos.',
   '["FOV: 110 graus panorâmico", "Bateria: até 4 horas contínuas", "Controles: Rastreamento por gestos das mãos", "Sensores: LiDAR de precisão"]',
   'vr_holo', 18),

-- Brinquedos Tecnológicos
  ('prod_6', 'Robô Educativo RobiTech 3000', 'brinquedos', 'Brinquedos Tecnológicos', 380.00, 4.9, 420, 'Educacional',
   'Robô programável em blocos e Python com sensores infravermelho, display LED expressivo e módulos de IA para ensinar robótica na prática.',
   '["Idade recomendada: 7 a 16 anos", "Programação: Scratch e Python", "Conexão: Bluetooth e App GameTech", "Material: Plástico sustentável resistente"]',
   'toy_robot', 45),

  ('prod_7', 'Drone Gamer CyberFly Mini', 'brinquedos', 'Brinquedos Tecnológicos', 290.00, 4.6, 215, 'Popular',
   'Mini drone acrobático com sensores anticolisão 360°, câmera HD para transmissão no celular e modo voo assistido seguro para iniciantes.',
   '["Alcance: 100 metros", "Câmera: 1080p Full HD com estabilização", "Modo: Proteção de hélice integral", "Bateria: 2 baterias inclusas"]',
   'toy_drone', 32),

-- Acessórios para Gamers
  ('prod_8', 'Teclado Mecânico NeonPulse RGB', 'acessorios', 'Acessórios para Gamers', 320.00, 4.9, 580, 'Pro Gamer',
   'Teclado mecânico compacto com switches ópticos ultra velozes, iluminação RGB roxo neon personalizável e chassi em alumínio aeroespacial.',
   '["Switches: Óptico-Mecânico Roxo", "Conexão: USB-C destacável e Wireless 2.4GHz", "Keycaps: PBT Double-shot", "Anti-Ghosting: 100% N-Key"]',
   'acc_keyboard', 60),

  ('prod_9', 'Headset 7.1 CyberSound Immersive', 'acessorios', 'Acessórios para Gamers', 260.00, 4.8, 440, 'Áudio Espacial',
   'Headset gamer sem fio com cancelamento de ruído inteligente, drivers de titânio de 50mm e microfone com cancelamento de ruído por IA.',
   '["Áudio: 7.1 Virtual Surround Sound", "Autonomia: 35 horas de bateria", "Conforto: Almofadas de gel refrescante", "Compatibilidade: PC, Console, Celular"]',
   'acc_headset', 50),

-- Roupas Personalizadas
  ('prod_10', 'Moletom CyberTech Neon Hoodie', 'roupas', 'Roupas Personalizadas', 199.90, 4.9, 210, 'Exclusivo',
   'Moletom premium preto com detalhes em roxo neon reflexivo, capuz tecnológico reforçado e estampa exclusiva "Jogar é Evoluir".',
   '["Composição: 100% Algodão 3 Cabos Premium", "Estampa: Silk Screen Neon Termorreativo", "Bolsos: Bolso oculto para celular e fones", "Tamanhos: P, M, G, GG, XG"]',
   'apparel_hoodie', 80),

  ('prod_11', 'Camiseta GameTech \"Jogar é Evoluir\"', 'roupas', 'Roupas Personalizadas', 89.90, 4.8, 320, 'Oficial',
   'Camiseta oficial da GameTech criada para amantes de tecnologia e inovação, tecido respirável dry-tech com corte moderno.',
   '["Tecido: Dry-Tech Antibacteriano", "Acabamento: Costuras reforçadas", "Cor: Preto Blackout com detalhes lilás", "Tamanhos: Infantil ao Adulto GG"]',
   'apparel_tshirt', 120),

-- Produtos Tecnológicos
  ('prod_12', 'GameTech Token Guard FIDO2', 'tecnologicos', 'Produtos Tecnológicos', 175.00, 5.0, 190, 'Segurança Máxima',
   'Chave física de autenticação e criptografia para segurança digital, proteção contra phishing e autenticação em dois fatores de grau militar.',
   '["Padrões: FIDO2, WebAuthn, U2F", "Interface: USB-C e NFC sem contato", "Compatibilidade: Google, Windows, Apple, Linux", "Construção: Chassi em titânio e resina epóxi"]',
   'tech_token', 75),

  ('prod_13', 'Lâmpada Gamer Smart Sync Neon', 'tecnologicos', 'Produtos Tecnológicos', 145.00, 4.7, 260, 'Iluminação Smart',
   'Barra de luz LED inteligente que sincroniza com os jogos da GameTech, sons ambientes e cria atmosferas roxo/lilás de imersão total.',
   '["Cores: 16 milhões de cores RGBIC", "Controle: App GameTech & Assistentes de Voz", "Sincronização: Áudio em tempo real", "Alimentação: USB 5V"]',
   'tech_light', 90)
ON DUPLICATE KEY UPDATE name = VALUES(name);


-- =====================
-- FILHOS (CONTROLE PARENTAL)
-- =====================
INSERT INTO children (id, parent_id, name, age, avatar, today_minutes_used, daily_limit_minutes, status, current_app, device, habit_score, study_hours_start, study_hours_end, bedtime) VALUES
  ('child_1', 'usr_parent', 'Lucas Rocha',  12, '👦', 165, 210, 'online', 'CyberOdyssey: Eclipse 2077', 'PC Gamer GameTech',  92, '14:00', '17:30', '21:30'),
  ('child_2', 'usr_parent', 'Sophia Rocha',  8, '👧',  75, 120, 'online', 'PixelQuest: Guardiões da Lógica', 'Tablet Kids Pro', 96, '13:30', '16:00', '20:30')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Apps dos filhos
INSERT INTO child_apps (child_id, app_name, category, minutes, blocked, icon) VALUES
  ('child_1', 'CyberOdyssey 2077',   'Jogo Digital',       80, 0, '🎮'),
  ('child_1', 'PixelQuest: Lógica',   'Educativo / Código', 50, 0, '🧩'),
  ('child_1', 'RobiTech Studio',      'Robótica Criativa',  35, 0, '🤖'),
  ('child_2', 'PixelQuest: Lógica',   'Educativo',          45, 0, '🧩'),
  ('child_2', 'GameTech Kids Lab',    'Ciência & Arte',     30, 0, '🎨')
ON DUPLICATE KEY UPDATE minutes = VALUES(minutes);

-- Uso semanal dos filhos
INSERT INTO child_weekly_usage (child_id, day_name, minutes) VALUES
  ('child_1', 'Seg', 120), ('child_1', 'Ter', 135), ('child_1', 'Qua', 150),
  ('child_1', 'Qui', 140), ('child_1', 'Sex', 180), ('child_1', 'Sáb', 210), ('child_1', 'Dom', 165),
  ('child_2', 'Seg',  60), ('child_2', 'Ter',  70), ('child_2', 'Qua',  65),
  ('child_2', 'Qui',  80), ('child_2', 'Sex',  90), ('child_2', 'Sáb', 110), ('child_2', 'Dom',  75)
ON DUPLICATE KEY UPDATE minutes = VALUES(minutes);


-- =====================
-- PEDIDOS DE EXEMPLO
-- =====================
INSERT INTO orders (id, user_id, customer_name, customer_email, total, status, payment_method, created_at) VALUES
  ('ORD-84920', 'usr_gamer',  'Lucas Silva',   'gamer@gametech.com', 105.00, 'Entregue',       'PIX Instantâneo',          '2026-11-16 15:30:00'),
  ('ORD-84921', 'usr_parent', 'Carlos Rocha',  'pais@gametech.com',  415.00, 'Em Transporte',   'Cartão de Crédito (12x)',  '2026-11-17 10:00:00')
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES
  ('ORD-84920', 'prod_1', 'CyberOdyssey: Eclipse 2077',       1, 40.00),
  ('ORD-84920', NULL,     'Mousepad Gamer NeonPulse',          1, 65.00),
  ('ORD-84921', 'prod_6', 'Robô Educativo RobiTech 3000',     1, 380.00),
  ('ORD-84921', 'prod_3', 'PixelQuest: Guardiões da Lógica',  1, 35.00)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity);


-- =====================
-- NOTIFICAÇÕES
-- =====================
INSERT INTO notifications (id, user_id, type, title, message, time_label, is_read, icon) VALUES
  ('notif_1', 'usr_parent', 'parental', 'Alerta de Tempo de Tela - Lucas',
   'Lucas atingiu 80%% do limite diário estabelecido (2h 45m de 3h 30m).', 'Há 15 minutos', 0, '⏳'),
  ('notif_2', 'usr_admin', 'finance', 'Meta Mensal Atingida!',
   'O faturamento mensal atingiu a marca de R$ 14.980,00 estimada para este mês.', 'Há 2 horas', 0, '🎉'),
  ('notif_3', 'usr_admin', 'security', 'Escudo de Segurança Ativo',
   'Nenhuma vulnerabilidade detectada na infraestrutura da GameTech nas últimas 24h.', 'Hoje, 06:00', 1, '🛡️')
ON DUPLICATE KEY UPDATE title = VALUES(title);


-- =====================
-- TRANSAÇÕES FINANCEIRAS
-- =====================
INSERT INTO financial_transactions (id, date_label, description, type, amount, status) VALUES
  ('TRX-901', '16/11/2026', 'Assinaturas do Clube GameTech VIP (200 membros)',           'entrada', 3980.00, 'Confirmado'),
  ('TRX-902', '15/11/2026', 'Venda de Lote de Jogos Digitais (50 unidades)',             'entrada', 2000.00, 'Confirmado'),
  ('TRX-903', '14/11/2026', 'Serviços de Desenvolvimento e Segurança (10 sprints)',      'entrada', 5000.00, 'Confirmado'),
  ('TRX-904', '13/11/2026', 'Vendas Loja Hardware e Produtos Tecnológicos',              'entrada', 4000.00, 'Confirmado'),
  ('TRX-905', '10/11/2026', 'Servidores Cloud AWS & Infraestrutura GameTech',            'saida',   2450.00, 'Pago'),
  ('TRX-906', '08/11/2026', 'Licenças de Softwares (Unreal, Unity Pro & Dev)',           'saida',   1580.00, 'Pago'),
  ('TRX-907', '05/11/2026', 'Pesquisa e Desenvolvimento em Realidade Virtual',           'saida',   2000.00, 'Pago')
ON DUPLICATE KEY UPDATE description = VALUES(description);


-- =====================
-- HISTÓRICO FINANCEIRO MENSAL
-- =====================
INSERT INTO financial_monthly (month_label, receita, despesa, lucro) VALUES
  ('Junho',              11200.00, 4800.00, 6400.00),
  ('Julho',              12500.00, 5100.00, 7400.00),
  ('Agosto',             13100.00, 5400.00, 7700.00),
  ('Setembro',           13900.00, 5600.00, 8300.00),
  ('Outubro',            14450.00, 5850.00, 8600.00),
  ('Novembro (Atual)',   14980.00, 6030.00, 8950.00);


-- ============================================================
-- VIEWS ÚTEIS PARA CONSULTAS RÁPIDAS
-- ============================================================

-- View: Resumo de faturamento por categoria
CREATE OR REPLACE VIEW vw_revenue_summary AS
  SELECT
    type,
    COUNT(*)            AS total_transacoes,
    SUM(amount)         AS total_valor
  FROM financial_transactions
  GROUP BY type;

-- View: Resumo do catálogo por categoria
CREATE OR REPLACE VIEW vw_product_summary AS
  SELECT
    category,
    category_label,
    COUNT(*)            AS total_produtos,
    MIN(price)          AS preco_minimo,
    MAX(price)          AS preco_maximo,
    SUM(stock)          AS estoque_total
  FROM products
  GROUP BY category, category_label;

-- View: Tempo total de tela por filho (hoje)
CREATE OR REPLACE VIEW vw_children_screen_time AS
  SELECT
    c.id,
    c.name,
    c.age,
    c.today_minutes_used,
    c.daily_limit_minutes,
    ROUND((c.today_minutes_used / c.daily_limit_minutes) * 100, 1) AS percent_used,
    c.status,
    c.current_app,
    c.emergency_lock_active
  FROM children c;


-- ============================================================
-- FIM DO SCHEMA - GAMETECH DATABASE
-- ============================================================

SELECT '✅ Banco de dados gametech_db criado com sucesso!' AS resultado;
SELECT CONCAT('📊 ', COUNT(*), ' produtos no catálogo') AS produtos FROM products;
SELECT CONCAT('👥 ', COUNT(*), ' usuários cadastrados') AS usuarios FROM users;
SELECT CONCAT('👶 ', COUNT(*), ' filhos vinculados') AS filhos FROM children;
SELECT CONCAT('📦 ', COUNT(*), ' pedidos registrados') AS pedidos FROM orders;
SELECT CONCAT('💰 ', COUNT(*), ' transações financeiras') AS transacoes FROM financial_transactions;
