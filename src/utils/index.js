const getBody = (request, response) => {
    let body = null;

    return new Promise((resolve, reject) => {
        try {
            request.on('data', buffer => {
                body = JSON.parse(buffer.toString());
                if(!(body['name'] && body['friends'] && typeof body['friends'] === 'object')) reject(body);
                resolve(body);
            });
        } catch (error) {
            reject(body);
        }
    });
};

const sendResponse = (status, data, response) => {
    response.writeHead(status, { "Content-Type": "application/json" });
    response.write(JSON.stringify(data));
    response.end();
}

module.exports = { getBody, sendResponse };