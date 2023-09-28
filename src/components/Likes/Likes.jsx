import React, { useEffect, useState } from 'react'
import "./Likes.css"
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';


function Likes(articleId) {

  const [user] = useAuthState(auth);

  const [isLiked, setIsLiked] = useState(false);

  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {

    //did this user like this article?

    const likesRef = collection( db, "Likes");
    
    if (user) {
      //make a query to see if liked previously or not

      const q = query (
        likesRef, 
        where("articleId", "==", articleId), 
        where("userId","==", user?.uid)
        );
        getDocs(q, likesRef)
        .then(res => {
          if(res.size > 0){
            setIsLiked(true);
          }
        })
        .catch((err) => console.log(err))
    }

  }, [user])

  useEffect(() => {
    //now find out the like count 
    //make a query to count likes

    const likesRef = collection( db, "Likes");

    const q2 = query(likesRef, where("articleId", "==", articleId));

    //look for matching documents

    getDocs(q2, likesRef)
    .then((res) => {setLikeCount(res.size)})


  }, [isLiked]) 

  // add function to be able to store likes and unlikes
  // add another collection for userID and articleID
  
  const handleLikes = (e) => {
    if (user) {
      // create a reference to likes collection
      // will create the collection if it doesn't exist

      const likesRef = collection(db, "Likes")

      // add a document with this articleID and userID
      addDoc(likesRef, {userId: user?.uid, articleId: articleId})
      .then(res => {
        // we want to show full heart to the user
        setIsLiked(true);
      })   
      .catch((err) => console.log(err))
    }   
  };

  const handleUnlikes = (e) => {
    if (user) {
      //need to find document with this articleId and userId to get it's documentID
      const likesRef = collection(db, "Likes");

      //setup a query to find and delete ID
      const q = query (
        likesRef, 
        where("articleId", "==", articleId), 
        where("userId","==", user?.uid)
        );
      
      //get a match
      getDocs(q, likesRef)
      .then((res) => {
        console.log(res.docs[0].id);
        const likesId = res.docs[0].id;

        // now we finally delete this document from likes collection

        deleteDoc( doc (db, "Likes", likesId))
        .then(res => {
          setIsLiked(false);
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
    }
  };


  return (
    <div>

      {isLiked ? <FaHeart onClick={handleUnlikes}/> : <FaRegHeart onClick={handleLikes} />}

      <span>{likeCount}</span>

    </div>
  )
}

export default Likes
