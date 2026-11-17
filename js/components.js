/**
 * GAMETECH - UI COMPONENTS, MODALS & TOAST NOTIFICATIONS
 */

class Components {
  // --- Sistema de Toasts Notificações ---
  static showToast(message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type} animate-slide-in`;

    const icons = {
      success: '✨',
      warning: '⚠️',
      error: '❌',
      info: '⚡'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || '⚡'}</div>
      <div class="toast-body">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-text">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    if (window.gameTechAudio) {
      if (type === 'success') window.gameTechAudio.playSuccess();
      else if (type === 'error' || type === 'warning') window.gameTechAudio.playAlert();
      else window.gameTechAudio.playClick();
    }

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('animate-fade-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }

  // --- Gerador de SVG Visual para Produtos ---
  static getProductSvgIcon(imageType) {
    const svgs = {
      game_cyber: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <defs>
            <linearGradient id="g_cyber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c084fc"/>
              <stop offset="100%" stop-color="#38bdf8"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="url(#g_cyber)" stroke-width="2"/>
          <path d="M35 55 L85 55 M60 35 L60 85" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
          <circle cx="60" cy="60" r="28" stroke="url(#g_cyber)" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
          <polygon points="50,45 75,60 50,75" fill="#38bdf8"/>
        </svg>`,
      game_blade: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <defs>
            <linearGradient id="g_blade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f43f5e"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="url(#g_blade)" stroke-width="2"/>
          <path d="M30 90 L85 35 M85 35 L90 40 M80 30 L85 35" stroke="url(#g_blade)" stroke-width="4" stroke-linecap="round"/>
          <circle cx="40" cy="80" r="10" stroke="#f43f5e" stroke-width="2" fill="none"/>
          <line x1="45" y1="75" x2="65" y2="55" stroke="#c084fc" stroke-width="2"/>
        </svg>`,
      game_kids: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <defs>
            <linearGradient id="g_kids" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#10b981"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="url(#g_kids)" stroke-width="2"/>
          <rect x="35" y="35" width="22" height="22" rx="4" fill="#38bdf8"/>
          <rect x="63" y="35" width="22" height="22" rx="4" fill="#a855f7"/>
          <rect x="35" y="63" width="22" height="22" rx="4" fill="#10b981"/>
          <rect x="63" y="63" width="22" height="22" rx="4" fill="#f59e0b"/>
          <circle cx="60" cy="60" r="12" fill="#ffffff" opacity="0.9"/>
        </svg>`,
      vr_headset: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <defs>
            <linearGradient id="g_vr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a855f7"/>
              <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="url(#g_vr)" stroke-width="2"/>
          <rect x="25" y="45" width="70" height="34" rx="10" fill="#1e183a" stroke="url(#g_vr)" stroke-width="2"/>
          <circle cx="45" cy="62" r="8" fill="#a855f7" opacity="0.8"/>
          <circle cx="75" cy="62" r="8" fill="#06b6d4" opacity="0.8"/>
          <path d="M25 55 C15 55 15 65 25 65" stroke="#c084fc" stroke-width="3" fill="none"/>
          <path d="M95 55 C105 55 105 65 95 65" stroke="#c084fc" stroke-width="3" fill="none"/>
        </svg>`,
      vr_holo: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <defs>
            <linearGradient id="g_holo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#06b6d4"/>
              <stop offset="100%" stop-color="#38bdf8"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="url(#g_holo)" stroke-width="2"/>
          <ellipse cx="60" cy="60" rx="35" ry="16" fill="none" stroke="url(#g_holo)" stroke-width="3"/>
          <circle cx="45" cy="60" r="6" fill="#38bdf8"/>
          <circle cx="75" cy="60" r="6" fill="#06b6d4"/>
          <path d="M30 60 L20 50 M90 60 L100 50" stroke="#a855f7" stroke-width="2"/>
        </svg>`,
      toy_robot: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#a855f7" stroke-width="2"/>
          <rect x="40" y="38" width="40" height="34" rx="8" fill="#201a3d" stroke="#c084fc" stroke-width="2"/>
          <circle cx="50" cy="52" r="4" fill="#38bdf8"/>
          <circle cx="70" cy="52" r="4" fill="#38bdf8"/>
          <rect x="52" y="62" width="16" height="4" rx="2" fill="#a855f7"/>
          <line x1="60" y1="38" x2="60" y2="28" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="26" r="3" fill="#ec4899"/>
          <rect x="35" y="74" width="50" height="24" rx="6" fill="#16122d" stroke="#a855f7" stroke-width="1.5"/>
        </svg>`,
      toy_drone: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="60" r="16" fill="#21193d" stroke="#a855f7" stroke-width="2"/>
          <circle cx="60" cy="60" r="6" fill="#38bdf8"/>
          <line x1="42" y1="42" x2="78" y2="78" stroke="#c084fc" stroke-width="2"/>
          <line x1="78" y1="42" x2="42" y2="78" stroke="#c084fc" stroke-width="2"/>
          <circle cx="38" cy="38" r="8" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="82" cy="38" r="8" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="38" cy="82" r="8" fill="none" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="82" cy="82" r="8" fill="none" stroke="#38bdf8" stroke-width="2"/>
        </svg>`,
      acc_keyboard: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#c084fc" stroke-width="2"/>
          <rect x="25" y="42" width="70" height="38" rx="6" fill="#1b1633" stroke="#a855f7" stroke-width="2"/>
          <rect x="32" y="48" width="8" height="6" rx="1" fill="#38bdf8"/>
          <rect x="44" y="48" width="8" height="6" rx="1" fill="#c084fc"/>
          <rect x="56" y="48" width="8" height="6" rx="1" fill="#a855f7"/>
          <rect x="68" y="48" width="8" height="6" rx="1" fill="#38bdf8"/>
          <rect x="80" y="48" width="8" height="6" rx="1" fill="#c084fc"/>
          <rect x="42" y="66" width="36" height="7" rx="2" fill="#a855f7"/>
        </svg>`,
      acc_headset: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#38bdf8" stroke-width="2"/>
          <path d="M35 62 A25 25 0 0 1 85 62" stroke="#a855f7" stroke-width="4" fill="none"/>
          <rect x="26" y="58" width="16" height="26" rx="8" fill="#c084fc"/>
          <rect x="78" y="58" width="16" height="26" rx="8" fill="#38bdf8"/>
          <path d="M40 78 A18 18 0 0 0 60 88" stroke="#38bdf8" stroke-width="2" fill="none"/>
          <circle cx="62" cy="88" r="3" fill="#ffffff"/>
        </svg>`,
      apparel_hoodie: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#a855f7" stroke-width="2"/>
          <path d="M40 38 L60 48 L80 38 L94 56 L82 66 L82 92 L38 92 L38 66 L26 56 Z" fill="#201a3b" stroke="#a855f7" stroke-width="2"/>
          <polygon points="52,50 68,50 60,75" fill="#c084fc" opacity="0.6"/>
          <text x="60" y="86" fill="#38bdf8" font-size="8" text-anchor="middle" font-weight="bold">GT</text>
        </svg>`,
      apparel_tshirt: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#c084fc" stroke-width="2"/>
          <path d="M40 36 L60 44 L80 36 L92 50 L82 60 L80 88 L40 88 L38 60 L28 50 Z" fill="#1c1635" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="62" r="12" fill="#a855f7" opacity="0.3"/>
          <text x="60" y="65" fill="#ffffff" font-size="7" text-anchor="middle" font-weight="bold">EVOLUIR</text>
        </svg>`,
      tech_token: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#38bdf8" stroke-width="2"/>
          <rect x="42" y="32" width="36" height="56" rx="6" fill="#1a1533" stroke="#a855f7" stroke-width="2"/>
          <circle cx="60" cy="50" r="10" stroke="#38bdf8" stroke-width="2" fill="none"/>
          <circle cx="60" cy="50" r="4" fill="#06b6d4"/>
          <line x1="50" y1="72" x2="70" y2="72" stroke="#c084fc" stroke-width="2"/>
          <line x1="54" y1="77" x2="66" y2="77" stroke="#38bdf8" stroke-width="2"/>
        </svg>`,
      tech_light: `
        <svg viewBox="0 0 120 120" class="prod-svg">
          <rect x="15" y="15" width="90" height="90" rx="20" fill="#131027" stroke="#c084fc" stroke-width="2"/>
          <rect x="52" y="30" width="16" height="52" rx="8" fill="#a855f7" filter="drop-shadow(0 0 8px #a855f7)"/>
          <rect x="44" y="82" width="32" height="10" rx="4" fill="#2d244c" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="60" cy="42" r="4" fill="#ffffff"/>
        </svg>`
    };

    return svgs[imageType] || svgs.game_cyber;
  }

  // --- Modal Genérico ---
  static openModal(contentHtml, modalId = 'generic-modal') {
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'gt-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="gt-modal-container animate-scale-up">
        ${contentHtml}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Fecha ao clicar fora
    modal.onclick = (e) => {
      if (e.target === modal) {
        Components.closeModal(modalId);
      }
    };

    if (window.gameTechAudio) window.gameTechAudio.playClick();
  }

  static closeModal(modalId = 'generic-modal') {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => modal.remove(), 250);
    }
  }

  // --- Modal de Autenticação (Login / Cadastro / Recuperação / Demo 1-Clique) ---
  static showAuthModal(initialTab = 'login') {
    const html = `
      <div class="auth-modal-header">
        <div class="auth-brand">
          <div class="brand-logo-small">GT</div>
          <div>
            <h3>GameTech Identity</h3>
            <p class="text-muted">"Jogar é evoluir!"</p>
          </div>
        </div>
        <button class="modal-close-btn" onclick="Components.closeModal('auth-modal')">✕</button>
      </div>

