import {Get, JsonController, Param} from "routing-controllers";
import bookJson from '../data/books_public.json'
import {Book} from "../types/book.interface";

@JsonController('/books')
export class BookController {
    books: Book[]

    constructor() {
        this.books = [...bookJson]
    }

    /**
     * Buscar libros por propietario
     * @param owner
     */
    @Get('/owner/:owner')
    getByProfile(@Param('owner') owner: string) {
        return this.books.filter(book => book.userRegister == owner)
    }

    @Get('')
    getAll() {
        return []
        /*return [...bookJson].map(book => ({
            ...book,
            id: newUID(),
        }))*/
    }

}
