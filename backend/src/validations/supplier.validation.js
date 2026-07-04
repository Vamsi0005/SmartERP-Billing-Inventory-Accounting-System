const { z } = require("zod");

const supplierSchema = z.object({
  supplierName: z
    .string()
    .min(3, "Supplier name must be at least 3 characters"),

  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits"),

  address: z
    .string()
    .min(3, "Address is required"),

  openingBalance: z
    .number()
    .optional(),
});

module.exports = {
  supplierSchema,
};