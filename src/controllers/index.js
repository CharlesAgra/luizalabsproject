const fs = require('fs');
const path = require('path');
const names = require('../data/names.json');
const utils = require('../utils/index');

const SUCCESS = 200;
const FAILED = 400;
const filename = path.join(__dirname, "..", "data", "names.json")

const controller = {
    getAll(response) {
        try {
            fs.readFile(filename, function (err, data) {
                if(err) console.log(err);
                utils.sendResponse(SUCCESS, JSON.parse(data), response);
            });
        } catch (error) {
            utils.sendResponse(SUCCESS, { message: 'There is an error in the json file' }, response);
        }
    },
    getFriendsAboutOneSpecificName(name, response) {
        try {
            fs.readFile(filename, function (err, data) {
                if(err) console.log(err);

                const content = JSON.parse(data);
                const result = content.filter(person => person.name === name);
                
                if(result.length !== 0) utils.sendResponse(SUCCESS, result[0].friends, response);
                else utils.sendResponse(FAILED, { message: `The name ${name} was not found in our database` }, response);
            });
        } catch (error) {
            utils.sendResponse(FAILED, { message: `The name ${name} was not found in our database` }, response);
        }
    },
    getNotFriendsAboutOneSpecificName(name, response) {
        try {
            const result = names.filter(person => person.name === name);
            const { friends } = result[0];

            let data = [];
            friends.map((friend) => {
                return names.filter(person => person.name === friend).filter((friendOfFriend) => {
                    return friendOfFriend.friends.map((friendOfFriendOfFriend) => {
                        return friends.indexOf(friendOfFriendOfFriend) === -1 && name !== friendOfFriendOfFriend ? data.push(friendOfFriendOfFriend) : {};
                    });
                });
            });

            utils.sendResponse(SUCCESS, data.filter((element, index, self) => index === self.indexOf(element)), response);
        } catch (error) {
            utils.sendResponse(FAILED, { message: `The name ${name} was not found in our database` }, response);
        }
    },
    register(body, response) {
        try {
            body.name = body.name.toLowerCase();
            
            fs.readFile(path.join(__dirname, "..", "data", "names.json"), function (err, data) {
                if(err) console.log(err);

                let names = JSON.parse(data);

                const { friends } = body;

                let notExistFriend = []; 
                for(let i = 0; i < friends.length; i++){
                    friends[i] = friends[i].toLowerCase();
                    names.map((name) => {
                        if(friends[i] === name.name) {
                            notExistFriend.push(friends[i]);
                            name.friends.push(body.name);
                        }
                    });
                }

                if(friends.length === notExistFriend.length) {
                    names.push(body);
                    
                    fs.writeFile(path.join(__dirname, "..", "data", "names.json"), JSON.stringify(names), (err, data) => {
                        if(err) console.log(err);
                    });

                    body.message = `The name ${body.name} has been successfully added`;
                    body.status = '200';
                    utils.sendResponse(SUCCESS, body, response);
                } else {
                    utils.sendResponse(FAILED, { message: `The name ${body.name} has not been added. Please check if the request is correct.` }, response);
                }
            });
        } catch (error) {
            utils.sendResponse(FAILED, body, response);
        }
    }
}

module.exports = controller;