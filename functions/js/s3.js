const AWS = require('aws-sdk')

const JSON_FILE_KEY = 'cinema_schedules.json'

function putObject(contents){
  const params = {
    Bucket: process.env.bucketName,
    Key: JSON_FILE_KEY,
    Body: JSON.stringify(contents),
    ContentType: 'application/json'
  }

  return new Promise(function(resolve, reject){
    new AWS.S3().putObject(params, function(err, data){
      if(err){
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports.putObject = putObject