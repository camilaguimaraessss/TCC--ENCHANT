import { userRegisterDoador, userRegisterDonatario, userRegisterInstituicao, userRegisterOng } from "../services/registerUser.service.js";

async function registerUserDoador(req, res) {
    
    console.log(`📦   Dados recebidos: ${JSON.stringify(req.body)}}   📦`);

    try{

        const {} = req.body;

        if (!boraBill) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios. '});
        };

        const newUser = await userRegisterDoador({});

    }catch (error){
        console.error(`❌   Erro na transação: ${error}   ❌`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    };

};

async function registerUserDonatario(req, res) {
    
    console.log(`📦   Dados recebidos: ${JSON.stringify(req.body)}}   📦`);

    try{

        const {} = req.body;

        if (!boraBill) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios. '});
        };

        const newUser = await userRegisterDoador({});

    }catch (error){
        console.error(`❌   Erro na transação: ${error}   ❌`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    };

};

async function registerUserInstituicao(req, res) {
    
    console.log(`📦   Dados recebidos: ${JSON.stringify(req.body)}}   📦`);

    try{

        const {} = req.body;

        if (!boraBill) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios. '});
        };

        const newUser = await userRegisterDoador({});

    }catch (error){
        console.error(`❌   Erro na transação: ${error}   ❌`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    };

};

async function registerUserOng(req, res) {
    
    console.log(`📦   Dados recebidos: ${JSON.stringify(req.body)}}   📦`);

    try{

        const {} = req.body;

        if (!boraBill) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios. '});
        };

        const newUser = await userRegisterDoador({});

    }catch (error){
        console.error(`❌   Erro na transação: ${error}   ❌`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    };

};

export { registerUserDoador, registerUserDonatario, registerUserInstituicao, registerUserOng };