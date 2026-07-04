const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { purchaseSchema } = require("../validations/purchase.validation");

const createPurchase = async (req, res) => {
  try {

    const validation = purchaseSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors,
      });
    }

    const {
      supplierId,
      stockItemId,
      quantity,
      purchasePrice,
      gst,
      totalAmount,
    } = validation.data;

    const { companyId } = req.body;

    const purchase = await prisma.purchase.create({
      data: {
        supplierId,
        stockItemId,
        quantity,
        purchasePrice,
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
          increment: quantity,
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Purchase created successfully.",
      data: purchase,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getPurchases = async (req, res) => {
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

      where.purchaseDate = {
        gte: start,
        lte: end,
      };

    } else if (filter === "week") {

      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      start.setHours(0, 0, 0, 0);

      where.purchaseDate = {
        gte: start,
      };

    } else if (filter === "month") {

      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

      where.purchaseDate = {
        gte: start,
      };

    }

    const purchases = await prisma.purchase.findMany({
      where,
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

module.exports = {
  createPurchase,
  getPurchases,
};