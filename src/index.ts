import "reflect-metadata";
import {Action, createExpressServer} from 'routing-controllers';
import {UserController} from "./Controllers/UserController";
import {CategoryController} from "./Controllers/CategoryController";
import {BookController} from "./Controllers/bookController";
import {decodeToken} from "./Utils/util";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    authorizationChecker: (action: Action, roles: string[]) => {
        let authorization = action.request.headers["authorization"] as string;
        if (!authorization) return false;
        let [typeToken, token] = authorization.split(' ');
        token = decodeToken(token);
        return !!token;
    },
    currentUserChecker: (action: Action) => {
        let authorization = action.request.headers["authorization"] as string;
        if (!authorization) return null;
        const [typeToken, token] = authorization.split(' ');
        const decode = decodeToken(token);
        return decode.data;
    },
    controllers: [
        UserController,
        CategoryController,
        BookController,
    ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor Iniciado`);
    console.log(`Host: http://localhost:${3001}`);
});
