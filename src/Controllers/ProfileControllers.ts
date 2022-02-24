import {Get, JsonController} from "routing-controllers";

@JsonController('/profile')
export class ProfileControllers {

    @Get('')
    getAll() {
        return [
            {id: 1, nameProfile: 'BACK'},
            {id: 2, nameProfile: 'FRONT'},
            {id: 3, nameProfile: 'DEVOPS'},
        ]
    }
}
