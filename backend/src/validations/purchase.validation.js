const { z } = require("zod");

const purchaseSchema = z.object({
  supplierId: z.string(),

  stockItemId: z.string(),

  quantity: z.number().int().positive(),

  purchasePrice: z.number(),

  gst: z.number(),

  totalAmount: z.number(),
});

module.exports = {
  purchaseSchema,
};