import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from'./AddAuthorForm'
import {shuffle,sample} from 'underscore';
import {BrowserRouter,Route,withRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: '../images/MTwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The adventure of Huckleberry Finn','Life on the Mississippi',
        'Roughing It']
    },
    {
        name: 'Charles Dickens',
    
        imageUrl: '../images/CD.jpg',
        imageSource: 'Wikimedia Commons',
        books: [' A Tale of Two Cities', 'No Thoroughfare', 'The Frozen Deep']
    },
    {
        name: ' Twain',
        imageUrl: '../images/JK.jpg',
        imageSource: 'Wikimedia Commons',
        books: ["Harry Potter", "Lethal White", "The Cuckoo's calling"]
    }



];

function getTurnData(authors)
{
   const allBooks = authors.reduce(function(p,c,i){
       return p.concat(c.books);
    },[]);
const fourRandomBooks = shuffle(allBooks).slice(0,4);
const answer = sample(fourRandomBooks);
return{
    books:fourRandomBooks,
    author:authors.find((author) => 
    author.books.some((title)=> 
    title === answer))
}
}
const state= {

testData:  getTurnData(authors),
highlight:''

    /*testData:{
            author: authors[0],
            books: authors[0].books
    }*/
    };



function onAnswerSelected(answer) {
    const isCorrect = state.testData.author.books.some((book)=> book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

const AuthorWrapper = withRouter(({history}) => 
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function App(){
   return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>;
       
}


function render(){
ReactDOM.render(<BrowserRouter>
<React.Fragment>
    <Route exact path="/" component={App}/>
    <Route path="/add" component={AuthorWrapper}/>
</React.Fragment>
</BrowserRouter>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
