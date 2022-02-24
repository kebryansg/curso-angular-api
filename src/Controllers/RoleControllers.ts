import {Get, JsonController} from "routing-controllers";

@JsonController('/role')
export class RoleControllers {

    @Get('')
    getAll() {
        return [
            {Staff: '', Lider: ''},
        ]
    }
}
