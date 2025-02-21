import pkg from 'jsonwebtoken'
const {sign , verify } = pkg;


export const createToken =  async user => {
    return sign({user:user},process.env.JWT_SECRET,{ 
        expiresIn : '1h'
        });
}


export const decodeToken = async token => {
    return new Promise((resolve,reject) => {
        verify(token,process.env.JWT_SECRET,(err,payload) => {
            if(err) reject(err)       
            resolve(payload)
        });
    });
};
