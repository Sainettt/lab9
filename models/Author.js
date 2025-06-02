const mongodb = require('mongodb');
const {getDatabase} = require('../database');

const COLLECTION_NAME = 'authors';

class Author {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    static async getAll() {
        const db = getDatabase();
        const authorsCollection = db.collection(COLLECTION_NAME);
        const authors = await authorsCollection.find().toArray();
        return authors.map(author => new Author(author._id, author.firstName, author.lastName));
    }
    static async update(id, authorData) {
        const db = getDatabase();
        const authorsCollection = db.collection(COLLECTION_NAME);
        const result = await authorsCollection.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: authorData }
        );
        if (result.matchedCount === 0) {
            return null; // Author not found
        }
        return new Author(id, authorData.firstName, authorData.lastName);
    }
}
module.exports = Author;