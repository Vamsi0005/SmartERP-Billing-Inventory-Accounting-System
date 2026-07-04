const { z } = require("zod");

const stockSchema = z.object({
  itemName: z.string().min(2),

  category: z.string().min(2),

  unit: z.string().min(1),

  purchasePrice: z.number(),

  sellingPrice: z.number(),

  gst: z.number(),

  openingStock: z.number(),

  minimumStock: z.number(),
});

module.exports = {
  stockSchema,
};