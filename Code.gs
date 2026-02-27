function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ບົດສອບເສັງທຶນການສຶກສາ')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

const LAO_COUNTRY_CODE = '856';
const MIN_PHONE_LENGTH = 8;

function getBackgroundImageData() {
  var folderId = '182XU72FN6FtWc9AmzHDfj3DAS6-kRwOn';
  var fileName = 'form_background.png';
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFilesByName(fileName);
  if (!files.hasNext()) {
    return '';
  }
  var file = files.next();
  var blob = file.getBlob();
  var contentType = blob.getContentType();
  var encoded = Utilities.base64Encode(blob.getBytes());
  return 'data:' + contentType + ';base64,' + encoded;
}

function normalizePhone(value) {
  if (value === null || value === undefined) {
    return '';
  }
  var digits = String(value).replace(/\D+/g, '');
  if (digits.indexOf(LAO_COUNTRY_CODE) === 0) {
    digits = digits.substring(LAO_COUNTRY_CODE.length);
  }
  // Remove any leading zeros that may remain after stripping the country code.
  digits = digits.replace(/^0+/, '');
  return digits;
}

function processSubmission(formObject) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // ດຶງຂໍ້ມູນທົ່ວໄປ (ບໍ່ມີຄະແນນ)
  var name = formObject.studentName;
  var phone = (formObject.phone || '').toString().trim();
  var gender = formObject.gender;
  var year = formObject.year;
  var uni = formObject.university;

  if (!phone) {
    throw new Error("ກະລຸນາປ້ອນເບີໂທກ່ອນສົ່ງ");
  }
  var normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) {
    throw new Error("ເບີໂທບໍ່ຖືກຮູບແບບ, ກະລຸນາກວດຄືນ");
  }
  if (normalizedPhone.length < MIN_PHONE_LENGTH) {
    throw new Error("ເບີໂທບໍ່ຖືກຮູບແບບ, ກະລຸນາກວດຄືນ");
  }

  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var phoneValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (var i = 0; i < phoneValues.length; i++) {
      if (normalizePhone(phoneValues[i][0]) === normalizedPhone) {
        throw new Error("ເບີໂທນີ້ໄດ້ສົ່ງແລ້ວ, ກະລຸນາຢ່າສົ່ງຊ້ຳ");
      }
    }
  }



  // ດຶງຂໍ້ມູນ IQ ແລະ ຄິດໄລ່ຄະແນນ
  var iqChoice = formObject.iqScore;
  var iqPoints = 0;

  if (iqChoice === "140+") { iqPoints = 60; }
  else if (iqChoice === "120–139") { iqPoints = 60; }
  else if (iqChoice === "110–119") { iqPoints = 55; }
  else if (iqChoice === "100–109") { iqPoints = 50; }
  else if (iqChoice === "80–99") { iqPoints = 0; }
  else if (iqChoice === "60–79") { iqPoints = 0; }
  else if (iqChoice === "ຕ່ຳກວ່າ 60") { iqPoints = 0; }



  var fileUrl = "ບໍ່ມີຮູບພາບ";
  if (formObject.imageFileBase64 && formObject.imageFileName) {
    var folder;
    var folderIterator = DriveApp.getFoldersByName("Scholarship_IQ_Uploads");
    if (folderIterator.hasNext()) {
      folder = folderIterator.next();
    } else {
      folder = DriveApp.createFolder("Scholarship_IQ_Uploads"); // ສ້າງໂຟນເດີໃໝ່ຖ້າບໍ່ມີ
    }

    var contentType = formObject.imageFileBase64.substring(5, formObject.imageFileBase64.indexOf(';'));
    var bytes = Utilities.base64Decode(formObject.imageFileBase64.substr(formObject.imageFileBase64.indexOf('base64,') + 7));
    var blob = Utilities.newBlob(bytes, contentType, name + "_" + formObject.imageFileName);
    var file = folder.createFile(blob);
    fileUrl = file.getUrl();
  }

  // ກວດຄຳຕອບ Q8, Q9 ແລະ Q10
  var q8Answer = formObject.q8;
  var q9Answer = formObject.q9;
  var q10Answer = formObject.q10;
  var q11Answer = formObject.q11;
  var q12Answer = formObject.q12;
  var q13Answer = formObject.q13;
  var q14Answer = formObject.q14;
  var q15Answer = formObject.q15;
  var q16Answer = formObject.q16;
  var q17Answer = formObject.q17;
  var q18Answer = formObject.q18;
  var q19Answer = formObject.q19;
  var q20Answer = formObject.q20;
  var q21Answer = formObject.q21;
  var q22Answer = formObject.q22;
  var q23Answer = formObject.q23;
  var q24Answer = formObject.q24;
  var q25Answer = formObject.q25;

  var q8Points = 0;
  var q9Points = 0;
  var q10Points = 0;
  var q11Points = 0;
  var q12Points = 0;
  var q13Points = 0;
  var q14Points = 0;
  var q15Points = 0;
  var q16Points = 0;
  var q17Points = 0;
  var q18Points = 0;
  var q19Points = 0;
  var q20Points = 0;
  var q21Points = 0;
  var q22Points = 0;
  var q23Points = 0;
  var q24Points = 0;
  var q25Points = 0;



  // ⚠️ ກະລຸນາປ່ຽນຄຳຕອບທີ່ຖືກຕ້ອງ (ຕົວໜັງສືສີແດງ) ເປັນຄຳຕອບຕົວຈິງຂອງທ່ານ
  if (q8Answer === "A. 1,200") { q8Points = 10; }
  if (q9Answer === "D. 14,000") { q9Points = 10; }
  if (q10Answer === "B. ບໍ່ໄດ້") { q10Points = 10; }

  if (q11Answer === "B. ບໍ່ແມ່ນ") { q11Points = 0.625; }
  if (q12Answer === "B. ບໍ່ແມ່ນ") { q12Points = 0.625; }
  if (q13Answer === "B. ບໍ່ແມ່ນ") { q13Points = 0.625; }
  if (q14Answer === "A. ແມ່ນແລ້ວ") { q14Points = 0.625; }
  if (q15Answer === "B. ບໍ່ແມ່ນ") { q15Points = 0.625; }
  if (q16Answer === "A. ແມ່ນແລ້ວ") { q16Points = 0.625; }
  if (q17Answer === "B. ບໍ່ແມ່ນ") { q17Points = 0.625; }
  if (q18Answer === "B. ບໍ່ແມ່ນ") { q18Points = 0.625; }

  if (q19Answer === "C. ທັນທີທັນໃດລາຍງານກັບຫົວຫນ້າຫຼືພະແນກກວດສອບ") { q19Points = 1; }
  if (q20Answer === "B. ບັນທຶກແລະລາຍງານໂດຍບໍ່ມີການໄດ້ຮັບ") { q20Points = 1; }
  if (q21Answer === "C. ເຜີຍແຜ່ ແລະ ລາຍງານດ້ວຍຕົວເອງທັນທີ") { q21Points = 1; }
  if (q22Answer === "A. ກວດເບິ່ງກົດລະບຽບ ແລະ ຖາມຄໍາຖາມຕໍ່ກັບ ຫົວໜ້າຂອງທ່ານ") { q22Points = 1; }
  if (q23Answer === "B. ຂໍໂທດກັບຫມູ່ເພື່ອນແລະປະຕິເສດ") { q23Points = 1; }

  if (q24Answer === "D. ການໂທຫາກຸ່ມລູກຄ້າທີ່ສົນໃຈ") { q24Points = 5; }
  if (q25Answer === "D. ສານພົວພັນໝູ່ທີ່ເຮັດວຽກບໍລິສັດຄູ່ແຂ່ງ") { q25Points = 5; }


  // ລວມຄະແນນ
  var totalScore = iqPoints                                                                             // 60 ຄະແນນ (ຖ້າໄດ້ IQ 100 ໄດ້ 50, IQ 110 ໄດ້ 55, IQ 120 ໄດ້ 60)
    + (q8Points + q9Points + q10Points)                                                                 // 30 ຄະແນນ (ຂໍ້ລະ 10 ຄະແນນ)
    + (q11Points + q12Points + q13Points + q14Points + q15Points + q16Points + q17Points + q18Points)   // 5 ຄະແນນ (ຂໍ້ລະ 0.625 ຄະແນນ)
    + (q19Points + q20Points + q21Points + q22Points + q23Points)                                       // 5 ຄະແນນ (ຂໍ້ລະ 1 ຄະແນນ)
    + (q24Points + q25Points)                                                                           // 10 ຄະແນນ (ຂໍ້ລະ 5 ຄະແນນ)
    ;

  var passThreshold = 100; // ຕັ້ງຄ່າຄະແນນຜ່ານຢູ່ບ່ອນນີ້
  var passed = totalScore >= passThreshold;
  var statusText = passed ? "ຜ່ານ" : "ຕົກ";



  // ບັນທຶກລົງ Google Sheet
  sheet.appendRow([new Date(), name, phone, gender, year, uni, iqChoice, iqPoints, fileUrl,
    q8Answer, q8Points, q9Answer, q9Points, q10Answer, q10Points,
    q11Answer, q11Points, q12Answer, q12Points, q13Answer, q13Points, q14Answer, q14Points, q15Answer, q15Points, q16Answer, q16Points, q17Answer, q17Points, q18Answer, q18Points,
    q19Answer, q19Points, q20Answer, q20Points, q21Answer, q21Points, q22Answer, q22Points, q23Answer, q23Points,
    q24Answer, q24Points, q25Answer, q25Points,
    totalScore, statusText]);


  // ສົ່ງຂໍ້ຄວາມກັບຄືນໄປຫາໜ້າຈໍນັກຮຽນ
  if (passed) {
    return "ຂໍສະແດງຄວາມຍິນດີ! ທ່ານເສັງຜ່ານ ກະລຸນາຂຶ້ນມາຮັບທຶນການສຶກສາຢູ່ທາງໜ້າ.";
  } else {
    return "ຂໍສະແດງຄວາມເສຍໃຈ, ທ່ານຍັງບໍ່ຜ່ານໃນຄັ້ງນີ້. ຂອບໃຈທີ່ເຂົ້າຮ່ວມ.";
  }
}
