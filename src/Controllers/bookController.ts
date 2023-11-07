import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import bookJson from "../data/books_public.json";
import { Book, FilterBook } from "../types/book.interface";
import { JwtUser } from "../types/jwt-user.interface";
import { newUID } from "../Utils/util";
import { isEmpty, intersection, isEqual  } from "lodash";

@JsonController("/books")
@Authorized()
export class BookController {
  books: Book[];

  constructor() {
    this.books = [...bookJson];
  }

  /**
   * Buscar libros por propietario autenticado
   * @param user
   */
  @Get("/owner")
  getByProfile(@CurrentUser({ required: true }) user: JwtUser) {
    return this.findByOwner(user.userId);
  }

  /**
   * Create Book
   * @param user
   * @param body
   */
  @Post("/owner")
  createBook(
    @CurrentUser({ required: true }) user: JwtUser,
    @Body() body: any
  ) {
    const bookCreate: Book = {
      id: newUID(),
      ...body,
      userRegister: user.userId,
    };
    this.books.push({
      ...bookCreate,
    });
    return {
      cod: bookCreate.id,
      status: true,
    };
  }

  /**
   * Update Book
   * @param id
   * @param user
   * @param body
   */
  @Put("/owner/:id")
  updateBook(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: JwtUser,
    @Body() body: any
  ) {
    const bookRegister = this.findById(id);
    const bookIndex = this.findIndexById(id);
    let updateBook: Book = {
      ...bookRegister,
      ...body,
    };

    // Eliminar Registro
    this.books.splice(bookIndex, 1);
    // Agregar Registro
    this.books.push({
      ...updateBook,
    });

    return {
      cod: updateBook.id,
      status: true,
    };
  }

  @Get("")
  getAll() {
    return [];
    /*return [...bookJson].map(book => ({
            ...book,
            id: newUID(),
        }))*/
  }

  /**
   * Buscar libros por Identificador
   * @param id
   */
  @Get("/owner/:id")
  getById(@Param("id") id: string) {
    return this.findById(id);
  }

  @Post("/filter")
  filterPublics(@Body() filter: FilterBook) {
    let { category, title } = filter;

    /*
        Filtros Vacios
         */
    if (isEmpty(category) && isEmpty(title))
      return {
        count: this.books.length,
        items: this.books,
      };

    let itemsFilter = [...this.books];

    // TODO Filter by Category
    if (!isEmpty(category) && Array.isArray(category))
      itemsFilter = [
        ...itemsFilter.filter((book) =>
          isEqual(intersection(book.category, category), category)
        ),
      ];

    // TODO Filter by Title
    if (!isEmpty(title)) {
      title = title.toUpperCase();
      itemsFilter = [
        ...itemsFilter.filter((book) =>
          book.title.toUpperCase().includes(title)
        ),
      ];
    }

    return {
      count: itemsFilter.length,
      items: itemsFilter,
    };
  }

  findByOwner = (idUser: string) => {
    return this.books.filter((book) => book.userRegister == idUser);
  };

  findByTitle = (title: string, owner?: string) => {
    if (!owner) return this.books.filter((book) => book.title.includes(title));

    return this.findByOwner(owner).filter((book) => book.title.includes(title));
  };

  findById = (id: string): Book => {
    return this.books.find((book) => book.id === id);
  };

  findIndexById = (id: string): number => {
    return this.books.findIndex((book) => book.id === id);
  };
}
