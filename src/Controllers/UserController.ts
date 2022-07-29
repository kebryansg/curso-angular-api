import {
    Body,
    BodyParam,
    ContentType,
    Get,
    JsonController,
    Param,
    Post,
    QueryParam,
    UnauthorizedError
} from "routing-controllers";
import userJson from '../data/users.json'
import {User} from "../types/user.interface";
import {generateJwt, hashPassword, isPasswordCorrect, newUID} from "../Utils/util";

@JsonController('/users/')
export class UserController {

    users: User[] = []

    constructor() {
        this.users = [...userJson]
    }

    /*@Get('')
    getAll() {
        return [...this.users]
    }*/

    /***
     * Generate Password
     * @param password
     */
    @Get('password')
    getPassword(@QueryParam('passw') password: string) {
        return hashPassword(password)
    }

    /**
     * Login && JWT Generate
     * @param username
     * @param password
     */
    @Post('login')
    @ContentType('application/json')
    login(@BodyParam("username") username: string,
          @BodyParam("password") password: string) {

        //Get user from database
        let user: User;

        user = this.findName(username);
        if (user === null || user === undefined)
            throw new UnauthorizedError("NOMBRE DE USUARIO INCORRECTO")

        //Check if encrypted password match
        if (!isPasswordCorrect(password, user.password)) {
            throw new UnauthorizedError("CLAVE INCORRECTA")
        }

        //Sing JWT, valid for 1 hour
        const token = generateJwt(user);

        return {
            user: {
                userId: user.id,
                username: user.name,
            },
            access_token: token,
            tokenType: 'Bearer '
        };

    }

    /**
     * Create Owner User
     * @param body
     */
    @Post('')
    createUser(@Body() body: any) {

        const user = {
            id: newUID(),
            password: hashPassword(body.password),
            ...body
        }

        this.users = [...this.users, user];

        return {
            status: 'success',
            id: user.id,
        }
    }

    /**
     * Verify UserName
     * @param userName
     */
    @Get('exist-name/:name')
    existName(@Param('name') userName: string) {
        return {exists: this.existItem(userName, 'name')};
    }

    /**
     * Verify Email
     * @param email
     */
    @Get('exist-email')
    existEmail(@QueryParam('email') email: string) {
        return {exists: this.existItem(email, 'email')};
    }

    findName = (name: string) => {
        return userJson.find((user: User) => user.name === name)
    }

    existItem = (valueSearch: string, option: 'email' | 'name') => {
        return userJson.some((user: User) => user[option] === valueSearch)
    }

}

