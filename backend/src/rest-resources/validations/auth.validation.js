export const loginValidation = {
    bodySchema:{
        type: 'object',
        properties : {
            username: {type : 'string' },
            password : {type : 'string'}
        },
        required : ['username','password'],
    },
    responseSchema: {
        default : {
            type : 'object',
            properties : {
                token : {type : 'string'},
                user : {type : 'object'}
            },
            required: ['token','user'],
        }
    }
};

export const logoutValidation = {
    responseSchema: {
        default : {
            type : 'object',
            properties : {
                message : {type : 'string'}
            },
            required: ['message'],
        }
    }
}

