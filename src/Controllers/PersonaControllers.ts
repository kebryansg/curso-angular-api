import {Get, JsonController} from "routing-controllers";
import personJson from './../data/person.json'

@JsonController('/person')
export class PersonaControllers {

    @Get('')
    getAll(){
        return [...personJson]
    }
}
