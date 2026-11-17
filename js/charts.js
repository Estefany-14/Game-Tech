/**
 * GAMETECH - HIGH-DPI CANVAS CHARTS ENGINE
 * Gráficos leves, responsivos e estilizados em Neon sem dependências externas.
 */

class GameTechCharts {
  // Ajuste para telas Retina/High-DPI
  static setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Se o canvas ainda não tem dimensões visíveis, define padrões
    const width = rect.width || 320;
    const height = rect.height || 220;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width, height };
  }

  // 1. Gráfico Donut de Faturamento por Categoria
  static drawDonutChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 25;
    const innerRadius = radius * 0.62;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2;

    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = item.color;
      ctx.shadowColor = item.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // Borda sutil de separação
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0a0815';
      ctx.stroke();

      startAngle = endAngle;
    });

    // Círculo central com texto de Total
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R$ ' + total.toLocaleString('pt-BR', { minimumFractionDigits: 0 }), centerX, centerY - 8);

    ctx.fillStyle = '#a855f7';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('TOTAL MENSAL', centerX, centerY + 12);
    ctx.restore();
  }

  // 2. Gráfico de Barras Duplas (Receitas x Despesas)
  static drawBarChart(canvasId, monthlyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const paddingLeft = 45;
    const paddingRight = 15;
    const paddingTop = 25;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Achar valor máximo
    let maxVal = 0;
    monthlyData.forEach(d => {
      if (d.receita > maxVal) maxVal = d.receita;
      if (d.despesa > maxVal) maxVal = d.despesa;
    });
    maxVal = Math.ceil(maxVal / 5000) * 5000 || 16000;

    // Linhas horizontais de grade
    const gridLines = 4;
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridLines; i++) {
      const y = paddingTop + (chartHeight / gridLines) * i;
      const val = Math.round(maxVal - (maxVal / gridLines) * i);
      
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();

      ctx.fillText(`R$${val >= 1000 ? (val/1000)+'k' : val}`, paddingLeft - 6, y + 3);
    }

    // Desenhar barras
    const groupCount = monthlyData.length;
    const groupWidth = chartWidth / groupCount;
    const barWidth = Math.max(10, Math.min(22, (groupWidth - 14) / 2));

    monthlyData.forEach((d, i) => {
      const groupX = paddingLeft + i * groupWidth + (groupWidth / 2);

      // Barra de Receita (Roxo Neon)
      const hReceita = (d.receita / maxVal) * chartHeight;
      const xReceita = groupX - barWidth - 2;
      const yReceita = paddingTop + chartHeight - hReceita;

      ctx.save();
      const gradReceita = ctx.createLinearGradient(0, yReceita, 0, yReceita + hReceita);
      gradReceita.addColorStop(0, '#c084fc');
      gradReceita.addColorStop(1, '#7e22ce');
      ctx.fillStyle = gradReceita;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8;
      ctx.fillRect(xReceita, yReceita, barWidth, hReceita);
      ctx.restore();

      // Barra de Despesa (Ciano Neon)
      const hDespesa = (d.despesa / maxVal) * chartHeight;
      const xDespesa = groupX + 2;
      const yDespesa = paddingTop + chartHeight - hDespesa;

      ctx.save();
      const gradDespesa = ctx.createLinearGradient(0, yDespesa, 0, yDespesa + hDespesa);
      gradDespesa.addColorStop(0, '#38bdf8');
      gradDespesa.addColorStop(1, '#0284c7');
      ctx.fillStyle = gradDespesa;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.fillRect(xDespesa, yDespesa, barWidth, hDespesa);
      ctx.restore();

      // Rótulo do Mês
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      const monthLabel = d.month.length > 7 ? d.month.substring(0, 3) : d.month;
      ctx.fillText(monthLabel, groupX, height - 10);
    });
  }

  // 3. Medidor Circular de Tempo de Tela (Parental)
  static drawCircularGauge(canvasId, currentMinutes, maxMinutes) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 16;
    const lineWidth = 14;

    const percentage = Math.min(1, currentMinutes / maxMinutes);
    const startAngle = Math.PI * 0.75;
    const totalAngle = Math.PI * 1.5;
    const endAngle = startAngle + totalAngle * percentage;

    // Trilho de fundo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + totalAngle);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Progresso ativo com gradiente e neon
    ctx.save();
    let glowColor = '#a855f7';
    if (percentage >= 0.95) glowColor = '#ef4444'; // Alerta vermelho
    else if (percentage >= 0.8) glowColor = '#f59e0b'; // Atenção amarelo

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.restore();

    // Texto central
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    const timeStr = `${h}h ${m < 10 ? '0' : ''}${m}m`;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, centerX, centerY - 6);

    const maxH = Math.floor(maxMinutes / 60);
    const maxM = maxMinutes % 60;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`Limite: ${maxH}h${maxM > 0 ? maxM + 'm' : ''}`, centerX, centerY + 18);
    ctx.restore();
  }

  // 4. Gráfico Semanal dos Filhos (Uso diário)
  static drawWeeklyBarChart(canvasId, weeklyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const paddingX = 25;
    const paddingTop = 20;
    const paddingBottom = 25;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingTop - paddingBottom;

    const maxMins = 240; // 4 horas escala
    const colW = chartW / weeklyData.length;
    const barW = Math.min(22, colW - 10);

    // Linha limite recomendada (3h)
    const limitY = paddingTop + chartH - (180 / maxMins) * chartH;
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(paddingX, limitY);
    ctx.lineTo(width - paddingX, limitY);
    ctx.stroke();
    ctx.restore();

    weeklyData.forEach((item, idx) => {
      const x = paddingX + idx * colW + (colW / 2) - (barW / 2);
      const barH = (item.minutes / maxMins) * chartH;
      const y = paddingTop + chartH - barH;

      ctx.save();
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      if (item.minutes > 180) {
        grad.addColorStop(0, '#f43f5e');
        grad.addColorStop(1, '#a855f7');
      } else {
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(1, '#8b5cf6');
      }
      ctx.fillStyle = grad;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 6;
      ctx.fillRect(x, y, barW, barH);
      ctx.restore();

      // Label do dia
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.day, x + barW / 2, height - 8);
    });
  }
}

window.GameTechCharts = GameTechCharts;

