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

export const newPasswordValidation = {
    bodySchema:{
        type: 'object',
        properties : {
             email: {type : 'string'},
        },
        required : ['email'],
    },
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

export const resetPasswordValidation = {
    bodySchema:{
        type: 'object',
        properties : {
             old_password: {type : 'string'},
             new_password: {type : 'string'},
        },
        required : ['old_password','new_password'],
    },
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