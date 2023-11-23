import React, { Component } from 'react'

export class Newsitems extends Component {
  render(){

  let {title,description,imageUrl,newsUrl} = this.props;
  
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl? "https://www.hindustantimes.com/ht-img/img/2023/11/20/1600x900/The-problem-is-of-parents-and-not-of-coaching-inst_1700492532761.jpg": imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a rel= "noreferrer" href={newsUrl} target= "_blank" className=" btn btn-sm  btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitems;
