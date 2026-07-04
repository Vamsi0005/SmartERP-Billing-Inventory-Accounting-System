const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getDashboard = async (req, res) => {
  try {

    const { companyId } = req.query;

    // Counts
    const totalCustomers = await prisma.customer.count({
      where: {
        companyId,
      },
    });

    const totalSuppliers = await prisma.supplier.count({
      where: {
        companyId,
      },
    });

    const totalStockItems = await prisma.stockItem.count({
      where: {
        companyId,
      },
    });

    // Purchase Amount
    const purchases = await prisma.purchase.findMany({
      where: {
        companyId,
      },
      select: {
        totalAmount: true,
      },
    });

    const totalPurchaseAmount = purchases.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    // Sales Amount
    const sales = await prisma.sale.findMany({
      where: {
        companyId,
      },
      select: {
        totalAmount: true,
      },
    });

    const totalSalesAmount = sales.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    // Estimated Profit
    const estimatedProfit =
      totalSalesAmount - totalPurchaseAmount;

    // Low Stock Items
    const lowStockItems =
      await prisma.stockItem.findMany({
        where: {
          companyId,
        },
      });

    const filteredLowStock =
      lowStockItems.filter(
        (item) =>
          item.openingStock <= item.minimumStock
      );

    // Recent Purchases
    const recentPurchases =
      await prisma.purchase.findMany({
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
        take: 5,
      });

    // Recent Sales
    const recentSales =
      await prisma.sale.findMany({
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
        take: 5,
      });

    return res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalSuppliers,
        totalStockItems,
        totalPurchaseAmount,
        totalSalesAmount,
        estimatedProfit,
        lowStockItems: filteredLowStock,
        recentPurchases,
        recentSales,
      },
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
  getDashboard,
};