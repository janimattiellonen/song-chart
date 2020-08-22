const firebase = require('firebase')
const fs = require('fs')
const config = require('./config')
const { Map } = require('immutable')

firebase.initializeApp(config)

const db = firebase.firestore()

const path = `${__dirname}/../../data/output.json`
const content = fs.readFileSync(path, { encoding: 'utf8' })

const parsedContent = JSON.parse(content)

const tracks = Map(parsedContent.Tracks)

const getValue = (obj, key) => {
  if (!!obj[key]) {
    return obj[key]
  }

  return ''
}

tracks.map((track, i) => {
  //console.log(`${i}: ${track.Name} (${track.Artist})`)

  db.collection('songs').add({
    itunesId: getValue(track, 'Track ID'),
    name: getValue(track, 'Name'),
    artist: getValue(track, 'Artist'),
    composer: getValue(track, 'Composer'),
    rating: parseInt(getValue(track, 'Rating'), 10),
    hasRating: !isNaN(parseInt(getValue(track, 'Rating'), 10))
  })
})

/*
      'Track ID': 2420,
      Name: 'Run Like Hell',
      Artist: 'Jason Scheff',
      Composer: 'Pink Floyd',
      Album: 'Breathe - A Tribute To Pink Floyd',
      Genre: 'Rock',
      Kind: 'AAC-äänitiedosto',
      Size: 12351285,
      'Total Time': 309079,
      'Disc Number': 1,
      'Disc Count': 1,
      'Track Number': 7,
      'Track Count': 11,
      Year: 2004,
      'Date Modified': '2006-03-03T17:30:53Z',
      'Date Added': '2006-03-03T17:30:35Z',
      'Bit Rate': 320,
      'Sample Rate': 44100,
      'Album Rating': 60,
      'Album Rating Computed': true,
      Normalization: 5392,
      Compilation: true,
      'Persistent ID': '926D3A2CEBD06608',
      'Track Type': 'File',
      'File Type': 1295270176,
      Location: 'file:///Users/jme/Music/iTunes/iTunes Music/Kokoelmat/Breathe - A Tribute To Pink Floyd/07 Run Like Hell.m4a',
      'File Folder Count': 4,
      'Library Folder Count': 1
 */
