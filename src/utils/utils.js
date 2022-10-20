import bcrypt from 'bcrypt';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config } from '../Config/config.js';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const s3 = new aws.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretAccessKey
})

export const upload = multer({
  storage:multerS3({
      s3:s3,
      bucket:'uploads-rgonzalez-bucket',
      metadata:(req,file,cb)=>{
          cb(null,{fieldName:file.fieldname})
      },
      key:(req,file,cb)=>{
          cb(null,Date.now().toString()+file.originalname)
      }
  })
})