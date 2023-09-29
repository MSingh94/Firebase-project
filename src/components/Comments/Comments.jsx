import React, { useEffect, useState } from 'react'
import './Comments.css'
import { auth, db } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';


function Comments({articleId}) {

    const [user] = useAuthState(auth);

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    //show all comments when page loads
    useEffect(() => {
        //get reference to comments collection

        const commentsRef = collection(db, "Comments")

        //get the comments
        // filter to show only the comments on this article

        const q = query(commentsRef, where("articleId", "==", articleId));
        
        onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs.map((item) => ({
              ...item.data(),
              id: item?.id,
            }));
            setComments(comments);
          });
        }, []);
        

    const addNewComment = e => {
        e.preventDefault()
        
        // need to make a new document and comments collection
        // include new comment, articleId and userId
        // create a reference to the comments collection
        // will create collection if doesn't exist

        const commentsRef = collection(db, "Comments")

        //add a document with this documentId and userId

        addDoc(commentsRef, {
            userId: user?.uid,
            articleId: articleId,
            content: newComment,
            username: user?.displayName,
        })
        .then((res) => {
         toast("Comment added successfully", {type:"success", autoClose:2000});
         setNewComment("")

          })
    }

    const deleteComment = id => {
        deleteDoc( doc (db, "Comments", id))
        .then((res) => {
            toast("Comment deleted successfully", {type:"error", autoClose:2000})
        })
        .catch(err => console.log(err))
    }



  return (
    <div>
        <div className="comments-container">
            {
                comments.map(item => <div className='comment' key={item?.id}>
                    <p><span>{item.username}</span>{item.content}</p>
                    {
                        /* each comment has a uid, compare to see if I can delete the comment */
                        user?.uid === item.userId && <button onClick={() => deleteComment(item.id)}>Delete</button>
                    }
                </div>)
            }
        </div>
        {
        user ? <form onSubmit={addNewComment}> 
            <input type="text" placeholder='Add comment' onChange={e => {setNewComment(e.target.value)}}
            value={newComment}

            />
        </form> : <p>Please login to comment</p>        
        }
    </div> 
  )
}

export default Comments
