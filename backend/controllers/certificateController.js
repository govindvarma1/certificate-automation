import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { uploadFile } from '../services/googleDriveService.js';
import Certificate from '../models/Certificate.js';
import { generateCertificateID } from '../utils/helpers.js';

const currentDir = path.dirname(new URL(import.meta.url).pathname);

export const createCertificate = async (req, res, next) => {
    try {
        const { name, course, date } = req.body;

        if(!name || !course || !date) {
            return res.status(400).json({msg: "Details are missing"});
        }

        const cert_id = generateCertificateID();

        const templatePath = `${currentDir}/template.pdf`;
        const templateBytes = await fs.promises.readFile(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);
        const page = pdfDoc.getPages()[0];

        const fontSize = 24;
        let yPosition = 380; 

        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
        const HelveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const nameWidth = timesRomanFont.widthOfTextAtSize(name, 36);
        const courseWidth = HelveticaFont.widthOfTextAtSize(`For successfully completing the ${course}`, 18);
        const dateWidth = HelveticaFont.widthOfTextAtSize(`Course on ${date}`, 18);

        const pageWidth = page.getWidth();
        const nameX = (pageWidth - nameWidth) / 2;
        const courseX = (pageWidth - courseWidth) / 2;
        const dateX = (pageWidth - dateWidth) / 2;

        page.drawText(`${name}`, {
            x: nameX,
            y: yPosition,
            size: 42,
            font: timesRomanFont,
            color: rgb(0.894, 0.647, 0.102), 
        });
        yPosition -= fontSize + 20; 
        
        page.drawText(`For successfully completing the ${course}`, {
            x: courseX,
            y: yPosition,
            size: 18,
            font: HelveticaFont,
            color: rgb(0, 0, 0),
        });
        yPosition -= fontSize + 5; 

        page.drawText(`course on ${date}`, {
            x: dateX,
            y: yPosition,
            size: 18,
            font: HelveticaFont,
            color: rgb(0, 0, 0),
        });

        yPosition -= fontSize + 220;

        page.drawText(`${cert_id}`, {
            x: 650,
            y: yPosition,
            size: 14,
            color: rgb(0, 0, 0),
        });

        const modifiedPdfBytes = await pdfDoc.save();
        
        const link = await uploadFile(modifiedPdfBytes, name, course);
        
        const document = await Certificate.create({
            name: name,
            course: course,
            date: date,
            link: link,
            cert_id: cert_id
        });
        
        res.json({ msg: "Certificate created", data: document });

    } catch (ex) {
        console.error(`Error creating certificate: ${ex.message}`);
        next(ex);
    }
}

export const fetchCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find();
        res.json({ msg: "certificates", certificates });
    } catch (ex) {
        next(ex);
    }
}

export const deleteCertificate = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        await Certificate.findByIdAndDelete(id);
        res.status(200).json({msg: "deleted sucessfully"})
    } catch (error) {
        next(ex);
    }
}