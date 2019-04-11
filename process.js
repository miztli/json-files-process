const fs = require('fs')

const BASE_PATH = '/home/miztli/workspace/indigo/khor/khor-all/hum1703-endpoint/src/languages'
const FILE_SUFFIXES = [
	'-cognitive.json', 
	'-dominance.json', 
	'-emotional.json', 
	'-english.json', 
	'-ivo.json', 
	'-management.json', 
	'-mechanical.json', 
	'-motivational.json', 
	'-social.json'
]

const BASE_FILE_NAME = 'es-lat'
const FILES_TO_COMPARE = ['en-us', 'fr-fr', 'it-it', 'pt-br']

function processFiles() {
  FILE_SUFFIXES.forEach(fileSuffix => {
	  let baseFile = BASE_PATH + '/' + BASE_FILE_NAME + fileSuffix 
	  
	  fs.readFile(baseFile, (err, baseFileData) => {
	    if (err) throw err
	    let baseFileJson = JSON.parse(baseFileData)

	    FILES_TO_COMPARE.forEach(fileName => {
	      let comparableFilePath = BASE_PATH + '/' + fileName + fileSuffix 

	      fs.readFile(comparableFilePath, (err, comparableFileData) => {
		if (err) throw err
		      
	  	console.log('------base file: ', baseFile, '------')
		console.log('------comparing to: ', comparableFilePath, '------')
		let comparableFileJson = JSON.parse(comparableFileData)
		let missingKeys = {}

		Object.keys(baseFileJson).forEach(key => {
		  let foundKey = comparableFileJson[key]
		  if (foundKey === undefined) {
		    console.log('missing key: ', key) 
		    missingKeys[key] = ''
		  }
		})

		let createdFileName = 'created-jsons/' + fileName + '/' + fileName + fileSuffix 
		let missingKeysString = JSON.stringify(missingKeys, null, 2)
		  fs.writeFile(createdFileName, missingKeysString, (err) => {
		    if (err) throw err
		    console.log('file ' + createdFileName + ' created!')
		  })
	      })
	    })

	    
	  })
  })
}

// EXECUTE
/*
Promise
  .all([ readRemote(REMOTE_JSON), readLocalCSV(LOCAL_CSV) ])
  .then(processDiff)
  .catch(e => console.log('Error! >', e))
*/
console.log('beginning process')
processFiles()
