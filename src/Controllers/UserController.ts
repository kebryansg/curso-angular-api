import {Body, Get, JsonController, Param, Post} from "routing-controllers";
import userJson from '../data/users.json'
import {User} from "../types/user.interface";
import {newUID} from "../Utils/util";

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

    @Post('')
    createUser(@Body() body: any) {
        this.users.push({
            id: newUID(),
            ...body
        })
    }

    @Get('exist-name/:name')
    existName(@Param('name') userName: string) {
        return this.findName(userName);
    }

    @Get('exist-email/:email')
    existEmail(@Param('email') email: string) {
        return this.findEmail(email);
    }

    findEmail = (email: string) => {
        return userJson.some((user: User) => user.email === email)
    }
    findName = (name: string) => {
        return userJson.some((user: User) => user.name === name)
    }

}