      <!-- Demonstração Rápida em 1 Clique -->
      <div class="demo-login-box">
        <div class="demo-title">⚡ Acesso Rápido de Demonstração (1 Clique):</div>
        <div class="demo-buttons-grid">
          <button class="btn-demo-quick demo-admin" onclick="Components.handleQuickLogin('admin@gametech.com', 'admin')">
            <span class="demo-icon">👩‍💻</span>
            <div>
              <strong>Administrador</strong>
              <small>Estefany (Acesso Total)</small>
            </div>
          </button>
          <button class="btn-demo-quick demo-parent" onclick="Components.handleQuickLogin('pais@gametech.com', 'pais')">
            <span class="demo-icon">👨‍👩‍👧‍👦</span>
            <div>
              <strong>Responsável</strong>
              <small>Carlos & Mariana (Pais)</small>
            </div>
          </button>
          <button class="btn-demo-quick demo-user" onclick="Components.handleQuickLogin('gamer@gametech.com', 'gamer')">
            <span class="demo-icon">🎮</span>
            <div>
              <strong>Usuário</strong>
              <small>Lucas Silva (Gamer)</small>
            </div>
          </button>
        </div>
      </div>

      <!-- Abas de Navegação -->
      <div class="auth-tabs">
        <button class="auth-tab-btn ${initialTab === 'login' ? 'active' : ''}" id="tab-btn-login" onclick="Components.switchAuthTab('login')">Entrar</button>
        <button class="auth-tab-btn ${initialTab === 'register' ? 'active' : ''}" id="tab-btn-register" onclick="Components.switchAuthTab('register')">Criar Conta</button>
      </div>

