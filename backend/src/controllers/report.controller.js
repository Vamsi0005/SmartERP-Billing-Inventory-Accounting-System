const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStockReport = async (req, res) => {
  try {
    const { companyId } = req.query;

    const stock = await prisma.stockItem.findMany({
      where: {
        companyId,
      },
      orderBy: {
        itemName: "asc",
      },
    });

    return res.status(200).json({
      success: true,
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

const getPurchaseReport = async (req, res) => {
  try {

    const { companyId } = req.query;

    const purchases = await prisma.purchase.findMany({
      where: {
        companyId,
      },
      include: {
        supplier: true,
        stockItem: true,
      },
      orderBy: {
        purchaseDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: purchases,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getSalesReport = async (req, res) => {
  try {

    const { companyId } = req.query;

    const sales = await prisma.sale.findMany({
      where: {
        companyId,
      },
      include: {
        customer: true,
        stockItem: true,
      },
      orderBy: {
        saleDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: sales,
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
  getStockReport,
  getPurchaseReport,
  getSalesReport,
};