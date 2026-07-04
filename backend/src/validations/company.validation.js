const { z } = require("zod");

const companySchema = z.object({
  companyName: z
    .string()
    .min(3, "Company name must be at least 3 characters"),

  address: z
    .string()
    .min(5, "Address is required"),

  gstNumber: z
    .string()
    .optional(),

  financialYear: z
    .string()
    .min(4, "Financial year is required"),

  state: z
    .string()
    .min(2, "State is required"),

  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
});

module.exports = {
  companySchema,
};