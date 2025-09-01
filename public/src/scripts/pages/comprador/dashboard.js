let graficoAtual = null;
let globalPeriodo = 'mes';

// Debounce para otimizar o redimensionamento do gráfico
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function calcularMaximoSugerido(dados) {
    const maxData = Math.max(...dados.alta, ...dados.baixa);
    // Garante um valor mínimo para evitar erros com dados zero ou muito pequenos
    return Math.ceil((maxData * 1.2 || 100) / 50) * 50;
}

function gerarDadosGrafico(periodo) {
    const dados = { labels: [], alta: [], baixa: [] };
    const periodosConfig = {
        dia: { count: 12, labels: Array.from({ length: 12 }, (_, i) => `${i * 2}h`), max: 15 },
        semana: { count: 7, labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], max: 80 },
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
    const formatNumber = (num) => new Intl.NumberFormat('pt-BR').format(num);
    document.getElementById('summary-total-kg').textContent = formatNumber(Math.round((Math.random() * 15 + 35) * scalingFactor));
    document.getElementById('summary-media-kg').textContent = (Math.random() * 5 + 10).toFixed(1);
    document.getElementById('summary-novos-doadores').textContent = formatNumber(Math.round(Math.max(1, (Math.random() * 1.5) * scalingFactor)));
    document.getElementById('summary-taxa-sucesso').textContent = `${(Math.random() * 7 + 91).toFixed(1)}%`;
}

function atualizarEstatisticas(scalingFactor = 30) {
    const formatNumber = (num) => new Intl.NumberFormat('pt-BR').format(Math.round(num));
    // Assegura que os valores não sejam menores que 1 para evitar "0" em locais inesperados
    const estatisticas = {
        cadastros: Math.max(1, Math.random() * scalingFactor * 0.5),
        doacoes: Math.max(1, Math.random() * scalingFactor * 1.5),
        pendentes: Math.max(1, Math.random() * scalingFactor * 0.3),
        triadas: Math.max(1, Math.random() * scalingFactor * 1),
        finalizadas: Math.max(1, Math.random() * scalingFactor * 1.2),
        tempo: Math.round(Math.random() * 5 + 2) // Mantém este como número de dias, sem scaling
    };
    Object.keys(estatisticas).forEach(key => {
        const elemento = document.getElementById(`stat-${key}`);
        if (elemento) elemento.textContent = formatNumber(estatisticas[key]);
    });
}

const pontosColeta = [
    { nome: 'Entradas', status: '3 doadores' },
    { nome: 'Ponto de coleta X', status: 'arrecadou' },
    { nome: 'Ponto de coleta Y', status: 'arrecadou' },
    { nome: 'Ponto de coleta W', status: 'arrecadou' },
    { nome: 'Ponto de coleta S', status: 'arrecadou' }
];

function carregarPontosColeta() {
    const container = document.getElementById('pontos-coleta');
    if (!container) return;
    container.innerHTML = pontosColeta.map(ponto => `
        <div class="collection-point">
            <div class="point-icon"></div>
            <div class="point-info">
                <div class="point-name">${ponto.nome}</div>
                <div class="point-status">${ponto.status}</div>
            </div>
            <div class="point-arrow">›</div>
        </div>
    `).join('');
}

function criarGrafico() {
    const ctx = document.getElementById('doacoesChart')?.getContext('2d');
    if (!ctx) return;
    if (graficoAtual) {
        graficoAtual.destroy(); // Destrói o gráfico existente para recriar
    }

    graficoAtual = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite que o Chart.js gerencie a altura/largura de forma responsiva
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#ddd' },
                    ticks: { color: '#333' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#333' }
                }
            }
        }
    });
    atualizarGrafico(globalPeriodo);
}

function atualizarGrafico(periodo) {
    if (!graficoAtual) {
        criarGrafico(); // Garante que o gráfico seja criado se ainda não existe
        if (!graficoAtual) return; // Se a criação falhar, sai
    }
    
    const dados = gerarDadosGrafico(periodo);
    graficoAtual.data.labels = dados.labels;
    graficoAtual.data.datasets = [
        {
            label: 'Variação Alta',
            data: dados.alta,
            borderColor: '#72330f',
            backgroundColor: '#72330f', // Para preenchimento se for o caso, embora seja linha
            tension: 0.4,
            fill: false,
            pointRadius: 3, // Tamanho dos pontos
            pointHoverRadius: 5
        },
        {
            label: 'Variação Baixa',
            data: dados.baixa,
            borderColor: '#492a0f',
            backgroundColor: '#492a0f', // Para preenchimento se for o caso
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 5
        }
    ];
    graficoAtual.options.scales.y.suggestedMax = calcularMaximoSugerido(dados);
    graficoAtual.update();
}

