  // Dados iniciais das doações com mais variedade temporal
        let donations = [
            // 2023
            { id: 1, data: '2023-09-12', tipo: 'Semestral', categoria: 'Roupas', responsavel: 'João Silva', valor: 150.00, origem: 'manual', timestamp: new Date('2023-09-12').getTime() },
            { id: 2, data: '2023-09-12', tipo: 'Semestral', categoria: 'Roupas', responsavel: 'Maria Santos', valor: 200.00, origem: 'manual', timestamp: new Date('2023-09-12').getTime() },
            { id: 3, data: '2023-09-12', tipo: 'Semestral', categoria: 'Roupas', responsavel: 'Pedro Costa', valor: 100.00, origem: 'manual', timestamp: new Date('2023-09-12').getTime() },
            { id: 4, data: '2023-10-15', tipo: 'Mensal', categoria: 'Alimentos', responsavel: 'Ana Costa', valor: 300.00, origem: 'externo', timestamp: new Date('2023-10-15').getTime() },
            { id: 5, data: '2023-11-20', tipo: 'Mensal', categoria: 'Medicamentos', responsavel: 'Carlos Silva', valor: 500.00, origem: 'manual', timestamp: new Date('2023-11-20').getTime() },
            { id: 6, data: '2023-12-01', tipo: 'Anual', categoria: 'Brinquedos', responsavel: 'Luiza Pereira', valor: 800.00, origem: 'manual', timestamp: new Date('2023-12-01').getTime() },
            // 2024
            { id: 7, data: '2024-01-10', tipo: 'Mensal', categoria: 'Livros', responsavel: 'Roberto Alves', valor: 250.00, origem: 'externo', timestamp: new Date('2024-01-10').getTime() },
            { id: 8, data: '2024-02-05', tipo: 'Mensal', categoria: 'Alimentos', responsavel: 'Fernanda Lima', valor: 320.00, origem: 'manual', timestamp: new Date('2024-02-05').getTime() },
            { id: 9, data: '2024-03-12', tipo: 'Semanal', categoria: 'Roupas', responsavel: 'Sistema Automático', valor: 150.00, origem: 'externo', timestamp: new Date('2024-03-12').getTime() },
            { id: 10, data: '2024-04-20', tipo: 'Mensal', categoria: 'Medicamentos', responsavel: 'Dr. Silva', valor: 450.00, origem: 'manual', timestamp: new Date('2024-04-20').getTime() },
            // 2025
            { id: 11, data: '2025-01-15', tipo: 'Anual', categoria: 'Geral', responsavel: 'Coordenação', valor: 1200.00, origem: 'manual', timestamp: new Date('2025-01-15').getTime() },
            { id: 12, data: '2025-08-10', tipo: 'Semanal', categoria: 'Alimentos', responsavel: 'Parceiro X', valor: 180.00, origem: 'externo', timestamp: new Date('2025-08-10').getTime() }
        ];

        // Variáveis de controle
        let currentPage = 1;
        const itemsPerPage = 10;
        let nextId = Math.max(...donations.map(d => d.id), 0) + 1;

        // Elementos do DOM
        const elements = {
            tableBody: document.getElementById('tableBody'),
            pagination: document.getElementById('pagination'),
            startDateFilter: document.getElementById('startDateFilter'),
            endDateFilter: document.getElementById('endDateFilter'),
            typeFilter: document.getElementById('typeFilter'),
            categoryFilter: document.getElementById('categoryFilter'),
            generateReportBtn: document.getElementById('generateReportBtn'),
            pdfLoading: document.getElementById('pdfLoading'),
            toastContainer: document.getElementById('toastContainer'),
            responsible: document.getElementById('responsible'),
            startPeriod: document.getElementById('startPeriod'),
            endPeriod: document.getElementById('endPeriod'),
            reportType: document.getElementById('reportType'),
            reportCategory: document.getElementById('reportCategory'),
            hiddenChart: document.getElementById('hiddenChart'),
            filtersToggle: document.getElementById('filtersToggle'),
            filtersContent: document.getElementById('filtersContent'),
            clearFiltersBtn: document.getElementById('clearFiltersBtn'),
            activeFiltersCount: document.getElementById('activeFiltersCount')
        };

        // Funções utilitárias
        const utils = {
            formatDate(dateString) {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toLocaleDateString('pt-BR');
            },
            
            formatCurrency(value) {
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value);
            },

            generateRandomValue(min = 50, max = 500) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            getDateRange(type, referenceDate = new Date()) {
                const year = referenceDate.getFullYear();
                const month = referenceDate.getMonth();
                const day = referenceDate.getDate();

                switch(type) {
                    case 'Anual':
                        return {
                            start: new Date(year, 0, 1),
                            end: new Date(year, 11, 31)
                        };
                    case 'Mensal':
                        return {
                            start: new Date(year, month, 1),
                            end: new Date(year, month + 1, 0)
                        };
                    case 'Semanal':
                        const startOfWeek = new Date(referenceDate);
                        startOfWeek.setDate(day - referenceDate.getDay());
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        return {
                            start: startOfWeek,
                            end: endOfWeek
                        };
                    default:
                        return {
                            start: new Date(year, month, day),
                            end: new Date(year, month, day)
                        };
                }
            },

            isDateInRange(date, range) {
                const checkDate = new Date(date);
                return checkDate >= range.start && checkDate <= range.end;
            }
        };

        // Sistema de notificações
        const notification = {
            show(message, type = 'success', duration = 5000) {
                const toast = document.createElement('div');
                toast.className = `toast ${type}`;
                
                const icons = {
                    success: 'fas fa-check-circle',
                    error: 'fas fa-exclamation-circle',
                    warning: 'fas fa-exclamation-triangle',
                    info: 'fas fa-info-circle'
                };
                
                toast.innerHTML = `
                    <div class="toast-content">
                        <i class="toast-icon ${icons[type] || icons.info}"></i>
                        <div class="toast-message">${message}</div>
                        <button class="toast-close">&times;</button>
                    </div>
                `;
                
                elements.toastContainer.appendChild(toast);
                
                setTimeout(() => toast.classList.add('show'), 100);
                
                const removeToast = () => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.remove();
                        }
                    }, 300);
                };
                
                setTimeout(removeToast, duration);
                toast.querySelector('.toast-close').addEventListener('click', removeToast);
            }
        };

        // Função para criar gráficos
        function createChart(data, type = 'bar') {
            const ctx = elements.hiddenChart.getContext('2d');
            
            // Preparar dados para o gráfico
            const categories = {};
            data.forEach(d => {
                categories[d.categoria] = (categories[d.categoria] || 0) + (d.valor || 0);
            });

            const chart = new Chart(ctx, {
                type: type,
                data: {
                    labels: Object.keys(categories),
                    datasets: [{
                        label: 'Valor Total (R$)',
                        data: Object.values(categories),
                        backgroundColor: [
                            'rgba(196, 155, 97, 0.8)',
                            'rgba(5, 150, 105, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)'
                        ],
                        borderColor: [
                            'rgba(196, 155, 97, 1)',
                            'rgba(5, 150, 105, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(139, 92, 246, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(239, 68, 68, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribuição de Doações por Categoria',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });

            return chart;
        }

        // Função para contar filtros ativos
        function updateActiveFiltersCount() {
            let activeCount = 0;
            
            if (elements.startDateFilter.value && elements.startDateFilter.value !== '2023-09-12') activeCount++;
            if (elements.endDateFilter.value && elements.endDateFilter.value !== '2025-10-19') activeCount++;
            if (elements.typeFilter.value) activeCount++;
            if (elements.categoryFilter.value) activeCount++;
            
            if (activeCount > 0) {
                elements.activeFiltersCount.textContent = activeCount;
                elements.activeFiltersCount.style.display = 'flex';
                elements.clearFiltersBtn.classList.add('visible');
            } else {
                elements.activeFiltersCount.style.display = 'none';
                elements.clearFiltersBtn.classList.remove('visible');
            }
        }

        // Função para limpar todos os filtros
        function clearAllFilters() {
            elements.startDateFilter.value = '2023-09-12';
            elements.endDateFilter.value = '2025-10-19';
            elements.typeFilter.value = '';
            elements.categoryFilter.value = '';
            
            currentPage = 1;
            renderTable();
            updateActiveFiltersCount();
            
            notification.show('🧹 Filtros limpos com sucesso!', 'info', 3000);
        }

        // Função para alternar filtros (mobile) - CORRIGIDA
        function toggleFilters() {
            const isCollapsed = elements.filtersContent.classList.contains('collapsed');
            
            if (isCollapsed) {
                elements.filtersContent.classList.remove('collapsed');
                elements.filtersToggle.classList.add('active');
                console.log('Filtros expandidos');
            } else {
                elements.filtersContent.classList.add('collapsed');
                elements.filtersToggle.classList.remove('active');
                console.log('Filtros colapsados');
            }
        }

        // Função para adicionar nova doação na tabela
        function addDonationToTable(donation, isNew = false) {
            donations.unshift(donation);
            
            if (isNew) {
                currentPage = 1;
                renderTable();
                
                setTimeout(() => {
                    const firstRow = elements.tableBody.querySelector('.table-row');
                    if (firstRow) {
                        firstRow.classList.add('new-entry');
                        setTimeout(() => {
                            firstRow.classList.remove('new-entry');
                        }, 3000);
                    }
                }, 100);
            }
        }

        // Função para gerar relatório com dados filtrados por período
        function generateReport() {
            const reportType = elements.reportType.value;
            const reportCategory = elements.reportCategory.value;
            const responsible = elements.responsible.value || 'Sistema';

            // Obter intervalo de datas baseado no tipo de relatório OU nas datas selecionadas
            let dateRange;
            
            if (elements.startPeriod.value && elements.endPeriod.value) {
                // Usar datas personalizadas se fornecidas
                dateRange = {
                    start: new Date(elements.startPeriod.value),
                    end: new Date(elements.endPeriod.value)
                };
            } else {
                // Usar intervalo automático baseado no tipo
                dateRange = utils.getDateRange(reportType);
            }
            
            // Filtrar doações por período e categoria
            let filteredData = donations.filter(donation => {
                const dateMatch = utils.isDateInRange(donation.data, dateRange);
                const categoryMatch = reportCategory === 'Geral' || donation.categoria === reportCategory;
                return dateMatch && categoryMatch;
            });

            const reportData = {
                id: nextId++,
                data: new Date().toISOString().split('T')[0],
                tipo: 'Relatório',
                categoria: reportCategory,
                responsavel: responsible,
                valor: 0,
                origem: 'relatorio',
                timestamp: Date.now(),
                periodo: `${utils.formatDate(dateRange.start)} - ${utils.formatDate(dateRange.end)}`,
                tipoRelatorio: reportType,
                dadosFiltrados: filteredData
            };

            // Adicionar na tabela
            addDonationToTable(reportData, true);

            // Gerar PDF
            generatePDF(reportData.id);

            notification.show(
                ` Relatório ${reportType} gerado!<br>
                <strong>${reportCategory}</strong> - ${filteredData.length} registros<br>
                Período: ${reportData.periodo}`, 
                'success', 
                5000
            );

            console.log(' Relatório gerado:', reportData);
        }

        // Função para filtrar doações
        function getFilteredDonations() {
            return donations.filter(donation => {
                const donationDate = new Date(donation.data);
                const startDate = elements.startDateFilter.value ? new Date(elements.startDateFilter.value) : null;
                const endDate = elements.endDateFilter.value ? new Date(elements.endDateFilter.value) : null;
                
                const dateMatch = (!startDate || donationDate >= startDate) && (!endDate || donationDate <= endDate);
                const typeMatch = !elements.typeFilter.value || donation.tipo === elements.typeFilter.value;
                const categoryMatch = !elements.categoryFilter.value || donation.categoria === elements.categoryFilter.value;
                
                return dateMatch && typeMatch && categoryMatch;
            });
        }

        // Função para renderizar a tabela
        function renderTable() {
            const filteredDonations = getFilteredDonations();
            const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedDonations = filteredDonations.slice(startIndex, endIndex);

            elements.tableBody.innerHTML = '';

            if (paginatedDonations.length === 0) {
                elements.tableBody.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6b7280;">
                        <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                        Nenhuma doação encontrada com os filtros aplicados.
                    </div>
                `;
                renderPagination(0);
                return;
            }

            paginatedDonations.forEach((donation) => {
                const row = document.createElement('div');
                row.className = 'table-row';
                
                const typeClass = donation.tipo.toLowerCase().replace('ó', 'o').replace('ã', 'a');
                
                row.innerHTML = `
                    <div>${utils.formatDate(donation.data)}</div>
                    <div><span class="type-badge ${typeClass}">${donation.tipo}</span></div>
                    <div>${donation.categoria}</div>
                    <div><span class="origin-badge ${donation.origem}">${donation.origem === 'externo' ? 'Externo' : donation.origem === 'relatorio' ? 'Relatório' : 'Manual'}</span></div>
                    <div>
                        <button class="pdf-btn" onclick="generatePDF(${donation.id})" title="Gerar PDF">
                            PDF <i class="fas fa-download"></i>
                        </button>
                    </div>
                `;
                
                elements.tableBody.appendChild(row);
            });

            renderPagination(totalPages);
        }

        // Função para renderizar paginação
        function renderPagination(totalPages) {
            elements.pagination.innerHTML = '';

            if (totalPages <= 1) return;

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                button.textContent = i;
                button.onclick = () => {
                    currentPage = i;
                    renderTable();
                };
                elements.pagination.appendChild(button);
            }
        }

        // Função para gerar PDF em formato ABNT
        function generatePDF(donationId = null) {
            elements.pdfLoading.classList.add('show');
            
            setTimeout(async () => {
                try {
                    if (!window.jspdf) {
                        throw new Error('Biblioteca jsPDF não foi carregada');
                    }

                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();

                    let reportData;
                    let fileName;
                    
                    if (donationId) {
                        const donation = donations.find(d => d.id === donationId);
                        if (!donation) {
                            throw new Error('Registro não encontrado');
                        }
                        
                        if (donation.tipo === 'Relatório' && donation.dadosFiltrados) {
                            reportData = donation.dadosFiltrados;
                            fileName = `Relatorio_${donation.tipoRelatorio}_${donation.categoria}_${donation.id}_${new Date().toISOString().split('T')[0]}.pdf`;
                        } else {
                            reportData = [donation];
                            fileName = `${donation.tipo}_${donation.categoria}_${donation.id}_${new Date().toISOString().split('T')[0]}.pdf`;
                        }
                    } else {
                        reportData = getFilteredDonations();
                        fileName = `Relatorio_Geral_${new Date().toISOString().split('T')[0]}.pdf`;
                    }

                    await createABNTPDFDocument(doc, reportData, fileName);
                    
                } catch (error) {
                    console.error('Erro ao gerar PDF:', error);
                    notification.show(`Erro ao gerar PDF: ${error.message}`, 'error');
                } finally {
                    elements.pdfLoading.classList.remove('show');
                }
            }, 800);
        }

        // Função para criar documento PDF em formato ABNT
        async function createABNTPDFDocument(doc, data, fileName) {
            const margin = 30;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let currentY = margin;

            // Função auxiliar para adicionar texto com quebra de linha
            function addText(text, fontSize, isBold = false, align = 'left', maxWidth = pageWidth - 2 * margin) {
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', isBold ? 'bold' : 'normal');
                
                let x = margin;
                if (align === 'center') {
                    x = pageWidth / 2;
                } else if (align === 'right') {
                    x = pageWidth - margin;
                }
                
                const lines = doc.splitTextToSize(text, maxWidth);
                lines.forEach(line => {
                    if (currentY > pageHeight - 40) {
                        doc.addPage();
                        currentY = margin;
                    }
                    doc.text(line, x, currentY, { align: align });
                    currentY += fontSize * 0.8;
                });
                
                return lines.length;
            }

            // Função para adicionar nova página se necessário
            function checkPageBreak(requiredSpace = 40) {
                if (currentY > pageHeight - requiredSpace) {
                    doc.addPage();
                    currentY = margin;
                    return true;
                }
                return false;
            }

            // CAPA (Formato ABNT)
            currentY = pageHeight / 4;
            addText('SISTEMA DE HISTÓRICO DE DOAÇÕES', 16, true, 'center');
            currentY += 20;
            addText('RELATÓRIO DE ANÁLISE DE DADOS', 14, true, 'center');
            currentY += 40;
            addText('ORGANIZAÇÃO BENEFICENTE', 12, false, 'center');
            currentY += 20;
            addText('Salvador, BA', 12, false, 'center');
            currentY += 10;
            addText(new Date().getFullYear().toString(), 12, false, 'center');

            // Nova página para conteúdo
            doc.addPage();
            currentY = margin;

            // SUMÁRIO
            addText('SUMÁRIO', 14, true, 'center');
            currentY += 20;
            addText('1. INTRODUÇÃO ....................................... 3', 12);
            addText('2. METODOLOGIA .................................... 4', 12);
            addText('3. ANÁLISE DOS DADOS ........................... 5', 12);
            addText('4. RESULTADOS ..................................... 6', 12);
            addText('5. GRÁFICOS E ESTATÍSTICAS .................... 7', 12);
            addText('6. CONCLUSÕES .................................... 8', 12);
            addText('7. ANEXOS .......................................... 9', 12);

            // Continuar com o restante do PDF...
            doc.addPage();
            currentY = margin;
            
            addText('1. INTRODUÇÃO', 14, true);
            currentY += 15;
            
            const intro = `Este relatório apresenta uma análise detalhada dos dados de doações registrados no Sistema de Histórico de Doações da organização. 

Total de registros analisados: ${data.length}
Data de geração: ${new Date().toLocaleString('pt-BR')}`;

            addText(intro, 12, false, 'justify');

            // Salvar PDF
            doc.save(fileName);
            notification.show(`📄 PDF gerado com sucesso!<br>Arquivo: <strong>${fileName}</strong>`, 'success');
        }

        // Função global para ser chamada pelos botões
        window.generatePDF = generatePDF;

        // Event Listeners
        function initializeEventListeners() {
            // Toggle de filtros para mobile - CORRIGIDO
            if (elements.filtersToggle) {
                elements.filtersToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleFilters();
                });
            }
            
            // Botão limpar filtros
            if (elements.clearFiltersBtn) {
                elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
            }
            
            // Filtros com atualização de contador
            elements.startDateFilter.addEventListener('change', () => {
                currentPage = 1;
                renderTable();
                updateActiveFiltersCount();
            });
            
            elements.endDateFilter.addEventListener('change', () => {
                currentPage = 1;
                renderTable();
                updateActiveFiltersCount();
            });
            
            elements.typeFilter.addEventListener('change', () => {
                currentPage = 1;
                renderTable();
                updateActiveFiltersCount();
            });
            
            elements.categoryFilter.addEventListener('change', () => {
                currentPage = 1;
                renderTable();
                updateActiveFiltersCount();
            });
            
            // Botão gerar relatório
            elements.generateReportBtn.addEventListener('click', generateReport);
            
            // Auto-colapsar filtros em telas pequenas
            function handleResize() {
                if (window.innerWidth <= 1024) {
                    if (!elements.filtersContent.classList.contains('collapsed')) {
                        elements.filtersContent.classList.add('collapsed');
                        elements.filtersToggle.classList.remove('active');
                    }
                } else {
                    elements.filtersContent.classList.remove('collapsed');
                    elements.filtersToggle.classList.remove('active');
                }
            }
            
            window.addEventListener('resize', handleResize);
            handleResize(); // Executar na inicialização
            
            // Teclas de atalho
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    switch(e.key) {
                        case 'r':
                            e.preventDefault();
                            generateReport();
                            break;
                        case 'f':
                            e.preventDefault();
                            toggleFilters();
                            break;
                    }
                }
            });
        }

        // Função de inicialização
        function initialize() {
            try {
                console.log('Inicializando Sistema de Histórico de Doações...');
                
                if (!window.jspdf) {
                    console.warn('jsPDF não carregado - algumas funcionalidades podem não funcionar');
                }
                
                if (!window.Chart) {
                    console.warn('Chart.js não carregado - gráficos podem não funcionar');
                }
                
                initializeEventListeners();
                renderTable();
                updateActiveFiltersCount();
                
                console.log('Sistema inicializado com sucesso!');
                
                setTimeout(() => {
                    notification.show(
                        `Sistema carregado com sucesso!<br>
                        <strong>${donations.length}</strong> registros carregados<br>
                        <em>Toggle de filtros corrigido</em>`, 
                        'info', 
                        6000
                    );
                }, 1000);
                
            } catch (error) {
                console.error('Erro na inicialização:', error);
                notification.show('Erro ao inicializar o sistema. Recarregue a página.', 'error');
            }
        }

        // Inicializar quando a página carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
        } else {
            initialize();
        }

        // API para integração futura
        window.DonationSystem = {
            addExternalData(data) {
                const donation = {
                    id: nextId++,
                    data: data.date || new Date().toISOString().split('T')[0],
                    tipo: data.type || 'Pontual',
                    categoria: data.category || 'Geral',
                    responsavel: data.responsible || 'Sistema Externo',
                    valor: data.value || 0,
                    origem: 'externo',
                    timestamp: Date.now(),
                    ...data
                };
                
                addDonationToTable(donation, true);
                
                notification.show(
                    `🔗 Dados recebidos via API!<br>
                    <strong>${donation.categoria}</strong><br>
                    Por: ${donation.responsavel}`, 
                    'info'
                );
                
                return donation.id;
            },
            
            getFilteredData() {
                return getFilteredDonations();
            },
            
            getAllData() {
                return donations;
            },
            
            generateReport(config = {}) {
                if (config.responsible) elements.responsible.value = config.responsible;
                if (config.startDate) elements.startPeriod.value = config.startDate;
                if (config.endDate) elements.endPeriod.value = config.endDate;
                if (config.type) elements.reportType.value = config.type;
                if (config.category) elements.reportCategory.value = config.category;
                
                generateReport();
            }
        };
        
        console.log('API disponível:', 'window.DonationSystem');
