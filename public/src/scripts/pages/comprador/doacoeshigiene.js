// Script para validação dos formulários de doação de móveis e eletrodomésticos

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário de produtos de higiene
    const higieneQuantidade = document.getElementById('higienequantidade');
    const higieneTipo = document.getElementById('higienetipo');
    const higieneRestricao = document.getElementById('higienerestricao');
 
    
    // Elementos do formulário de produtos de limpeza
    const limpezaQuantidade = document.getElementById('limpezaquantidade');
    const limpezaTipo = document.getElementById('limpezatipo');
    const limpezaTamanho = document.getElementById('limpezatamanho');
    
    // Botões de navegação
    const botaoAvancar = document.getElementById('bottao');
    const botaoVoltar = document.getElementById('back-to-higiene');
    const botaoEnviar = document.getElementById('bbtn');
    
    // Imagens de fundo
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    
    // Divs de seção
    const higieneDiv = document.getElementById('higiene');
    const limpezaDiv = document.getElementById('limpeza');
    
    // Tabs
    const higieneTab = document.getElementById('higiene-tab');
    const limpezaTab = document.getElementById('limpeza-tab');
    
    // Modais
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const erroSenhaModal = new bootstrap.Modal(document.getElementById('erroSenhaModal'));
    
    // Mostrar modal inicial quando a página carregar
    mostrarModalInicial();
    
    // Configurar visualização inicial
    mostrarSecaoHigiene();
    mostrarImagem1();
    
    // Event listeners para tabs
    higieneTab.addEventListener('click', function() {
        mostrarSecaoHigiene();
        mostrarImagem1();
    });
    
    limpezaTab.addEventListener('click', function() {
        mostrarSecaoLimpeza();
        mostrarImagem3();
    });
    
    // Event listener para botão Avançar - MODIFICADO para não verificar campos
    botaoAvancar.addEventListener('click', function() {
        // Apenas muda para a próxima seção sem verificar campos
        mostrarSecaoLimpeza();
        mostrarImagem3();
    });
    
    // Event listener para botão Voltar
    botaoVoltar.addEventListener('click', function() {
        mostrarSecaoHigiene();
        mostrarImagem1();
    });
    
// Event listener para botão Enviar - agora exige que os formulários estejam completos se começados
botaoEnviar.addEventListener('click', function () {
    const higienePreenchido = higieneQuantidade.value !== '' || higieneRestricao.value !== '' || higieneTipo.value !== '';
    const limpezaPreenchido = limpezaQuantidade.value !== '' || limpezaTipo.value !== '' || limpezaTamanho.value !== '';

    const higieneValido = validarFormularioHigiene();
    const limpezaValido = validarFormularioLimpeza();

    if (higienePreenchido && !higieneValido) {
        mostrarErro('Por favor, preencha todos os campos da seção de produtos de higiene.');
        return;
    }

    if (limpezaPreenchido && !limpezaValido) {
        mostrarErro('Por favor, preencha todos os campos da seção de produtos de limpeza.');
        return;
    }

    if (higieneValido && limpezaValido) {
        mostrarImagem2();
        mostrarConfirmacao('Doação de produtos de higiene e produtos de limpeza registrada com sucesso!');
    } else if (higieneValido) {
        mostrarImagem2();
        mostrarConfirmacao('Doação de produtos de higiene registrada com sucesso!');
    } else if (limpezaValido) {
        mostrarImagem4();
        mostrarConfirmacao('Doação de produtos de limpeza registrada com sucesso!');
    } else {
        mostrarErro('Por favor, preencha pelo menos um dos formulários (Produtos de Higiene e Produtos de Limpeza) antes de enviar.');
    }
});
    
    // Funções auxiliares
    function validarFormularioHigiene() {
        return higieneQuantidade.value !== '' && 
               higieneTipo.value !== '' && 
               higieneRestricao.value !== '';
    }

    function validarFormularioLimpeza() {
    return limpezaQuantidade.value !== '' &&
           limpezaTipo.value !== '' &&
           limpezaTamanho.value !== '';
}

    
    function mostrarSecaoHigiene() {
        higieneDiv.style.display = 'block';
        limpezaDiv.style.display = 'none';
        higieneTab.classList.add('active');
        limpezaTab.classList.remove('active');
    }
    
    function mostrarSecaoLimpeza() {
        higieneDiv.style.display = 'none';
        limpezaDiv.style.display = 'block';
        higieneTab.classList.remove('active');
        limpezaTab.classList.add('active');
    }
    
    function mostrarImagem1() {
        img1.style.display = 'block';
        img2.style.display = 'none';
        img3.style.display = 'none';
        img4.style.display = 'none';
    }
    
    function mostrarImagem2() {
        img1.style.display = 'none';
        img2.style.display = 'block';
        img3.style.display = 'none';
        img4.style.display = 'none';
    }
    
    function mostrarImagem3() {
        img1.style.display = 'block';
        img2.style.display = 'none';
        img3.style.display = 'none';
        img4.style.display = 'none';
    }
    
    function mostrarImagem4() {
        img1.style.display = 'none';
        img2.style.display = 'block';
        img3.style.display = 'none';
        img4.style.display = 'none';
    }
    
    function mostrarErro(mensagem) {
        document.getElementById('errorModalBody').innerHTML = `<p>${mensagem}</p>`;
        errorModal.show();
    }
    
    function mostrarConfirmacao(mensagem) {
        document.getElementById('confirmModalBody').innerHTML = `<p>${mensagem}</p>`;
        confirmModal.show();
    }
    
    function mostrarModalInicial() {
        document.getElementById('erroSenhaModalBody').innerHTML = `
            <p>Bem-vindo ao formulário de doação!</p>
            <p>Por favor, preencha os dados dos produtos de higiene ou dos produtos de limpeza que deseja doar.</p>
            <p>Após preencher os dados dos produtos de higiene, você pode prosseguir para a página dos produtos de limpeza, para poder enviar sua doação!</p>
            
        `;
        erroSenhaModal.show();
    }
});