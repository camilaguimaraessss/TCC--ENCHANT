// Estados e cidades do Brasil
const estadosCidades = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
    'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
    'AP': ['Macapá', 'Santana', 'Laranjal do Jari'],
    'AM': ['Manaus', 'Parintins', 'Itacoatiara'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
    'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha', 'Serra'],
    'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
    'MA': ['São Luís', 'Imperatriz', 'Timon'],
    'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
    'MS': ['Campo Grande', 'Dourados', 'Três Lagoas'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
    'PA': ['Belém', 'Ananindeua', 'Santarém'],
    'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita'],
    'PR': ['Curitiba', 'Londrina', 'Maringá'],
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
    'PI': ['Teresina', 'Parnaíba', 'Picos'],
    'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias'],
    'RN': ['Natal', 'Mossoró', 'Parnamirim'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
    'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
    'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
    'SP': ['São Paulo', 'Guarulhos', 'Campinas'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
    'TO': ['Palmas', 'Araguaína', 'Gurupi']
};

document.addEventListener('DOMContentLoaded', function() {
    const primeiraParte = document.getElementById('primeira-parte');
    const segundaParte = document.getElementById('segunda-parte');
    
    // Garante que a primeira parte seja exibida e a segunda oculta ao carregar
    if (primeiraParte) primeiraParte.style.display = 'block';
    if (segundaParte) segundaParte.style.display = 'none';

    // Popular o dropdown de estados dinamicamente
    const estadoSelect = document.getElementById('estado');
    if (estadoSelect) {
        for (const sigla in estadosCidades) {
            const option = document.createElement('option');
            option.value = sigla;
            option.textContent = sigla; // Idealmente, seria o nome completo do estado
            estadoSelect.appendChild(option);
        }
    }

    // Lida com a submissão da primeira parte do formulário
    const dadosForm = document.getElementById('dados-form');
    if (dadosForm) {
        dadosForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário
            irParaPagamento();
        });
    }

    addInputMasks(); // Adiciona máscaras aos inputs
});

function atualizarCidades() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    const estadoSelecionado = estadoSelect.value;

    cidadeSelect.innerHTML = '<option value="" hidden>Selecione uma cidade...</option>';
    cidadeSelect.disabled = true;

    if (estadoSelecionado && estadosCidades[estadoSelecionado]) {
        estadosCidades[estadoSelecionado].forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
        cidadeSelect.disabled = false;
    }
}

function validarSenha(senha) {
    const temMinimo8 = senha.length >= 8;
    const tem2Numeros = (senha.match(/\d/g) || []).length >= 2;
    const temCaractereEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    return {
        temMinimo8, tem2Numeros, temCaractereEspecial, temMaiuscula,
        valida: temMinimo8 && tem2Numeros && temCaractereEspecial && temMaiuscula
    };
}

function irParaPagamento() {
    let errors = [];
    const form = document.getElementById('dados-form');

    // Validação de campos obrigatórios
    const nome = form.nomecomprador.value.trim();
    const email = form.email.value.trim();
    const cnpj = form.cnpj.value.trim();
    const tel = form.tel.value.trim();
    const estado = form.estado.value;
    const cidade = form.cidade.value;
    const senha = form.senha.value;
    const confirmarSenha = form.confirmarsenha.value;

    if (!nome) errors.push("O campo 'Nome da Instituição/ONG' é obrigatório.");
    if (!email) errors.push("O campo 'Email' é obrigatório.");
    if (!cnpj) errors.push("O campo 'CNPJ' é obrigatório.");
    if (!tel) errors.push("O campo 'Telefone' é obrigatório.");
    if (!estado) errors.push("Selecione um 'Estado'.");
    if (!cidade) errors.push("Selecione uma 'Cidade'.");
    if (!senha) errors.push("O campo 'Senha' é obrigatório.");
    if (senha !== confirmarSenha) errors.push('As senhas não coincidem.');

    // Validação de senha
    const validacaoSenha = validarSenha(senha);
    if (senha && !validacaoSenha.valida) {
        if (!validacaoSenha.temMinimo8) errors.push('A senha deve ter no mínimo 8 dígitos.');
        if (!validacaoSenha.tem2Numeros) errors.push('A senha deve conter pelo menos 2 números.');
        if (!validacaoSenha.temCaractereEspecial) errors.push('A senha deve conter pelo menos 1 caractere especial.');
        if (!validacaoSenha.temMaiuscula) errors.push('A senha deve conter pelo menos 1 letra maiúscula.');
    }

    // Exibe erros ou avança para a próxima etapa
    if (errors.length > 0) {
        const errorModalBody = document.getElementById('errorModalBody');
        errorModalBody.innerHTML = errors.join('<br>');
        $('#errorModal').modal('show');
        return;
    }

    // Se não houver erros, prossiga
    document.getElementById('display-nome').textContent = nome;
    document.getElementById('display-email').textContent = email;
    document.getElementById('display-telefone').textContent = tel;

    document.getElementById('primeira-parte').style.display = 'none';
    document.getElementById('segunda-parte').style.display = 'flex';
}

function voltarParaDados() {
    document.getElementById('segunda-parte').style.display = 'none';
    document.getElementById('primeira-parte').style.display = 'block';
}

function mudarpagamento(opcao) {
    // Adicione a lógica para alternar entre os formulários de pagamento aqui
    console.log("Forma de pagamento alterada para:", opcao);
}

function addInputMasks() {
    document.getElementById('cnpj').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value.substring(0, 18);
    });

    document.getElementById('tel').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 9) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        e.target.value = value.substring(0, 15);
    });
}