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

    users: User[]

    constructor() {
        this.users = [...userJson]
    }

    @Get('')
    getAll() {
        return [...this.users]
    }

    @Get('password')
    getPassword(@QueryParam('passw') password: string) {
        return hashPassword(password)
    }

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

    @Post('')
    createUser(@Body() body: any) {
        this.users.push({
            id: newUID(),
            password: hashPassword(body.password),
            ...body
        })
    }

    @Get('exist-name/:name')
    existName(@Param('name') userName: string) {
        return {exists: this.existItem(userName, 'name')};
    }

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

