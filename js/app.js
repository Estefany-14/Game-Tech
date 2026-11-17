/**
 * GAMETECH - APPLICATION CONTROLLER & ROUTER
 * "Jogar é evoluir!" - Criado por Estefany da Cunha
 */

class GameTechApp {
  constructor() {
    this.currentView = 'inicio';
    this.selectedChildId = 'child_1';
    this.selectedAdminSubTab = 'products';
    this.currentCategoryFilter = 'all';
    this.animFrameId = null;
  }

  init() {
    // Se não houver usuário logado, inicia logado como Admin (Estefany) para melhor experiência de avaliação imediata
    if (!window.gameTechState.getCurrentUser()) {
      const admin = window.gameTechState.getUsers().find(u => u.role === 'admin');
      if (admin) {
        window.gameTechState.setCurrentUser(admin);
      }
    }

    this.initBackgroundCanvas();
    this.renderApp();
    this.initGlobalEventListeners();
  }

  // --- Renderização Principal da Aplicação ---
  renderApp() {
    const user = window.gameTechState.getCurrentUser();
    const cart = window.gameTechState.getCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Atualiza Topbar
    this.renderHeader(user, cartCount);

    // Atualiza Sidebar
    this.renderSidebar(user);

    // Renderiza a visualização atual
    this.renderCurrentView();

    // Atualiza badges
    this.updateCartBadge();
  }

  renderHeader(user, cartCount) {
    const headerContainer = document.getElementById('app-header');
    if (!headerContainer) return;

    headerContainer.innerHTML = `
      <div class="topbar-left">
        <button class="menu-toggle-btn" id="mobile-menu-toggle" onclick="window.gameTechApp.toggleSidebar()">
          ☰
        </button>
        <div class="topbar-brand" onclick="window.gameTechApp.navigate('inicio')">
          <div class="brand-hexagon">
            <span>GT</span>
          </div>
          <div class="brand-text">
            <span class="brand-title">GAMETECH</span>
            <span class="brand-slogan">"Jogar é evoluir!"</span>
          </div>
        </div>
      </div>

      <div class="topbar-right">
        <!-- Notificações -->
        <button class="icon-button" onclick="window.gameTechApp.showNotificationsDrawer()" title="Notificações">
          🔔
          <span class="icon-badge">2</span>
        </button>

        <!-- Carrinho -->
        <button class="icon-button cart-icon-btn" onclick="Components.showCartDrawer()" title="Carrinho de Compras">
          🛒
          <span class="icon-badge" id="nav-cart-badge">${cartCount}</span>
        </button>

        <!-- Efeitos de Som Toggle -->
        <button class="icon-button sound-toggle-btn" id="sound-btn" onclick="window.gameTechApp.toggleAudioQuick()" title="Ativar/Desativar Sons">
          ${window.gameTechAudio && window.gameTechAudio.enabled ? '🔊' : '🔇'}
        </button>

        <!-- Dropdown de Usuário -->
        <div class="user-menu-dropdown">
          ${user ? `
            <div class="user-pill" onclick="window.gameTechApp.toggleUserDropdown()">
              <span class="user-avatar-small">${user.avatar || '👩‍💻'}</span>
              <div class="user-pill-text">
                <span class="user-name">${user.name.split(' ')[0]}</span>
                <span class="user-role-badge ${user.role === 'admin' ? 'badge-purple' : user.role === 'parent' ? 'badge-blue' : 'badge-green'}">
                  ${user.role === 'admin' ? 'Admin' : user.role === 'parent' ? 'Pais' : 'Gamer'}
                </span>
              </div>
              <span class="dropdown-chevron">▼</span>
            </div>

            <div class="dropdown-menu-list" id="user-dropdown-menu">
              <div class="dropdown-user-header">
                <strong>${user.name}</strong>
                <small>${user.email}</small>
              </div>
              <a href="#" onclick="window.gameTechApp.navigate('perfil'); return false;">👤 Meu Perfil</a>
              <a href="#" onclick="window.gameTechApp.navigate('configuracoes'); return false;">🔧 Configurações</a>
              <div class="dropdown-divider"></div>
              <div class="dropdown-section-title">Trocar de Perfil Rápido:</div>
              <a href="#" onclick="Components.handleQuickLogin('admin@gametech.com', 'admin'); return false;">👩‍💻 Admin (Estefany)</a>
              <a href="#" onclick="Components.handleQuickLogin('pais@gametech.com', 'pais'); return false;">👨‍👩‍👧‍👦 Responsável (Pais)</a>
              <a href="#" onclick="Components.handleQuickLogin('gamer@gametech.com', 'gamer'); return false;">🎮 Gamer (Lucas)</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="logout-link" onclick="window.gameTechApp.logout(); return false;">🚪 Sair</a>
            </div>
          ` : `
            <button class="btn-primary-neon btn-sm" onclick="Components.showAuthModal('login')">
              Entrar / Criar Conta
            </button>
          `}
        </div>
      </div>
    `;
  }

