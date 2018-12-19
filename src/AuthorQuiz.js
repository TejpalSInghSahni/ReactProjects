import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import{Link} from 'react-router-dom';
import './App.css';
import './bootstrap.min.css'

function Hero(){
  return(
    <div className="row">
    <div className="jumbotron col-10 offset-1">
        <h1> Author Quiz</h1>
        <p> Select the book written by the Author </p>
       </div> 
    </div>
  )
}

function Book({title,onClick}){
  return(
    <div className="answer" onClick={()=> {onClick(title)}}>
      <h4> {title}</h4>
    </div>
  )
}

function Turn({author,books,highlight,onAnswerSelected}){
  function getBackgroundColor(highlight){
    const mapping={
      none:'',
      correct:'green',
      wrong:'red'
    };
    return mapping[highlight];
  }
  
  return(
        <div className="row turn" style={{backgroundColor:getBackgroundColor(highlight)}}>
          <div className="col-4 offset-1">
              <img src={author.imageUrl} className="authorImage" alt="author"/>
          </div>
          <div className="col-6">
           {
             books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>
           )}
          </div>
        </div>
  )
}

Turn.prototype = {
  author:PropTypes.shape({
    name:PropTypes.string.isRequired,
  imageUrl:PropTypes.string.isRequired,
  imageSource:PropTypes.string.isRequired,
  books:PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books:PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected:PropTypes.func.isRequired,
  highlight:PropTypes.string.isRequired
};

function Continue(){
  return(
        <div/>
  )
}

function Footer(){
  return(
        <div id="footer" className="row">
          <div className="col-12">
            <p className="text-muted credit">
              All Images are from <a href="http://commons.wikimedia.org/wiki/Main"> Wikimedia Commons</a> and are in Public domain.
              
              </p>
              </div>   
        </div>
  )
}

function AuthorQuiz({testData,highlight,onAnswerSelected}){
    return (
      <div className="container-fluid"> 
          <Hero/> 
          <Turn {...testData} highlight={highlight} onAnswerSelected={onAnswerSelected} /> 
          <Continue/>
          <p> <Link to="/add">Add an Author</Link></p>
          <Footer/>
      </div>
    );
}


export default AuthorQuiz;
