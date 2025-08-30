document.addEventListener('DOMContentLoaded', function() {
    // Variáveis para controle de etapas
    const etapas = [
        document.getElementById('etapa1'),
        document.getElementById('etapa2'),
        document.getElementById('etapa3'),
        document.getElementById('etapa4')
    ];
    
    const passosContainers = [
        document.querySelector('.passos-container1'),
        document.querySelector('.passos-container2'),
        document.querySelector('.passos-container3'),
        document.querySelector('.passos-container4')
    ];
    
    const passos = [
        document.getElementById('passo1'),
        document.getElementById('passo2'),
        document.getElementById('passo3'),
        document.getElementById('passo4')
    ];

    // Listeners para botões de navegação
    document.getElementById('formEtapa1').addEventListener('submit', validarEtapa1);
    document.getElementById('formEtapa2').addEventListener('submit', validarEtapa2);
    document.getElementById('formEtapa3').addEventListener('submit', validarEtapa3);
    document.getElementById('formEtapa4').addEventListener('submit', validarEtapa4);
    
    // Botões voltar
    document.getElementById('voltar1').addEventListener('click', function() {
        mudarEtapa(1, 0);
    });
    
    document.getElementById('voltar2').addEventListener('click', function() {
        mudarEtapa(2, 1);
    });
    
    // CORREÇÃO: Botão voltar da etapa 4 deve voltar para etapa 3 (índice 2)
    document.getElementById('voltar3').addEventListener('click', function() {
        mudarEtapa(3, 2); // Da etapa 4 (índice 3) para etapa 3 (índice 2)
    });

    // Mostrar/ocultar senha
    const iconesMostrarSenha = document.querySelectorAll('.mostrar-senha');
    iconesMostrarSenha.forEach(icone => {
        icone.addEventListener('click', toggleMostrarSenha);
    });

    // Validação de senha em tempo real
    const campoSenha = document.getElementById('senha');
    if (campoSenha) {
        campoSenha.addEventListener('input', validarRequisitos);
    }

    // Máscaras para campos
    const campoTelefone = document.getElementById('telefone');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function() {
            this.value = formatarTelefone(this.value);
        });
    }

    const campoCPF = document.getElementById('cpf');
    if (campoCPF) {
        campoCPF.addEventListener('input', function() {
            this.value = formatarCPF(this.value);
        });
    }

    const campoCEP = document.getElementById('cep');
    if (campoCEP) {
        campoCEP.addEventListener('input', function() {
            this.value = formatarCEP(this.value);
        });
    }

    const campoRG = document.getElementById('rg');
    if (campoRG) {
        campoRG.addEventListener('input', function() {
            this.value = formatarRG(this.value);
        });
    }

    // Função para alternar visibilidade da senha
    function toggleMostrarSenha(e) {
        const campoSenhaProximo = e.target.closest('.input-wrapper').querySelector('input');
        if (campoSenhaProximo.type === 'password') {
            campoSenhaProximo.type = 'text';
            e.target.classList.remove('fa-eye');
            e.target.classList.add('fa-eye-slash');
        } else {
            campoSenhaProximo.type = 'password';
            e.target.classList.remove('fa-eye-slash');
            e.target.classList.add('fa-eye');
        }
    }

    // Função para mudar de etapa
    function mudarEtapa(etapaAtual, proximaEtapa) {
        console.log('Mudando da etapa', etapaAtual + 1, 'para', proximaEtapa + 1);
        
        // Verificar se os elementos existem antes de manipulá-los
        if (!etapas[etapaAtual] || !etapas[proximaEtapa]) {
            console.error('Etapa não encontrada:', etapaAtual, proximaEtapa);
            return;
        }
        
        // Ocultar todas as etapas primeiro
        etapas.forEach((etapa, index) => {
            if (etapa) {
                etapa.style.display = 'none';
                if (passosContainers[index]) {
                    passosContainers[index].style.display = 'none';
                }
                if (passos[index]) {
                    passos[index].classList.remove('ativo');
                }
            }
        });
        
        // Mostrar próxima etapa
        etapas[proximaEtapa].style.display = 'block';
        if (passosContainers[proximaEtapa]) {
            passosContainers[proximaEtapa].style.display = 'flex';
        }
        
        // Atualizar indicadores de passo
        if (passos[proximaEtapa]) {
            passos[proximaEtapa].classList.add('ativo');
        }
        
        // Rolar para o topo
        window.scrollTo(0, 0);
    }

    // Validação da etapa 1
    function validarEtapa1(e) {
        e.preventDefault();
        
        // Verificar se campos obrigatórios estão preenchidos
        const nome = document.getElementById('nome-completo').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirma-senha').value;
        
        if (!nome) {
            mostrarModal('Por favor, preencha o nome completo.');
            return;
        }
        
        if (!email || !validarEmail(email)) {
            mostrarModal('Por favor, insira um e-mail válido.');
            return;
        }
        
        if (!validarSenhaCompleta(senha)) {
            mostrarModal('A senha não atende a todos os requisitos.');
            return;
        }
        
        if (senha !== confirmaSenha) {
            mostrarModal('As senhas não coincidem.');
            return;
        }
        
        // Se passou por todas as validações, avança para a próxima etapa
        mudarEtapa(0, 1);
    }

    // Validação da etapa 2
    function validarEtapa2(e) {
        e.preventDefault();
        
        // Verificar se campos obrigatórios estão preenchidos
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const rg = document.getElementById('rg').value.trim();
        const cep = document.getElementById('cep').value.trim();
        
        if (!telefone || telefone.length < 14) {
            mostrarModal('Por favor, insira um número de telefone válido.');
            return;
        }
        
        if (!endereco) {
            mostrarModal('Por favor, preencha o endereço completo.');
            return;
        }
        
        if (!validarCPF(cpf.replace(/\D/g, ''))) {
            mostrarModal('CPF inválido. Por favor, verifique.');
            return;
        }
        
        if (!validarRG(rg)) {
            mostrarModal('RG inválido. Por favor, verifique.');
            return;
        }
        
        if (!validarCEP(cep)) {
            mostrarModal('CEP inválido. Formato esperado: XXXXX-XXX');
            return;
        }
        
        // Se passou por todas as validações, avança para a próxima etapa
        mudarEtapa(1, 2);
    }

    // Validação da etapa 3 - COM VALIDAÇÕES DE FOTO E VÍDEO
    function validarEtapa3(e) {
        e.preventDefault();
        
        const inputFoto = document.getElementById('ffoto');
        const inputVideo = document.getElementById('vvideo');
        const observacoes = document.getElementById('campos').value.trim();
        
        // Verificar se a foto foi selecionada
        if (!inputFoto.files.length) {
            mostrarModal('Por favor, selecione uma foto 3x4.');
            return;
        }
        
        // Verificar se o vídeo foi selecionado
        if (!inputVideo.files.length) {
            mostrarModal('Por favor, selecione um vídeo esclarecedor.');
            return;
        }
        
        const arquivoFoto = inputFoto.files[0];
        const arquivoVideo = inputVideo.files[0];
        
        // Validar foto
        const validacaoFoto = validarFoto(arquivoFoto);
        if (!validacaoFoto.valido) {
            mostrarModal('Erro na foto: ' + validacaoFoto.mensagem);
            return;
        }
        
        // Validar vídeo
        const validacaoVideo = validarVideo(arquivoVideo);
        if (!validacaoVideo.valido) {
            mostrarModal('Erro no vídeo: ' + validacaoVideo.mensagem);
            return;
        }
        
        // Verificar observações
        if (!observacoes) {
            mostrarModal('Por favor, preencha o campo de observações.');
            return;
        }
        
        // Validar dimensões da foto (verificação assíncrona)
        validarDimensoesFoto(arquivoFoto).then(dimensoesValidas => {
            if (!dimensoesValidas) {
                mostrarModal('A foto deve ter proporções próximas ao formato 3x4. Por favor, selecione uma foto com essas dimensões.');
                return;
            }
            
            console.log('Validação da etapa 3 passou, mudando para etapa 4');
            // CORREÇÃO: Mudar da etapa 3 (índice 2) para etapa 4 (índice 3)
            mudarEtapa(2, 3);
        }).catch(error => {
            console.error('Erro ao validar dimensões da foto:', error);
            mostrarModal('Erro ao processar a foto. Por favor, tente novamente.');
        });
    }

    // Validação da etapa 4 (final)
    function validarEtapa4(e) {
        e.preventDefault();
        
        const estadoCivil = document.querySelector('input[name="estado-civil"]:checked');
        const numeroPessoas = document.getElementById('numerodepessoas').value.trim();
        const ocupacao = document.getElementById('ocupacao').value.trim();
        const termosAceitos = document.getElementById('termos').checked;
        
        if (!estadoCivil) {
            mostrarModal('Por favor, selecione seu estado civil.');
            return;
        }
        
        if (!numeroPessoas || numeroPessoas <= 0) {
            mostrarModal('Por favor, insira um número válido de pessoas na casa.');
            return;
        }
        
        if (!ocupacao) {
            mostrarModal('Por favor, informe sua ocupação/profissão.');
            return;
        }
        
        if (!termosAceitos) {
            mostrarModal('Para prosseguir, você precisa aceitar os termos de uso e a política de privacidade.');
            return;
        }
        
        // Finaliza o cadastro (normalmente enviaria para o servidor)
        mostrarModal('Cadastro realizado com sucesso!');
        // Aqui seria feito o envio dos dados para o servidor
        // window.location.href = 'pagina-de-sucesso.html';
    }

    // Funções de validação de campos específicos
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais (caso inválido)
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let resto = soma % 11;
        let dv1 = resto < 2 ? 0 : 11 - resto;
        
        if (dv1 !== parseInt(cpf.charAt(9))) return false;
        
        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        
        resto = soma % 11;
        let dv2 = resto < 2 ? 0 : 11 - resto;
        
        if (dv2 !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }

    function validarRG(rg) {
        // Remove caracteres não alfanuméricos
        rg = rg.replace(/[^\w]/g, '');
        
        // RG deve ter entre 5 e 14 caracteres
        return rg.length >= 5 && rg.length <= 14;
    }

    function validarCEP(cep) {
        const re = /^[0-9]{5}-[0-9]{3}$/;
        return re.test(cep);
    }

    // NOVA FUNÇÃO: Validação completa da foto
    function validarFoto(arquivo) {
        // Verificar se o arquivo existe
        if (!arquivo) {
            return { valido: false, mensagem: 'Nenhuma foto foi selecionada.' };
        }
        
        // Verificar tipo de arquivo
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!tiposPermitidos.includes(arquivo.type)) {
            return { 
                valido: false, 
                mensagem: 'Formato de foto inválido. Use apenas JPG, JPEG ou PNG.' 
            };
        }
        
        // Verificar tamanho do arquivo (máximo 10MB)
        const tamanhoMaximo = 10 * 1024 * 1024; // 10MB em bytes
        if (arquivo.size > tamanhoMaximo) {
            return { 
                valido: false, 
                mensagem: 'A foto é muito grande. O tamanho máximo é 10MB.' 
            };
        }
        
        return { valido: true, mensagem: 'Foto válida.' };
    }

    // NOVA FUNÇÃO: Validação das dimensões da foto (formato 3x4)
    function validarDimensoesFoto(arquivo) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(arquivo);
            
            img.onload = function() {
                const largura = this.naturalWidth;
                const altura = this.naturalHeight;
                
                // Calcular proporção (3:4 = 0.75)
                const proporcao = largura / altura;
                const proporcaoIdeal = 3 / 4; // 0.75
                
                // Permitir uma tolerância de ±10% na proporção
                const tolerancia = 0.1;
                const proporcaoMinima = proporcaoIdeal - tolerancia;
                const proporcaoMaxima = proporcaoIdeal + tolerancia;
                
                console.log(`Dimensões da foto: ${largura}x${altura}`);
                console.log(`Proporção atual: ${proporcao.toFixed(3)}`);
                console.log(`Proporção esperada: ${proporcaoIdeal} (±${tolerancia})`);
                
                const dimensoesValidas = proporcao >= proporcaoMinima && proporcao <= proporcaoMaxima;
                
                // Limpar o URL do objeto para liberar memória
                URL.revokeObjectURL(url);
                
                resolve(dimensoesValidas);
            };
            
            img.onerror = function() {
                URL.revokeObjectURL(url);
                reject(new Error('Erro ao carregar a imagem'));
            };
            
            img.src = url;
        });
    }

    // NOVA FUNÇÃO: Validação completa do vídeo
    function validarVideo(arquivo) {
        // Verificar se o arquivo existe
        if (!arquivo) {
            return { valido: false, mensagem: 'Nenhum vídeo foi selecionado.' };
        }
        
        // Verificar se é um arquivo de vídeo
        if (!arquivo.type.startsWith('video/')) {
            return { 
                valido: false, 
                mensagem: 'Formato de arquivo inválido. Selecione um arquivo de vídeo.' 
            };
        }
        
        // Verificar tamanho do arquivo (máximo 200MB)
        const tamanhoMaximo = 200 * 1024 * 1024; // 200MB em bytes
        if (arquivo.size > tamanhoMaximo) {
            return { 
                valido: false, 
                mensagem: 'O vídeo é muito grande. O tamanho máximo é 200MB.' 
            };
        }
        
        return { valido: true, mensagem: 'Vídeo válido.' };
    }

    // NOVA FUNÇÃO: Validação da duração do vídeo (máximo 2 minutos)
    function validarDuracaoVideo(arquivo) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const url = URL.createObjectURL(arquivo);
            
            video.onloadedmetadata = function() {
                const duracao = this.duration; // duração em segundos
                const duracaoMaxima = 2 * 60; // 2 minutos em segundos
                
                console.log(`Duração do vídeo: ${duracao.toFixed(2)} segundos`);
                console.log(`Duração máxima permitida: ${duracaoMaxima} segundos`);
                
                const duracaoValida = duracao <= duracaoMaxima;
                
                // Limpar o URL do objeto para liberar memória
                URL.revokeObjectURL(url);
                
                resolve({
                    valido: duracaoValida,
                    duracao: duracao,
                    mensagem: duracaoValida ? 
                        'Duração do vídeo é válida.' : 
                        `O vídeo deve ter no máximo 2 minutos. Duração atual: ${Math.ceil(duracao/60)} minuto(s).`
                });
            };
            
            video.onerror = function() {
                URL.revokeObjectURL(url);
                reject(new Error('Erro ao carregar o vídeo'));
            };
            
            video.src = url;
        });
    }

    // ATUALIZAR: Modificar a validação da etapa 3 para incluir duração do vídeo
    function validarEtapa3Completa(e) {
        e.preventDefault();
        
        const inputFoto = document.getElementById('ffoto');
        const inputVideo = document.getElementById('vvideo');
        const observacoes = document.getElementById('campos').value.trim();
        
        // Verificar se a foto foi selecionada
        if (!inputFoto.files.length) {
            mostrarModal('Por favor, selecione uma foto 3x4.');
            return;
        }
        
        // Verificar se o vídeo foi selecionado
        if (!inputVideo.files.length) {
            mostrarModal('Por favor, selecione um vídeo esclarecedor.');
            return;
        }
        
        const arquivoFoto = inputFoto.files[0];
        const arquivoVideo = inputVideo.files[0];
        
        // Validar foto
        const validacaoFoto = validarFoto(arquivoFoto);
        if (!validacaoFoto.valido) {
            mostrarModal('Erro na foto: ' + validacaoFoto.mensagem);
            return;
        }
        
        // Validar vídeo
        const validacaoVideo = validarVideo(arquivoVideo);
        if (!validacaoVideo.valido) {
            mostrarModal('Erro no vídeo: ' + validacaoVideo.mensagem);
            return;
        }
        
        // Verificar observações
        if (!observacoes) {
            mostrarModal('Por favor, preencha o campo de observações.');
            return;
        }
        
        // Validações assíncronas (dimensões da foto e duração do vídeo)
        Promise.all([
            validarDimensoesFoto(arquivoFoto),
            validarDuracaoVideo(arquivoVideo)
        ]).then(([dimensoesValidas, validacaoDuracao]) => {
            if (!dimensoesValidas) {
                mostrarModal('A foto deve ter proporções próximas ao formato 3x4. Por favor, selecione uma foto com essas dimensões.');
                return;
            }
            
            if (!validacaoDuracao.valido) {
                mostrarModal('Erro na duração do vídeo: ' + validacaoDuracao.mensagem);
                return;
            }
            
            console.log('Validação da etapa 3 passou completamente, mudando para etapa 4');
            mudarEtapa(2, 3);
            
        }).catch(error => {
            console.error('Erro nas validações:', error);
            mostrarModal('Erro ao processar os arquivos. Por favor, tente novamente.');
        });
    }

    // Sobrescrever a função validarEtapa3 original
    validarEtapa3 = validarEtapa3Completa;

    // Validação dos requisitos de senha em tempo real
    function validarRequisitos() {
        const senha = document.getElementById('senha').value;
        
        // Validar requisitos individuais
        const oitoDigitos = senha.length >= 8;
        const doisNumeros = (senha.match(/[0-9]/g) || []).length >= 2;
        const caractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const letraMaiuscula = /[A-Z]/.test(senha);
        
        // Atualizar indicadores visuais
        atualizarIndicadorRequisito('requisito-oito-digitos', oitoDigitos);
        atualizarIndicadorRequisito('requisito-dois-numeros', doisNumeros);
        atualizarIndicadorRequisito('requisito-caractere-especial', caractereEspecial);
        atualizarIndicadorRequisito('requisito-letra-maiuscula', letraMaiuscula);
    }

    function atualizarIndicadorRequisito(id, cumprido) {
        const elemento = document.getElementById(id);
        if (elemento) {
            if (cumprido) {
                elemento.classList.add('cumprido');
            } else {
                elemento.classList.remove('cumprido');
            }
        }
    }

    function validarSenhaCompleta(senha) {
        // Verifica todos os requisitos
        const oitoDigitos = senha.length >= 8;
        const doisNumeros = (senha.match(/[0-9]/g) || []).length >= 2;
        const caractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const letraMaiuscula = /[A-Z]/.test(senha);
        
        return oitoDigitos && doisNumeros && caractereEspecial && letraMaiuscula;
    }

    // Funções de formatação de campos
    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length > 11) telefone = telefone.substring(0, 11);
        
        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (telefone.length > 6) {
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else if (telefone.length > 0) {
            telefone = telefone.replace(/^(\d{0,2}).*/, '($1');
        }
        
        return telefone;
    }

    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length > 11) cpf = cpf.substring(0, 11);
        
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        return cpf;
    }

    function formatarCEP(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 8) cep = cep.substring(0, 8);
        
        cep = cep.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
        
        return cep;
    }

    function formatarRG(rg) {
        rg = rg.replace(/\D/g, '');
        if (rg.length > 9) rg = rg.substring(0, 9);
        
        return rg;
    }

    // Função para mostrar modal (unificada para erros e sucesso)
    function mostrarModal(mensagem) {
        const modalBody = document.getElementById('erroSenhaModalBody');
        if (modalBody) {
            modalBody.textContent = mensagem;
            
            // Usa o Bootstrap para mostrar o modal
            const erroModal = new bootstrap.Modal(document.getElementById('erroSenhaModal'));
            erroModal.show();
        } else {
            // Fallback se o modal não existir
            alert(mensagem);
        }
    }

    // Adicionar CSS para indicadores de requisitos
    const style = document.createElement('style');
    style.textContent = `
        .requisitos-senha p {
            color: #888;
            transition: color 0.3s ease;
        }
        .requisitos-senha .cumprido {
            color: green;
        }
    `;
    document.head.appendChild(style);

    // Debug: Verificar se todos os elementos necessários existem
    console.log('=== DEBUG ELEMENTOS ===');
    console.log('Etapas encontradas:', etapas.map((e, i) => e ? `etapa${i+1}: OK` : `etapa${i+1}: ERRO`));
    console.log('Passos containers encontrados:', passosContainers.map((p, i) => p ? `container${i+1}: OK` : `container${i+1}: ERRO`));
    console.log('Passos individuais encontrados:', passos.map((p, i) => p ? `passo${i+1}: OK` : `passo${i+1}: ERRO`));
});
