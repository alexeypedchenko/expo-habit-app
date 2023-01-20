import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { getID } from '../utils'

export const getDocument = async (path: string[]) => {
  const docRef = doc(db, ...path)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : null
}
export const setDocument = async (path: string[], data) =>
  new Promise(async (res, rej) => {
    try {
      const id = getID()
      const isUpdate = await setDoc(doc(db, ...path, id), data)
      res({ success: true, id, data })
    } catch (error) {
      res({
        success: false,
        error: 'error'
      })
    }
  })

export const updateDocument = (path: string[], data) =>
  new Promise(async (res, rej) => {
    console.log('path:', path)
    console.log('data:', data)
    try {
      const isUpdate = await updateDoc(doc(db, ...path), data)
      res({ success: true, data })
    } catch (error) {
      console.log('error:', error)
      res({
        success: false,
        error: 'error'
      })
    }
  })

export const getCollection = async (path: string[]) => {
  const querySnapshot = await getDocs(collection(db, ...path))
  const docs = []
  querySnapshot.forEach((doc) => {
    const item = [doc.id, doc.data()]
    docs.push(item)
  })
  return docs
}

export const deleteDocument = (path: string[], id) =>
  new Promise(async (res, rej) => {
    try {
      const isUpdate = await deleteDoc(doc(db, ...path, id))
      res({ success: true, id })
    } catch (error) {
      res({
        success: false,
        error: 'error'
      })
    }
  })
