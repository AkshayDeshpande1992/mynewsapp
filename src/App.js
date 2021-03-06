import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles';

const alanKey = process.env.REACT_APP_ALAN_KEY_ID;
const App = ()=>{

    const classes = useStyles();
    const [newsArticles,setNewsArticles]= useState([]);
    const [activeArticle,setActiveArticle]= useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand:({command,articles,number})=>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number,{fuzzy:true}):number;
                    const article =  articles[parsedNumber-1]; 
                    if(parsedNumber>20){
                        alanBtn().playText('Please try that again');
                    }else if(article) {
                        window.open(article.url,'_blank');
                        alanBtn().playText('Opening...');
                    }
                   
                }

            }
        })
    },[])
    
    return(
        <div>
            <img src={require('./images/preview.jpg')} className={classes.alanLogo} alt="logo" onClick={()=>{setNewsArticles([])}}/> 
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
            
        </div>
    )
}

export default App;
