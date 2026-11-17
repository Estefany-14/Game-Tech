/**
 * GAMETECH - ROTAS DA API REST (Backend Node.js + MySQL)
 * Fundadora: Estefany da Cunha | "Jogar é evoluir!"
 *
 * Todas as rotas retornam JSON e usam o pool de conexões MySQL.
 */

const { query } = require('../database/connection');

// ============================================================
// Helpers
// ============================================================
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function generateId(prefix) {
  return prefix + '_' + Date.now() + Math.floor(Math.random() * 1000);
}

// ============================================================
// ROTEADOR PRINCIPAL DA API
// ============================================================
async function handleApiRequest(req, res) {
  const url = req.url.split('?')[0];
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  try {
    // ===========================
    // AUTH
    // ===========================
    if (url === '/api/auth/login' && method === 'POST') {
      const { email, password } = await parseBody(req);
      const rows = await query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
      if (rows.length === 0) {
        return sendJson(res, 401, { error: 'E-mail ou senha incorretos.' });
      }
      const user = rows[0];
      // Buscar configurações
      const settings = await query('SELECT * FROM user_settings WHERE user_id = ?', [user.id]);
      return sendJson(res, 200, { user, settings: settings[0] || {} });
    }

    if (url === '/api/auth/register' && method === 'POST') {
      const { name, email, password, role } = await parseBody(req);
      // Verifica duplicata
      const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return sendJson(res, 409, { error: 'Este e-mail já está cadastrado.' });
      }
      const id = generateId('usr');
      const roleLabel = role === 'admin' ? 'Administrador' : role === 'parent' ? 'Responsável' : 'Usuário Gamer';
      const avatar = role === 'admin' ? '👩‍💻' : role === 'parent' ? '👨‍👩‍👧‍👦' : '🎮';
      await query(
        'INSERT INTO users (id, name, email, password, role, role_label, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, name, email, password, role || 'user', roleLabel, avatar]
      );
      await query('INSERT INTO user_settings (user_id) VALUES (?)', [id]);
      const newUser = (await query('SELECT * FROM users WHERE id = ?', [id]))[0];
      return sendJson(res, 201, { user: newUser });
    }

    // ===========================
    // USERS
    // ===========================
    if (url === '/api/users' && method === 'GET') {
      const rows = await query('SELECT id, name, email, role, role_label, avatar, created_at FROM users ORDER BY created_at');
      return sendJson(res, 200, rows);
    }

    // PUT /api/users/:id/role
    const userRoleMatch = url.match(/^\/api\/users\/([^/]+)\/role$/);
    if (userRoleMatch && method === 'PUT') {
      const userId = userRoleMatch[1];
      const { role } = await parseBody(req);
      const roleLabel = role === 'admin' ? 'Administrador' : role === 'parent' ? 'Responsável' : 'Usuário Gamer';
      await query('UPDATE users SET role = ?, role_label = ? WHERE id = ?', [role, roleLabel, userId]);
      const updated = (await query('SELECT * FROM users WHERE id = ?', [userId]))[0];
      return sendJson(res, 200, updated);
    }

    // ===========================
    // PRODUCTS
    // ===========================
    if (url === '/api/products' && method === 'GET') {
      const rows = await query('SELECT * FROM products ORDER BY created_at DESC');
      // Parse specs JSON string to array
      rows.forEach(r => {
        if (typeof r.specs === 'string') {
          try { r.specs = JSON.parse(r.specs); } catch (_) { r.specs = []; }
        }
      });
      return sendJson(res, 200, rows);
    }

    if (url === '/api/products' && method === 'POST') {
      const body = await parseBody(req);
      const id = generateId('prod');
      const specs = JSON.stringify(body.specs || ['Qualidade Premium GameTech', 'Garantia Oficial de 12 meses', 'Suporte Técnico Especializado']);
      await query(
        `INSERT INTO products (id, name, category, category_label, price, rating, reviews, badge, description, specs, image_type, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, body.name, body.category, body.categoryLabel || body.category_label,
         body.price || 0, body.rating || 5.0, body.reviews || 1, body.badge || 'Novo',
         body.description || '', specs, body.imageType || body.image_type || 'game_cyber', body.stock || 10]
      );
      const created = (await query('SELECT * FROM products WHERE id = ?', [id]))[0];
      if (typeof created.specs === 'string') { try { created.specs = JSON.parse(created.specs); } catch (_) {} }
      return sendJson(res, 201, created);
    }

    // PUT /api/products/:id
    const prodUpdateMatch = url.match(/^\/api\/products\/([^/]+)$/);
    if (prodUpdateMatch && method === 'PUT') {
      const prodId = prodUpdateMatch[1];
      const body = await parseBody(req);
      const fields = [];
      const params = [];
      const mapping = {
        name: 'name', category: 'category', categoryLabel: 'category_label', category_label: 'category_label',
        price: 'price', stock: 'stock', badge: 'badge', description: 'description',
        imageType: 'image_type', image_type: 'image_type', rating: 'rating', reviews: 'reviews'
      };
      for (const [jsKey, dbCol] of Object.entries(mapping)) {
        if (body[jsKey] !== undefined) {
          fields.push(`${dbCol} = ?`);
          params.push(body[jsKey]);
        }
      }
      if (body.specs !== undefined) {
        fields.push('specs = ?');
        params.push(JSON.stringify(body.specs));
      }
      if (fields.length > 0) {
        params.push(prodId);
        await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params);
      }
      const updated = (await query('SELECT * FROM products WHERE id = ?', [prodId]))[0];
      if (updated && typeof updated.specs === 'string') { try { updated.specs = JSON.parse(updated.specs); } catch (_) {} }
      return sendJson(res, 200, updated || { error: 'Produto não encontrado.' });
    }

    // DELETE /api/products/:id
    if (prodUpdateMatch && method === 'DELETE') {
      const prodId = prodUpdateMatch[1];
      await query('DELETE FROM products WHERE id = ?', [prodId]);
      return sendJson(res, 200, { deleted: true, id: prodId });
    }

    // ===========================
    // CART
    // ===========================
    // GET /api/cart/:userId
    const cartGetMatch = url.match(/^\/api\/cart\/([^/]+)$/);
    if (cartGetMatch && method === 'GET') {
      const userId = cartGetMatch[1];
      const rows = await query(
        `SELECT ci.id, ci.product_id AS productId, ci.quantity,
                p.name, p.price, p.category, p.category_label AS categoryLabel
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.id
         WHERE ci.user_id = ?`, [userId]
      );
      return sendJson(res, 200, rows);
    }

    if (url === '/api/cart' && method === 'POST') {
      const { userId, productId, quantity } = await parseBody(req);
      const qty = quantity || 1;
      await query(
        `INSERT INTO cart_items (user_id, product_id, quantity)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
        [userId, productId, qty, qty]
      );
      return sendJson(res, 201, { success: true });
    }

    // PUT /api/cart/:itemId
    const cartUpdateMatch = url.match(/^\/api\/cart\/(\d+)$/);
    if (cartUpdateMatch && method === 'PUT') {
      const itemId = cartUpdateMatch[1];
      const { quantity } = await parseBody(req);
      if (quantity <= 0) {
        await query('DELETE FROM cart_items WHERE id = ?', [itemId]);
      } else {
        await query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);
      }
      return sendJson(res, 200, { success: true });
    }

    // DELETE /api/cart/item/:itemId
    const cartDeleteMatch = url.match(/^\/api\/cart\/item\/(\d+)$/);
    if (cartDeleteMatch && method === 'DELETE') {
      await query('DELETE FROM cart_items WHERE id = ?', [cartDeleteMatch[1]]);
      return sendJson(res, 200, { deleted: true });
    }

    // DELETE /api/cart/clear/:userId
    const cartClearMatch = url.match(/^\/api\/cart\/clear\/([^/]+)$/);
    if (cartClearMatch && method === 'DELETE') {
      await query('DELETE FROM cart_items WHERE user_id = ?', [cartClearMatch[1]]);
      return sendJson(res, 200, { cleared: true });
    }

    // ===========================
    // ORDERS
    // ===========================
    if (url === '/api/orders' && method === 'GET') {
      const orders = await query('SELECT * FROM orders ORDER BY created_at DESC');
      for (const order of orders) {
        order.items = await query(
          'SELECT product_name AS name, quantity AS qty, price FROM order_items WHERE order_id = ?',
          [order.id]
        );
        order.date = order.date || (order.created_at ? new Date(order.created_at).toLocaleDateString('pt-BR') : '');
      }
      return sendJson(res, 200, orders);
    }

    // GET /api/orders/user/:userId
    const ordersUserMatch = url.match(/^\/api\/orders\/user\/([^/]+)$/);
    if (ordersUserMatch && method === 'GET') {
      const userId = ordersUserMatch[1];
      const orders = await query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
      for (const order of orders) {
        order.items = await query(
          'SELECT product_name AS name, quantity AS qty, price FROM order_items WHERE order_id = ?',
          [order.id]
        );
        order.date = order.date || (order.created_at ? new Date(order.created_at).toLocaleDateString('pt-BR') : '');
      }
      return sendJson(res, 200, orders);
    }

    if (url === '/api/orders' && method === 'POST') {
      const body = await parseBody(req);
      const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      await query(
        `INSERT INTO orders (id, user_id, customer_name, customer_email, total, status, payment_method)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderId, body.userId || null, body.customerName, body.customerEmail,
         body.total || 0, 'Processando Pedido', body.paymentMethod || 'PIX Instantâneo']
      );
      // Inserir itens
      if (body.items && body.items.length > 0) {
        for (const item of body.items) {
          await query(
            'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)',
            [orderId, item.productId || null, item.name, item.quantity || item.qty || 1, item.price || 0]
          );
        }
      }
      // Limpa carrinho
      if (body.userId) {
        await query('DELETE FROM cart_items WHERE user_id = ?', [body.userId]);
      }
      return sendJson(res, 201, { id: orderId, date: new Date().toLocaleDateString('pt-BR'), status: 'Processando Pedido' });
    }

    // PUT /api/orders/:id/status
    const orderStatusMatch = url.match(/^\/api\/orders\/([^/]+)\/status$/);
    if (orderStatusMatch && method === 'PUT') {
      const { status } = await parseBody(req);
      await query('UPDATE orders SET status = ? WHERE id = ?', [status, orderStatusMatch[1]]);
      return sendJson(res, 200, { success: true });
    }

    // ===========================
    // CHILDREN (PARENTAL CONTROL)
    // ===========================
    // GET /api/children/:parentId
    const childrenGetMatch = url.match(/^\/api\/children\/([^/]+)$/);
    if (childrenGetMatch && method === 'GET') {
      const parentId = childrenGetMatch[1];
      const children = await query('SELECT * FROM children WHERE parent_id = ? ORDER BY name', [parentId]);
      for (const child of children) {
        child.appsHistory = await query('SELECT app_name AS name, category, minutes, blocked, icon FROM child_apps WHERE child_id = ?', [child.id]);
        child.weeklyUsage = await query('SELECT day_name AS day, minutes FROM child_weekly_usage WHERE child_id = ? ORDER BY FIELD(day_name, "Seg","Ter","Qua","Qui","Sex","Sáb","Dom")', [child.id]);
        // Converter tinyint → boolean
        child.study_lock_active = !!child.study_lock_active;
        child.emergency_lock_active = !!child.emergency_lock_active;
        child.studyLockActive = child.study_lock_active;
        child.emergencyLockActive = child.emergency_lock_active;
        child.todayMinutesUsed = child.today_minutes_used;
        child.dailyLimitMinutes = child.daily_limit_minutes;
        child.habitScore = child.habit_score;
        child.currentApp = child.current_app;
        child.studyHoursStart = child.study_hours_start ? child.study_hours_start.substring(0,5) : '14:00';
        child.studyHoursEnd = child.study_hours_end ? child.study_hours_end.substring(0,5) : '17:30';
      }
      return sendJson(res, 200, children);
    }

    if (url === '/api/children' && method === 'POST') {
      const body = await parseBody(req);
      const id = generateId('child');
      await query(
        `INSERT INTO children (id, parent_id, name, age, avatar, daily_limit_minutes, device, study_hours_start, study_hours_end, bedtime)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, body.parentId, body.name, body.age || 10, body.avatar || '🧒',
         body.dailyLimitMinutes || 180, body.device || 'Dispositivo GameTech',
         body.studyHoursStart || '14:00', body.studyHoursEnd || '17:30', body.bedtime || '21:30']
      );
      // Apps padrão
      await query(
        `INSERT INTO child_apps (child_id, app_name, category, minutes, blocked, icon) VALUES
         (?, 'PixelQuest: Lógica', 'Educativo', 0, 0, '🧩'),
         (?, 'CyberOdyssey 2077', 'Jogo Digital', 0, 0, '🎮')`,
        [id, id]
      );
      // Uso semanal vazio
      const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
      for (const d of days) {
        await query('INSERT INTO child_weekly_usage (child_id, day_name, minutes) VALUES (?, ?, 0)', [id, d]);
      }
      return sendJson(res, 201, { id, name: body.name });
    }

    // PUT /api/children/:id/limit
    const childLimitMatch = url.match(/^\/api\/children\/([^/]+)\/limit$/);
    if (childLimitMatch && method === 'PUT') {
      const { limitMinutes } = await parseBody(req);
      await query('UPDATE children SET daily_limit_minutes = ? WHERE id = ?', [limitMinutes, childLimitMatch[1]]);
      return sendJson(res, 200, { success: true });
    }

    // PUT /api/children/:id/emergency-lock
    const childLockMatch = url.match(/^\/api\/children\/([^/]+)\/emergency-lock$/);
    if (childLockMatch && method === 'PUT') {
      const child = (await query('SELECT emergency_lock_active FROM children WHERE id = ?', [childLockMatch[1]]))[0];
      if (!child) return sendJson(res, 404, { error: 'Filho não encontrado.' });
      const newState = child.emergency_lock_active ? 0 : 1;
      await query('UPDATE children SET emergency_lock_active = ? WHERE id = ?', [newState, childLockMatch[1]]);
      return sendJson(res, 200, { locked: !!newState });
    }

    // PUT /api/children/:id/app-block
    const childAppMatch = url.match(/^\/api\/children\/([^/]+)\/app-block$/);
    if (childAppMatch && method === 'PUT') {
      const { appName } = await parseBody(req);
      const app = (await query('SELECT blocked FROM child_apps WHERE child_id = ? AND app_name = ?', [childAppMatch[1], appName]))[0];
      if (!app) return sendJson(res, 404, { error: 'App não encontrado.' });
      const newState = app.blocked ? 0 : 1;
      await query('UPDATE child_apps SET blocked = ? WHERE child_id = ? AND app_name = ?', [newState, childAppMatch[1], appName]);
      return sendJson(res, 200, { blocked: !!newState });
    }

    // ===========================
    // SERVICE QUOTES
    // ===========================
    if (url === '/api/service-quotes' && method === 'GET') {
      const rows = await query('SELECT * FROM service_quotes ORDER BY created_at DESC');
      return sendJson(res, 200, rows);
    }

    if (url === '/api/service-quotes' && method === 'POST') {
      const body = await parseBody(req);
      const id = 'ORC-' + Math.floor(1000 + Math.random() * 9000);
      await query(
        `INSERT INTO service_quotes (id, user_id, service, name, email, description, scope, deadline)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, body.userId || null, body.service, body.name, body.email,
         body.desc || body.description || '', body.scope || 'Médio Porte', body.deadline || 'Padrão (1 a 3 meses)']
      );
      return sendJson(res, 201, { id, status: 'Em Análise pela Equipe GameTech' });
    }

    // ===========================
    // NOTIFICATIONS
    // ===========================
    // GET /api/notifications/:userId
    const notifGetMatch = url.match(/^\/api\/notifications\/([^/]+)$/);
    if (notifGetMatch && method === 'GET') {
      const rows = await query(
        'SELECT id, type, title, message, time_label AS time, is_read AS `read`, icon FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
        [notifGetMatch[1]]
      );
      rows.forEach(r => r.read = !!r.read);
      return sendJson(res, 200, rows);
    }

    // PUT /api/notifications/read/:userId
    const notifReadMatch = url.match(/^\/api\/notifications\/read\/([^/]+)$/);
    if (notifReadMatch && method === 'PUT') {
      await query('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [notifReadMatch[1]]);
      return sendJson(res, 200, { success: true });
    }

    // ===========================
    // SETTINGS
    // ===========================
    // GET /api/settings/:userId
    const settingsGetMatch = url.match(/^\/api\/settings\/([^/]+)$/);
    if (settingsGetMatch && method === 'GET') {
      const rows = await query('SELECT * FROM user_settings WHERE user_id = ?', [settingsGetMatch[1]]);
      if (rows.length === 0) return sendJson(res, 200, {});
      const s = rows[0];
      return sendJson(res, 200, {
        soundEnabled: !!s.sound_enabled,
        highContrast: !!s.high_contrast,
        particlesEnabled: !!s.particles_enabled,
        twoFactorAuth: !!s.two_factor_auth,
        emailNotifications: !!s.email_notifications,
        autoLockNight: !!s.auto_lock_night
      });
    }

    // PUT /api/settings/:userId
    if (settingsGetMatch && method === 'PUT') {
      const userId = settingsGetMatch[1];
      const body = await parseBody(req);
      const mapping = {
        soundEnabled: 'sound_enabled', highContrast: 'high_contrast', particlesEnabled: 'particles_enabled',
        twoFactorAuth: 'two_factor_auth', emailNotifications: 'email_notifications', autoLockNight: 'auto_lock_night'
      };
      const fields = [];
      const params = [];
      for (const [jsKey, dbCol] of Object.entries(mapping)) {
        if (body[jsKey] !== undefined) {
          fields.push(`${dbCol} = ?`);
          params.push(body[jsKey] ? 1 : 0);
        }
      }
      if (fields.length > 0) {
        params.push(userId);
        await query(`UPDATE user_settings SET ${fields.join(', ')} WHERE user_id = ?`, params);
      }
      return sendJson(res, 200, { success: true });
    }

    // ===========================
    // FINANCIAL DATA
    // ===========================
    if (url === '/api/financial/transactions' && method === 'GET') {
      const rows = await query('SELECT id, date_label AS date, description AS `desc`, type, amount, status FROM financial_transactions ORDER BY created_at DESC');
      return sendJson(res, 200, rows);
    }

    if (url === '/api/financial/monthly' && method === 'GET') {
      const rows = await query('SELECT month_label AS month, receita, despesa, lucro FROM financial_monthly ORDER BY id');
      return sendJson(res, 200, rows);
    }

    // ===========================
    // 404 - ROTA NÃO ENCONTRADA
    // ===========================
    return sendJson(res, 404, { error: `Rota API não encontrada: ${method} ${url}` });

  } catch (err) {
    console.error('❌ Erro na API:', err.message);
    return sendJson(res, 500, { error: 'Erro interno no servidor.', details: err.message });
  }
}

module.exports = { handleApiRequest };
