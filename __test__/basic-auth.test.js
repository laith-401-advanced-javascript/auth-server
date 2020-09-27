const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const agent = supergoose(server);
const Users = require('../src/auth/models/users-model');
const base64 = require('base-64');

describe('basic auth server', () => {
  const signinObj = {
    username: 'laith',
    password: '123',

  };

  const signinObj2 = {
    username: 'abuNashme',
    password: 'good',
  };

  const badObj = {
    notUsername: false,
    password: 5.47,
    someOtherProp: 'any',
  };

  it('can allow a new user to sign up', async() => {
    const signupResponse = await agent.post('/signup').send(signinObj);
    expect(signupResponse.status).toBe(200);
    expect(!!signupResponse.text).toBeTruthy();
  });


  it('can console error for invalid signup', async() => {
    jest.spyOn(global.console, 'error');
    console.log = jest.fn();
    const signupResponse = await agent.post('/signup').send(badObj);
    expect(console.log).toHaveBeenCalled();
    expect(signupResponse.status).toBe(403);
  });

  it('can allow an existing user to sign in', async() => {
    const authHeader = base64.encode(
      `${signinObj.username}:${signinObj.password}`,
    );

    const signinResponse = await agent
      .post('/signin')
      .set('authorization', `Basic ${authHeader}`);

    expect(signinResponse.status).toBe(200);
    expect(!!signinResponse.text).toBeTruthy();
  });

  it('will return a 500 error for incorrect login credentials', async() => {

    const realBadAuthHeader = base64.encode(
      `testingbobred:wrong-password1234`,
    );

    const signinResponse = await agent
      .post('/signin')
      .set('authorization', `Basic ${realBadAuthHeader}`);

    expect(signinResponse.statusCode).toBe(500);
    expect(signinResponse.body).toEqual({});

    const wrongPasswordHeader = base64.encode(
      `${signinObj.username}:wrong-password1234-again-555`,
    );

    const signinResponse2 = await agent
      .post('/signin')
      .set('authorization', `Basic ${wrongPasswordHeader}`);
    expect(signinResponse2.statusCode).toBe(500);
    expect(signinResponse2.body).toEqual({});
  });

  it('can return all users', async() => {
    await Users.create(signinObj2);

    const autHeader = base64.encode(
      `${signinObj.username}:${signinObj.password}`,
    );

    const getResponse = await agent
      .get('/users')
      .set('authorization', `Basic ${autHeader}`);
    expect(getResponse.status).toEqual(200);
    expect(getResponse.body[0].username).toEqual('laith');
    expect(getResponse.body[1].username).toEqual('abuNashme');
  });

  it('will return a 200 and an array of objects when called get users', async() => {

    const getResponse = await agent.get('/users');
    expect(getResponse.status).toEqual(200);
    expect(getResponse.body).not.toEqual({});
  });

});