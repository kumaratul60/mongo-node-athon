// const asyncHander = () => { }
// const asyncHander = (func) => () => { }
// const asyncHander = (func) => async () => { }
// const asyncHander = ()=>()=>{}


const asyncHandlerPromises = (requestHanlder) => {
    return (req, res, next) => {
        Promise.resolve(requestHanlder(req, res, next)).catch((err) => next(err));
    };
};


const asyncHanlder = (fn) => async (req, res, next, err) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        res.send(err.code || 400).json({
            success: false,
            message: err.message
        });
    }

};

export { asyncHandlerPromises, asyncHanlder };

