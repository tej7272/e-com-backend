const z = require('zod');

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID");

const subCategorySchema = z.object({
    name:        z.string().trim().min(4,  "Sub category name must be at least 4 characters").max(25, "Maximum 25 characters allowed"),
    category:    objectId,                                         
    sizeGroup:   objectId.optional().or(z.literal('')),          
    description: z.string().trim().optional(),
    isActive:    z.boolean().default(true),
});

module.exports = { subCategorySchema };