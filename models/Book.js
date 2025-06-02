const mongodb = require('mongodb');
const {getDatabase} = require('../database');

const COLLECTION_NAME = 'books';

class Book {
    constructor(id, title, year, authorId) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.authorId = authorId;
    }

    static async getAll() {
        const db = getDatabase();
        const booksCollection = db.collection(COLLECTION_NAME);
        const books = await booksCollection.find().toArray();
        return books.map(book => new Book(book._id, book.title, book.year, book.authorId));
    }

    static async create(title, year, authorId) {
        const db = getDatabase();
        const booksCollection = db.collection(COLLECTION_NAME);
        const result = await booksCollection.insertOne({ title, year, authorId });
        return new Book(result.insertedId, title, year, authorId);
    }

    static async delete(id) {
        const db = getDatabase();
        const booksCollection = db.collection(COLLECTION_NAME);
        return await booksCollection.deleteOne({ _id: new mongodb.ObjectId(id) });
    }
}
module.exports = Book;