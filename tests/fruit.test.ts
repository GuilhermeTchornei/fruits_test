import supertest from 'supertest';
import { FruitInput } from "../src/services/fruits-service";
import app from 'index';

const server = supertest(app);

describe('GET /fruits/:id', () => {
    it('Returns the fruit if found it', async () => {
        const result = await server.get('/fruits/1');
        expect(result.body.length).toEqual(1);
    });

    it('Returns 404 if not found id', async () => {
        const result = await server.get('/fruits/1');
        expect(result.status).toEqual(404);
    });
});

describe('POST /fruits', () => {
    it('Returns 422 if invalid body format', async () => {
        const result = await server.post('/fruits').send({ price: 10 });
        expect(result.status).toEqual(422);
    });

    it('Returns 409 if fruit already exists', async () => {
        const fruit: FruitInput = { name: "banana", price: 10 }

        const result = await server.post('/fruits').send(fruit);
        expect(result.status).toEqual(422);
    });

    it('Returns 201 if fruit was created', async () => {
        const fruit: FruitInput = { name: "banana", price: 10 }
        const result = await server.post('/fruits').send(fruit);
        expect(result.status).toEqual(201);
    });
});