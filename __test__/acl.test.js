const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const agent = supergoose(server);

const base64 = require('base-64');
const jwt = require('jsonwebtoken');
// const Users = require('../src/auth/models/users-model');

describe('acl', () => {

  const signUpObj = {
    username: 'laith',
    password: '123',
    role: 'admin',

  };


  it('can allow a new user to sign up', async() => {
    const signupResponse = await agent.post('/signup').send(signUpObj);
    expect(signupResponse.status).toBe(200);
  });


  it('can allow an existing user to sign in', async() => {
    const authHeader = base64.encode(`${signUpObj.username}:${signUpObj.password}:${signUpObj.role}`);

    const signinResponse = await agent.post('/signin').set('authorization', `Basic ${authHeader}`);
        
    const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');

    const secretResponse = await agent.get('/secret').set('authorization', `Bearer ${bearerHeader}`);

    expect(signinResponse.status).toBe(200);
    expect(secretResponse.status).toBe(200);
  });


  //     it('Can successfully check if the user has access to /read', async() => {
            
  //         const authHeader = base64.encode(`${signUpObj.username}:${signUpObj.password}:${signUpObj.role}`,);
  //         const signinResponse = await agent.post('/signin').set('authorization', `Basic ${authHeader}`);

  //     const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
  //     const secretResponse = await agent.get('/read').set('authorization', `Bearer ${bearerHeader}`);
  //     expect(secretResponse.statusCode).toBe(200);
  // });

      

  // it('Can successfully check if the user has access to /add', async() => {
  //     const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
  //     const secretResponse = await agent.post('/add').set('authorization', `Bearer ${bearerHeader}`);
  //     expect(secretResponse.statusCode).toBe(200);
  // });

  // it('Can successfully check if the user has access to /change', async() => {
  //     const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
  //     const secretResponse = await agent.put('/change').set('authorization', `Bearer ${bearerHeader}`);
  //     expect(secretResponse.statusCode).toBe(200);
  // });

  // it('Can successfully check if the user has access to /remove', async() => {
  //     const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
  //     const secretResponse = await agent.delete('/remove').set('authorization', `Bearer ${bearerHeader}`);
  //     expect(secretResponse.statusCode).toBe(200);
  // });

});