import jsPDF from "jspdf";
import { getUserDocument } from "../firebase/firebase";

const generatePDF = (profile) => {
  const pdf = new jsPDF();

  const marginTop = 10;
  const marginBottom = 10;

  pdf.text("User Details - Report", 20, marginTop);
  pdf.text("Generated by Nasmi", 20, marginTop + 10);

  pdf.addPage();
  let yPos = marginTop;

  // profile Details
  pdf.text(`User Details---------`, 20, yPos);
  yPos += 10;
  pdf.text(`Name: ${profile.displayName}`, 20, yPos);
  yPos += 10;
  pdf.text(`Email: ${profile.email}`, 20, yPos);
  yPos += 10;
  pdf.text(`Phone: ${profile.userPhone}`, 20, yPos);
  yPos += 10;
  pdf.text(`Category: ${profile.category}`, 20, yPos);
  yPos += 10;
  pdf.text(`Address`, 20, yPos);
  yPos += 13;
  pdf.text(`Street: ${profile.address.street}`, 20, yPos);
  yPos += 10;
  pdf.text(`City: ${profile.address.city}`, 20, yPos);
  yPos += 10;
  pdf.text(`State: ${profile.address.state}`, 20, yPos);
  yPos += 10;
  pdf.text(`Country: ${profile.address.country}`, 20, yPos);
  yPos += 10;
  pdf.text(`ZIP: ${profile.address.zip}`, 20, yPos);
  yPos += 10;

  pdf.text("-----------------------------", 20, yPos);
  yPos += 10;

  pdf.save("useDetails_report.pdf");
};

export const generateReportProfile = async (user) => {
  try {
    const userData = await getUserDocument(user);
    if (userData) {
      generatePDF(userData);
    } else {
      console.error("No DETAILS");
    }
  } catch (error) {
    console.error("Error generating report:", error);
  }
};