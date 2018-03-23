const S3 = require('aws-sdk/clients/s3')
const _ = require('lodash')

const logger = require('./logger')

const JSON_FILE_KEY = 'cinema_schedules.json'

const indent = process.env.stage == 'dev' ? 4: 0

function putObject(contents){
  const params = {
    Bucket: process.env.bucketName,
    Key: JSON_FILE_KEY,
    Body: JSON.stringify(contents, null, indent),
    ContentType: 'application/json'
  }

  logger.debug('putting to storage', _.pick(params, ['Bucket', 'Key']))
  if(process.env.stage == 'dev'){
    return putFile(params)
  }else{
    return putS3Object(params)
  }
}

function putFile(params){
  return new Promise(function(resolve, reject){
    const fs = require("fs");
    const file = `../ui/dist/${JSON_FILE_KEY}`
    logger.debug('Writing to local file', {file: file})
    fs.writeFile(file, params.Body, function(err){
      if(err) reject(err)
      else resolve()
    })
  })
}

function putS3Object(params){
  return new Promise(function(resolve, reject){
    new S3().putObject(params, function(err, data){
      if(err){
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports.putObject = putObject