const z = require('zod')

const colorSchema = z.object({
    name: z.string().trim().min(3, "Must be at least 3 characters").max(25),
    hex: z.string().trim(),   // ✅ must be here
    description: z.string().trim().max(500).optional(),
    isActive: z.boolean().optional().default(true),
});

module.exports = { colorSchema }