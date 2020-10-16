import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards'

// import useStyles from './styles';
const alanKey = process.env.ALAN_KEY_ID;
const App = ()=>{

    //const classes = useStyles();
    const [newsArticles,setNewsArticles]= useState([]);
    const [activeArticle,setActiveArticle]= useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand:({command,articles})=>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
            }
        })
    },[])
    return(
        <div>
            {/* <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" /> */}
            <h1>Alan AI News!</h1>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;