/**
 * GAMETECH - VIEWS & PAGES RENDERER
 * "Jogar é evoluir!" - Fundada por Estefany da Cunha
 */

class Views {
  // Verificação de permissões por perfil (RBAC)
  static checkAccess(requiredRole, currentRole) {
    if (requiredRole === 'admin') return currentRole === 'admin';
    if (requiredRole === 'parent') return currentRole === 'admin' || currentRole === 'parent';
    return true; // 'user' ou público
  }

  // Tela amigável de acesso restrito
  static renderRestrictedNotice(requiredRoleName, requiredRoleCode) {
    return `
      <div class="restricted-container animate-fade-in">
        <div class="restricted-card">
          <div class="restricted-shield">🛡️</div>
          <h2>Área Restrita da GameTech</h2>
          <p class="text-muted mt-2">
            Esta seção requer privilégios de <strong>${requiredRoleName}</strong> para garantir a segurança dos dados e a privacidade dos usuários.
          </p>
          <div class="restricted-hint mt-3">
            <span>Dica de Teste:</span> Você pode alternar para o perfil com permissão em 1 clique abaixo:
          </div>
          <div class="restricted-switch-actions mt-3">
            ${requiredRoleCode === 'admin' ? `
              <button class="btn-primary-neon" onclick="Components.handleQuickLogin('admin@gametech.com', 'admin')">
                👩‍💻 Entrar como Administrador (Estefany)
              </button>
            ` : requiredRoleCode === 'parent' ? `
              <button class="btn-primary-neon" onclick="Components.handleQuickLogin('pais@gametech.com', 'pais')">
                👨‍👩‍👧‍👦 Entrar como Responsável (Pais)
              </button>
            ` : ''}
            <button class="btn-secondary" onclick="window.gameTechApp.navigate('inicio')">
              ← Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 1. TELA DE APRESENTAÇÃO / INÍCIO
  // ==========================================
  static renderHome() {
    const user = window.gameTechState.getCurrentUser();
    const products = window.gameTechState.getProducts().slice(0, 4);

    return `
      <div class="view-home animate-fade-in">
        <!-- Hero Section Futurista -->
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-badge animate-pulse">
              <span class="badge-dot"></span>
              TECNOLOGIA • JOGOS • REALIDADE VIRTUAL • SEGURANÇA
            </div>
            
            <h1 class="hero-title">
              GAMETECH
              <span class="hero-subtitle-gradient">JOGAR É EVOLUIR!</span>
            </h1>

            <p class="hero-desc">
              Bem-vindo à <strong>GameTech</strong>, a empresa de tecnologia de ponta criada por <strong>Estefany da Cunha</strong>. 
              Desenvolvemos jogos digitais imersivos, aplicativos inovadores, óculos de realidade virtual, 
              brinquedos inteligentes e soluções de segurança digital com o mais avançado controle parental do mercado.
            </p>

            <div class="hero-actions">
              ${!user ? `
                <button class="btn-primary-neon btn-lg" onclick="Components.showAuthModal('login')">
                  🚀 Entrar na Plataforma
                </button>
                <button class="btn-secondary btn-lg" onclick="Components.showAuthModal('register')">
                  ✨ Criar Conta Gratuita
                </button>
              ` : `
                <button class="btn-primary-neon btn-lg" onclick="window.gameTechApp.navigate('produtos')">
                  🛒 Explorar Produtos & Jogos
                </button>
                <button class="btn-secondary btn-lg" onclick="window.gameTechApp.navigate('sobre')">
                  🏢 Conhecer Nossa História
                </button>
              `}
            </div>

            <!-- Demonstração Rápida no Hero para Avaliação Ágil -->
            <div class="hero-quick-roles mt-4">
              <span class="role-selector-label">⚡ Testar Perfis de Acesso:</span>
              <div class="role-pills">
                <button class="role-pill ${user && user.role === 'admin' ? 'active' : ''}" onclick="Components.handleQuickLogin('admin@gametech.com', 'admin')">
                  👩‍💻 Admin (Estefany)
                </button>
                <button class="role-pill ${user && user.role === 'parent' ? 'active' : ''}" onclick="Components.handleQuickLogin('pais@gametech.com', 'pais')">
                  👨‍👩‍👧‍👦 Responsável (Pais)
                </button>
                <button class="role-pill ${user && user.role === 'user' ? 'active' : ''}" onclick="Components.handleQuickLogin('gamer@gametech.com', 'gamer')">
                  🎮 Usuário (Gamer)
                </button>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-hologram-card">
              <div class="holo-glow"></div>
              <!-- Logo GameTech Central -->
              <div class="gt-hero-logo">
                <svg viewBox="0 0 200 200" width="180" height="180">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#c084fc"/>
                      <stop offset="50%" stop-color="#a855f7"/>
                      <stop offset="100%" stop-color="#38bdf8"/>
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <!-- Hexágono Tecnológico -->
                  <polygon points="100,15 175,55 175,145 100,185 25,145 25,55" fill="#120e29" stroke="url(#logoGrad)" stroke-width="4" filter="url(#neonGlow)"/>
                  <!-- Controle Gamer Estilizado -->
                  <path d="M60 85 C55 125, 75 140, 85 140 C95 140, 95 125, 100 125 C105 125, 105 140, 115 140 C125 140, 145 125, 140 85 C135 65, 65 65, 60 85 Z" fill="#1f1842" stroke="#a855f7" stroke-width="3"/>
                  <!-- D-Pad -->
                  <path d="M75 92 L85 92 M80 87 L80 97" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
                  <!-- Botões Neon -->
                  <circle cx="118" cy="90" r="3.5" fill="#f43f5e"/>
                  <circle cx="126" cy="98" r="3.5" fill="#38bdf8"/>
                  <circle cx="110" cy="98" r="3.5" fill="#a855f7"/>
                  <circle cx="118" cy="106" r="3.5" fill="#10b981"/>
                  <!-- Circuitos e Conexões -->
                  <circle cx="100" cy="45" r="5" fill="#38bdf8"/>
                  <line x1="100" y1="50" x2="100" y2="70" stroke="#38bdf8" stroke-width="2" stroke-dasharray="2 2"/>
                </svg>
              </div>
              <div class="holo-caption">
                <span class="corp-name">GAMETECH</span>
                <span class="corp-tag">PLATAFORMA INTEGRADA</span>
              </div>
              <div class="live-pill">
                <span class="pulse-green"></span>
                <span>SISTEMA 100% OPERACIONAL</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Indicadores de Destaque da Empresa -->
        <section class="stats-ribbon mt-5">
          <div class="stat-box">
            <div class="stat-number">R$ 14.980</div>
            <div class="stat-lbl">Faturamento Mensal Simulado</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">200+</div>
            <div class="stat-lbl">Membros VIP Ativos</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">7</div>
            <div class="stat-lbl">Áreas de Especialização</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">100%</div>
            <div class="stat-lbl">Proteção e Controle Parental</div>
          </div>
        </section>

        <!-- 4 Pilares da GameTech -->
        <section class="pillars-section mt-5">
          <div class="section-heading">
            <span class="section-tag">ECOSSISTEMA GAMETECH</span>
            <h2>Soluções Tecnológicas que Transformam</h2>
            <p class="text-muted">Da diversão imersiva à segurança digital da sua família e empresa.</p>
          </div>

          <div class="pillars-grid">
            <div class="pillar-card" onclick="window.gameTechApp.navigate('servicos')">
              <div class="pillar-icon">🎮</div>
              <h3>Desenvolvimento de Jogos</h3>
              <p>Mundos digitais com motores gráficos de última geração, mecânicas inteligentes e narrativas envolventes.</p>
              <span class="pillar-link">Saiba Mais →</span>
            </div>

            <div class="pillar-card" onclick="window.gameTechApp.navigate('produtos')">
              <div class="pillar-icon">🥽</div>
              <h3>Realidade Virtual & Hardware</h3>
              <p>Linha própria de óculos VR, acessórios gamers ergonômicos e brinquedos robóticos educativos.</p>
              <span class="pillar-link">Ver Produtos →</span>
            </div>

            <div class="pillar-card" onclick="window.gameTechApp.navigate('pais')">
              <div class="pillar-icon">🛡️</div>
              <h3>Controle Parental Avançado</h3>
              <p>Acompanhamento de tempo de tela, bloqueio temporário de jogos e estímulo a hábitos digitais saudáveis.</p>
              <span class="pillar-link">Área dos Pais →</span>
            </div>

            <div class="pillar-card" onclick="window.gameTechApp.navigate('servicos')">
              <div class="pillar-icon">⚡</div>
              <h3>Segurança Digital & Cloud</h3>
              <p>Auditorias, proteção contra ameaças cibernéticas e desenvolvimento de sistemas corporativos sob medida.</p>
              <span class="pillar-link">Solicitar Orçamento →</span>
            </div>
          </div>
        </section>

        <!-- Vitrine de Produtos em Destaque -->
        <section class="featured-products-section mt-5">
          <div class="section-header-row">
            <div>
              <span class="section-tag">LOJA OFICIAL</span>
              <h2>Produtos e Jogos em Destaque</h2>
            </div>
            <button class="btn-secondary" onclick="window.gameTechApp.navigate('produtos')">
              Ver Catálogo Completo (13 itens) →
            </button>
          </div>

          <div class="products-grid mt-4">
            ${products.map(p => `
              <div class="product-card">
                <div class="prod-badge">${p.badge || 'GameTech'}</div>
                <div class="prod-card-visual" onclick="Components.showProductDetails('${p.id}')">
                  ${Components.getProductSvgIcon(p.imageType)}
                </div>
                <div class="prod-card-body">
                  <span class="prod-category">${p.categoryLabel}</span>
                  <h4 class="prod-name" onclick="Components.showProductDetails('${p.id}')">${p.name}</h4>
                  <div class="prod-price-row">
                    <span class="prod-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-cart-mini" onclick="window.gameTechApp.addToCart('${p.id}')" title="Adicionar ao Carrinho">
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // ==========================================
  // 2. SOBRE A GAMETECH
  // ==========================================
  static renderAbout() {
    return `
      <div class="view-about animate-fade-in">
        <!-- Hero Institucional -->
        <div class="about-hero">
          <span class="section-tag">CONHEÇA NOSSA TRAJETÓRIA</span>
          <h1>A História da GameTech</h1>
          <p class="about-lead">
            Uma empresa de tecnologia de ponta criada por <strong>Estefany da Cunha</strong> para revolucionar o entretenimento digital, a educação interativa e a proteção de dados.
          </p>
        </div>

        <!-- Card da Fundadora Estefany da Cunha -->
        <div class="founder-card mt-5">
          <div class="founder-avatar-box">
            <div class="founder-avatar">👩‍💻</div>
            <div class="founder-status-badge">Fundadora & CEO</div>
          </div>
          <div class="founder-info">
            <span class="section-tag">LIDERANÇA & VISÃO</span>
            <h2>Estefany da Cunha</h2>
            <p class="founder-quote">
              "A tecnologia não deve apenas divertir, mas transformar. Criamos a GameTech com o propósito inegociável de unir o que há de mais moderno em jogos digitais, realidade virtual e produtos tecnológicos a uma segurança digital intransigente. Nosso slogan <strong>'Jogar é evoluir!'</strong> reflete nossa crença de que cada interação digital pode ser uma oportunidade de crescimento pessoal e familiar."
            </p>
            <div class="founder-milestones">
              <div class="milestone-item">
                <strong>Foco:</strong> Inovação Tecnológica, VR e Segurança Digital
              </div>
              <div class="milestone-item">
                <strong>Compromisso:</strong> Hábitos Digitais Saudáveis & Privacidade
              </div>
            </div>
          </div>
        </div>

        <!-- Missão, Visão e Valores Solicitados -->
        <div class="mvv-grid mt-5">
          <div class="mvv-card mission-card">
            <div class="mvv-icon">🎯</div>
            <h3>Nossa Missão</h3>
            <p>
              "Unir tecnologia, criatividade, entretenimento e segurança digital para facilitar a vida das pessoas, criando soluções inovadoras que conectem famílias e empresas com o futuro."
            </p>
          </div>

          <div class="mvv-card vision-card">
            <div class="mvv-icon">👁️</div>
            <h3>Nossa Visão</h3>
            <p>
              "Tornar-nos uma referência global no mercado tecnológico, desenvolvendo produtos de ponta, jogos memoráveis e serviços de alta fidelidade que definam novos padrões na indústria."
            </p>
          </div>

          <div class="mvv-card values-card">
            <div class="mvv-icon">💎</div>
            <h3>Nossos Valores</h3>
            <ul class="values-list">
              <li><strong>Criatividade:</strong> Pensar fora da caixa sempre.</li>
              <li><strong>Inovação:</strong> Desafiar limites técnicos diariamente.</li>
              <li><strong>Responsabilidade:</strong> Cuidar da formação dos jovens.</li>
              <li><strong>Segurança:</strong> Proteção de dados sem concessões.</li>
              <li><strong>Qualidade:</strong> Excelência em cada linha de código.</li>
              <li><strong>Compromisso:</strong> Foco absoluto no cliente e na família.</li>
            </ul>
          </div>
        </div>

        <!-- Linha do Tempo da GameTech -->
        <div class="timeline-section mt-5">
          <div class="section-heading text-center">
            <span class="section-tag">NOSSA JORNADA</span>
            <h2>Evolução Contínua</h2>
          </div>

          <div class="timeline-tree mt-4">
            <div class="timeline-step">
              <div class="step-dot"></div>
              <div class="step-card">
                <span class="step-year">Fase 1</span>
                <h4>Fundação por Estefany da Cunha</h4>
                <p>Nascimento da GameTech com foco inicial no desenvolvimento independente de jogos digitais e protótipos de segurança.</p>
              </div>
            </div>

            <div class="timeline-step">
              <div class="step-dot"></div>
              <div class="step-card">
                <span class="step-year">Fase 2</span>
                <h4>Lançamento de Jogos & Expansão VR</h4>
                <p>Criação dos sucessos CyberOdyssey e PixelQuest, além dos primeiros testes dos óculos de Realidade Virtual GameTech Vision X1.</p>
              </div>
            </div>

            <div class="timeline-step">
              <div class="step-dot"></div>
              <div class="step-card">
                <span class="step-year">Fase 3</span>
                <h4>Controle Parental & Produtos Físicos</h4>
                <p>Introdução da linha de brinquedos educativos RobiTech, roupas personalizadas e o módulo exclusivo de gestão de hábitos para pais.</p>
              </div>
            </div>

            <div class="timeline-step">
              <div class="step-dot"></div>
              <div class="step-card">
                <span class="step-year">Hoje</span>
                <h4>Ecossistema Completo GameTech</h4>
                <p>Plataforma unificada com faturamento sólido, mais de 200 membros VIP e consultoria de cibersegurança corporativa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 3. LOJA VIRTUAL / PRODUTOS
  // ==========================================
  static renderProducts() {
    const products = window.gameTechState.getProducts();

    return `
      <div class="view-products animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">LOJA OFICIAL GAMETECH</span>
            <h1>Catálogo de Produtos & Jogos</h1>
            <p class="text-muted">Equipamentos de alta tecnologia, jogos digitais, realidade virtual e vestuário.</p>
          </div>
          <button class="btn-primary-neon btn-cart-top" onclick="Components.showCartDrawer()">
            🛒 Carrinho (<span id="cart-counter-btn">${window.gameTechState.getCart().reduce((s, i) => s + i.quantity, 0)}</span>)
          </button>
        </div>

        <!-- Filtros e Barra de Pesquisa -->
        <div class="products-toolbar mt-4">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="prod-search-input" placeholder="Buscar por jogo, óculos VR, teclado..." oninput="window.gameTechApp.filterProducts()" class="gt-input search-input">
          </div>

          <div class="categories-filter-pills" id="category-pills">
            <button class="filter-pill active" data-cat="all" onclick="window.gameTechApp.setCategoryFilter('all')">Todos</button>
            <button class="filter-pill" data-cat="jogos" onclick="window.gameTechApp.setCategoryFilter('jogos')">🎮 Jogos Digitais</button>
            <button class="filter-pill" data-cat="vr" onclick="window.gameTechApp.setCategoryFilter('vr')">🥽 Óculos VR</button>
            <button class="filter-pill" data-cat="brinquedos" onclick="window.gameTechApp.setCategoryFilter('brinquedos')">🤖 Brinquedos Tech</button>
            <button class="filter-pill" data-cat="acessorios" onclick="window.gameTechApp.setCategoryFilter('acessorios')">⌨️ Acessórios Gamers</button>
            <button class="filter-pill" data-cat="roupas" onclick="window.gameTechApp.setCategoryFilter('roupas')">👕 Roupas Oficiais</button>
            <button class="filter-pill" data-cat="tecnologicos" onclick="window.gameTechApp.setCategoryFilter('tecnologicos')">💡 Produtos Tech</button>
          </div>
        </div>

        <!-- Grid de Produtos Dinâmico -->
        <div class="products-grid mt-4" id="products-catalog-grid">
          ${products.map(p => `
            <div class="product-card" data-category="${p.category}" data-name="${p.name.toLowerCase()}">
              <div class="prod-badge">${p.badge || 'GameTech'}</div>
              <div class="prod-card-visual" onclick="Components.showProductDetails('${p.id}')">
                ${Components.getProductSvgIcon(p.imageType)}
              </div>
              <div class="prod-card-body">
                <span class="prod-category">${p.categoryLabel}</span>
                <h4 class="prod-name" onclick="Components.showProductDetails('${p.id}')">${p.name}</h4>
                <p class="prod-short-desc">${p.description.substring(0, 75)}...</p>
                <div class="prod-rating-stars">
                  ⭐⭐⭐⭐⭐ <small>(${p.rating})</small>
                </div>
                <div class="prod-price-row mt-2">
                  <div>
                    <span class="prod-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                    <span class="parcela-hint">em até 12x</span>
                  </div>
                  <div class="prod-actions-btns">
                    <button class="btn-secondary btn-sm" onclick="Components.showProductDetails('${p.id}')">Detalhes</button>
                    <button class="btn-primary-neon btn-sm" onclick="window.gameTechApp.addToCart('${p.id}')">🛒 Comprar</button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // 4. ÁREA DE SERVIÇOS
  // ==========================================
  static renderServices() {
    const services = window.SERVICES_CATALOG;

    return `
      <div class="view-services animate-fade-in">
        <div class="section-heading text-center">
          <span class="section-tag">SOLUÇÕES SOB MEDIDA</span>
          <h1>Serviços de Engenharia e Tecnologia</h1>
          <p class="text-muted">A equipe especializada de Estefany da Cunha pronta para alavancar seu projeto.</p>
        </div>

        <!-- Banner de Orçamento Rápido -->
        <div class="services-cta-banner mt-4">
          <div>
            <h3>Tem um projeto inovador em mente?</h3>
            <p class="text-muted">Da concepção do jogo ao sistema empresarial blindado, nós executamos com excelência.</p>
          </div>
          <button class="btn-primary-neon btn-lg" onclick="Components.showServiceQuoteModal('Geral')">
            ⚡ Solicitar Orçamento Imediato
          </button>
        </div>

        <!-- Grid com os 7 Serviços Solicitados -->
        <div class="services-grid mt-5">
          ${services.map(s => `
            <div class="service-card">
              <div class="service-icon-box">${s.icon}</div>
              <h3 class="service-title">${s.title}</h3>
              <p class="service-tagline">${s.tagline}</p>
              
              <div class="service-highlights">
                <h4>O que está incluído:</h4>
                <ul>
                  ${s.highlights.map(h => `<li>✓ ${h}</li>`).join('')}
                </ul>
              </div>

              <div class="service-tech-tags">
                ${s.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>

              <div class="service-footer">
                <span class="service-price">${s.startingPrice}</span>
                <button class="btn-primary-neon btn-sm" onclick="Components.showServiceQuoteModal('${s.title}')">
                  Orçamento →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // 5. ÁREA FINANCEIRA
  // ==========================================
  static renderFinance() {
    const user = window.gameTechState.getCurrentUser();
    if (!Views.checkAccess('admin', user ? user.role : 'guest')) {
      return Views.renderRestrictedNotice('Administrador', 'admin');
    }

    const fin = window.FINANCIAL_DATA;
    const sim = fin.monthlySimulation;

    return `
      <div class="view-finance animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">GESTÃO ECONÔMICA & METAS</span>
            <h1>Área Financeira da GameTech</h1>
            <p class="text-muted">Visão executiva completa, faturamento, despesas e simulações de cenários.</p>
          </div>
          <div class="finance-badge-live">
            <span class="pulse-green"></span>
            <span>Dados Atualizados em Tempo Real</span>
          </div>
        </div>

        <!-- Cards de Indicadores Financeiros -->
        <div class="finance-kpis-grid mt-4">
          <div class="kpi-card kpi-purple">
            <div class="kpi-label">Faturamento Mensal Estimado</div>
            <div class="kpi-value">R$ ${sim.estimatedMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div class="kpi-sub text-green">↑ Meta de R$ 14.980,00 Atingida</div>
          </div>

          <div class="kpi-card kpi-blue">
            <div class="kpi-label">Faturamento Anual Projetado</div>
            <div class="kpi-value">R$ ${sim.estimatedAnnualRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div class="kpi-sub">Base de 12 meses consolidados</div>
          </div>

          <div class="kpi-card kpi-green">
            <div class="kpi-label">Lucro Líquido Estimado</div>
            <div class="kpi-value text-green">R$ ${sim.estimatedProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div class="kpi-sub">Margem saudável de 59,7%</div>
          </div>

          <div class="kpi-card kpi-red">
            <div class="kpi-label">Despesas Operacionais</div>
            <div class="kpi-value">R$ ${sim.estimatedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div class="kpi-sub">Servidores, licenças e custos</div>
          </div>

          <div class="kpi-card kpi-cyan">
            <div class="kpi-label">Assinantes VIP Ativos</div>
            <div class="kpi-value">${sim.subscribersCount}</div>
            <div class="kpi-sub">Pagando R$ 19,90/mês</div>
          </div>

          <div class="kpi-card kpi-orange">
            <div class="kpi-label">Investimentos em P&D / VR</div>
            <div class="kpi-value">R$ ${sim.investments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div class="kpi-sub">Inovação e novos protótipos</div>
          </div>
        </div>

        <!-- Bloco Oficial da Simulação de Faturamento Solicitada -->
        <div class="simulation-showcase-card mt-5">
          <div class="sim-header">
            <div class="sim-title-group">
              <span class="sim-tag">SIMULAÇÃO OFICIAL GAMETECH</span>
              <h2>Composição do Faturamento Mensal (R$ 14.980,00)</h2>
              <p class="text-muted">Demonstração detalhada das fontes de receita conforme planejamento estratégico de Estefany da Cunha:</p>
            </div>
            <div class="sim-badge-total">
              <span>Total Estimado:</span>
              <strong class="total-big">R$ 14.980,00</strong>
            </div>
          </div>

          <div class="simulation-items-grid mt-4">
            <!-- Item 1: Assinantes -->
            <div class="sim-item-box">
              <div class="sim-item-icon">👥</div>
              <div class="sim-item-details">
                <span class="sim-item-title">Assinaturas do Clube GameTech</span>
                <div class="sim-formula">
                  <strong>200</strong> assinantes × <strong>R$ 19,90</strong>
                </div>
              </div>
              <div class="sim-item-total">R$ 3.980,00</div>
            </div>

            <!-- Item 2: Jogos -->
            <div class="sim-item-box">
              <div class="sim-item-icon">🎮</div>
              <div class="sim-item-details">
                <span class="sim-item-title">Venda de Jogos Digitais</span>
                <div class="sim-formula">
                  <strong>50</strong> jogos × <strong>R$ 40,00</strong>
                </div>
              </div>
              <div class="sim-item-total">R$ 2.000,00</div>
            </div>

            <!-- Item 3: Serviços -->
            <div class="sim-item-box">
              <div class="sim-item-icon">⚡</div>
              <div class="sim-item-details">
                <span class="sim-item-title">Serviços de Desenvolvimento</span>
                <div class="sim-formula">
                  <strong>10</strong> serviços × <strong>R$ 500,00</strong>
                </div>
              </div>
              <div class="sim-item-total">R$ 5.000,00</div>
            </div>

            <!-- Item 4: Produtos Tech -->
            <div class="sim-item-box">
              <div class="sim-item-icon">🥽</div>
              <div class="sim-item-details">
                <span class="sim-item-title">Vendas de Produtos Tecnológicos</span>
                <div class="sim-formula">
                  Óculos VR, Brinquedos Tech e Acessórios
                </div>
              </div>
              <div class="sim-item-total">R$ 4.000,00</div>
            </div>
          </div>

          <!-- Totalizador em Destaque -->
          <div class="sim-footer-bar mt-4">
            <div class="sim-calc-text">
              R$ 3.980 + R$ 2.000 + R$ 5.000 + R$ 4.000 =
            </div>
            <div class="sim-calc-result">
              Faturamento Mensal Estimado: <span>R$ 14.980,00</span>
            </div>
          </div>
        </div>

        <!-- Gráficos de Indicadores Visuais -->
        <div class="charts-row-grid mt-5">
          <!-- Gráfico 1: Distribuição das Receitas -->
          <div class="chart-card">
            <div class="chart-header">
              <h3>Distribuição da Receita por Categoria</h3>
              <span class="text-muted">Proporção no faturamento total</span>
            </div>
            <div class="chart-canvas-wrap">
              <canvas id="financeDonutChart"></canvas>
            </div>
            <div class="chart-legend-grid">
              <div class="legend-item"><span class="dot" style="background:#a855f7"></span> Serviços Dev: R$ 5.000 (33,4%)</div>
              <div class="legend-item"><span class="dot" style="background:#38bdf8"></span> Produtos Tech: R$ 4.000 (26,7%)</div>
              <div class="legend-item"><span class="dot" style="background:#c084fc"></span> Assinantes: R$ 3.980 (26,6%)</div>
              <div class="legend-item"><span class="dot" style="background:#06b6d4"></span> Jogos: R$ 2.000 (13,3%)</div>
            </div>
          </div>

          <!-- Gráfico 2: Receitas vs Despesas (Últimos 6 Meses) -->
          <div class="chart-card">
            <div class="chart-header">
              <h3>Histórico Financeiro Semestral</h3>
              <span class="text-muted">Receitas (Roxo) vs Despesas (Ciano)</span>
            </div>
            <div class="chart-canvas-wrap">
              <canvas id="financeBarChart"></canvas>
            </div>
            <div class="chart-legend-grid">
              <div class="legend-item"><span class="dot" style="background:#a855f7"></span> Receitas Mensais</div>
              <div class="legend-item"><span class="dot" style="background:#38bdf8"></span> Despesas Operacionais</div>
            </div>
          </div>
        </div>

        <!-- Calculadora Interativa de Cenários Financeiros -->
        <div class="calculator-card mt-5">
          <div class="section-header-row">
            <div>
              <span class="section-tag">SIMULADOR INTERATIVO</span>
              <h3>Calculadora de Cenários e Projeções</h3>
              <p class="text-muted">Ajuste os controles deslizantes para testar novas metas financeiras da GameTech:</p>
            </div>
            <button class="btn-secondary" onclick="window.gameTechApp.resetFinancialSim()">Restaurar Valores Padrão</button>
          </div>

          <div class="sliders-grid mt-4">
            <div class="slider-box">
              <label>Assinantes VIP: <strong id="sim-sub-count-val">200</strong> membros</label>
              <input type="range" id="sim-sub-count" min="50" max="1000" step="25" value="200" class="gt-slider" oninput="window.gameTechApp.updateFinancialSim()">
            </div>

            <div class="slider-box">
              <label>Jogos Vendidos: <strong id="sim-games-count-val">50</strong> cópias</label>
              <input type="range" id="sim-games-count" min="10" max="500" step="10" value="50" class="gt-slider" oninput="window.gameTechApp.updateFinancialSim()">
            </div>

            <div class="slider-box">
              <label>Serviços Realizados: <strong id="sim-srv-count-val">10</strong> sprints</label>
              <input type="range" id="sim-srv-count" min="2" max="50" step="2" value="10" class="gt-slider" oninput="window.gameTechApp.updateFinancialSim()">
            </div>

            <div class="slider-box">
              <label>Produtos Tecnológicos: <strong id="sim-prod-val">R$ 4.000,00</strong></label>
              <input type="range" id="sim-prod" min="1000" max="30000" step="500" value="4000" class="gt-slider" oninput="window.gameTechApp.updateFinancialSim()">
            </div>
          </div>

          <div class="sim-result-preview mt-4">
            <div class="preview-item">
              <span>Novo Faturamento Mensal:</span>
              <strong id="sim-dynamic-total" class="text-highlight">R$ 14.980,00</strong>
            </div>
            <div class="preview-item">
              <span>Projeção Anual:</span>
              <strong id="sim-dynamic-annual" class="text-green">R$ 179.760,00</strong>
            </div>
            <div class="preview-item">
              <span>Lucro Estimado:</span>
              <strong id="sim-dynamic-profit" class="text-green">R$ 8.950,00</strong>
            </div>
          </div>
        </div>

        <!-- Tabela de Histórico Financeiro Recente -->
        <div class="transactions-section mt-5">
          <div class="section-header-row">
            <div>
              <span class="section-tag">EXTRATO CONTÁBIL</span>
              <h3>Histórico de Transações Recentes</h3>
            </div>
            <button class="btn-secondary" onclick="Components.showToast('Relatório contábil exportado em formato CSV/PDF.', 'success', 'Exportação Concluída')">
              📥 Exportar Extrato
            </button>
          </div>

          <div class="table-container mt-3">
            <table class="gt-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Descrição da Movimentação</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${fin.transactions.map(t => `
                  <tr>
                    <td><code>${t.id}</code></td>
                    <td>${t.date}</td>
                    <td><strong>${t.desc}</strong></td>
                    <td>
                      <span class="badge-tag ${t.type === 'entrada' ? 'badge-green' : 'badge-red'}">
                        ${t.type === 'entrada' ? '↑ Entrada' : '↓ Saída'}
                      </span>
                    </td>
                    <td class="${t.type === 'entrada' ? 'text-green' : 'text-red'} font-bold">
                      ${t.type === 'entrada' ? '+' : '-'} R$ ${t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td><span class="badge-tag">${t.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 6. ÁREA DOS PAIS - CONTROLE PARENTAL
  // ==========================================
  static renderParental() {
    const user = window.gameTechState.getCurrentUser();
    if (!Views.checkAccess('parent', user ? user.role : 'guest')) {
      return Views.renderRestrictedNotice('Responsável ou Administrador', 'parent');
    }

    const children = window.gameTechState.getChildren();
    const activeChild = children[0] || null;

    return `
      <div class="view-parental animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">PROTEÇÃO DA FAMÍLIA & BEM-ESTAR DIGITAL</span>
            <h1>Área dos Pais – Controle Parental</h1>
            <p class="text-muted">Acompanhe tempo de tela, configure limites saudáveis e gerencie horários dos seus filhos.</p>
          </div>
          <button class="btn-primary-neon" onclick="Components.showChildModal()">
            + Vincular Novo Filho
          </button>
        </div>

        <!-- Seletor de Filhos -->
        <div class="child-tabs-bar mt-4">
          ${children.map((ch, idx) => `
            <button class="child-tab-btn ${idx === 0 ? 'active' : ''}" id="child-tab-${ch.id}" onclick="window.gameTechApp.selectChild('${ch.id}')">
              <span class="child-avatar">${ch.avatar}</span>
              <div class="child-tab-info">
                <strong>${ch.name}</strong>
                <small>${ch.age} anos • ${ch.device}</small>
              </div>
            </button>
          `).join('')}
        </div>

        ${activeChild ? `
          <div id="child-details-wrapper" class="mt-4">
            <!-- Painel de Emergência e Status Principal -->
            <div class="parental-hero-card">
              <div class="child-live-status">
                <div class="child-avatar-big">${activeChild.avatar}</div>
                <div>
                  <h2>${activeChild.name} (${activeChild.age} anos)</h2>
                  <div class="status-indicator-line">
                    <span class="pulse-green"></span>
                    <span>Dispositivo: <strong>${activeChild.device}</strong></span>
                    <span class="separator">•</span>
                    <span>Em uso agora: <strong>${activeChild.currentApp}</strong></span>
                  </div>
                  <div class="habit-badge mt-2">
                    Índice de Hábitos Digitais: <strong>${activeChild.habitScore}/100 (Excelente)</strong>
                  </div>
                </div>
              </div>

              <!-- Botão de Ação Emergencial -->
              <div class="emergency-block-zone">
                <button class="btn-emergency ${activeChild.emergencyLockActive ? 'locked' : ''}" onclick="window.gameTechApp.toggleEmergencyLock('${activeChild.id}')">
                  ${activeChild.emergencyLockActive ? '🔓 Desbloquear Dispositivos' : '🔒 Bloquear Dispositivos Agora'}
                </button>
                <small class="text-muted text-center block mt-1">Interrupção imediata de tela</small>
              </div>
            </div>

            <!-- Grid de Indicadores: Tempo de Tela, Gráfico Semanal e Configurações -->
            <div class="parental-grid mt-4">
              <!-- Card 1: Medidor de Tempo de Tela de Hoje -->
              <div class="parental-card gauge-card">
                <div class="card-header-simple">
                  <h3>Tempo de Tela Hoje</h3>
                  <span class="badge-tag">Atualização ao Vivo</span>
                </div>
                
                <div class="gauge-canvas-wrap">
                  <canvas id="childGaugeChart"></canvas>
                </div>

                <div class="gauge-stats-row">
                  <div class="g-stat">
                    <span>Tempo Utilizado:</span>
                    <strong>${Math.floor(activeChild.todayMinutesUsed/60)}h ${activeChild.todayMinutesUsed%60}m</strong>
                  </div>
                  <div class="g-stat">
                    <span>Tempo Restante:</span>
                    <strong class="text-green">${Math.max(0, Math.floor((activeChild.dailyLimitMinutes - activeChild.todayMinutesUsed)/60))}h ${Math.max(0, (activeChild.dailyLimitMinutes - activeChild.todayMinutesUsed)%60)}m</strong>
                  </div>
                </div>

                <!-- Slider de Ajuste de Limite -->
                <div class="limit-slider-box mt-3">
                  <label>Ajustar Limite Diário: <strong id="child-slider-val">${activeChild.dailyLimitMinutes} min (${Math.floor(activeChild.dailyLimitMinutes/60)}h ${activeChild.dailyLimitMinutes%60 > 0 ? activeChild.dailyLimitMinutes%60 + 'm' : ''})</strong></label>
                  <input type="range" min="30" max="360" step="15" value="${activeChild.dailyLimitMinutes}" class="gt-slider" id="parental-limit-slider" oninput="window.gameTechApp.updateChildLimitLive('${activeChild.id}', this.value)">
                </div>
              </div>

              <!-- Card 2: Horários Programados (Estudo e Sono) -->
              <div class="parental-card schedule-card">
                <div class="card-header-simple">
                  <h3>Horários Programados</h3>
                  <span class="badge-tag">Rotina Inteligente</span>
                </div>

                <div class="schedule-modes-list">
                  <div class="schedule-item">
                    <div class="sch-icon">📚</div>
                    <div class="sch-info">
                      <h4>Modo Foco & Estudos</h4>
                      <p>Jogos e redes ficam bloqueados automaticamente.</p>
                      <div class="time-range-badge">
                        ${activeChild.studyHoursStart} até ${activeChild.studyHoursEnd} (Seg a Sex)
                      </div>
                    </div>
                    <div class="toggle-switch">
                      <input type="checkbox" id="toggle-study" checked onchange="Components.showToast('Modo Estudos atualizado com sucesso!', 'info', 'Controle Parental')">
                      <label for="toggle-study"></label>
                    </div>
                  </div>

                  <div class="schedule-item mt-3">
                    <div class="sch-icon">🌙</div>
                    <div class="sch-info">
                      <h4>Horário de Dormir (Descanso)</h4>
                      <p>Aparelho desliga e notifica para ir para a cama.</p>
                      <div class="time-range-badge">
                        A partir das ${activeChild.bedtime}
                      </div>
                    </div>
                    <div class="toggle-switch">
                      <input type="checkbox" id="toggle-sleep" checked onchange="Components.showToast('Horário de Descanso mantido ativo.', 'info', 'Controle Parental')">
                      <label for="toggle-sleep"></label>
                    </div>
                  </div>

                  <div class="schedule-item mt-3">
                    <div class="sch-icon">🔔</div>
                    <div class="sch-info">
                      <h4>Notificações de Limite</h4>
                      <p>Avisar pais ao atingir 80% e 100% do limite diário.</p>
                    </div>
                    <div class="toggle-switch">
                      <input type="checkbox" id="toggle-notif" checked onchange="Components.showToast('Notificações push configuradas.', 'info', 'Alertas')">
                      <label for="toggle-notif"></label>
                    </div>
                  </div>
                </div>

                <button class="btn-secondary btn-block mt-4" onclick="Components.showChildModal('${activeChild.id}')">
                  ⚙️ Editar Regras & Horários Detalhados
                </button>
              </div>

              <!-- Card 3: Gráfico de Histórico Semanal -->
              <div class="parental-card weekly-card">
                <div class="card-header-simple">
                  <h3>Uso nos Últimos 7 Dias</h3>
                  <span class="badge-tag">Média: 2h 15m/dia</span>
                </div>

                <div class="weekly-canvas-wrap">
                  <canvas id="childWeeklyChart"></canvas>
                </div>

                <div class="weekly-feedback mt-2">
                  <p class="text-muted">
                    ✓ O tempo de tela permaneceu dentro da faixa recomendada pela Sociedade Brasileira de Pediatria em 5 dos 7 dias da semana.
                  </p>
                </div>
              </div>
            </div>

            <!-- Tabela de Aplicativos Utilizados e Bloqueio Individual -->
            <div class="apps-history-section mt-5">
              <div class="section-header-row">
                <div>
                  <span class="section-tag">AUDITORIA DE USO</span>
                  <h3>Aplicativos Utilizados Hoje</h3>
                  <p class="text-muted">Bloqueie qualquer jogo ou aplicativo individualmente com 1 clique.</p>
                </div>
                <button class="btn-secondary" onclick="Components.showToast('Relatório semanal completo enviado para seu e-mail.', 'success', 'Relatório dos Pais')">
                  📄 Enviar Relatório Completo por E-mail
                </button>
              </div>

              <div class="table-container mt-3">
                <table class="gt-table">
                  <thead>
                    <tr>
                      <th>Aplicativo</th>
                      <th>Categoria</th>
                      <th>Tempo Gasto Hoje</th>
                      <th>Status de Acesso</th>
                      <th>Ação dos Pais</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${activeChild.appsHistory.map(app => `
                      <tr>
                        <td>
                          <div class="app-row-name">
                            <span class="app-icon">${app.icon}</span>
                            <strong>${app.name}</strong>
                          </div>
                        </td>
                        <td><span class="badge-tag">${app.category}</span></td>
                        <td>${app.minutes} minutos</td>
                        <td>
                          <span class="badge-tag ${app.blocked ? 'badge-red' : 'badge-green'}">
                            ${app.blocked ? '⛔ Bloqueado' : '✅ Permitido'}
                          </span>
                        </td>
                        <td>
                          <button class="btn-sm ${app.blocked ? 'btn-secondary' : 'btn-danger'}" onclick="window.gameTechApp.toggleAppBlock('${activeChild.id}', '${app.name}')">
                            ${app.blocked ? 'Liberar Acesso' : 'Bloquear App'}
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ==========================================
  // 7. RELATÓRIOS
  // ==========================================
  static renderReports() {
    return `
      <div class="view-reports animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">INTELIGÊNCIA & ANÁLISES</span>
            <h1>Central de Relatórios GameTech</h1>
            <p class="text-muted">Métricas consolidadas de desempenho, engajamento e segurança digital.</p>
          </div>
          <button class="btn-primary-neon" onclick="Components.showToast('Gerando arquivo consolidado PDF...', 'info', 'Exportando'); setTimeout(() => Components.showToast('Relatório GameTech baixado com sucesso!', 'success', 'Concluído'), 1000);">
            📥 Baixar Relatório Geral (PDF)
          </button>
        </div>

        <div class="reports-grid mt-4">
          <div class="report-card">
            <div class="report-icon">📈</div>
            <h3>Relatório de Vendas e Faturamento</h3>
            <p>Análise mensal de conversões da loja virtual, ticket médio e produtos mais vendidos.</p>
            <div class="rep-meta">Última atualização: Hoje, 08:30</div>
            <button class="btn-secondary btn-block mt-3" onclick="Components.showToast('Relatório de Vendas aberto.', 'info', 'Relatórios')">Visualizar Dados</button>
          </div>

          <div class="report-card">
            <div class="report-icon">🛡️</div>
            <h3>Auditoria de Segurança Cibernética</h3>
            <p>Log de acessos, integridade de tokens FIDO2 e conformidade com a Lei Geral de Proteção de Dados.</p>
            <div class="rep-meta">Status: 0 vulnerabilidades</div>
            <button class="btn-secondary btn-block mt-3" onclick="Components.showToast('Auditoria de Segurança: 100% em conformidade.', 'success', 'Segurança')">Ver Log de Auditoria</button>
          </div>

          <div class="report-card">
            <div class="report-icon">👨‍👩‍👧‍👦</div>
            <h3>Relatório Geral de Hábitos Parentais</h3>
            <p>Estatísticas anônimas de tempo de tela e taxa de sucesso do modo estudo das famílias cadastradas.</p>
            <div class="rep-meta">Pontuação Média: 91/100</div>
            <button class="btn-secondary btn-block mt-3" onclick="Components.showToast('Relatório de Hábitos Familiares exibido.', 'info', 'Controle Parental')">Consultar Métricas</button>
          </div>

          <div class="report-card">
            <div class="report-icon">🥽</div>
            <h3>Desempenho de Projetos VR & Games</h3>
            <p>Horas jogadas nos títulos da GameTech, taxa de retenção de jogadores e feedback da comunidade.</p>
            <div class="rep-meta">Satisfação: 98,4%</div>
            <button class="btn-secondary btn-block mt-3" onclick="Components.showToast('Relatório de Jogadores carregado.', 'info', 'Games')">Ver Estatísticas</button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 8. PAINEL ADMINISTRATIVO (ADMIN ONLY)
  // ==========================================
  static renderAdmin() {
    const user = window.gameTechState.getCurrentUser();
    if (!Views.checkAccess('admin', user ? user.role : 'guest')) {
      return Views.renderRestrictedNotice('Administrador', 'admin');
    }

    const products = window.gameTechState.getProducts();
    const users = window.gameTechState.getUsers();
    const orders = window.gameTechState.getOrders();

    return `
      <div class="view-admin animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">PAINEL EXECUTIVO • ACESSO RESTRITO</span>
            <h1>Painel Administrativo da GameTech</h1>
            <p class="text-muted">Gestão integrada do catálogo de produtos, clientes, pedidos e configurações da empresa.</p>
          </div>
          <button class="btn-primary-neon" onclick="Components.showProductFormModal()">
            + Cadastrar Novo Produto
          </button>
        </div>

        <!-- Abas do Painel Administrativo -->
        <div class="admin-tabs-bar mt-4">
          <button class="admin-tab-btn active" id="adm-tab-products" onclick="window.gameTechApp.switchAdminSubTab('products')">🛍️ Produtos & Catálogo (${products.length})</button>
          <button class="admin-tab-btn" id="adm-tab-users" onclick="window.gameTechApp.switchAdminSubTab('users')">👥 Usuários & Clientes (${users.length})</button>
          <button class="admin-tab-btn" id="adm-tab-orders" onclick="window.gameTechApp.switchAdminSubTab('orders')">📦 Pedidos & Vendas (${orders.length})</button>
          <button class="admin-tab-btn" id="adm-tab-company" onclick="window.gameTechApp.switchAdminSubTab('company')">🏢 Dados da Empresa</button>
        </div>

        <!-- Subpainel 1: Gestão de Produtos (CRUD) -->
        <div id="adm-subpanel-products" class="adm-subpanel active mt-4">
          <div class="table-container">
            <table class="gt-table">
              <thead>
                <tr>
                  <th>Visual</th>
                  <th>Nome do Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Destaque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr>
                    <td style="width: 50px;">
                      <div style="width: 40px; height: 40px;">
                        ${Components.getProductSvgIcon(p.imageType)}
                      </div>
                    </td>
                    <td><strong>${p.name}</strong></td>
                    <td><span class="badge-tag">${p.categoryLabel}</span></td>
                    <td class="text-highlight font-bold">R$ ${p.price.toFixed(2).replace('.', ',')}</td>
                    <td>${p.stock} un.</td>
                    <td><span class="badge-tag neon-badge">${p.badge || 'GameTech'}</span></td>
                    <td>
                      <div class="actions-cell">
                        <button class="btn-sm btn-secondary" onclick="Components.showProductFormModal('${p.id}')">✏️ Editar</button>
                        <button class="btn-sm btn-danger" onclick="window.gameTechApp.deleteProduct('${p.id}')">🗑️ Excluir</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Subpainel 2: Usuários e Clientes Cadastrados -->
        <div id="adm-subpanel-users" class="adm-subpanel mt-4">
          <div class="table-container">
            <table class="gt-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Nome Completo</th>
                  <th>E-mail</th>
                  <th>Tipo de Acesso</th>
                  <th>Data de Cadastro</th>
                  <th>Alterar Permissão</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td><span style="font-size: 1.4rem;">${u.avatar || '👤'}</span></td>
                    <td><strong>${u.name}</strong></td>
                    <td>${u.email}</td>
                    <td>
                      <span class="badge-tag ${u.role === 'admin' ? 'badge-purple' : u.role === 'parent' ? 'badge-blue' : 'badge-green'}">
                        ${u.roleLabel || u.role}
                      </span>
                    </td>
                    <td>${u.createdAt || '2025-01-10'}</td>
                    <td>
                      <select class="gt-input-sm" onchange="window.gameTechApp.changeUserRole('${u.id}', this.value)">
                        <option value="user" ${u.role === 'user' ? 'selected' : ''}>Usuário Gamer</option>
                        <option value="parent" ${u.role === 'parent' ? 'selected' : ''}>Responsável (Pais)</option>
                        <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Administrador</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Subpainel 3: Monitor de Pedidos -->
        <div id="adm-subpanel-orders" class="adm-subpanel mt-4">
          <div class="table-container">
            <table class="gt-table">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Itens</th>
                  <th>Valor Total</th>
                  <th>Pagamento</th>
                  <th>Status</th>
                  <th>Alterar Status</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(o => `
                  <tr>
                    <td><code>#${o.id}</code></td>
                    <td>${o.date}</td>
                    <td><strong>${o.customerName}</strong><br><small class="text-muted">${o.customerEmail}</small></td>
                    <td>${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</td>
                    <td class="text-highlight font-bold">R$ ${o.total.toFixed(2).replace('.', ',')}</td>
                    <td><span class="badge-tag">${o.paymentMethod || 'PIX'}</span></td>
                    <td>
                      <span class="badge-tag ${o.status.includes('Entregue') ? 'badge-green' : 'badge-orange'}">
                        ${o.status}
                      </span>
                    </td>
                    <td>
                      <select class="gt-input-sm" onchange="window.gameTechApp.updateOrderStatus('${o.id}', this.value)">
                        <option ${o.status === 'Processando Pedido' ? 'selected' : ''}>Processando Pedido</option>
                        <option ${o.status === 'Em Transporte' ? 'selected' : ''}>Em Transporte</option>
                        <option ${o.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Subpainel 4: Informações da Empresa -->
        <div id="adm-subpanel-company" class="adm-subpanel mt-4">
          <div class="company-edit-card">
            <h3>Dados Institucionais da GameTech</h3>
            <p class="text-muted">Atualize os parâmetros públicos da empresa.</p>

            <form onsubmit="event.preventDefault(); Components.showToast('Informações da empresa salvas com sucesso!', 'success', 'Atualização');" class="mt-4">
              <div class="grid-2-cols">
                <div class="input-group">
                  <label>Nome Corporativo</label>
                  <input type="text" class="gt-input" value="GameTech Soluções Tecnológicas Ltda" required>
                </div>
                <div class="input-group">
                  <label>Fundadora / CEO</label>
                  <input type="text" class="gt-input" value="Estefany da Cunha" required>
                </div>
              </div>

              <div class="grid-2-cols">
                <div class="input-group">
                  <label>Slogan Oficial</label>
                  <input type="text" class="gt-input" value="Jogar é evoluir!" required>
                </div>
                <div class="input-group">
                  <label>E-mail Corporativo</label>
                  <input type="email" class="gt-input" value="contato@gametech.com" required>
                </div>
              </div>

              <div class="input-group">
                <label>Mensagem de Destaque no Topo da Plataforma</label>
                <input type="text" class="gt-input" value="🎮 Nova temporada de CyberOdyssey lançada! Desconto de 10% no cupom GAMETECH10.">
              </div>

              <button type="submit" class="btn-primary-neon mt-3">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 9. CONFIGURAÇÕES
  // ==========================================
  static renderSettings() {
    const settings = window.gameTechState.getSettings();

    return `
      <div class="view-settings animate-fade-in">
        <div class="section-header-row">
          <div>
            <span class="section-tag">PREFERÊNCIAS DO SISTEMA</span>
            <h1>Configurações da Plataforma</h1>
            <p class="text-muted">Personalize sua experiência visual, sonora e de segurança na GameTech.</p>
          </div>
        </div>

        <div class="settings-card mt-4">
          <div class="setting-item">
            <div>
              <h4>Efeitos Sonoros Futuristas (Web Audio API)</h4>
              <p class="text-muted">Sons cibernéticos sutis ao clicar em botões, abas e realizar compras.</p>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="set-audio" ${settings.soundEnabled ? 'checked' : ''} onchange="window.gameTechApp.toggleSetting('soundEnabled', this.checked)">
              <label for="set-audio"></label>
            </div>
          </div>

          <div class="setting-item mt-3">
            <div>
              <h4>Partículas Neon Interativas no Fundo</h4>
              <p class="text-muted">Canvas de luzes cibernéticas e grid tecnológico responsivo ao mouse.</p>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="set-particles" ${settings.particlesEnabled ? 'checked' : ''} onchange="window.gameTechApp.toggleSetting('particlesEnabled', this.checked)">
              <label for="set-particles"></label>
            </div>
          </div>

          <div class="setting-item mt-3">
            <div>
              <h4>Autenticação em Dois Fatores (2FA / FIDO2)</h4>
              <p class="text-muted">Segurança máxima com token físico GameTech Guard ou app autenticador.</p>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="set-2fa" ${settings.twoFactorAuth ? 'checked' : ''} onchange="window.gameTechApp.toggleSetting('twoFactorAuth', this.checked)">
              <label for="set-2fa"></label>
            </div>
          </div>

          <div class="setting-item mt-3">
            <div>
              <h4>Bloqueio Noturno Automático dos Filhos</h4>
              <p class="text-muted">Ativar suspensão automática de jogos às 21:30 nos dispositivos vinculados.</p>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="set-night" ${settings.autoLockNight ? 'checked' : ''} onchange="window.gameTechApp.toggleSetting('autoLockNight', this.checked)">
              <label for="set-night"></label>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 10. PERFIL DO USUÁRIO
  // ==========================================
  static renderProfile() {
    const user = window.gameTechState.getCurrentUser() || {
      name: 'Visitante GameTech',
      email: 'visitante@gametech.com',
      role: 'user',
      roleLabel: 'Visitante',
      avatar: '🎮',
      createdAt: 'Hoje'
    };

    const orders = window.gameTechState.getOrders().filter(o => o.customerEmail === user.email);

    return `
      <div class="view-profile animate-fade-in">
        <div class="profile-header-card">
          <div class="profile-avatar-box">
            <span class="user-avatar-huge">${user.avatar || '🎮'}</span>
          </div>
          <div class="profile-info">
            <span class="badge-tag ${user.role === 'admin' ? 'badge-purple' : user.role === 'parent' ? 'badge-blue' : 'badge-green'}">
              ${user.roleLabel || user.role}
            </span>
            <h2>${user.name}</h2>
            <p class="text-muted">${user.email} • Membro desde ${user.createdAt || '2025-01-15'}</p>
            
            <div class="profile-quick-switch mt-3">
              <span>Alternar perfil rapidamente:</span>
              <button class="btn-sm btn-secondary" onclick="Components.handleQuickLogin('admin@gametech.com', 'admin')">Admin (Estefany)</button>
              <button class="btn-sm btn-secondary" onclick="Components.handleQuickLogin('pais@gametech.com', 'pais')">Responsável (Pais)</button>
              <button class="btn-sm btn-secondary" onclick="Components.handleQuickLogin('gamer@gametech.com', 'gamer')">Gamer (Lucas)</button>
            </div>
          </div>
        </div>

        <!-- Histórico de Pedidos deste Usuário -->
        <div class="user-orders-card mt-4">
          <div class="section-header-row">
            <div>
              <h3>Meus Pedidos na Loja</h3>
              <p class="text-muted">Acompanhe suas compras de jogos, óculos VR e produtos GameTech.</p>
            </div>
          </div>

          <div class="table-container mt-3">
            ${orders.length === 0 ? `
              <div class="p-4 text-center text-muted">
                Nenhum pedido recente registrado neste e-mail.
              </div>
            ` : `
              <table class="gt-table">
                <thead>
                  <tr>
                    <th>Protocolo</th>
                    <th>Data</th>
                    <th>Itens</th>
                    <th>Valor Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td><code>#${o.id}</code></td>
                      <td>${o.date}</td>
                      <td>${o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</td>
                      <td class="text-highlight font-bold">R$ ${o.total.toFixed(2).replace('.', ',')}</td>
                      <td><span class="badge-tag badge-green">${o.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

window.Views = Views;

