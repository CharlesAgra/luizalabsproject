const controllers = require('../controllers/index');
const utils = require('../utils/index');

const routes = async (request, response) => {
    try {
        const getOneRegex = new RegExp(/^\/getone\/[1-9a-zA-Z]*$/);
        const getNotFriendsRegex = new RegExp(/^\/getnotfriends\/[1-9a-zA-Z]*$/); 

        if (request.url === '/getall' && request.method === 'GET') return controllers.getAll(response);        
        if (request.url.match(getOneRegex) && request.method === 'GET') return controllers.getFriendsAboutOneSpecificName(request.url.split("/")[2], response);
        if (request.url.match(getNotFriendsRegex) && request.method === 'GET') return controllers.getNotFriendsAboutOneSpecificName(request.url.split("/")[2], response);   
        if (request.url === '/register' && request.method === 'POST') {
            const body = await utils.getBody(request, response);
            return controllers.register(body, response);
        }
    } catch (err) {
        utils.sendResponse(400, { message: 'the request body is not in the accepted format'}, response);
    }
}

module.exports = { routes };
