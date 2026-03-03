const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400);
        const error = new Error("Validation failed"); // ✅ string only
        error.errors = result.error.flatten().fieldErrors; // ✅ attach separately
        throw error;
    }
    req.body = result.data;
    next();
};

const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        res.status(400);
        const error = new Error("Validation failed");
        error.errors = result.error.flatten().fieldErrors;
        throw error;
    }
    req.query = result.data;
    next();
};

module.exports = { validate, validateQuery };