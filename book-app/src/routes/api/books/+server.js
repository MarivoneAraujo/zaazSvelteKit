// src/routes/api/books/+server.js

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: '1984', author: 'George Orwell' }
];

let nextId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;

/**
 * @returns {Response}
 */
export async function GET() {
    return new Response(JSON.stringify(books), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * @param {Request} request
 * @returns {Response}
 */
export async function POST({ request }) {
    const { title, author } = await request.json();

    if (!title || !author) {
        return new Response(JSON.stringify({ error: 'Title and author are required.' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const newBook = { id: nextId++, title, author };
    books.push(newBook);

    return new Response(JSON.stringify(newBook), {
        status: 201, // Created
        headers: {
            'Content-Type': 'application/json'
        }
    });
}