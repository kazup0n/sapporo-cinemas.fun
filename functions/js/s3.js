const AWS = require('aws-sdk')
const logger = require('./logger')

const JSON_FILE_KEY = 'cinema_schedules.json'


function putObject(contents){
  const params = {
    Bucket: process.env.bucketName,
    Key: JSON_FILE_KEY,
    Body: JSON.stringify(contents),
    ContentType: 'application/json'
  }

  logger.trace('putting to s3', params)
  if(process.env.stage == 'dev'){
    return putFile(params)
  }else{
    return putS3Object(params)
  }
}

function putFile(params){
  return new Promise(function(resolve, reject){
    const fs = require("fs");
    fs.writeFile('../ui/dist/cinema_schedules.json', params.Body, function(err){
      if(err) reject(err)
      else resolve()
    })
  })
}

function putS3Object(params){
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