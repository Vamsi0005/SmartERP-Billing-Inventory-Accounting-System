const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { supplierSchema } = require("../validations/supplier.validation");

// Create Supplier
const createSupplier = async (req, res) => {
  try {
    const validation = supplierSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      supplierName,
      mobileNumber,
      address,
      openingBalance,
    } = validation.data;

    const { companyId } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        supplierName,
        mobileNumber,
        address,
        openingBalance: openingBalance || 0,
        companyId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully.",
      data: supplier,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Suppliers
const getSuppliers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const suppliers = await prisma.supplier.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: suppliers,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Supplier
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const validation = supplierSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      supplierName,
      mobileNumber,
      address,
      openingBalance,
    } = validation.data;

    const supplier = await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        supplierName,
        mobileNumber,
        address,
        openingBalance,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Supplier updated successfully.",
      data: supplier,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.supplier.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Supplier deleted successfully.",
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
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};