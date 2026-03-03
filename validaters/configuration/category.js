// validators/category.validator.js
const z = require('zod')

const categorySchema = z.object({
    name:        z.string().trim().min(5, "Category name must be at least 5 characters").max(100),
    description: z.string().trim().max(500).optional(),
    isActive:    z.boolean().optional().default(true),
});


const getCategorySchema = z.object({
    page:     z.coerce.number().int().positive().default(1),
    limit:    z.coerce.number().int().max(100).default(10),
    isActive: z.coerce.boolean().optional(),
    search:   z.string().trim().optional(),
});

module.exports = { categorySchema, getCategorySchema }