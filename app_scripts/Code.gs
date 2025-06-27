// Google Apps Script Code.gs

const FOLDER_NAME = "Employee Resumes"; // A folder to store uploaded resumes

function doPost(e) {
  try {
    const formData = e.parameter;
    const folder = getOrCreateFolder("Employee Resumes");

    const name = formData.name;
    const email = formData.email;
    const phone = formData.phone;
    const nationality = formData.nationality;
    const location = formData.location;
    const qualification = formData.qualification;
    const experience = formData.experience;
    const role = formData.role;

    const decodedBytes = Utilities.base64Decode(formData.resumeBase64);
    const blob = Utilities.newBlob(decodedBytes, formData.resumeType, formData.resumeName);
    const resumeFile = folder.createFile(blob);
    const resumeUrl = resumeFile.getUrl();

    const sheet = SpreadsheetApp.openById("1IGZxPNSxvfAwKEVxkI_r4Qgq4pdB7Q21enAX8tTUz2g").getActiveSheet();
    sheet.appendRow([new Date(), name, email, phone, nationality, location, qualification, experience, role, resumeUrl]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}