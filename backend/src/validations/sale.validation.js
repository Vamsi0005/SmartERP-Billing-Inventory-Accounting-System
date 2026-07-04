const { z } = require("zod");

const saleSchema = z.object({
  customerId: z.string(),
  stockItemId: z.string(),
  quantity: z.number().int().positive(),
  sellingPrice: z.number(),
  gst: z.number(),
  totalAmount: z.number(),
});

module.exports = {
  saleSchema,
};