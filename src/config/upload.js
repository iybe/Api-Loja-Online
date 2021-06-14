const multer = require('multer');
const path = require('path');

const localArmazenamento = path.resolve(__dirname, '..','..','images');

module.exports = {
  localArmazenamento,
  storage: multer.diskStorage({
        destination: path.resolve(__dirname,'..','..','images'),
        filename : (req,file,cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null,`${name}-${Date.now()}${ext}`)
        }
  }),
};
