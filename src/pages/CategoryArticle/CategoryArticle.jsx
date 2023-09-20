import React, { useState, useEffect } from 'react'
import "./CategoryArticle.css"
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function CategoryArticle() {
  
  const {categoryName} = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    //[1]create a reference to firebase db collection 
    const articleRef = collection(db, "Articles");

    //[2]now create a query
    const q = query(articleRef, where("category", "==", categoryName));

    //[3] get data that matches the query

    getDocs(q, articleRef)
    .then((res) => {
    const articles = res.docs.map((item) => ({
        ...item.data(),
        id: item.id,
     }));

     setArticles(articles)
     
     console.log(articles)
    })
    .catch((err) => console.log(err))
  }, [categoryName]);

    
  
  return (
    <div>
      {articles.map((item) => <h2 key={item.id}>{item.title}</h2>)}

    </div>
  )
}
