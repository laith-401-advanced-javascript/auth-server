// const supergoose = require('@code-fellows/supergoose');
// const { server } = require('../src/server');
// const agent = supergoose(server);

// const base64 = require('base-64');
// const jwt = require('jsonwebtoken');
// // const SECRET = 'mytokensecret';
// // const Users = require('../src/auth/models/users-model');

// describe('acl', () => {
//     const signinObj = {
//         username: 'laith',
//         password: '123',
//         role: 'admin'
//     };

//     it(' can check if the ueser is valid ', async() => {
//         const signupResponse = await agent.post('/signup').send(signinObj);
//         const autHeader = base64.encode(
//             `${signinObj.username}:${signinObj.password}`,
//         );
//         const signinResponse = await agent
//             .post('/signin')
//             .set('authorization', `Basic ${autHeader}`);

//         const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
//         console.log('bbbbbbb', bearerHeader);
//         const secretResponse = await agent.get('/secret').set('authorization', `Bearer ${bearerHeader}`);
//         console.log('ssssss', secretResponse.status);

//         expect(signupResponse.status).toBe(200);
//         expect(signinResponse.status).toBe(200);
//         expect(secretResponse.status).toBe(200);
//     });

//     it('Can successfully check if the user has access to /read', async() => {
//         const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
//         const secretResponse = await agent.get('/read').set('authorization', `Bearer ${bearerHeader}`);
//         expect(secretResponse.statusCode).toBe(200);
//         expect(secretResponse.text).toBeTruthy();
//     });

//     it('Can successfully check if the user has access to /add', async() => {
//         const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
//         const secretResponse = await agent.post('/add').set('authorization', `Bearer ${bearerHeader}`);
//         expect(secretResponse.statusCode).toBe(200);
//         expect(secretResponse.text).toBeTruthy();
//     });

//     it('Can successfully check if the user has access to /change', async() => {
//         const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
//         const secretResponse = await agent.put('/change').set('authorization', `Bearer ${bearerHeader}`);
//         expect(secretResponse.statusCode).toBe(200);
//         expect(secretResponse.text).toBeTruthy();
//     });

//     it('Can successfully check if the user has access to /remove', async() => {
//         const bearerHeader = await jwt.sign({ username: 'laith' }, 'mytokensecret');
//         const secretResponse = await agent.delete('/remove').set('authorization', `Bearer ${bearerHeader}`);
//         expect(secretResponse.statusCode).toBe(200);
//         expect(secretResponse.text).toBeTruthy();
//     });

// });