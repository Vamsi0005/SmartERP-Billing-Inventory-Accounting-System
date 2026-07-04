const { z } = require("zod");

const customerSchema = z.object({
  customerName: z.string().min(3, "Customer name is required"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().min(3, "Address is required"),
  openingBalance: z.number().optional(),
});

module.exports = {
  customerSchema,
};