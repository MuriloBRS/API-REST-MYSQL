import {
    cadastrar,
    listar,
    atualizar,
    deletar
} from "../models/model.js";

const controller = {

    async Cadastrar(req, res) {
        try {
            const { nome, email } = req.body;

            if (!nome || !email) {
                return res.status(400).json({
                    message: "Todos os campos têm que estar preenchidos"
                });
            }

            const resultado = await cadastrar(nome, email);

            res.status(201).json(resultado);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao cadastrar usuário",
                error: error.message
            });
        }
    },

    async Listar(req, res) {
        try {
            const resultado = await listar();

            res.status(200).json(resultado);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao listar usuários",
                error: error.message
            });
        }
    },

    async Atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;

            const resultado = await atualizar(id, nome, email);

            if (!resultado) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            res.status(200).json(resultado);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao atualizar usuário",
                error: error.message
            });
        }
    },

    async Deletar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await deletar(id);

            if (!resultado) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            res.status(200).json({
                message: "Usuário deletado com sucesso"
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao deletar usuário",
                error: error.message
            });
        }
    }
};

export default controller;