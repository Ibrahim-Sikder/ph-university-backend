import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_secret,
})

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result)

        fs.unlink(path, (err) => {
          if (err) {
            throw err
          }

          console.log('Delete File successfully.')
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve('E:/uploads')

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true })

    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
