import {Post, Get, JsonController, Body} from "routing-controllers";
import {newUID} from "../Utils/util";

@JsonController('/catalogo/')
export class CatalogoControllers {

    listItems: any[] = [
        {id: 'w7qfsa5f21', Descripcion: 'Pichincha'},
        {id: '04obr8ta22y7', Descripcion: 'Los Rios'},
        {id: '4segylkhwvu', Descripcion: 'El Oro'},
        {id: '7ofshsie6r', Descripcion: 'Guayas'},
    ]

    //#region Catalogos
    listTipoCuenta: any[] = [
        {
            id: "ou5l8mchp3s",
            Descripcion: "Cuenta Ahorro"
        },
        {
            id: "1bxgrnux5m4",
            Descripcion: "Cuenta Corriente"
        },
        {
            id: "av23eu4plma",
            Descripcion: "Cuenta Ahorro Futuro"
        }
    ]
    //#endregion

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

    @Post('convert-list')
    parseList(@Body() body: any) {
        return body.map(item => ({id: newUID(), Descripcion: item}))
    }
}
