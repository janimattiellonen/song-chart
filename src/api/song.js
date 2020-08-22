import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

export default {
  async getTop20() {
    const db = firebase.firestore()

    const collection = db.collection('songs')

    const doc = await collection
      .where('rating', '>', 50)
      .where('rating', '<', 80)
      .where('hasRating', '==', true)
      .orderBy('rating', 'desc')
      .limit(20)
      .get()

    const result = []
    for (const doc1 of doc.docs) {
      result.push(doc1.data())
      //console.log(doc1.id, '=>', doc1.data())
    }

    return result
    /*
    if (doc) {
      const docData = await doc.data()
      return [docData]
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
*/
    /*
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
      })
    */
  }
}
