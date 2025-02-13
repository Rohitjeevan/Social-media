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