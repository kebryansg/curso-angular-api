import {Post, Get, JsonController, Body, QueryParam} from "routing-controllers";
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
    // NT -> Natural
    // EP -> Empresas
    listTipoCuenta: any[] = [
        {
            id: "ou5l8mchp3s",
            Descripcion: "Cuenta Ahorro",
            TipoCuenta:'NT',
        },
        {
            id: "1bxgrnux5m4",
            Descripcion: "Cuenta Corriente",
            TipoCuenta:'NT',
        },
        {
            id: "av23eu4plma",
            Descripcion: "Cuenta Ahorro Futuro",
            TipoCuenta:'NT',
        },
        {
            id: "av23eu4plma",
            Descripcion: "Cuenta Corriente Empresa",
            TipoCuenta:'EP',
        },
        {
            id: "og34eu9plma",
            Descripcion: "Cuenta Ahorro Futuro Empresa",
            TipoCuenta:'EP',
        }
    ]
    //#endregion

    listContants: any[] = [
        {
            Nombre: 'Jorge Guzman',
            Banco: 'Banco Pichincha',
            Cuenta: '22xxxxxx23',
            IdCuenta: 'ou5l8mchp3s',
        },
        {
            Nombre: 'Sebastian Arguello',
            Banco: 'Banco Pichincha',
            Cuenta: '22xxxxxx47',
            IdCuenta: '1bxgrnux5m4',
        },
        {
            Nombre: 'Kevin Suarez',
            Banco: 'Banco Pichincha',
            Cuenta: '22xxxxxx36',
            IdCuenta: 'ou5l8mchp3s',
        }
    ]


    @Get('')
    getIndex() {
        return [...this.listTipoCuenta]
        // return 'Working!!.'
    }

    @Get('tipo-cuenta')
    getList(@QueryParam('tipo') tipo: string) {

        if(tipo) return this.listTipoCuenta.filter(item => item.TipoCuenta == tipo)

        return [...this.listTipoCuenta]
    }

    @Get('contact')
    getContacts() {
        return [...this.listContants]
    }

    @Get('get-by-contact')
    getByIdContact(@QueryParam('cod') codigo:string) {
        return this.listContants.find(item => item.IdCuenta == codigo)
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
