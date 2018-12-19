import React from 'react';

class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            imageUrl:"",
            books:[],
            bookTemp:''
        }; 
        this.onFieldChange=this.onFieldChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
         this.handleSubmit=this.handleAddBook.bind(this);
    }

    
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    handleAddBook(event){
        event.preventDefault();
        this.setState({
            books:this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        })
    }

    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render(){
        return <form onSubmit={this.handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
            </div>
            <div>
             <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>   
        </div>
        <div>
            <label htmlFor="bookTemp">Books</label>
             {this.state.books.map((book => <p key={book}>{book}</p>)) }
            <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
            <input type="button" value="+" onClick={this.handleAddbok}/>
        </div>
        <input type="Submit" value="Add"/>
    </form>
    }
}


function AddAuthorForm({match,onAddAuthor})
{
    return <div>
    <h1> Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>;
}

export default AddAuthorForm;