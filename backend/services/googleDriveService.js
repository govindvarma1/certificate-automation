import { google } from 'googleapis';
import apikeys from '../google.json' assert { type: 'json' };
import { Readable } from 'stream';

const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  try {
    const jwtClient = new google.auth.JWT(
      apikeys.client_email,
      null,
      apikeys.private_key,
      SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
  } catch (error) {
    console.error('Authorization error:', error);
    throw error; 
  }
}

export async function uploadFile(pdfBuffer, name, course) {
  try {
    const authClient = await authorize();
    const drive = google.drive({ version: 'v3', auth: authClient });
    const fileMetaData = {
      name: `${name}_${course}.pdf`,
      parents: ['1T49C12V94-ge0H9OI-FVQbODt7jOxq07'],
    };

    const readableStream = new Readable({
        read() {
          this.push(pdfBuffer);
          this.push(null); // Signal the end of the stream
        },
      });

    const media = {
      mimeType: 'application/pdf',
      body: readableStream,
    };

    const uploadedFile = await drive.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id, webViewLink',
    });

    console.log('File uploaded:', uploadedFile.data);

    const fileLink = uploadedFile.data.webViewLink;
    console.log('File link:', fileLink); 

    return fileLink; // Return the link to the uploaded file
  } catch (error) {
    console.error('Upload error:', error);
    throw error; // Propagate the error for handling by the caller
  }
}
