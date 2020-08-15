const fs = require('fs')

var parseString = require('xml2js').parseString
var xml = '<root>Hello xml2js!</root>'

const path = '/private/var/www/song-chart/data/Kaikki.xml'

const content = fs.readFileSync(path, { encoding: 'utf8' })

parseString(content, function (err, result) {
  console.log(JSON.stringify(result, null, 2))
})
