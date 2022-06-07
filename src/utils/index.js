const getBody = (request) => {
    let body = null;
    
    return new Promise((resolve, reject) => {
        try {
            request.on('data', buffer => {
                body += buffer.toString();
                resolve(body);
            });
        } catch (error) {
            console.log('There is no body in this request object');
            reject(body);
        }
    });
};

module.exports = { getBody };
