const express = require("express");
const fileUpload = require("express-fileupload");
const changePdf = require("change-pdf");

const app = express();
app.use(fileUpload());

//Post request
app.post("/upload", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/uploads/${file.name}`, (err) => {
    if (err) {
      // console.log("here");
      return res.status(500).send(err);
    }

    changePdf.compressPdf(
      `${__dirname}/client/uploads/${file.name}`,
      `${__dirname}/client/output/${file.name}`,
      "screen"
    );

    // res.json({ filename: file.name, filePath: `/output/${file.name}` });
  });
});

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
