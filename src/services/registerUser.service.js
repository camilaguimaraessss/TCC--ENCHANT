import pool from '../db/pool.db.js';

async function userRegisterDoador( { } ) {
    
    try{

        const usuarioResult = await pool.query(
            `INSERT INTO usuario (
            nome, email, senha, documento_numero, documento_tipo, tipo_usuario
            ) VALUES ($1, $2, $3, $4, 'CPF', 'Doador') 
            RETURNING id`,
            [nome, email, senha, cpf]
        );

        const usuarioId = usuarioResult.rows[0].id;

        await pool.query(
            `INSERT INTO endereco (cep, bairro, cidade, usuario_id) 
            VALUES ($1, $2, $3, $4) `,
            [cep, bairro, cidade, usuarioId]
        );

        await pool.query(
            `INSERT INTO telefone (telefone, usuario_id) 
            VALUES ($1, $2)`,
            [telefone, usuarioId]
        );

        await pool.query(
            `INSERT INTO usuario_doador (usuario_id, rg) 
            VALUES ($1, $2)`,
            [usuarioId, rg]
        );

        return usuarioResult.rows[0];

    }catch (error){
        console.error(`❌   Erro na transação: ${error}`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    }

}

async function userRegisterDonatario( { } ) {
    
    try{

        const usuarioResult = await pool.query(
            `INSERT INTO usuario (
            nome, email, senha, documento_numero, documento_tipo, tipo_usuario
            ) VALUES ($1, $2, $3, $4, 'CPF', 'Donatario') 
            RETURNING id`,
            [nome, email, senha, cpf]
        );

        const usuarioId = usuarioResult.rows[0].id;

        await pool.query(
            `INSERT INTO endereco (cep, bairro, cidade, usuario_id) 
            VALUES ($1, 'Ipitanga', 'Lauro de Freitas', $2) `,
            [cep, usuarioId]
            //[cep, bairro, cidade, usuarioId]
        );

        await pool.query(
            `INSERT INTO telefone (telefone, usuario_id) 
            VALUES ($1, $2)`,
            [telefone, usuarioId]
        );

        await pool.query(
            `INSERT INTO usuario_donatario (
                usuario_id, rg, genero, descricao, estado_civil, numero_residente, residente_especial, status_ocupacao
            ) VALUES ($1, $2, 'Masculino', $3, 'Solteiro', $4, 'TRUE', $5)`,
            [usuarioId, rg, descricao, numeroResidentes, ocupacao]
            //[usuarioId, rg, descricao, estadoCivil, numeroResidentes, ocupacao]
        );

    }catch (error){
        console.error(`❌   Erro na transação: ${error}`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    }
}

async function userRegisterInstituicao( { } ) {
    
    try{
    
        const usuarioResult = await pool.query(
            `INSERT INTO usuario (
            nome, email, senha, documento_numero, documento_tipo, tipo_usuario
            ) VALUES ($1, $2, $3, $4, 'CNPJ', 'Instituicao') 
            RETURNING id`,
            [nome, email, senha, cnpj]
        );

        const usuarioId = usuarioResult.rows[0].id;

        await pool.query(
            `INSERT INTO endereco (cep, bairro, cidade, usuario_id) 
            VALUES ($1, $2, $3, $4) `,
            [cep, bairro, cidade, usuarioId]
        );
        
        await pool.query(
            `INSERT INTO telefone (telefone, usuario_id) 
            VALUES ($1, $2)`,
            [telefone, usuarioId]
        );

        await pool.query(
            `INSERT INTO usuario_instituicao (
            usuario_id, tipo_instituicao
            ) VALUES ($1, $2)`,
            [usuarioId, tipo_instituicao]
        );

        return usuarioResult.rows[0];

    }catch (error){
        console.error(`❌   Erro na transação: ${error}`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    }

}

async function userRegisterOng( { } ) {
    
    try{

        const usuarioResult = await pool.query(
            `INSERT INTO usuario (
            nome, email, senha, documento_numero, documento_tipo, tipo_usuario
            ) VALUES ($1, $2, $3, $4, 'CNPJ', 'ONG') 
            RETURNING id`,
            [nome, email, senha, cnpj]
        );

        const usuarioId = usuarioResult.rows[0].id;

        await pool.query(
            `INSERT INTO endereco (cep, bairro, cidade, usuario_id) 
            VALUES ($1, $2, $3, $4) `,
            [cep, bairro, cidade, usuarioId]
        );
        
        await pool.query(
            `INSERT INTO telefone (telefone, usuario_id) 
            VALUES ($1, $2)`,
            [telefone, usuarioId]
        );

        await pool.query(
            `INSERT INTO usuario_ong (
            usuario_id, data_fundacao, certificado_ong
            ) VALUES ($1, $2, $3)`,
            [usuarioId, meses, certificacao]
        );

        return usuarioResult.rows[0];

    }catch (error){
        console.error(`❌   Erro na transação: ${error}`);
        throw new Error('➡️   Erro ao registrar usuário Doador   ⬅️');
    }

}

export { userRegisterDoador, userRegisterDonatario, userRegisterInstituicao, userRegisterOng };