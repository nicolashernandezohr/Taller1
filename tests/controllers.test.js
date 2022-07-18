const { addUser, getUsers, updateUser } = require('../controllers/user');
const supertest = require('supertest');
const request = require('supertest');
const app = require('../index');
const api = supertest(app);

const defaultUser = {
    id:expect.any(Number),
    nombre:expect.any(String),
    edad:expect.any(Number),
    fecha_nacimiento:expect.any(String) 
}

const user = {
    nombre:'Jaime Fernandez Hierro',
    edad:58,
    fecha:'1967/04/25'
}

describe('Controlador user', () => {
    
    describe('Pruebas en controller getUsers', () => {
        test('Retorne usuarios y status 200', async () => {
            const {body,statusCode} = await api.get('/user/getUsers');
            expect(statusCode).toBe(200);
            expect(Object.keys(body).includes('0')).toEqual(true);
        });
    });

    describe('Pruebas en controller addUser', () => {
        test('Retorne el usuario agregado y status 201', async () => {
           const {body,statusCode} =await api.post('/user/addUser').send(user);
           expect(statusCode).toBe(201);
           console.log(body.user);
           expect(body.user).toStrictEqual(user);
        });

        test('Retorne status 500',async()=>{
            const {statusCode} =await api.post('/user/addUser').send('');
            expect(statusCode).toBe(500);
        })

    });

    describe('Pruebas en controller updateUser', () => {
        test('Retorne Json y status 201', async () => {
            const usuario ={
                id:6,
                ...user
            }
            console.log(usuario);
            const {statusCode,body} = await api.put('/user/updateUser').send(usuario);
            expect(statusCode).toBe(201);
            expect(body.user).toStrictEqual(usuario);
        });
    });

    describe('Pruebas en controller getUser', () => {
        test('Retorne el usuario y status 200', async () => {
            const id = 1;
            const {body,statusCode} = await api.get(`/user/getUser?id=${id}`);
            expect(statusCode).toBe(200);
            expect(body).toEqual([defaultUser]);
        });

        test('Retorne status 500',async()=>{
            const id = 'e';
            const {statusCode} = await api.get(`/user/getUser?id=${id}`);
            expect(statusCode).toBe(500);
        });

       
    });
    
});
