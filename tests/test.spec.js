require('dotenv').config()

const test = require('ava');
const axios = require('axios');

const paths = `http://localhost:${process.env.APP_PORT || 3000}`;

const SUCCESS = 200;

test('get all the names', async t => {
    const response = await axios.get(`${paths}/getall`);
    t.is(response.status, SUCCESS);
    t.is(typeof response.data, 'object');
});

test('get friends about one specific name', async t => {
    const response = await axios.get(`${paths}/getone/luiza`);
    t.is(response.status, SUCCESS);
    t.is(typeof response.data, 'object');
    t.is(response.data[0], 'joao');
});

test('get friends of friends', async t => {
    const response = await axios.get(`${paths}/getnotfriends/ana`);
    t.is(response.status, SUCCESS);
    t.is(typeof response.data, 'object');
    t.is(response.data[0], 'luiza');
});

test('add new name to the base', async t => {
    const data = {
        name: 'Charles',
        friends: ['Ana']
    };

    const response = await axios.post(`${paths}/register`, data);
    t.is(response.status, SUCCESS);
    t.is(response.data.message, `The name ${data.name.toLocaleLowerCase()} has been successfully added`);
});