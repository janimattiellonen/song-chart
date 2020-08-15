import React, { useEffect, useState } from 'react'

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

import styled from '@emotion/styled'

import firebase from 'firebase'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import IconButton from '@material-ui/core/IconButton/IconButton'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

console.log(JSON.stringify(config, null, 2))

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

const StyledFoo = styled(StyledFirebaseAuth)({
  background: 'white',
  margin: '0 auto',
  marginTop: '50px',
  padding: '50px',
  width: '300px',
  '& .firebaseui-container': {
    width: 'auto'
  }
})

export const SignInScreen = ({}) => {
  const [isSignedIn, signIn] = useState(false)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const unFoo = firebase.auth().onAuthStateChanged((user) => {
      console.log(`user: ${JSON.stringify(user, null, 2)}`)
      signIn(!!user)
    })

    return function cleanup() {
      unFoo()
    }
  }, [])

  if (!isSignedIn) {
    return (
      <div>
        <Button color="inherit" aria-label="menu" onClick={handleOpen}>
          Login
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <StyledFoo uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Modal>
      </div>
    )
  }

  const db = firebase.firestore()
  const docRef = db.collection('songs').doc('song')

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

  return (
    <div>
      <Button color="inherit" aria-label="menu" onClick={() => firebase.auth().signOut()}>
        {firebase.auth().currentUser.displayName} <span style={{ marginLeft: '30px' }}>Logout</span>
      </Button>
    </div>
  )
}
