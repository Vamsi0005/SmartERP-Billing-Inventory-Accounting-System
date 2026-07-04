const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { customerSchema } = require("../validations/customer.validation");

const createCustomer = async (req, res) => {
  try {
    const validation = customerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      customerName,
      mobileNumber,
      address,
      openingBalance,
    } = validation.data;

    const { companyId } = req.body;

    const customer = await prisma.customer.create({
      data: {
        customerName,
        mobileNumber,
        address,
        openingBalance: openingBalance || 0,
        companyId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const customers = await prisma.customer.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: customers,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    const validation = customerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      customerName,
      mobileNumber,
      address,
      openingBalance,
    } = validation.data;

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        customerName,
        mobileNumber,
        address,
        openingBalance,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: customer,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const deleteCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  createCustomer,getCustomers,updateCustomer,deleteCustomer,
};