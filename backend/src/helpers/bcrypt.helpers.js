import {compare, hash} from 'bcrypt';

const SALT_ROUND = 10;

export const hashPassword = async password => {
    const hashedPassword = await hash(password,SALT_ROUND);
    return hashedPassword;
}

export const checkPassword = async(password,hashedPassword) => {
    const matched = await compare(password,hashedPassword);
    return matched;
}

export const generatePassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}