var express = require('express')
var multer  = require('multer')
var port = 3000;

var app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response)
})
   

app.listen(port,() => console.log(`Server running on port ${port}!`))

// var express = require('express');
// var multer  = require('multer');
// var fs = require('fs');  // Required to read the directory
// var path = require('path');
// var port = 3000;

// var app = express();

// // Set up storage for multer
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// });
// var upload = multer({ storage: storage });

// // Serve static files from 'public' and 'uploads' directories
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

// // Upload a single file
// app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
//   console.log(JSON.stringify(req.file));
//   var response = '<a href="/">Home</a><br>';
//   response += "File uploaded successfully.<br>";
//   response += `<img src="/uploads/${req.file.filename}" /><br>`;
//   return res.send(response);
// });

// // Upload multiple files
// app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
//   var response = '<a href="/">Home</a><br>';
//   response += "Files uploaded successfully.<br>";
//   for(var i = 0; i < req.files.length; i++) {
//     response += `<img src="/uploads/${req.files[i].filename}" /><br>`;
//   }
//   return res.send(response);
// });

// // REST API to list all uploaded files
// app.get('/api/uploads', function (req, res) {
//   fs.readdir('./uploads', (err, files) => {
//     if (err) {
//       return res.status(500).json({ message: 'Unable to scan uploads directory' });
//     }
//     // Return a list of file URLs
//     let fileUrls = files.map(file => {
//       return {
//         filename: file,
//         url: `/uploads/${file}`
//       };
//     });
//     return res.json(fileUrls);
//   });
// });

// // REST API to show a specific image by filename
// app.get('/api/uploads/:filename', function (req, res) {
//   var filename = req.params.filename;
//   var filepath = path.join(__dirname, 'uploads', filename);

//   // Check if the file exists
//   fs.exists(filepath, (exists) => {
//     if (!exists) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     // Serve the file
//     return res.sendFile(filepath);
//   });
// });

// // Start the server
// app.listen(port, () => console.log(`Server running on port ${port}!`));
