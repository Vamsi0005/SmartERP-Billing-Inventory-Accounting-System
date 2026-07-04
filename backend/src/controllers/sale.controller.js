const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { saleSchema } = require("../validations/sale.validation");

const createSale = async (req, res) => {
  try {

    const validation = saleSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      customerId,
      stockItemId,
      quantity,
      sellingPrice,
      gst,
      totalAmount,
    } = validation.data;

    const { companyId } = req.body;

    // Check stock availability
    const stock = await prisma.stockItem.findUnique({
      where: {
        id: stockItemId,
      },
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock item not found.",
      });
    }

    if (stock.openingStock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock.",
      });
    }

    const sale = await prisma.sale.create({
      data: {
        customerId,
        stockItemId,
        quantity,
        sellingPrice,
        gst,
        totalAmount,
        companyId,
      },
    });

    await prisma.stockItem.update({
      where: {
        id: stockItemId,
      },
      data: {
        openingStock: {
          decrement: quantity,
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Sale created successfully.",
      data: sale,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getSales = async (req, res) => {
  try {

    const { companyId, filter = "all" } = req.query;

    let where = {
      companyId,
    };

    const today = new Date();

    if (filter === "today") {

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      where.saleDate = {
        gte: start,
        lte: end,
      };

    } else if (filter === "week") {

      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      start.setHours(0, 0, 0, 0);

      where.saleDate = {
        gte: start,
      };

    } else if (filter === "month") {

      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

      where.saleDate = {
        gte: start,
      };

    }

    const sales = await prisma.sale.findMany({
      where,
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
  createSale,
  getSales,
};