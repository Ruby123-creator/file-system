import http from 'http';
import fs from 'fs';
import formidable from 'formidable';
const server = http.createServer();
// create,read,write,delete,rename,rstreamfile of file system
// server.on('request',(req,res)=>{
//     console.log("this is entry point");
//     const DataString ="this is text page";
//     if(req.method==="GET" && req.url==="/"){
//        return res.end("this is your home page");
//     }
//     else if(req.method==="GET" && req.url==="/append") {
//           fs.appendFile("demo.txt",DataString,(err)=>{
//             if (err) throw err;
//             res.end("text appended");
//           })
//     }
//     else if (req.method === "GET" && req.url == "/writefile") {
//             fs.writeFile("demo2.txt", DataString, (err) => {
//               if (err) throw err;
        
//               console.log("write File");
//               return res.end("Writefile");
//             });
//         }
//         else if (req.method === "GET" && req.url == "/readfile") {
//                 fs.readFile("demo2.txt", (err, data) => {
//                   if (err) throw err;
//                   //   console.log(data);
//                   res.write(data);
//                   return res.end();
//                 });
//               } 
//               else if (req.method === "GET" && req.url == "/deletefile") {
//                     fs.unlink("demo.txt", (err) => {
//                       if (err) throw err;
//                       console.log("Deleted");
//                       return res.end("File deleted successfully");
//                     });
//                   }
//                     //rename
//   else if (req.method === "GET" && req.url == "/renamefile") {
//     fs.rename("demo.txt", "newDemo.txt", (err) => {
//       if (err) throw err;
//       console.log("Rename");
//       return res.end("File Rename successfully");
//     });
//   }

// //   creating a stream to read a file
//   else if (req.method === "GET" && req.url == "/streamfile") {
//     const rStream = fs.createReadStream("demo2.txt");

//     rStream.on("data", (char) => {
//       //   console.log(char, " ");
//       res.write(char);
//     });

//     rStream.on("end", () => {
//       return res.end();
//     });
//   }

// })

// upload file
server.on("request", (req, res) => {
    if (req.method === "POST" && req.url === "/fileupload") {
      //form submission
      let form = new formidable.IncomingForm();
  
      form.parse(req, (err, feilds, files) => {
        const oldPath = files.fileToUpload.filepath;
  
        const newPath =
          __dirname + "/upload/" + files.fileToUpload.originalFilename;
  
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
          return res.end("file uploaded successfully");
        });
      });
    } else {
      //return html form
      fs.readFile("form.html", (err, data) => {
        if (err) throw err;
  
        res.write(data);
        return res.end();
      });
    }
  });
server.listen(3000,()=>{
    console.log("server is running at port 3000")
})