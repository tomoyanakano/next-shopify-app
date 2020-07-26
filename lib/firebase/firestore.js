import firebase from './firebaseInit'

const db = firebase.firestore()

export default async function createReview(review) {
  return db.collection('review').doc(review.customerId).set({
    id: review.customerId,
    productId: review.productId,
    title: review.title,
    content: review.content,
    evaluation: review.evaluation,
    name: review.name,
    recommend: review.recommend,
    visibility: review.visibility,
  })
}

export async function getAllReviewIds() {
  const snapshots = await db.collection('reviews').get()
  return snapshots.docs.map(doc => {
    return {
      params: {
        id: doc.id
      }
    }
  })
}

export async function getAllReviews() {
  const snapshots = await db.collection('reviews').get()
  return snapshots.docs.map((doc) => doc.data())
}


export async function getReviewData(id) {
  const docRef = db.collection('reviews').doc(id)
  return docRef.get().then(function(doc) {
    return doc.data()
  })
}
