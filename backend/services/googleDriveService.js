import fs from 'fs';
import { google } from 'googleapis';
import apikeys from '../google.json' assert { type: 'json' };

const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

async function uploadFile(authClient) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: 'mydrivetext.txt',
            parents: ['1T49C12V94-ge0H9OI-FVQbODt7jOxq07'] // A folder ID to which the file will get uploaded
        };

        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream('mydrivetext.txt'),
                mimeType: 'text/plain'
            },
            fields: 'id'
        }, (error, file) => {
            if (error) {
                reject(error);
            } else {
                resolve(file);
            }
        });
    });
}

function handleError(error) {
    console.error('Error:', error);
}

async function main() {
    try {
        const authClient = await authorize();
        const uploadedFile = await uploadFile(authClient);
        console.log('File uploaded:', uploadedFile.data);
    } catch (error) {
        handleError(error);
    }
}

main();
