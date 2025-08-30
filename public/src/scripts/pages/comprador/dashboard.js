let graficoAtual = null;
let globalPeriodo = 'mes'; // Guarda o período selecionado

function calcularMaximoSugerido(dados) {
    const maxAlta = Math.max(...dados.alta);
    const maxBaixa = Math.max(...dados.baixa);
    const maxData = Math.max(maxAlta, maxBaixa);
    const suggestedMax = Math.ceil((maxData * 1.2) / 50) * 50;
    return suggestedMax > 0 ? suggestedMax : 100;
}

function gerarDadosGrafico(periodo) {
    const dados = { labels: [], alta: [], baixa: [] };

    const hourlyLabels = Array.from({ length: 12 }, (_, i) => `${i * 2}h`); // Labels de 2 em 2 horas
    const weeklyLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const periodosConfig = {
        dia: { count: 12, labels: hourlyLabels, max: 15 },
        semana: { count: 7, labels: weeklyLabels, max: 80 },
        mes: { count: 30, labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`), max: 150 },
        ano: { count: 12, labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], max: 500 }
    };

    const config = periodosConfig[periodo] || periodosConfig.mes;
    dados.labels = config.labels;

    for (let i = 0; i < config.count; i++) {
        const baixaValue = Math.floor(Math.random() * (config.max / 2)) + (config.max / 4);
        const altaValue = baixaValue + Math.floor(Math.random() * (config.max / 3)) + 10;
        dados.baixa.push(baixaValue);
        dados.alta.push(altaValue);
    }

    return dados;
}

function atualizarSummaryCards(scalingFactor = 30) {
    const totalKg = ((Math.random() * 15 + 35) * scalingFactor).toFixed(0);
    const mediaKg = (Math.random() * 5 + 10).toFixed(1);
    const novosDoadores = (Math.max(1, (Math.random() * 1.5) * scalingFactor)).toFixed(0);
    const taxaSucesso = (Math.random() * 7 + 91).toFixed(1) + '%';
    
    document.getElementById('summary-total-kg').textContent = new Intl.NumberFormat('pt-BR').format(totalKg);
    document.getElementById('summary-media-kg').textContent = mediaKg;
    document.getElementById('summary-novos-doadores').textContent = new Intl.NumberFormat('pt-BR').format(novosDoadores);
    document.getElementById('summary-taxa-sucesso').textContent = taxaSucesso;
}

function atualizarEstatisticas(scalingFactor = 30) {
    const formatNumber = (num) => new Intl.NumberFormat('pt-BR').format(num.toFixed(0));

    const estatisticas = {
        cadastros: formatNumber(Math.max(1, (Math.random() * 1) * scalingFactor)),
        doacoes: formatNumber(Math.max(1, (Math.random() * 3) * scalingFactor)),
        pendentes: formatNumber(Math.max(1, (Math.random() * 0.5) * scalingFactor)),
        triadas: formatNumber(Math.max(1, (Math.random() * 2) * scalingFactor)),
        finalizadas: formatNumber(Math.max(1, (Math.random() * 2.8) * scalingFactor)),
        tempo: (Math.random() * 5 + 2).toFixed(0)
    };
    
    Object.keys(estatisticas).forEach(key => {
        const elemento = document.getElementById(`stat-${key}`);
        if (elemento) elemento.textContent = estatisticas[key];
    });
}


const pontosColeta = [
    { nome: 'Entradas', status: '3 doadores', ativo: true },
    { nome: 'Ponto de coleta X', status: 'arrecadou', ativo: true },
    { nome: 'Ponto de coleta Y', status: 'arrecadou', ativo: true },
    { nome: 'Ponto de coleta W', status: 'arrecadou', ativo: true },
    { nome: 'Ponto de coleta S', status: 'arrecadou', ativo: true }
];

function inicializarDashboard() {
    carregarPontosColeta();
    criarGrafico();
    atualizarDadosGlobais('mes');
}

function carregarPontosColeta() {
    const container = document.getElementById('pontos-coleta');
    container.innerHTML = '';
    
    pontosColeta.forEach(ponto => {
        const pontoElement = document.createElement('div');
        pontoElement.className = 'collection-point';
        pontoElement.innerHTML = `
            <div class="point-icon"></div>
            <div class="point-info">
                <div class="point-name">${ponto.nome}</div>
                <div class="point-status">${ponto.status}</div>
            </div>
            <div class="point-arrow">›</div>
        `;
        container.appendChild(pontoElement);
    });
}

function criarGrafico() {
    const ctx = document.getElementById('doacoesChart').getContext('2d');
    
    if (graficoAtual) {
        graficoAtual.destroy();
    }
    
    graficoAtual = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [ { data: [] }, { data: [] } ]}, // Inicia vazio
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#9e6634' }, ticks: { color: '#9e6634' } },
                x: { grid: { color: '#9e6634' }, ticks: { color: '#9e6634' } }
            },
            elements: { point: { hoverRadius: 6 } }
        }
    });
}

function atualizarGrafico(periodo) {
    const dados = gerarDadosGrafico(periodo);
    const maxSugerido = calcularMaximoSugerido(dados);
    
    graficoAtual.data.labels = dados.labels;
    graficoAtual.data.datasets = [
        {
            label: 'Ativa alta variação',
            data: dados.alta,
            borderColor: 'rgb(224, 174, 124)',
            tension: 0.4,
            fill: false,
        },
        {
            label: 'Ativa baixa variação',
            data: dados.baixa,
            borderColor: 'rgb(123, 71, 26)',
            tension: 0.4,
            fill: false,
        }
    ];
    graficoAtual.options.scales.y.suggestedMax = maxSugerido;
    graficoAtual.update();
}

function atualizarDadosGlobais(periodo) {
    globalPeriodo = periodo;

    document.querySelectorAll('.btn-date-filter').forEach(btn => btn.classList.remove('active'));
    if (periodo !== 'custom') {
        const activeButton = document.querySelector(`.btn-date-filter[onclick="atualizarDadosGlobais('${periodo}')"]`);
        if(activeButton) activeButton.classList.add('active');
    }
    
    let scalingFactor = 30;
    const periodFactors = { dia: 1, semana: 7, mes: 30, ano: 365 };
    if (periodFactors[periodo]) {
        scalingFactor = periodFactors[periodo];
    } else if (periodo === 'custom') {
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate > startDate) {
            const diffTime = Math.abs(endDate - startDate);
            scalingFactor = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        } else {
            return; // Não atualiza se o intervalo customizado for inválido
        }
    }
    
    atualizarGrafico(periodo);
    atualizarSummaryCards(scalingFactor);
    atualizarEstatisticas(scalingFactor);
}

function gerarRelatorio() {
    // 1. Coletar os dados mais recentes da página
    const totalKg = document.getElementById('summary-total-kg').textContent;
    const novosDoadores = document.getElementById('summary-novos-doadores').textContent;
    const doacoesRegistradas = document.getElementById('stat-doacoes').textContent;
    const doacoesFinalizadas = document.getElementById('stat-finalizadas').textContent;

    // 2. Popular o modal com os dados coletados
    document.getElementById('modal-total-kg').textContent = totalKg;
    document.getElementById('modal-novos-doadores').textContent = novosDoadores;
    document.getElementById('modal-doacoes').textContent = doacoesRegistradas;
    document.getElementById('modal-finalizadas').textContent = doacoesFinalizadas;

    // 3. Instanciar e exibir o modal do Bootstrap
    const relatorioModal = new bootstrap.Modal(document.getElementById('relatorioModal'));
    relatorioModal.show();
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Dashboard de Doações', 20, 30);
    doc.setFontSize(12);
    doc.text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);
    doc.setFontSize(14);
    doc.text('Estatísticas:', 20, 70);
    const stats = [
        `Doadores para registro: ${document.getElementById('stat-cadastros').textContent}`,
        `Doações deferentes: ${document.getElementById('stat-doacoes').textContent}`,
        `Doações para graduação: ${document.getElementById('stat-pendentes').textContent}`,
        `Doações triadas: ${document.getElementById('stat-triadas').textContent}`,
        `Doações finalizadas: ${document.getElementById('stat-finalizadas').textContent}`
    ];
    let y = 80;
    stats.forEach(stat => { doc.text(`• ${stat}`, 25, y); y += 10; });
    doc.save('dashboard-doacoes.pdf');
}

setInterval(() => {
    if (globalPeriodo !== 'custom') {
       atualizarDadosGlobais(globalPeriodo);
    }
}, 30000);

document.addEventListener('DOMContentLoaded', inicializarDashboard);

