document.addEventListener('DOMContentLoaded', function() {
    const primeiraEtapa = document.querySelector('.primeiro');
    const segundaEtapa = document.querySelector('.segundo');
    const passo1Indicador = document.getElementById('passo-1');
    const passo2Indicador = document.getElementById('passo-2');
    const botaoContinuar = document.getElementById('bottao');
    const botaoVoltar = document.getElementById('botao1');
    const botaoCadastrar = document.getElementById('botao2');
    const nomeOngInput = document.getElementById('nome-ong');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const cnpjInput = document.getElementById('cnpj');
    const telefoneInput = document.getElementById('telefone');
    const termosCheckbox = document.getElementById('termos');
    const simCheckbox = document.getElementById('elemento-escolha-1');
    const naoCheckbox = document.getElementById('elemento-escolha-2');
    const senhaToggleElements = document.querySelectorAll('.mostrar-senha');

    const requisitoDigitos = document.getElementById('req-digitos');
    const requisitoNumeros = document.getElementById('req-numeros');
    const requisitoEspecial = document.getElementById('req-especial');
    const requisitoMaiuscula = document.getElementById('req-maiuscula');

    let erroSenhaModal = null; 
    const erroSenhaModalBody = document.getElementById('erroSenhaModalBody');

    function mostrarErro(mensagem) {
        if (!erroSenhaModal) {
            const modalElement = document.getElementById('erroSenhaModal');
            if (modalElement) {
                erroSenhaModal = new bootstrap.Modal(modalElement);
            } else {
                console.error("Elemento do modal #erroSenhaModal não foi encontrado no DOM.");
                alert(mensagem); 
                return;
            }
        }
        
        if (erroSenhaModalBody) {
            erroSenhaModalBody.innerHTML = mensagem;
        }
        erroSenhaModal.show();
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validarSenha(senha) {
        const temOitoDigitos = senha.length >= 8;
        const temDoisNumeros = (senha.match(/\d/g) || []).length >= 2;
        const temCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const temLetraMaiuscula = /[A-Z]/.test(senha);
        
        return {
            valido: temOitoDigitos && temDoisNumeros && temCaracterEspecial && temLetraMaiuscula,
            temOitoDigitos, temDoisNumeros, temCaracterEspecial, temLetraMaiuscula
        };
    }

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
        let tamanho = 12, numeros = cnpj.substring(0, tamanho), digitos = cnpj.substring(12), soma = 0, pos = 5;
        for (let i = 0; i < tamanho; i++) {
            soma += parseInt(numeros.charAt(i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        tamanho = 13; numeros = cnpj.substring(0, tamanho); soma = 0; pos = 6;
        for (let i = 0; i < tamanho; i++) {
            soma += parseInt(numeros.charAt(i)) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) return false;
        return true;
    }

    function atualizarCoresRequisitos(validacao) {
        const corValidado = "#28a745", corPadrao = "#666";
        if (requisitoDigitos) requisitoDigitos.style.color = validacao.temOitoDigitos ? corValidado : corPadrao;
        if (requisitoNumeros) requisitoNumeros.style.color = validacao.temDoisNumeros ? corValidado : corPadrao;
        if (requisitoEspecial) requisitoEspecial.style.color = validacao.temCaracterEspecial ? corValidado : corPadrao;
        if (requisitoMaiuscula) requisitoMaiuscula.style.color = validacao.temLetraMaiuscula ? corValidado : corPadrao;
    }

    senhaInput.addEventListener('input', function() {
        const validacao = validarSenha(this.value);
        atualizarCoresRequisitos(validacao);
    });
    
    cnpjInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value.slice(0, 18);
    });
    
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value.slice(0, 15);
    });

    senhaToggleElements.forEach(function(element) {
        element.addEventListener('click', function() {
            const input = this.closest('.senha-grupo').querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                if(icon) icon.className = 'ph ph-eye-slash';
            } else {
                input.type = 'password';
                if(icon) icon.className = 'ph ph-eye';
            }
        });
    });

    if (simCheckbox && naoCheckbox) {
        const textoCertificado = document.querySelector('.texto-certificado');
        const uploadContainer = document.getElementById('upload-id');

        if (textoCertificado && uploadContainer) {
            textoCertificado.style.display = 'none';
            uploadContainer.style.display = 'none';

            simCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    naoCheckbox.checked = false;
                    textoCertificado.style.display = 'block';
                    uploadContainer.style.display = 'flex';
                } else {
                    textoCertificado.style.display = 'none';
                    uploadContainer.style.display = 'none';
                }
            });
            
            naoCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    simCheckbox.checked = false;
                    textoCertificado.style.display = 'none';
                    uploadContainer.style.display = 'none';
                }
            });
        }
    }

    botaoContinuar.addEventListener('click', function(e) {
        e.preventDefault();
        const resultadoValidacao = validarSenha(senhaInput.value);
        let msg = [];

        if (!nomeOngInput.value.trim()) msg.push('• Por favor, preencha o nome da ONG.');
        if (!validarEmail(emailInput.value)) msg.push('• Por favor, forneça um e-mail válido.');
        if (!resultadoValidacao.valido) {
            let subMsg = [];
            if (!resultadoValidacao.temOitoDigitos) subMsg.push('mínimo 8 dígitos');
            if (!resultadoValidacao.temDoisNumeros) subMsg.push('pelo menos 2 números');
            if (!resultadoValidacao.temCaracterEspecial) subMsg.push('pelo menos 1 caractere especial');
            if (!resultadoValidacao.temLetraMaiuscula) subMsg.push('pelo menos 1 letra MAIÚSCULA');
            msg.push('• Sua senha precisa ter: ' + subMsg.join(', ') + '.');
        }
        if (senhaInput.value !== confirmaSenhaInput.value) msg.push('• As senhas não coincidem.');

        if (msg.length > 0) {
            mostrarErro(msg.join('<br>'));
        } else {
            primeiraEtapa.style.display = 'none';
            segundaEtapa.style.display = 'block';
            if(passo1Indicador && passo2Indicador){
                passo1Indicador.classList.remove('ativo');
                passo2Indicador.classList.add('ativo');
            }
        }
    });

    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function(e) {
            e.preventDefault();
            segundaEtapa.style.display = 'none';
            primeiraEtapa.style.display = 'block';
            if(passo1Indicador && passo2Indicador){
                passo2Indicador.classList.remove('ativo');
                passo1Indicador.classList.add('ativo');
            }
        });
    }

    if (botaoCadastrar) {
        botaoCadastrar.addEventListener('click', function(e) {
            e.preventDefault();
            let erros = [];
            if (!validarCNPJ(cnpjInput.value)) erros.push('• Por favor, preencha um CNPJ válido.');
            if (telefoneInput.value.replace(/\D/g, '').length < 10) erros.push('• Por favor, forneça um telefone válido com DDD.');
            if (!termosCheckbox.checked) erros.push('• Você precisa aceitar os termos de uso e a política de privacidade.');

            if (erros.length > 0) {
                mostrarErro(erros.join('<br>'));
            } else {
                alert('Cadastro realizado com sucesso!');
            }
        });
    }
});