function atualizarDadosGlobais(periodo) {
    globalPeriodo = periodo;
    document.querySelectorAll('.btn-date-filter').forEach(btn => btn.classList.remove('active'));
    
    if (periodo !== 'custom') {
        const activeButton = document.querySelector(`.btn-date-filter[onclick*="'${periodo}'"]`);
        if (activeButton) activeButton.classList.add('active');
    } else {
        // Desativar botões de período fixo quando "custom" é selecionado
        document.querySelectorAll('.btn-date-filter').forEach(btn => btn.classList.remove('active'));
    }

    let scalingFactor = 30; // Default para 'mes'
    if (periodo === 'custom') {
        const startDateEl = document.getElementById('startDate');
        const endDateEl = document.getElementById('endDate');
        const startDate = new Date(startDateEl.value);
        const endDate = new Date(endDateEl.value);
        
        if (!isNaN(startDate) && !isNaN(endDate) && endDate >= startDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia final
            scalingFactor = Math.max(1, diffDays); // Fator de escala baseado nos dias selecionados
        } else {
            // Se as datas customizadas são inválidas, resetar para 'mes' ou manter estado anterior
            console.warn("Datas customizadas inválidas. Mantendo o período anterior ou padrão.");
            // Opcional: Voltar para o período 'mes' ou apenas não atualizar
            // globalPeriodo = 'mes';
            // document.querySelector(`.btn-date-filter[onclick*="'mes'"]`).classList.add('active');
            // scalingFactor = 30;
            return; // Sai da função para evitar atualização com dados incorretos
        }
    } else {
        const periodFactors = { dia: 1, semana: 7, mes: 30, ano: 365 };
        scalingFactor = periodFactors[periodo] || 30;
    }
    
    atualizarGrafico(periodo);
    atualizarSummaryCards(scalingFactor);
    atualizarEstatisticas(scalingFactor);
}

function gerarRelatorio() {
    const modal = new bootstrap.Modal(document.getElementById('relatorioModal'));
    document.getElementById('modal-total-kg').textContent = document.getElementById('summary-total-kg').textContent;
    document.getElementById('modal-novos-doadores').textContent = document.getElementById('summary-novos-doadores').textContent;
    document.getElementById('modal-doacoes').textContent = document.getElementById('stat-doacoes').textContent;
    document.getElementById('modal-finalizadas').textContent = document.getElementById('stat-finalizadas').textContent;
    modal.show();
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
        `Doadores de Roupas: ${document.getElementById('stat-cadastros').textContent}`,
        `Doações de Alimentos: ${document.getElementById('stat-doacoes').textContent}`,
        `Produtos de Higiene: ${document.getElementById('stat-pendentes').textContent}`,
        `Doações de Móveis: ${document.getElementById('stat-triadas').textContent}`,
        `Livros e Brinquedos: ${document.getElementById('stat-finalizadas').textContent}`,
        `Roupas de Cama: ${document.getElementById('stat-tempo').textContent}`
    ];
    let y = 80;
    stats.forEach(stat => { doc.text(`• ${stat}`, 25, y); y += 10; });
    doc.save('dashboard-doacoes.pdf');
}

function inicializarDashboard() {
    carregarPontosColeta();
    criarGrafico(); // Cria o gráfico inicial
    atualizarDadosGlobais('mes'); // Carrega os dados iniciais para o mês
    
    // Adiciona o event listener para redimensionamento com debounce
    window.addEventListener('resize', debounce(() => {
        // Apenas recria o gráfico se ele já existe para evitar erros
        if (graficoAtual) {
            atualizarGrafico(globalPeriodo);
        }
    }, 250)); // Delay de 250ms

    // Atualização de dados periódica, a cada 30 segundos, apenas se não for "custom"
    setInterval(() => {
        if (globalPeriodo !== 'custom') {
           atualizarDadosGlobais(globalPeriodo);
        }
    }, 30000);
}

document.addEventListener('DOMContentLoaded', inicializarDashboard);