      <!-- Form de Login -->
      <div id="auth-panel-login" class="auth-panel ${initialTab === 'login' ? 'active' : ''}">
        <form id="form-login" onsubmit="event.preventDefault(); Components.submitLogin();">
          <div class="input-group">
            <label>E-mail Corporativo ou Gamer</label>
            <input type="email" id="login-email" placeholder="seuemail@exemplo.com" required value="admin@gametech.com" class="gt-input">
          </div>
          <div class="input-group">
            <div class="label-with-link">
              <label>Senha de Acesso</label>
              <a href="#" class="forgot-link" onclick="Components.showPasswordRecovery(); return false;">Esqueceu a senha?</a>
            </div>
            <input type="password" id="login-password" placeholder="••••••••" required value="admin" class="gt-input">
          </div>

          <button type="submit" class="btn-primary-neon btn-block mt-3">
            <span>Acessar Plataforma</span>
            <span class="btn-arrow">→</span>
          </button>
        </form>
      </div>

      <!-- Form de Cadastro -->
      <div id="auth-panel-register" class="auth-panel ${initialTab === 'register' ? 'active' : ''}">
        <form id="form-register" onsubmit="event.preventDefault(); Components.submitRegister();">
          <div class="input-group">
            <label>Nome Completo</label>
            <input type="text" id="reg-name" placeholder="Ex: Roberto da Silva" required class="gt-input">
          </div>
          <div class="input-group">
            <label>E-mail</label>
            <input type="email" id="reg-email" placeholder="nome@gametech.com" required class="gt-input">
          </div>
          <div class="grid-2-cols">
            <div class="input-group">
              <label>Senha</label>
              <input type="password" id="reg-password" placeholder="Mínimo 6 dígitos" required class="gt-input">
            </div>
            <div class="input-group">
              <label>Confirmar Senha</label>
              <input type="password" id="reg-confirm" placeholder="Repita a senha" required class="gt-input">
            </div>
          </div>
          <div class="input-group">
            <label>Tipo de Acesso Desejado</label>
            <select id="reg-role" class="gt-input">
              <option value="user">🎮 Usuário / Gamer (Loja, Jogos e Serviços)</option>
              <option value="parent">👨‍👩‍👧‍👦 Responsável (Controle Parental e Limites)</option>
              <option value="admin">👩‍💻 Administrador (Gestão Completa GameTech)</option>
            </select>
          </div>

          <button type="submit" class="btn-primary-neon btn-block mt-3">
            <span>Criar Minha Conta</span>
            <span class="btn-arrow">✓</span>
          </button>
        </form>
      </div>
    `;

    Components.openModal(html, 'auth-modal');
  }

  static switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));

    const tabBtn = document.getElementById(`tab-btn-${tab}`);
    const panel = document.getElementById(`auth-panel-${tab}`);

    if (tabBtn) tabBtn.classList.add('active');
    if (panel) panel.classList.add('active');
    if (window.gameTechAudio) window.gameTechAudio.playClick();
  }

  static handleQuickLogin(email, password) {
    // Login rápido de demonstração — vai direto para a API (MySQL) se disponível
    Components.submitLoginWithCredentials(email, password);
  }

  static async submitLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    await Components.submitLoginWithCredentials(email, password);
  }

  static async submitLoginWithCredentials(email, password) {
    try {
      const user = await window.gameTechState.loginUser(email, password);
      if (user) {
        Components.closeModal('auth-modal');
        const dbLabel = window.gameTechState.apiEnabled ? ' (MySQL ✅)' : '';
        Components.showToast(`Bem-vindo(a) de volta, ${user.name}!${dbLabel}`, 'success', 'Login Concluído');
        window.gameTechApp.renderApp();
      } else {
        Components.showToast('E-mail ou senha incorretos. Tente os botões de 1 clique acima!', 'error', 'Falha no Login');
      }
    } catch (err) {
      Components.showToast('Erro de conexão: ' + err.message, 'error', 'Erro');
    }
  }

  static async submitRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const role = document.getElementById('reg-role').value;

    if (password !== confirm) {
      Components.showToast('As senhas digitadas não coincidem!', 'warning', 'Atenção');
      return;
    }

    if (password.length < 4) {
      Components.showToast('A senha deve conter ao menos 4 caracteres.', 'warning', 'Senha Curta');
      return;
    }

    try {
      const result = await window.gameTechState.registerUser({ name, email, password, role });

      if (result && result.error) {
        Components.showToast(result.error, 'error', 'Erro no Cadastro');
        return;
      }

      Components.closeModal('auth-modal');
      const dbLabel = window.gameTechState.apiEnabled ? ' (Salvo no MySQL ✅)' : '';
      Components.showToast(`Conta de ${result.name} criada com sucesso!${dbLabel}`, 'success', 'Bem-vindo à GameTech');
      window.gameTechApp.renderApp();
    } catch (err) {
      Components.showToast('Erro ao cadastrar: ' + err.message, 'error', 'Erro');
    }
  }

  // --- Recuperação de Senha ---
  static showPasswordRecovery() {
    const html = `
      <div class="auth-modal-header">
        <h3>Recuperação de Acesso</h3>
        <button class="modal-close-btn" onclick="Components.closeModal('recovery-modal')">✕</button>
      </div>
      <p class="text-muted mb-3">Digite seu e-mail cadastrado. Um link de redefinição e token criptografado serão enviados.</p>
      <form onsubmit="event.preventDefault(); Components.submitPasswordRecovery();">
        <div class="input-group">
          <label>E-mail de Cadastro</label>
          <input type="email" id="recovery-email" placeholder="seuemail@gametech.com" required class="gt-input" value="admin@gametech.com">
        </div>
        <button type="submit" class="btn-primary-neon btn-block mt-3">
          Enviar Instruções de Recuperação
        </button>
        <button type="button" class="btn-text btn-block mt-2" onclick="Components.closeModal('recovery-modal'); Components.showAuthModal('login');">
          ← Voltar para o Login
        </button>
      </form>
    `;
    Components.openModal(html, 'recovery-modal');
  }

  static submitPasswordRecovery() {
    const email = document.getElementById('recovery-email').value.trim();
    Components.closeModal('recovery-modal');
    Components.showToast(`Instruções de redefinição enviadas para ${email} (Simulação).`, 'success', 'E-mail Enviado');
  }

  // --- Modal de Detalhes do Produto ---
  static showProductDetails(productId) {
    const product = window.gameTechState.getProducts().find(p => p.id === productId);
    if (!product) return;

    const html = `
      <div class="product-detail-modal">
        <button class="modal-close-btn" onclick="Components.closeModal('product-modal')">✕</button>
        <div class="prod-detail-grid">
          <div class="prod-detail-visual">
            <div class="prod-modal-svg">
              ${Components.getProductSvgIcon(product.imageType)}
            </div>
            <div class="badge-tag neon-badge mt-2">${product.badge || 'GameTech'}</div>
          </div>
          <div class="prod-detail-info">
            <span class="category-pill">${product.categoryLabel}</span>
            <h2 class="prod-detail-title">${product.name}</h2>
            <div class="rating-row">
              <span class="stars">⭐⭐⭐⭐⭐</span>
              <span class="score">${product.rating}</span>
              <span class="reviews">(${product.reviews} avaliações)</span>
            </div>
            <p class="prod-detail-desc">${product.description}</p>
            
