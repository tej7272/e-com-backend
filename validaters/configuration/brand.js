// validators/category.validator.js
const z = require('zod')

const brandSchema = z.object({
    name:        z.string().trim().min(3, "Brand name must be at least 5 characters").max(25),
    description: z.string().trim().max(500).optional(),
    isActive:    z.boolean().optional().default(true),
});

module.exports = { brandSchema }