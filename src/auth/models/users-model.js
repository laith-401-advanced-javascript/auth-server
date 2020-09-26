'use strict';

const schema = require('./users-schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'mytokensecret';


class User {
  constructor(schema) {
    this.schema = schema;

  }
  async create(user) {
    // await this.schema.find({ username: user.username });
    let newUser = new this.schema(user);
    return await newUser.save();

  }

  async generateToken(record) {

    let token = await jwt.sign({ record }, SECRET);
    return { token, record };
  }

  async authenticate(username, password) {
    // to check the username if exist in the database or not 
    let user = await this.schema.find({ username: username });
    try {
      const valid = await bcrypt.compare(password, user[0].password);
      return valid ? user : Promise.reject('Password not correct');
    } catch (e) {
      console.log(e.message);
    }
  }

  async authenticateToken(token) {
    try {
      let tokenObject = jwt.verify(token, SECRET);

      console.log('tokenObject usename-----> ', tokenObject);

      if (tokenObject) {
        // console.log('tokenObject.record[0].username', Promise.resolve(tokenObject.record[0].username));
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }

    } catch (e) {
      console.log('catch  rejjjjjjj');
      return Promise.reject();
    }

  }


  async list() {
    let allUsers = await this.schema.find({});
    return allUsers;
  }


  rolesUsers(role, ability) {

    let user = ['read'];
    let editor = ['read', 'create', 'update'];
    let admin = ['read', 'read-submisi', 'create', 'update', 'delete'];
    let writer = ['read', 'create'];

    if (role == 'user') {
      for (let i = 0; i < user.length; i++) {
        // if the ability found in the user array return true
        if (user[i] == ability) {
          return true;
        }

      }
    }

    if (role == 'editor') {
      for (let i = 0; i < editor.length; i++) {
        if (editor[i] == ability) {
          return true;
        }

      }
    }

    if (role == 'admin') {
      for (let i = 0; i < admin.length; i++) {
        if (admin[i] == ability) {
          return true;
        }

      }
    }

    if (role == 'writer') {
      for (let i = 0; i < writer.length; i++) {
        if (writer[i] == ability) {
          return true;
        }

      }
    }

  }
}



module.exports = new User(schema);