function doPost(e) {
  try {
    const name = e.parameter.name;
    const email = e.parameter.email;
    const message = e.parameter.message;
    const phone = e.parameter.phone;

    const recipient = "yforyadhu2003@gmail.com"; // <- Replace with your actual email
    const subject = "New Contact Form Submission from Accoplacers";
    const body = `
      You have received a new message from your website contact form from ${name}:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `;

    MailApp.sendEmail(recipient, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