            <div class="prod-specs-box">
              <h4>Especificações & Recursos:</h4>
              <ul>
                ${(product.specs || []).map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <div class="prod-buy-footer">
              <div class="price-box">
                <span class="label">Preço à vista:</span>
                <span class="price-highlight">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <span class="parcelamento">ou até 12x de R$ ${(product.price / 12 * 1.05).toFixed(2).replace('.', ',')}</span>
              </div>
              <button class="btn-primary-neon btn-lg" onclick="window.gameTechApp.addToCart('${product.id}'); Components.closeModal('product-modal');">
                🛒 Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    Components.openModal(html, 'product-modal');
  }

  // --- Drawer / Modal de Carrinho de Compras ---
  static showCartDrawer() {
    const cart = window.gameTechState.getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal > 100 ? subtotal * 0.1 : 0; // Desconto simulado de 10%
    const total = subtotal - discount;

    const html = `
      <div class="cart-modal-container">
        <div class="cart-header">
          <div class="cart-title">
            <span>🛒 Carrinho de Compras</span>
            <span class="cart-count">(${cart.reduce((c, i) => c + i.quantity, 0)} itens)</span>
          </div>
          <button class="modal-close-btn" onclick="Components.closeModal('cart-modal')">✕</button>
        </div>

        <div class="cart-items-list">
          ${cart.length === 0 ? `
            <div class="cart-empty-state">
              <div class="empty-icon">🎮</div>
              <h3>Seu carrinho está vazio</h3>
              <p class="text-muted">Explore nossos jogos, óculos VR e produtos inovadores!</p>
              <button class="btn-primary-neon mt-3" onclick="Components.closeModal('cart-modal'); window.gameTechApp.navigate('produtos');">
                Ver Catálogo de Produtos
              </button>
            </div>
          ` : cart.map(item => `
            <div class="cart-item-row">
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-cat">${item.categoryLabel}</div>
                <div class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')} un.</div>
              </div>
              <div class="item-controls">
                <div class="qty-stepper">
                  <button onclick="window.gameTechApp.changeCartQty('${item.productId}', ${item.quantity - 1})">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="window.gameTechApp.changeCartQty('${item.productId}', ${item.quantity + 1})">+</button>
                </div>
                <div class="item-subtotal">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                <button class="btn-remove-item" onclick="window.gameTechApp.removeCartItem('${item.productId}')">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${cart.length > 0 ? `
          <div class="cart-summary-box">
            <div class="coupon-box">
              <input type="text" placeholder="Cupom: GAMETECH10" id="coupon-input" class="gt-input">
              <button class="btn-secondary" onclick="Components.applyCoupon()">Aplicar</button>
            </div>
            
            <div class="summary-line">
              <span>Subtotal:</span>
              <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            ${discount > 0 ? `
              <div class="summary-line text-green">
                <span>Desconto Especial (10%):</span>
                <span>- R$ ${discount.toFixed(2).replace('.', ',')}</span>
              </div>
            ` : ''}
            <div class="summary-line">
              <span>Frete Tecnológico:</span>
              <span class="text-green">GRÁTIS (Brasil)</span>
            </div>
            <div class="summary-line total-line">
              <span>Total do Pedido:</span>
              <span class="total-val">R$ ${total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button class="btn-primary-neon btn-block btn-lg mt-3" onclick="Components.closeModal('cart-modal'); Components.showCheckoutModal(${total});">
              Finalizar Pedido →
            </button>
          </div>
        ` : ''}
      </div>
    `;

    Components.openModal(html, 'cart-modal');
  }

  static applyCoupon() {
    const input = document.getElementById('coupon-input');
    if (input && (input.value.toUpperCase() === 'GAMETECH10' || input.value.toUpperCase() === 'ESTEFANY')) {
      Components.showToast('Cupom aplicado com sucesso! 10% de desconto ativado.', 'success', 'Cupom Válido');
    } else {
      Components.showToast('Cupom inválido. Experimente o cupom GAMETECH10.', 'warning', 'Cupom');
    }
  }

  // --- Modal de Checkout / Pagamento ---
  static showCheckoutModal(totalAmount) {
    const user = window.gameTechState.getCurrentUser() || { name: 'Cliente GameTech', email: 'cliente@gametech.com' };

    const html = `
      <div class="checkout-modal-container">
        <div class="checkout-header">
          <h3>Finalização Segura de Pedido</h3>
          <button class="modal-close-btn" onclick="Components.closeModal('checkout-modal')">✕</button>
        </div>

        <div class="checkout-steps">
          <!-- Dados de Entrega -->
          <div class="checkout-section">
            <h4 class="sec-title">📍 Endereço de Entrega & Contato</h4>
            <div class="grid-2-cols">
              <div class="input-group">
                <label>Nome do Destinatário</label>
                <input type="text" id="chk-name" value="${user.name}" class="gt-input" required>
              </div>
              <div class="input-group">
                <label>E-mail de Notificação</label>
                <input type="email" id="chk-email" value="${user.email}" class="gt-input" required>
              </div>
            </div>
            <div class="grid-3-cols mt-2">
              <div class="input-group">
                <label>CEP</label>
                <input type="text" id="chk-cep" value="01310-100" class="gt-input" placeholder="00000-000">
              </div>
              <div class="input-group" style="grid-column: span 2;">
                <label>Endereço Completo</label>
                <input type="text" id="chk-addr" value="Av. Paulista, 1000 - Apto 42" class="gt-input">
              </div>
            </div>
          </div>

          <!-- Forma de Pagamento -->
          <div class="checkout-section mt-3">
            <h4 class="sec-title">💳 Escolha a Forma de Pagamento</h4>
            <div class="payment-tabs">
              <button class="pay-tab active" id="pay-pix-btn" onclick="Components.switchPayment('pix')">⚡ PIX Instantâneo</button>
              <button class="pay-tab" id="pay-card-btn" onclick="Components.switchPayment('card')">💳 Cartão de Crédito</button>
              <button class="pay-tab" id="pay-boleto-btn" onclick="Components.switchPayment('boleto')">📄 Boleto Bancário</button>
            </div>

            <!-- Painel PIX -->
            <div id="pay-panel-pix" class="pay-panel active">
              <div class="pix-box">
                <div class="pix-qr">
                  <!-- QR Code em SVG Neon -->
                  <svg viewBox="0 0 140 140" width="130" height="130">
                    <rect width="140" height="140" fill="#131026" rx="8" stroke="#a855f7" stroke-width="2"/>
                    <rect x="15" y="15" width="30" height="30" fill="#38bdf8"/>
                    <rect x="20" y="20" width="20" height="20" fill="#131026"/>
                    <rect x="25" y="25" width="10" height="10" fill="#a855f7"/>

                    <rect x="95" y="15" width="30" height="30" fill="#38bdf8"/>
                    <rect x="100" y="20" width="20" height="20" fill="#131026"/>
                    <rect x="105" y="25" width="10" height="10" fill="#a855f7"/>

                    <rect x="15" y="95" width="30" height="30" fill="#38bdf8"/>
                    <rect x="20" y="100" width="20" height="20" fill="#131026"/>
                    <rect x="25" y="105" width="10" height="10" fill="#a855f7"/>

                    <rect x="55" y="20" width="8" height="25" fill="#c084fc"/>
                    <rect x="70" y="30" width="12" height="10" fill="#38bdf8"/>
                    <rect x="60" y="60" width="20" height="20" fill="#a855f7"/>
                    <rect x="90" y="65" width="25" height="8" fill="#c084fc"/>
                    <rect x="25" y="60" width="15" height="15" fill="#38bdf8"/>
                    <rect x="65" y="95" width="20" height="15" fill="#38bdf8"/>
                    <rect x="95" y="95" width="25" height="25" fill="#a855f7"/>
                  </svg>
                </div>
                <div class="pix-info">
                  <div class="pix-badge">Aprovação Imediata + 5% Cashback</div>
                  <p class="pix-desc">Escaneie o QR Code no app do seu banco ou use a chave abaixo:</p>
                  <div class="copy-input-row">
                    <input type="text" readonly value="00020126580014BR.GOV.BCB.PIX0136gametech-pagamentos-estefany@gametech.com5204000053039865802BR" class="gt-input">
                    <button class="btn-copy" onclick="Components.copyPixCode()">Copiar Código</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Painel Cartão -->
            <div id="pay-panel-card" class="pay-panel">
              <div class="grid-2-cols">
                <div class="input-group">
                  <label>Número do Cartão</label>
                  <input type="text" placeholder="4532 •••• •••• 8892" class="gt-input" value="4532 8900 1234 8892">
                </div>
                <div class="input-group">
                  <label>Nome Impresso</label>
                  <input type="text" placeholder="NOME COMPLETO" class="gt-input" value="${user.name.toUpperCase()}">
                </div>
              </div>
              <div class="grid-3-cols mt-2">
                <div class="input-group">
                  <label>Validade</label>
                  <input type="text" placeholder="MM/AA" class="gt-input" value="12/29">
                </div>
                <div class="input-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" class="gt-input" value="882">
                </div>
                <div class="input-group">
                  <label>Parcelas</label>
                  <select class="gt-input">
                    <option>1x de R$ ${totalAmount.toFixed(2)} sem juros</option>
                    <option>3x de R$ ${(totalAmount/3).toFixed(2)} sem juros</option>
                    <option>6x de R$ ${(totalAmount/6).toFixed(2)} sem juros</option>
                    <option>12x de R$ ${(totalAmount/12*1.04).toFixed(2)}</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Painel Boleto -->
            <div id="pay-panel-boleto" class="pay-panel">
              <div class="boleto-box">
                <div class="boleto-icon">📄</div>
                <div>
                  <h4>Boleto Bancário Digital GameTech</h4>
                  <p class="text-muted">Vencimento em 3 dias úteis. Compensação em até 24 horas.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Total e Confirmação -->
          <div class="checkout-footer mt-4">
            <div class="total-display">
              <span>Total a Pagar:</span>
              <span class="total-number">R$ ${totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="btn-primary-neon btn-lg" onclick="Components.confirmCheckout(${totalAmount})">
              🔒 Confirmar e Pagar Agora
            </button>
          </div>
        </div>
      </div>
    `;

    Components.openModal(html, 'checkout-modal');
  }

  static switchPayment(method) {
    document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));

    const btn = document.getElementById(`pay-${method}-btn`);
    const panel = document.getElementById(`pay-panel-${method}`);
    if (btn) btn.classList.add('active');
    if (panel) panel.classList.add('active');
    if (window.gameTechAudio) window.gameTechAudio.playClick();
  }

  static copyPixCode() {
    Components.showToast('Código PIX copiado para a área de transferência!', 'success', 'Copiado');
  }

  static confirmCheckout(totalAmount) {
    const cart = window.gameTechState.getCart();
    const user = window.gameTechState.getCurrentUser() || { name: 'Cliente', email: 'cliente@gametech.com' };

    const order = window.gameTechState.addOrder({
      customerName: user.name,
      customerEmail: user.email,
      items: cart,
      total: totalAmount,
      paymentMethod: 'PIX Instantâneo'
    });

    Components.closeModal('checkout-modal');

    // Modal de Sucesso
    const successHtml = `
      <div class="success-order-box text-center">
        <div class="success-glow-icon">🎉</div>
        <h2>Pedido Realizado com Sucesso!</h2>
        <p class="order-id-badge">Protocolo: <strong>#${order.id}</strong></p>
        <p class="text-muted mt-2">
          Obrigado por apoiar a <strong>GameTech</strong>! Seu pedido foi registrado e os detalhes foram enviados para <em>${user.email}</em>.
        </p>

        <div class="success-summary-card mt-3">
          <div class="summary-line">
            <span>Status:</span>
            <span class="badge-tag">Confirmado & Em Separação</span>
          </div>
          <div class="summary-line">
            <span>Valor Total:</span>
            <span class="text-highlight">R$ ${totalAmount.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="summary-line">
            <span>Data:</span>
            <span>${order.date}</span>
          </div>
        </div>

        <button class="btn-primary-neon mt-4" onclick="Components.closeModal('success-order-modal'); window.gameTechApp.renderApp();">
          Voltar à Loja
        </button>
      </div>
    `;

    Components.openModal(successHtml, 'success-order-modal');
    if (window.gameTechAudio) window.gameTechAudio.playSuccess();
  }

  // --- Modal de Solicitação de Orçamento de Serviço ---
  static showServiceQuoteModal(serviceTitle = '') {
    const user = window.gameTechState.getCurrentUser() || { name: '', email: '' };

    const html = `
      <div class="quote-modal-container">
        <div class="quote-header">
          <h3>⚡ Solicitar Orçamento de Projeto</h3>
          <p class="text-muted">Transforme sua ideia em realidade com os especialistas da GameTech.</p>
          <button class="modal-close-btn" onclick="Components.closeModal('quote-modal')">✕</button>
        </div>

        <form onsubmit="event.preventDefault(); Components.submitServiceQuote();">
          <div class="input-group">
            <label>Tipo de Serviço</label>
            <select id="quote-service" class="gt-input">
              <option ${serviceTitle.includes('Jogos') ? 'selected' : ''}>Desenvolvimento de Jogos Digitais (2D/3D/VR)</option>
              <option ${serviceTitle.includes('Aplicativos') ? 'selected' : ''}>Criação de Aplicativos Mobile (iOS e Android)</option>
              <option ${serviceTitle.includes('Sites') ? 'selected' : ''}>Desenvolvimento de Sites & Portais WebGL</option>
              <option ${serviceTitle.includes('Sistemas') ? 'selected' : ''}>Sistemas Personalizados & Automações</option>
              <option ${serviceTitle.includes('Segurança') ? 'selected' : ''}>Soluções de Segurança Digital & Pentests</option>
              <option ${serviceTitle.includes('Realidade') ? 'selected' : ''}>Projetos com Realidade Virtual (VR/AR)</option>
              <option ${serviceTitle.includes('Produtos') ? 'selected' : ''}>Desenvolvimento de Produtos Tecnológicos / IoT</option>
            </select>
          </div>

          <div class="grid-2-cols">
            <div class="input-group">
              <label>Nome / Empresa</label>
              <input type="text" id="quote-name" value="${user.name}" placeholder="Seu nome ou empresa" required class="gt-input">
            </div>
            <div class="input-group">
              <label>E-mail de Contato</label>
              <input type="email" id="quote-email" value="${user.email}" placeholder="contato@empresa.com" required class="gt-input">
            </div>
          </div>

          <div class="grid-2-cols">
            <div class="input-group">
              <label>Porte do Projeto</label>
              <select id="quote-scope" class="gt-input" onchange="Components.recalculateQuoteEstimate()">
                <option value="500">Pequeno Porte / Protótipo (Est. R$ 500 - R$ 2.000)</option>
                <option value="3500">Médio Porte / MVP Completo (Est. R$ 3.500 - R$ 8.000)</option>
                <option value="12000">Grande Porte / Enterprise (Sob Consulta)</option>
              </select>
            </div>
            <div class="input-group">
              <label>Prazo Estimado Desejado</label>
              <select id="quote-deadline" class="gt-input">
                <option>Urgente (15 a 30 dias)</option>
                <option selected>Padrão (1 a 3 meses)</option>
                <option>Flexível (Mais de 3 meses)</option>
              </select>
            </div>
          </div>

          <div class="input-group">
            <label>Descrição do Projeto & Objetivos</label>
            <textarea id="quote-desc" rows="3" class="gt-input" placeholder="Descreva brevemente sua ideia, funcionalidades desejadas e público-alvo..."></textarea>
          </div>

          <div class="quote-estimate-preview">
            <span>Investimento Estimado Base:</span>
            <strong id="quote-estimate-value" class="text-highlight">A partir de R$ 500,00</strong>
          </div>

          <button type="submit" class="btn-primary-neon btn-block btn-lg mt-3">
            🚀 Enviar Solicitação para Estefany da Cunha & Time
          </button>
        </form>
      </div>
    `;

    Components.openModal(html, 'quote-modal');
  }

  static recalculateQuoteEstimate() {
    const scope = document.getElementById('quote-scope');
    const valDisplay = document.getElementById('quote-estimate-value');
    if (scope && valDisplay) {
      const val = parseInt(scope.value);
      valDisplay.innerText = `A partir de R$ ${val.toLocaleString('pt-BR')},00`;
    }
  }

  static async submitServiceQuote() {
    const service = document.getElementById('quote-service').value;
    const name = document.getElementById('quote-name').value;
    const email = document.getElementById('quote-email').value;
    const desc = document.getElementById('quote-desc').value;

    const quote = await window.gameTechState.addServiceQuote({
      service,
      name,
      email,
      desc
    });

    Components.closeModal('quote-modal');
    Components.showToast(`Orçamento #${quote.id} enviado com sucesso! Nossa equipe entrará em contato.`, 'success', 'Solicitação Registrada');
  }

  // --- Modal de Cadastrar / Editar Filho (Área dos Pais) ---
  static showChildModal(childId = null) {
    const child = childId ? window.gameTechState.getChildren().find(c => c.id === childId) : null;

    const html = `
      <div class="child-modal-container">
        <div class="child-modal-header">
          <h3>${child ? 'Editar Perfil do Filho' : 'Cadastrar Novo Filho'}</h3>
          <button class="modal-close-btn" onclick="Components.closeModal('child-modal')">✕</button>
        </div>

        <form onsubmit="event.preventDefault(); Components.submitChildForm('${childId || ''}');">
          <div class="grid-2-cols">
            <div class="input-group">
              <label>Nome do Filho(a)</label>
              <input type="text" id="ch-name" value="${child ? child.name : ''}" placeholder="Ex: Gabriel" required class="gt-input">
            </div>
            <div class="input-group">
              <label>Idade</label>
              <input type="number" id="ch-age" value="${child ? child.age : '10'}" min="3" max="18" required class="gt-input">
            </div>
          </div>

          <div class="grid-2-cols">
            <div class="input-group">
              <label>Avatar</label>
              <select id="ch-avatar" class="gt-input">
                <option value="👦" ${child && child.avatar === '👦' ? 'selected' : ''}>👦 Menino</option>
                <option value="👧" ${child && child.avatar === '👧' ? 'selected' : ''}>👧 Menina</option>
                <option value="🧒" ${child && child.avatar === '🧒' ? 'selected' : ''}>🧒 Criança</option>
                <option value="🎮" ${child && child.avatar === '🎮' ? 'selected' : ''}>🎮 Gamer</option>
              </select>
            </div>
            <div class="input-group">
              <label>Dispositivo Principal</label>
              <input type="text" id="ch-device" value="${child ? child.device : 'PC Gamer GameTech'}" class="gt-input">
            </div>
          </div>

          <div class="input-group">
            <label>Limite Diário de Tela (Minutos): <strong id="limit-val-disp">${child ? child.dailyLimitMinutes : 180} min (${Math.floor((child ? child.dailyLimitMinutes : 180)/60)}h)</strong></label>
            <input type="range" id="ch-limit" min="30" max="360" step="15" value="${child ? child.dailyLimitMinutes : 180}" class="gt-slider" oninput="document.getElementById('limit-val-disp').innerText = this.value + ' min (' + Math.floor(this.value/60) + 'h ' + (this.value%60) + 'm)'">
          </div>

          <div class="grid-2-cols">
            <div class="input-group">
              <label>Início Horário de Estudos</label>
              <input type="time" id="ch-study-start" value="${child ? child.studyHoursStart : '14:00'}" class="gt-input">
            </div>
            <div class="input-group">
              <label>Término Horário de Estudos</label>
              <input type="time" id="ch-study-end" value="${child ? child.studyHoursEnd : '17:30'}" class="gt-input">
            </div>
          </div>

          <div class="input-group">
            <label>Horário de Dormir (Bloqueio Automático)</label>
            <input type="time" id="ch-bedtime" value="${child ? child.bedtime : '21:30'}" class="gt-input">
          </div>

          <button type="submit" class="btn-primary-neon btn-block mt-3">
            Salvar Configurações de Proteção
          </button>
        </form>
      </div>
    `;

    Components.openModal(html, 'child-modal');
  }

  static submitChildForm(childId) {
    const name = document.getElementById('ch-name').value;
    const age = document.getElementById('ch-age').value;
    const avatar = document.getElementById('ch-avatar').value;
    const device = document.getElementById('ch-device').value;
    const dailyLimitMinutes = document.getElementById('ch-limit').value;
    const studyHoursStart = document.getElementById('ch-study-start').value;
    const studyHoursEnd = document.getElementById('ch-study-end').value;
    const bedtime = document.getElementById('ch-bedtime').value;

    if (childId) {
      window.gameTechState.updateChildLimit(childId, dailyLimitMinutes);
      Components.showToast(`Perfil de ${name} atualizado com sucesso!`, 'success', 'Controle Parental');
    } else {
      window.gameTechState.addChild({
        name,
        age,
        avatar,
        device,
        dailyLimitMinutes,
        studyHoursStart,
        studyHoursEnd,
        bedtime
      });
      Components.showToast(`Filho(a) ${name} vinculado com sucesso!`, 'success', 'Novo Perfil');
    }

    Components.closeModal('child-modal');
    window.gameTechApp.renderApp();
  }

  // --- Modal de Cadastrar / Editar Produto (Painel Admin) ---
  static showProductFormModal(productId = null) {
    const product = productId ? window.gameTechState.getProducts().find(p => p.id === productId) : null;

    const html = `
      <div class="admin-prod-modal">
        <div class="admin-prod-header">
          <h3>${product ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
          <button class="modal-close-btn" onclick="Components.closeModal('admin-prod-modal')">✕</button>
        </div>

        <form onsubmit="event.preventDefault(); Components.submitProductForm('${productId || ''}');">
          <div class="grid-2-cols">
            <div class="input-group">
              <label>Nome do Produto</label>
              <input type="text" id="adm-p-name" value="${product ? product.name : ''}" required class="gt-input" placeholder="Ex: GameTech VR Pro">
            </div>
            <div class="input-group">
              <label>Categoria</label>
              <select id="adm-p-cat" class="gt-input">
                <option value="jogos" ${product && product.category === 'jogos' ? 'selected' : ''}>Jogos Digitais</option>
                <option value="vr" ${product && product.category === 'vr' ? 'selected' : ''}>Óculos de Realidade Virtual</option>
                <option value="brinquedos" ${product && product.category === 'brinquedos' ? 'selected' : ''}>Brinquedos Tecnológicos</option>
                <option value="acessorios" ${product && product.category === 'acessorios' ? 'selected' : ''}>Acessórios para Gamers</option>
                <option value="roupas" ${product && product.category === 'roupas' ? 'selected' : ''}>Roupas Personalizadas</option>
                <option value="tecnologicos" ${product && product.category === 'tecnologicos' ? 'selected' : ''}>Produtos Tecnológicos</option>
              </select>
            </div>
          </div>

          <div class="grid-3-cols">
            <div class="input-group">
              <label>Preço (R$)</label>
              <input type="number" step="0.01" id="adm-p-price" value="${product ? product.price : '40.00'}" required class="gt-input">
            </div>
            <div class="input-group">
              <label>Estoque</label>
              <input type="number" id="adm-p-stock" value="${product ? product.stock : '50'}" required class="gt-input">
            </div>
            <div class="input-group">
              <label>Badge de Destaque</label>
              <input type="text" id="adm-p-badge" value="${product ? product.badge : 'Novo'}" class="gt-input" placeholder="Ex: Lançamento">
            </div>
          </div>

          <div class="input-group">
            <label>Descrição Detalhada</label>
            <textarea id="adm-p-desc" rows="3" required class="gt-input">${product ? product.description : ''}</textarea>
          </div>

          <div class="input-group">
            <label>Ícone Visual Tecnológico</label>
            <select id="adm-p-img" class="gt-input">
              <option value="game_cyber">🎮 Jogo Cyber / RPG</option>
              <option value="game_blade">⚔️ Jogo Ação / Blade</option>
              <option value="game_kids">🧩 Jogo Educativo / Lógica</option>
              <option value="vr_headset">🥽 Óculos VR Ultra</option>
              <option value="vr_holo">👓 Óculos HoloLens</option>
              <option value="toy_robot">🤖 Robô Inteligente</option>
              <option value="toy_drone">🛸 Drone Gamer</option>
              <option value="acc_keyboard">⌨️ Teclado Mecânico</option>
              <option value="acc_headset">🎧 Headset Imersivo</option>
              <option value="apparel_hoodie">🧥 Moletom Gamer</option>
              <option value="apparel_tshirt">👕 Camiseta GameTech</option>
              <option value="tech_token">🛡️ Token de Segurança</option>
              <option value="tech_light">💡 Lâmpada Smart Sync</option>
            </select>
          </div>

          <button type="submit" class="btn-primary-neon btn-block mt-3">
            ${product ? 'Atualizar Produto' : 'Cadastrar Produto no Catálogo'}
          </button>
        </form>
      </div>
    `;

    Components.openModal(html, 'admin-prod-modal');
  }

  static submitProductForm(productId) {
    const name = document.getElementById('adm-p-name').value;
    const category = document.getElementById('adm-p-cat').value;
    const catLabels = {
      jogos: 'Jogos Digitais',
      vr: 'Óculos de Realidade Virtual',
      brinquedos: 'Brinquedos Tecnológicos',
      acessorios: 'Acessórios para Gamers',
      roupas: 'Roupas Personalizadas',
      tecnologicos: 'Produtos Tecnológicos'
    };
    const price = parseFloat(document.getElementById('adm-p-price').value) || 0;
    const stock = parseInt(document.getElementById('adm-p-stock').value) || 0;
    const badge = document.getElementById('adm-p-badge').value;
    const description = document.getElementById('adm-p-desc').value;
    const imageType = document.getElementById('adm-p-img').value;

    if (productId) {
      window.gameTechState.updateProduct(productId, {
        name,
        category,
        categoryLabel: catLabels[category],
        price,
        stock,
        badge,
        description,
        imageType
      });
      Components.showToast(`Produto "${name}" atualizado!`, 'success', 'Admin');
    } else {
      window.gameTechState.addProduct({
        name,
        category,
        categoryLabel: catLabels[category],
        price,
        stock,
        badge,
        description,
        imageType,
        specs: ['Qualidade Premium GameTech', 'Garantia Oficial de 12 meses', 'Suporte Técnico Especializado']
      });
      Components.showToast(`Produto "${name}" adicionado à loja!`, 'success', 'Admin');
    }

    Components.closeModal('admin-prod-modal');
    window.gameTechApp.renderApp();
  }
}

window.Components = Components;

