import "reflect-metadata";
import {createExpressServer} from 'routing-controllers';
import {PersonaControllers} from "./Controllers/PersonaControllers";
import {CountryControllers} from "./Controllers/CountryControllers";
import {RoleControllers} from "./Controllers/RoleControllers";
import {ProfileControllers} from "./Controllers/ProfileControllers";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    controllers: [
        /*
        CatalogoControllers,
        ProductoControllers,
        CuentaControllers,
        */

        PersonaControllers,
        CountryControllers,
        RoleControllers,
        ProfileControllers,

    ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor Iniciado`);
    console.log(`Host: http://localhost:${3000}`);
});
