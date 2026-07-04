const prisma = require("../lib/prisma");
const { companySchema } = require("../validations/company.validation");

const createCompany = async (req, res) => {
  try {
    // Validate request
    const validatedData = companySchema.parse(req.body);

    // Logged-in user from JWT
    const userId = req.user.id;

    // Check company limit
    const companyCount = await prisma.company.count({
      where: {
        userId,
      },
    });

    if (companyCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 companies allowed.",
      });
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        ...validatedData,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: company,
    });

  } catch (error) {

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const userId = req.user.id;

    const companies = await prisma.company.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: companies,
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
  createCompany,getCompanies,
};