  renderSidebar(user) {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const navItems = [
      { id: 'inicio', label: 'Início', icon: '🏠', badge: '' },
      { id: 'sobre', label: 'Sobre a Empresa', icon: '🏢', badge: '' },
      { id: 'produtos', label: 'Produtos & Loja', icon: '🛍️', badge: '' },
      { id: 'servicos', label: 'Serviços', icon: '⚡', badge: '7 Áreas' },
      { id: 'financeiro', label: 'Financeiro', icon: '💰', badge: 'R$ 14,9k', restricted: 'admin' },
      { id: 'pais', label: 'Área dos Pais', icon: '🛡️', badge: 'Controle', restricted: 'parent' },
      { id: 'relatorios', label: 'Relatórios', icon: '📊', badge: '' },
      { id: 'admin', label: 'Painel Admin', icon: '⚙️', badge: 'VIP', restricted: 'admin' },
      { id: 'configuracoes', label: 'Configurações', icon: '🔧', badge: '' },
      { id: 'perfil', label: 'Perfil', icon: '👤', badge: '' }
    ];

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-brand-glow">
          <span class="glow-symbol">🎮</span>
          <div>
            <h4 class="brand-name">GAMETECH</h4>
            <span class="founder-sub">Estefany da Cunha</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">MENU PRINCIPAL</div>
        ${navItems.map(item => {
          const isActive = this.currentView === item.id;
          const isRestricted = item.restricted && !Views.checkAccess(item.restricted, user ? user.role : 'guest');
          return `
            <button class="nav-item ${isActive ? 'active' : ''} ${isRestricted ? 'nav-item-restricted' : ''}" onclick="window.gameTechApp.navigate('${item.id}')">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
              ${isRestricted ? `<span class="lock-icon" title="Acesso restrito a ${item.restricted}">🔒</span>` : ''}
            </button>
          `;
        }).join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="company-badge-compact">
          <div class="badge-dot"></div>
          <div>
            <strong>GameTech v1.0</strong>
            <small>"Jogar é evoluir!"</small>
          </div>
        </div>
      </div>
    `;
  }

  // --- Navegação entre Telas ---
  navigate(viewId) {
    this.currentView = viewId;
    if (window.gameTechAudio) window.gameTechAudio.playTab();

    // Fecha sidebar no mobile
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }

    // Fecha dropdown
    const dd = document.getElementById('user-dropdown-menu');
    if (dd) dd.classList.remove('active');

    // Atualiza links ativos
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const currentBtn = Array.from(document.querySelectorAll('.nav-item')).find(b => b.getAttribute('onclick')?.includes(viewId));
    if (currentBtn) currentBtn.classList.add('active');

    this.renderCurrentView();

    // Rola para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCurrentView() {
    const mainContainer = document.getElementById('app-main-content');
    if (!mainContainer) return;

    let html = '';
    switch (this.currentView) {
      case 'inicio':
        html = Views.renderHome();
        break;
      case 'sobre':
        html = Views.renderAbout();
        break;
      case 'produtos':
        html = Views.renderProducts();
        break;
      case 'servicos':
        html = Views.renderServices();
        break;
      case 'financeiro':
        html = Views.renderFinance();
        break;
      case 'pais':
        html = Views.renderParental();
        break;
      case 'relatorios':
        html = Views.renderReports();
        break;
      case 'admin':
        html = Views.renderAdmin();
        break;
      case 'configuracoes':
        html = Views.renderSettings();
        break;
      case 'perfil':
        html = Views.renderProfile();
        break;
      default:
        html = Views.renderHome();
    }

    mainContainer.innerHTML = html;

    // Renderiza gráficos com pequeno delay para garantir que o DOM esteja no layout
    setTimeout(() => {
      this.initViewCharts();
    }, 60);
  }

  // --- Inicialização de Gráficos das Telas ---
  initViewCharts() {
    // Gráficos da Área Financeira
    if (this.currentView === 'financeiro') {
      const fin = window.FINANCIAL_DATA;
      const sim = fin.monthlySimulation;

      // 1. Donut de Receitas
      const donutData = [
        { label: 'Serviços Dev', value: sim.servicesTotal, color: '#a855f7' },
        { label: 'Produtos Tech', value: sim.productsTotal, color: '#38bdf8' },
        { label: 'Assinantes VIP', value: sim.subscribersTotal, color: '#c084fc' },
        { label: 'Jogos Digitais', value: sim.gamesTotal, color: '#06b6d4' }
      ];
      GameTechCharts.drawDonutChart('financeDonutChart', donutData);

      // 2. Barras de Receitas vs Despesas
      GameTechCharts.drawBarChart('financeBarChart', fin.monthlyHistory);
    }

    // Gráficos da Área dos Pais
    if (this.currentView === 'pais') {
      const children = window.gameTechState.getChildren();
      const child = children.find(c => c.id === this.selectedChildId) || children[0];
      if (child) {
        GameTechCharts.drawCircularGauge('childGaugeChart', child.todayMinutesUsed, child.dailyLimitMinutes);
        GameTechCharts.drawWeeklyBarChart('childWeeklyChart', child.weeklyUsage);
      }
    }
  }

  // --- Controle Parental: Ações ---
  selectChild(childId) {
    this.selectedChildId = childId;
    this.renderCurrentView();
  }

  updateChildLimitLive(childId, minutes) {
    window.gameTechState.updateChildLimit(childId, minutes);
    const label = document.getElementById('child-slider-val');
    if (label) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      label.innerText = `${minutes} min (${h}h ${m > 0 ? m + 'm' : ''})`;
    }
    const child = window.gameTechState.getChildren().find(c => c.id === childId);
    if (child) {
      GameTechCharts.drawCircularGauge('childGaugeChart', child.todayMinutesUsed, parseInt(minutes));
    }
  }

  toggleEmergencyLock(childId) {
    const isLocked = window.gameTechState.toggleChildEmergencyLock(childId);
    if (isLocked) {
      Components.showToast('Dispositivos bloqueados com sucesso! Modo de segurança ativado.', 'warning', 'Bloqueio Imediato');
      if (window.gameTechAudio) window.gameTechAudio.playAlert();
    } else {
      Components.showToast('Dispositivos liberados para utilização.', 'success', 'Desbloqueado');
      if (window.gameTechAudio) window.gameTechAudio.playSuccess();
    }
    this.renderCurrentView();
  }

  toggleAppBlock(childId, appName) {
    const isBlocked = window.gameTechState.toggleChildAppBlock(childId, appName);
    if (isBlocked) {
      Components.showToast(`Aplicativo "${appName}" foi BLOQUEADO para este dispositivo.`, 'warning', 'Bloqueio de App');
    } else {
      Components.showToast(`Aplicativo "${appName}" foi liberado.`, 'success', 'App Desbloqueado');
    }
    this.renderCurrentView();
  }

  // --- Simulação Financeira: Calculadora Interativa ---
  updateFinancialSim() {
    const subCount = parseInt(document.getElementById('sim-sub-count')?.value || 200);
    const gamesCount = parseInt(document.getElementById('sim-games-count')?.value || 50);
    const srvCount = parseInt(document.getElementById('sim-srv-count')?.value || 10);
    const prodVal = parseFloat(document.getElementById('sim-prod')?.value || 4000);

    // Labels
    const subCountVal = document.getElementById('sim-sub-count-val');
    if (subCountVal) subCountVal.innerText = subCount;

    const gamesCountVal = document.getElementById('sim-games-count-val');
    if (gamesCountVal) gamesCountVal.innerText = gamesCount;

    const srvCountVal = document.getElementById('sim-srv-count-val');
    if (srvCountVal) srvCountVal.innerText = srvCount;

    const prodValDisp = document.getElementById('sim-prod-val');
    if (prodValDisp) prodValDisp.innerText = `R$ ${prodVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Cálculos
    const subTotal = subCount * 19.90;
    const gamesTotal = gamesCount * 40.00;
    const srvTotal = srvCount * 500.00;
    const totalRevenue = subTotal + gamesTotal + srvTotal + prodVal;
    const annualRevenue = totalRevenue * 12;
    const expenses = 6030.00;
    const profit = Math.max(0, totalRevenue - expenses);

    // Exibição
    const totalElem = document.getElementById('sim-dynamic-total');
    if (totalElem) totalElem.innerText = `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const annualElem = document.getElementById('sim-dynamic-annual');
    if (annualElem) annualElem.innerText = `R$ ${annualRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const profitElem = document.getElementById('sim-dynamic-profit');
    if (profitElem) profitElem.innerText = `R$ ${profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Atualiza Donut dinamicamente
    const dynamicDonutData = [
      { label: 'Serviços Dev', value: srvTotal, color: '#a855f7' },
      { label: 'Produtos Tech', value: prodVal, color: '#38bdf8' },
      { label: 'Assinantes VIP', value: subTotal, color: '#c084fc' },
      { label: 'Jogos Digitais', value: gamesTotal, color: '#06b6d4' }
    ];
    GameTechCharts.drawDonutChart('financeDonutChart', dynamicDonutData);
  }

  resetFinancialSim() {
    const subSlider = document.getElementById('sim-sub-count');
    const gamesSlider = document.getElementById('sim-games-count');
    const srvSlider = document.getElementById('sim-srv-count');
    const prodSlider = document.getElementById('sim-prod');

    if (subSlider) subSlider.value = 200;
    if (gamesSlider) gamesSlider.value = 50;
    if (srvSlider) srvSlider.value = 10;
    if (prodSlider) prodSlider.value = 4000;

    this.updateFinancialSim();
    Components.showToast('Simulação restaurada para os valores padrão (R$ 14.980,00).', 'info', 'Simulador');
  }

  // --- Loja & Carrinho ---
  addToCart(productId) {
    window.gameTechState.addToCart(productId, 1);
    const prod = window.gameTechState.getProducts().find(p => p.id === productId);
    this.updateCartBadge();
    Components.showToast(`${prod ? prod.name : 'Produto'} adicionado ao carrinho!`, 'success', 'Carrinho');
  }

  changeCartQty(productId, newQty) {
    window.gameTechState.updateCartQty(productId, newQty);
    this.updateCartBadge();
    Components.showCartDrawer();
  }

  removeCartItem(productId) {
    window.gameTechState.removeFromCart(productId);
    this.updateCartBadge();
    Components.showCartDrawer();
  }

  updateCartBadge() {
    const cart = window.gameTechState.getCart();
    const count = cart.reduce((s, i) => s + i.quantity, 0);

    const badge = document.getElementById('nav-cart-badge');
    if (badge) badge.innerText = count;

    const catBadge = document.getElementById('cart-counter-btn');
    if (catBadge) catBadge.innerText = count;
  }

  setCategoryFilter(category) {
    this.currentCategoryFilter = category;
    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });
    this.filterProducts();
  }

  filterProducts() {
    const searchInput = document.getElementById('prod-search-input');
    const term = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardName = card.getAttribute('data-name');

      const matchesCat = this.currentCategoryFilter === 'all' || cardCat === this.currentCategoryFilter;
      const matchesSearch = !term || cardName.includes(term);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // --- Painel Admin ---
  switchAdminSubTab(tabName) {
    this.selectedAdminSubTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.adm-subpanel').forEach(p => p.classList.remove('active'));

    const tabBtn = document.getElementById(`adm-tab-${tabName}`);
    const panel = document.getElementById(`adm-subpanel-${tabName}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (panel) panel.classList.add('active');
    if (window.gameTechAudio) window.gameTechAudio.playClick();
  }

  deleteProduct(productId) {
    if (confirm('Tem certeza que deseja remover este produto do catálogo da GameTech?')) {
      window.gameTechState.deleteProduct(productId);
      Components.showToast('Produto excluído com sucesso!', 'info', 'Admin');
      this.renderCurrentView();
    }
  }

  changeUserRole(userId, newRole) {
    window.gameTechState.updateUserRole(userId, newRole);
    Components.showToast('Permissão de acesso do usuário atualizada com sucesso!', 'success', 'Admin');
    this.renderApp();
  }

  updateOrderStatus(orderId, newStatus) {
    window.gameTechState.updateOrderStatus(orderId, newStatus);
    Components.showToast(`Status do pedido #${orderId} alterado para "${newStatus}".`, 'success', 'Admin');
  }

  // --- Notificações Drawer ---
  showNotificationsDrawer() {
    const notifs = window.gameTechState.getNotifications();
    const html = `
      <div class="notifs-drawer-container">
        <div class="cart-header">
          <h3>🔔 Central de Notificações</h3>
          <button class="modal-close-btn" onclick="Components.closeModal('notifs-modal')">✕</button>
        </div>
        <div class="notifs-list mt-3">
          ${notifs.map(n => `
            <div class="notif-item ${!n.read ? 'unread' : ''}">
              <div class="notif-icon">${n.icon || '⚡'}</div>
              <div class="notif-content">
                <div class="notif-title">${n.title}</div>
                <div class="notif-desc">${n.message}</div>
                <div class="notif-time">${n.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-secondary btn-block mt-3" onclick="window.gameTechState.markNotificationsAsRead(); Components.closeModal('notifs-modal'); Components.showToast('Todas as notificações foram marcadas como lidas.', 'info', 'Notificações');">
          Marcar todas como lidas
        </button>
      </div>
    `;
    Components.openModal(html, 'notifs-modal');
    if (window.gameTechAudio) window.gameTechAudio.playClick();
  }

  // --- Configurações & Preferências ---
  toggleSetting(key, val) {
    window.gameTechState.updateSettings({ [key]: val });
    if (key === 'soundEnabled') {
      if (window.gameTechAudio) window.gameTechAudio.toggleSound(val);
      const soundBtn = document.getElementById('sound-btn');
      if (soundBtn) soundBtn.innerText = val ? '🔊' : '🔇';
    }
    Components.showToast(`Configuração atualizada com sucesso.`, 'success', 'Preferências');
  }

  toggleAudioQuick() {
    if (window.gameTechAudio) {
      const isEnabled = window.gameTechAudio.toggleSound();
      window.gameTechState.updateSettings({ soundEnabled: isEnabled });
      const soundBtn = document.getElementById('sound-btn');
      if (soundBtn) soundBtn.innerText = isEnabled ? '🔊' : '🔇';
      Components.showToast(`Efeitos sonoros ${isEnabled ? 'ativados' : 'desativados'}.`, 'info', 'Áudio');
    }
  }

  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  }

  toggleUserDropdown() {
    const dd = document.getElementById('user-dropdown-menu');
    if (dd) dd.classList.toggle('active');
  }

  logout() {
    window.gameTechState.logout();
    Components.showToast('Você encerrou a sessão. Até breve!', 'info', 'Sessão Encerrada');
    this.renderApp();
  }

  // --- Canvas de Fundo Tecnológico Cibernético ---
  initBackgroundCanvas() {
    const canvas = document.getElementById('bg-cyber-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(56, 189, 248, 0.35)'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Partículas flutuantes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Linhas de conexão sutis entre partículas próximas
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      this.animFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  initGlobalEventListeners() {
    // Fecha dropdown de usuário ao clicar fora
    document.addEventListener('click', (e) => {
      const userMenu = document.querySelector('.user-menu-dropdown');
      if (userMenu && !userMenu.contains(e.target)) {
        const dd = document.getElementById('user-dropdown-menu');
        if (dd) dd.classList.remove('active');
      }
    });

    // Tecla ESC fecha modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.gt-modal-overlay.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
          setTimeout(() => activeModal.remove(), 250);
        }
      }
    });
  }
}

// Instanciação e Inicialização na carga da página
window.addEventListener('DOMContentLoaded', () => {
  window.gameTechApp = new GameTechApp();
  window.gameTechApp.init();
});

