import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = ({
  title,
  columns,
  rows,
  companyName = "SmartERP",
}) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(companyName, 14, 18);

  doc.setFontSize(16);
  doc.text(title, 14, 30);

  autoTable(doc, {
    startY: 40,
    head: [columns],
    body: rows,
    theme: "grid",
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.setFontSize(10);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    doc.lastAutoTable.finalY + 15
  );

  doc.save(`${title}.pdf`);
};
