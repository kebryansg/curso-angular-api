import {Get, JsonController, QueryParams} from "routing-controllers";

@JsonController('/cuentas/')
export class CuentaControllers {

    cuentas: any[] = [
        {
            idCuenta: 1,
            NombreCuenta: 'CA1',
            Saldo: 15000,
            SaldoContable: 14500,
            TipoCuenta: 'AH',
            NumeroCuenta: '22xxxx17',
        },
        {
            idCuenta: 2,
            NombreCuenta: 'CA2',
            Saldo: 4500,
            SaldoContable: 4500,
            TipoCuenta: 'AHF',
            NumeroCuenta: '22xxxx05',
        },
        {
            idCuenta: 3,
            NombreCuenta: 'Mi decimo cuenta',
            Saldo: 100,
            SaldoContable: 100,
            TipoCuenta: 'MDC',
            NumeroCuenta: '22xxxx93',
        }
    ]

    movimientos: any[] = [
        {
            idCuenta: 1,
            Valor: 500,
            Saldo: 14500,
            FechaRegistro: '2022-02-14'
        },
        {
            idCuenta: 1,
            Valor: 40,
            Saldo: 14460,
            FechaRegistro: '2022-02-11'
        },
        {
            idCuenta: 1,
            Valor: 100,
            Saldo: 14360,
            FechaRegistro: '2022-02-11'
        },
        {
            idCuenta: 1,
            Valor: 1000,
            Saldo: 13360,
            FechaRegistro: '2022-02-09'
        },
        {
            idCuenta: 1,
            Valor: 300,
            Saldo: 13060,
            FechaRegistro: '2022-02-07'
        },
        {
            idCuenta: 1,
            Valor: 250,
            Saldo: 12810,
            FechaRegistro: '2022-02-03'
        },
        {
            idCuenta: 1,
            Valor: 100,
            Saldo: 12710,
            FechaRegistro: '2022-01-29'
        },
        {
            idCuenta: 1,
            Valor: 2000,
            Saldo: 10710,
            FechaRegistro: '2022-01-20'
        }
    ]


    @Get('')
    getCuentas() {
        return this.cuentas
    }

    @Get('movimientos')
    getMovimientosFilter(@QueryParams() params: any) {
        const {cuenta} = params
        return this.movimientos.filter(item => item.idCuenta == cuenta)
    }


}
