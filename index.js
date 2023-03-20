const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require("multer");

require('dotenv').config()

const app = express();

const upload = multer({ dest: "public/files" });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    // Stuff to be added later
    console.log(req.file);
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
