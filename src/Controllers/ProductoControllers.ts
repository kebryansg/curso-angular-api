import {Get, JsonController, QueryParams} from "routing-controllers";

@JsonController('/productos/')
export class ProductoControllers {
    productos: any[] = [
        {
            TipoProducto: 'Comercial',
            NombreProducto: 'Ahorro Programado',
            Descripcion: 'Cumple tus planes a futuro, con una cuota de ahorro mensual desde 10 dólares.',
        },
        {
            TipoProducto: 'Comercial',
            NombreProducto: 'Jovenes',
            Descripcion: 'Descubre todas nuestras opciones para empezar a construir tu futuro.',
        },
        {
            TipoProducto: 'Comercial',
            NombreProducto: 'Corriente',
            Descripcion: 'Administra y controla tu dinero a través de cheques personales.',
        },
        {
            TipoProducto: 'Tarjeta',
            NombreProducto: 'Débito',
            Descripcion: 'La llave de acceso a tu mundo Bancario: realiza pagos en locales comerciales, transacciones en cajeros automáticos, Mi Vecino y más.',
        },
        {
            TipoProducto: 'Tarjeta',
            NombreProducto: 'Crédito',
            Descripcion: 'Adquiere todos los bienes y servicios nacionales e internacionales que necesites y paga de acuerdo a tu comodidad.',
        },
        {
            TipoProducto: 'Prestamo',
            NombreProducto: 'Préstamo en línea',
            Descripcion: 'Consulta si tienes disponible una oferta y obtén tu dinero sin garante, sin trámites y en 5 minutos.',
        },
        {
            TipoProducto: 'Prestamo',
            NombreProducto: 'Préstamo para Multiproposimo',
            Descripcion: 'Llegó el momento de hacer realidad tus propósitos. Todos tenemos algo pendiente por cumplir.',
        },
    ]

    @Get('')
    getProductos(@QueryParams() params: any) {
        const {TipoProducto} = params
        if (TipoProducto)
            return this.productos.filter(item => item.TipoProducto == TipoProducto)

        return this.productos
    }

    @Get('catalogo')
    getCatalogo() {
        return ['Comercial', 'Prestamo', 'Tarjeta']
    }
}
