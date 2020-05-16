interface IBook {
    isbn: number;
    author: string;
    title: string;
}

let books: Array<IBook> = [
    {
        isbn: 1,
        author: 'Loco',
        title: 'Locura'
    },
    {
        isbn: 2,
        author: 'Locoijjo',
        title: 'Locjoiura'
    },
    {
        isbn: 3,
        author: 'Loco',
        title: 'Locuiojra'
    },
    {
        isbn: 4,
        author: 'Loco',
        title: 'Lociiura'
    },
    {
        isbn: 5,
        author: 'Loco',
        title: 'Loiiiiiiicura'
    }
];


 const getBooks = ({ response }: { response: any }) => {
    response.body = books;   
}

 const getBook = ({ params, response }: { params:any; response: any }) => {
    const book: IBook | undefined = searchBookByIsbn(parseInt(params.isbn));

    if (book) {
        response.status = 200;
        response.body = book;
    } else {
        response.status = 404;
        response.body = { message: 'Book not found.' };
    }
}

 const addBook = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body()
    
    const book: IBook = body.value;

    books.push(book)

    response.body = { message: 'OK' };
    response.status = 200;
}

 const updateBook = async ({ params: {isbn}, request, response }: { params: any; request: any; response: any }) => {
    const book: IBook | undefined = searchBookByIsbn(parseInt(isbn));

    if (book) {
        const body = await request.body();

        const updateInfo: { author?: string, title?: string } = body.value;

        const newBook: IBook = { ...book, ...updateInfo };

        books.forEach((item, index) => {
            if (item.isbn === parseInt(isbn)) {
                books[index] = newBook
            }
        });

        response.status = 200;
        response.body = { message: 'OK' };

    }
    else {
        response.status = 404;
        response.body = { message: 'Book not found' };
    }
    
}

 const deleteBook = ({ params, response }: { params: any; response: any }) => {
    const initialLength = books.length;
    books = books.filter(book => book.isbn !== parseInt(params.isbn));

    if (books.length !== initialLength) {
        response.status = 404;
        response.body = { message: 'Book not found' };
    } else {
        response.body = { message: 'OK' };
        response.status = 200
    }
}

const searchBookByIsbn = (isbn: number): (IBook | undefined) => books.find(book => book.isbn === isbn);

export { getBooks, getBook, addBook, updateBook, deleteBook };
