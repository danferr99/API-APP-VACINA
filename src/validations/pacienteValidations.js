const { body, validationResult } = require('express-validator')
const { validarCPF } = require('../validations/cpfValidations');
const pacienteServico = require('../services/pacienteServico');
//funcao aplica validação
const PacienteValidationRules = () => {
    return [
        
        body('email').isEmail().withMessage("E-mail inválido"),
        
        body('email').notEmpty().withMessage("E-mail obrigatório!!"),
        
        body('nome').notEmpty().withMessage("Nome obrigatório!!"),
        
        body('nome').isLength({ min: 5, max: 100 }).withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),
        
        body('senha').notEmpty().withMessage("Senha obrigatória!!"),
        
        
        
       
        
       body('cpf').isLength({ min: 11, max: 11 }).withMessage('Tamanho deve ser de 11 caracteres'),
       
       

        body('email').custom(async (value) => {
            const resultadoPaciente = await pacienteServico.buscaPacientePorEmail(value);
            console.log(resultadoPaciente);
            if (resultadoPaciente != null) {
                throw new Error('Email já existe, cadastro não permitido!');
            }
            return true;


        }).withMessage('Email já existe , cadastro não permitido'),
        
        body('cpf').notEmpty().withMessage('CPF obrigatório'),
        body('cpf').custom((value) => {
            if (!validarCPF(value))
                throw new Error('CPF é inválido!');
            return true;
        }).withMessage('Cpf inválido'),
        body('cpf').custom(async (value) => {
            const resultadoPaciente = await pacienteServico.buscaPacientePorCpf(value);
            console.log(resultadoPaciente);
            if (resultadoPaciente != null) {
                throw new Error('CPF já existe, cadastro não permitido!');
            }
            return true;
        }),




    ]
}

module.exports = {
    PacienteValidationRules,
}
