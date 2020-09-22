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
        let recording = {
            username: record.username,
            password: record.password
        }
        let token = await jwt.sign({ record }, SECRET);
        console.log('ttttttttttt', recording);
        console.log('username: record.username', record);

        return { token, record };
    }

    async authenticate(username, password) {
        // to check the username if exist in the database or not 
        let user = await this.schema.find({ username: username });
        console.log('userrrrrr', user);
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
            console.log('tttttoooken', token);
            let result = await this.schema.find({ username: tokenObject.username });

            console.log("result -----> ", result);
            console.log("tokenObject usename-----> ", tokenObject);


            if (tokenObject) {
                return Promise.resolve({ tokenObject: tokenObject });

            } else {
                return Promise.reject('user is not found');
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

}



module.exports = new User(schema);