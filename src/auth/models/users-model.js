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

        let token = await jwt.sign({ username: record.username }, SECRET);
        // console.log('ttttttttttt', token);
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

    async list() {
        let allUsers = await this.schema.find({});
        return allUsers;
    }

}



module.exports = new User(schema);