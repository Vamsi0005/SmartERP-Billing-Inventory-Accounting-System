const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { stockSchema } = require("../validations/stock.validation");

// Create Stock Item
const createStock = async (req, res) => {
  try {
    const validation = stockSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      itemName,
      category,
      unit,
      purchasePrice,
      sellingPrice,
      gst,
      openingStock,
      minimumStock,
    } = validation.data;

    const { companyId } = req.body;

    const stock = await prisma.stockItem.create({
      data: {
        itemName,
        category,
        unit,
        purchasePrice,
        sellingPrice,
        gst,
        openingStock,
        minimumStock,
        companyId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Stock item created successfully.",
      data: stock,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Stock Items
const getStocks = async (req, res) => {
  try {
    const { companyId } = req.query;

    const stocks = await prisma.stockItem.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: stocks,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Stock Item
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;

    const validation = stockSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const stock = await prisma.stockItem.update({
      where: { id },
      data: validation.data,
    });

    return res.status(200).json({
      success: true,
      message: "Stock item updated successfully.",
      data: stock,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Stock Item
const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.stockItem.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Stock item deleted successfully.",
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
  createStock,
  getStocks,
  updateStock,
  deleteStock,
};