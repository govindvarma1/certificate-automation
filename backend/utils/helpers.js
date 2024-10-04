import crypto from 'crypto';

// Function to generate a unique certificate ID
export function generateCertificateID() {
   // You can customize the prefix if needed
  const idLength = 4; // Adjust the length of the ID as needed

  // Generate a random buffer
  const buffer = crypto.randomBytes(idLength);

  // Convert buffer to hex string
  const id = buffer.toString('hex');

  // Add prefix to the ID
  return "test-" + id;
}
