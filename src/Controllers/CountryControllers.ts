import {Get, JsonController} from "routing-controllers";

@JsonController('/country')
export class CountryControllers {

    @Get('')
    getAll(){
        return [
            {code:'ECU', description:'ECUADOR'},
            {code:'VEN', description:'VENEZUELA'},
            {code:'PER', description:'PERU'},
        ]
    }
}
