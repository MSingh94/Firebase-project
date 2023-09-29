import React, { useEffect, useState } from 'react'
import "./Banner.css";
import {getDocs, collection, query, orderBy, limit} from "firebase/firestore"
import { db } from '../../config/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';


function Banner() {

  const navigate = useNavigate();

    const [mainArticle, setMainArticle] = useState({});
    const [otherArticles, setOtherArticles] = useState([]);

    //[3]get data when the banner loads

    useEffect(() =>{
        
        //[1]get articles from database
        const articleRef = collection(db, "Articles");

        //[4] set up query to filter responses
        //[5] sort and then get the first 5 articles

        const q = query(articleRef, orderBy("createdAt","desc"), limit(5));
        
        getDocs(q, articleRef).then(res=> {
         // [2]console.log(res.docs[0].data())

         const articles = res.docs.map(item => ({
            ...item.data(),
            id: item.id,
         }))

         setMainArticle(articles[0]);
         setOtherArticles(articles.splice(1));

        });

    }, [])



  return (
    <div className='banner-container'>
        <div className="main-article-container" style={{backgroundImage:`url(${mainArticle?.imageUrl})`, cursor:"pointer"}}

        onClick={() => navigate(`/article/${mainArticle?.id}`)}
        
        >
            <div className="banner-info">
                <h2>{mainArticle?.title}</h2>
                <div className="main-article-info">
                    <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
                </div>
            </div>
        </div>
        <div className="other-articles-container">
        {otherArticles.map((item) => (
          <div key={item.id} className="other-article-item" style={{ backgroundImage: `url(${item?.imageUrl})`, cursor:"pointer" }}
          onClick={() => navigate(`/article/${item?.id}`)}
          >
            <div className="banner-info">
              <h3>{item?.title}</h3>
              <div className="banner-info">
                <small>{item?.createdAt?.toDate().toDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



export default Banner
