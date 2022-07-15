const {addUser,getUsers,updateUser} = require('../controllers/user');
const supertest = require('supertest');
const request = require('supertest');
const app = require('../index');

const api = supertest(app);

test('Retorne una lista de usuarios', async() => { 
    
    const respuesta =  request(resultado).get('user/getUsers').send();
    expect(respuesta.statusCode).toBe(200);
 })

 test('Retorne Json',()=>{
api.get('user/getUsers').expect(200)
 })