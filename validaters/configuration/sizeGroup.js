const z = require('zod');


const sizeGroupSchema = z.object({
    name:        z.string().trim().min(4, "Size group name must be at least 4 characters").max(25, "Maximum 25 characters allowed"),
    sizes:       z.array(z.string().trim().min(1, "Size cannot be empty")).min(1, "At least one size is required"),
    description: z.string().trim().max(500).optional(),
    isActive:    z.boolean().optional().default(true),
});


module.exports = { sizeGroupSchema }