export const requestLogger = (req, res, next) => {
    const { method, url, body, params, query } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    console.log("Query:", query);
    console.log("Params:", params);
    console.log("Body:", body);
    next();
};
