import {Post, Get, JsonController, Body} from "routing-controllers";
import {newUID} from "../Utils/util";

@JsonController('/')
export class HomeControllers {

    listItems: any[] = [
        {id: 'w7qfsa5f21', Descripcion: 'Pichincha'},
        {id: '04obr8ta22y7', Descripcion: 'Los Rios'},
        {id: '4segylkhwvu', Descripcion: 'El Oro'},
        {id: '7ofshsie6r', Descripcion: 'Guayas'},
    ]

    @Get('')
    getIndex() {
        return 'Working!!.'
    }

    @Get('list')
    getList() {
        return [...this.listItems]
    }

    @Post('')
    createItem(@Body() body: { Descripcion: string }) {
        const data = {...body, id: newUID()}
        this.listItems.push(data)
        return data
    }
}
