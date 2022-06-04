import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"
import {User} from "../types/user.interface";
let jws = require('jws');
const newUID = () => Math.random().toString(36).slice(2)
const SECRET_KEY = 'onboarding-api'

function isPasswordCorrect(password: string, savedPassword: string): boolean {
    return bcrypt.compareSync(password, savedPassword);
}

function hashPassword(password: string) {
    password = bcrypt.hashSync(password, 12);
    return password;
}

function decodeToken(token: string) {
    let result = jws.decode(token);
    return result ? result.payload : null;
}

function generateJwt(user: User) {
    return jwt.sign(
        {
            data:
                {
                    userId: user.id,
                    username: user.name,
                }
        },
        SECRET_KEY,
        {expiresIn: '6h'});
}

export {
    newUID,
    isPasswordCorrect,
    decodeToken,
    hashPassword,
    generateJwt,
}
