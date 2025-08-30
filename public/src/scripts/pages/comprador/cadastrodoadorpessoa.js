// Esperar que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const emailInput = document.getElementById('email');
    
    // --- CORREÇÃO: IDs dos botões ajustados para 'bootao' e 'bootao2' ---
    const botaoContinuar = document.getElementById('bootao');
    const botaoVoltar = document.getElementById('botao1');
    const botaoConfirmar = document.getElementById('bootao2');

    const botoesExibirSenha = document.querySelectorAll('.mostrar-senha');
    const cnpjInput = document.getElementById('cnpj');
    const cpfInput = document.getElementById('cpf');
    const rgInput = document.getElementById('rg');
    const telefoneInput = document.getElementById('telefone');
    const termosCheckbox = document.getElementById('termos');
    
    // Elementos para navegação entre etapas
    const parte1 = document.querySelector('.parte1');
    const parte2 = document.querySelector('.parte2');
    const passos = document.querySelectorAll('.passo');
    
    // Iniciar mostrando apenas a primeira parte
    if (parte1 && parte2) {
        parte1.style.display = 'block';
        parte2.style.display = 'none';
    }
    
    // Função para mostrar o modal com mensagem personalizada
    function mostrarModal(mensagem) {
        const modalBody = document.getElementById('erroSenhaModalBody');
        if (modalBody) {
            modalBody.innerHTML = mensagem;
            
            // Inicializar e mostrar o modal do Bootstrap
            const erroModal = new bootstrap.Modal(document.getElementById('erroSenhaModal'));
            erroModal.show();
        } else {
            // Fallback para alert caso o modal não esteja disponível no HTML
            alert(mensagem.replace(/<[^>]*>?/gm, ''));  // Remove tags HTML para exibir no alert
        }
    }

    // Função para alternar entre as etapas
    function irParaEtapa(etapa) {
        if (etapa === 1) {
            if (parte1) parte1.style.display = 'block';
            if (parte2) parte2.style.display = 'none';
            // Atualiza indicador de passos
            if (passos.length > 1) {
                passos[0].classList.add('ativo');
                passos[1].classList.remove('ativo');
            }
        } else if (etapa === 2) {
            if (parte1) parte1.style.display = 'none';
            if (parte2) parte2.style.display = 'block';
            // Atualiza indicador de passos
            if (passos.length > 1) {
                passos[0].classList.remove('ativo');
                passos[1].classList.add('ativo');
            }
        }
    }

    // Função para validar a senha
    function validarSenha(senha) {
        const resultados = {
            temOitoDigitos: senha.length >= 8,
            temDoisNumeros: (senha.match(/[0-9]/g) || []).length >= 2,
            temCaractereEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
            temLetraMaiuscula: /[A-Z]/.test(senha)
        };
        
        return resultados;
    }

    // Função para verificar se as senhas coincidem
    function senhasCoincidentes() {
        return senhaInput.value === confirmaSenhaInput.value;
    }
    
    // Função para validar o formato do email
    function validarEmail(email) {
        // Expressão regular para validação de email
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email);
    }
    
    // Função para validar CPF
    function validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');
        
        // CPF deve ter 11 dígitos
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais (casos como 11111111111)
        if (/^(\d)\1+$/.test(cpf)) return false;
        
        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
        
        if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;
        
        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
        
        if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }
    
    // Função para validar RG (formato básico, varia por estado)
    function validarRG(rg) {
        // Remove caracteres não numéricos e X (usado em alguns RGs)
        rg = rg.replace(/[^\dXx]/g, '').toUpperCase();
        
        // RG geralmente tem entre 8 e 10 caracteres (números + possível X no final)
        if (rg.length < 8 || rg.length > 10) return false;
        
        // Verificação básica: apenas dígitos e possivelmente um X no final
        return /^[\dX]+$/.test(rg);
    }
    
    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/[^\d]/g, '');
        
        // CNPJ deve ter 14 dígitos
        if (cnpj.length !== 14) return false;
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;
        
        // Validação dos dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        // Cálculo do primeiro dígito verificador
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        
        // Cálculo do segundo dígito verificador
        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;
        
        return true;
    }
    
    // Função para validar telefone
    function validarTelefone(telefone) {
        // Remove caracteres não numéricos
        telefone = telefone.replace(/[^\d]/g, '');
        
        // Telefone deve ter entre 10 e 11 dígitos (com ou sem 9 à frente)
        if (telefone.length < 10 || telefone.length > 11) return false;
        
        // Se tiver 11 dígitos, o terceiro deve ser 9 (para celular)
        if (telefone.length === 11 && telefone.charAt(2) !== '9') return false;
        
        return true;
    }
    
    // Função para formatar CPF enquanto digita
    function formatarCPF(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
        
        input.value = value;
    }
    
    // Função para formatar RG enquanto digita
    function formatarRG(input) {
        let value = input.value.replace(/[^\dXx]/g, '').toUpperCase();
        if (value.length > 9) value = value.slice(0, 9);

        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, "$1.$2");
            if (value.length > 6) {
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                if (value.length > 10) {
                    value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
                }
            }
        }
        
        input.value = value;
    }
    
    // Função para formatar CNPJ enquanto digita
    function formatarCNPJ(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 14) value = value.slice(0, 14);
        
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
        
        input.value = value;
    }
    
    // Função para formatar telefone enquanto digita
    function formatarTelefone(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 6) {
            if (value.length > 10) {
                // Formato celular: (99) 99999-9999
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            } else {
                // Formato fixo: (99) 9999-9999
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
            }
        } else if (value.length > 2) {
            // Só o DDD: (99)
            value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
        }
        
        input.value = value;
    }

    // Adicionar evento de clique ao botão continuar
    if (botaoContinuar) {
        botaoContinuar.addEventListener('click', function(event) {
            event.preventDefault(); // Impedir o comportamento padrão do botão
            
            // Verificar se a senha atende a todos os requisitos
            const senha = senhaInput.value;
            const validacao = validarSenha(senha);
            
            // Verificar se todos os campos estão preenchidos
            const nomeDoador = document.getElementById('nome-ong').value;
            const email = emailInput.value;
            
            if (!nomeDoador || !email || !senha || !confirmaSenhaInput.value) {
                mostrarModal('<p>Por favor, preencha todos os campos obrigatórios!</p>');
                return;
            }
            
            // Validar formato do email
            if (!validarEmail(email)) {
                mostrarModal('<p>Por favor, insira um endereço de e-mail válido!</p>');
                emailInput.focus();
                return;
            }
            
            // Verificar cada requisito da senha
            const erros = [];
            
            if (!validacao.temOitoDigitos) erros.push('Mínimo 8 dígitos');
            if (!validacao.temDoisNumeros) erros.push('Pelo menos 2 números');
            if (!validacao.temCaractereEspecial) erros.push('Pelo menos 1 caractere especial');
            if (!validacao.temLetraMaiuscula) erros.push('Pelo menos 1 letra MAIÚSCULA');
            
            if (erros.length > 0) {
                let mensagemErro = '<p>A senha não atende aos seguintes requisitos:</p><ul>';
                erros.forEach(erro => {
                    mensagemErro += `<li>${erro}</li>`;
                });
                mensagemErro += '</ul>';
                
                mostrarModal(mensagemErro);
                return;
            }
            
            // Verificar se as senhas coincidem
            if (!senhasCoincidentes()) {
                mostrarModal('<p>As senhas não coincidem!</p>');
                return;
            }
            
            // Se passar por todas as validações, avançar para a próxima etapa
            irParaEtapa(2);
        });
    }
    
    // Adicionar evento de clique ao botão voltar
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function(event) {
            event.preventDefault();
            irParaEtapa(1);
        });
    }
    
    // Adicionar evento de clique ao botão confirmar
    if (botaoConfirmar) {
        botaoConfirmar.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir qualquer comportamento padrão

            const cpf = cpfInput.value;
            const rg = rgInput.value;
            const telefone = telefoneInput.value;
            
            if (!cpf || !rg || !telefone) {
                mostrarModal('<p>Por favor, preencha todos os campos obrigatórios!</p>');
                return;
            }
            
            const cpfLimpo = cpf.replace(/[^\d]/g, '');
            if (!validarCPF(cpfLimpo)) {
                mostrarModal('<p>Por favor, insira um CPF válido!</p>');
                return;
            }
            
            const rgLimpo = rg.replace(/[^\dXx]/g, '').toUpperCase();
            if (!validarRG(rgLimpo)) {
                mostrarModal('<p>Por favor, insira um RG válido!</p>');
                return;
            }
            
            const telefoneLimpo = telefone.replace(/[^\d]/g, '');
            if (!validarTelefone(telefoneLimpo)) {
                mostrarModal('<p>Por favor, insira um número de telefone válido!</p>');
                return;
            }
            
            if (!termosCheckbox.checked) {
                mostrarModal('<p>Você precisa aceitar os termos de uso e a política de privacidade para continuar!</p>');
                return;
            }
            
            // --- NOVO: Se tudo estiver ok, redireciona para a página de início ---
            window.location.href = 'inicio2.html';
        });
    }

    // Validação em tempo real para mostrar visualmente os requisitos
    if (senhaInput) {
        senhaInput.addEventListener('input', function() {
            const validacao = validarSenha(this.value);
            const requisitos = document.querySelectorAll('.requisitos-secundarios');
            
            if (requisitos.length >= 4) {
                requisitos[0].style.color = validacao.temOitoDigitos ? 'green' : 'red';
                requisitos[1].style.color = validacao.temDoisNumeros ? 'green' : 'red';
                requisitos[2].style.color = validacao.temCaractereEspecial ? 'green' : 'red';
                requisitos[3].style.color = validacao.temLetraMaiuscula ? 'green' : 'red';
            }
        });
    }
    
    // Validação em tempo real para verificar se as senhas coincidem
    if (confirmaSenhaInput) {
        confirmaSenhaInput.addEventListener('input', function() {
            if (senhaInput.value && this.value) {
                this.style.borderColor = senhasCoincidentes() ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Validação em tempo real do email
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = validarEmail(this.value) ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Validação e formatação em tempo real do CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            formatarCPF(this);
            const cpfLimpo = this.value.replace(/[^\d]/g, '');
            if (cpfLimpo.length === 11) {
                this.style.borderColor = validarCPF(cpfLimpo) ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Validação e formatação em tempo real do RG
    if (rgInput) {
        rgInput.addEventListener('input', function() {
            formatarRG(this);
            const rgLimpo = this.value.replace(/[^\dXx]/g, '').toUpperCase();
             if (rgLimpo.length >= 8) {
                this.style.borderColor = validarRG(rgLimpo) ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Validação e formatação em tempo real do CNPJ (se existir)
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            formatarCNPJ(this);
            const cnpjLimpo = this.value.replace(/[^\d]/g, '');
            if (cnpjLimpo.length === 14) {
                this.style.borderColor = validarCNPJ(cnpjLimpo) ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Validação e formatação em tempo real do telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            formatarTelefone(this);
            const telefoneLimpo = this.value.replace(/[^\d]/g, '');
            if (telefoneLimpo.length >= 10) {
                this.style.borderColor = validarTelefone(telefoneLimpo) ? 'green' : 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Funcionalidade para mostrar/ocultar senha
    botoesExibirSenha.forEach(function(botao) {
        if (!botao) return;
        
        botao.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    // Você pode adicionar um ícone de "olho aberto" aqui se quiser
                    // this.innerHTML = '<i class="bi bi-eye"></i>'; 
                } else {
                    input.type = 'password';
                    // E um ícone de "olho fechado" aqui
                    // this.innerHTML = '<i class="bi bi-eye-slash"></i>';
                }
            }
        });
    });
});