const controllers = require('../controllers/index');
const utils = require('../utils/index');
const middleware = require('../middlewares/index');

const routes = async (request, response) => {
    try {
        // mostrar todos as pessoas
        if(request.url === '/allpeople' && request.method === 'GET') {
            console.log('allpeople');
        }
    
        // mostrar todas as pessoas que tal "nome" conhece
        if (request.url === '/friends' && request.method === 'GET') {
            console.log('friends');
        }
        
        // mostrar todas as pessoas que tal "nome" não conhece
        if (request.url === '/itisnotmyfriends' && request.method === 'GET') {
            console.log('itisnotmyfriends');
        }
    
        // cadastrar novas pessoas informando apenas o amigo dela. Se o amigo não existir informar erro
        if (request.url === '/register' && request.method === 'POST') {
            const body = await utils.getBody(request);
        }
    } catch (error) {
        console.log('erroooooooooo ', error);
    }
}

module.exports = { routes };
