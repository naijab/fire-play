let express = require("express");
let router = express.Router();

let firebase = require("../firebase");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

let multer = require("multer");
let upload = multer();

/* POST upload image example. */
router.post("/upload", upload.single("image"), async function (req, res, next) {
  try {
    let bucket = firebase.storage().bucket();
    let folder = "test";
    let fileName = Date.now();
    let fileNameForUpload = `${folder}/${fileName}`;
    let fileUpload = await bucket.file(fileNameForUpload);
    let blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(405).json({ error: err.toString() });
    });

    blobStream.on("finish", async () => {
      let publicUrl = await bucket.file(fileNameForUpload).makePublic();
      res.status(201).json({
        upload: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
