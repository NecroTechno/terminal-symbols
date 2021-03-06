import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import * as Issue0 from './issue-0/chapters';
import platform from 'platform';
import Swipe from 'react-easy-swipe';

function getConfig(props) {
  switch(props.issue) {
    case "0":
      return {
        pages: [<Issue0.P0 issue={props.issue} title={props.title} />, <Issue0.P1 />, <Issue0.P2 />, <Issue0.P3 />]
      }
    default:
    return {
      pages: [null]
    }
  }
}

export default class ZineCont extends Component {
  constructor(props) {
    super(props);
    this.zineConfig = getConfig(this.props);
    this.isMobile = platform.os.family.includes("iOS") || platform.os.family.includes("Android") ? true : false;
    this.swipeReminderRef = React.createRef();

    this.state = {
      currentPage: 0
    }

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.swipeReminder = this.swipeReminder.bind(this);
    this.navRender = this.navRender.bind(this);
  }

  nextPage() {
    if (this.state.currentPage < this.zineConfig.pages.length - 1) {
      this.setState({currentPage: ++this.state.currentPage})
    }
  }

  prevPage() {
    if (this.state.currentPage > 0) {
      this.setState({currentPage: --this.state.currentPage})
    }
  }

  swipeReminder() {
    setTimeout(() => {this.swipeReminderRef.current.style.display = "none"}, 3000)
    return(
      <span ref={this.swipeReminderRef} className="zine-nav zine-nav--reminder">Swipe To Navigate Pages</span>
    )
  }

  navRender() {
    return  <>
              { this.state.currentPage === this.zineConfig.pages.length - 1 ?
              null : <a className="zine-nav zine-nav--next" onClick={this.nextPage}>Next</a> }
              { this.state.currentPage === 0 ?
              null : <a className="zine-nav zine-nav--prev" onClick={this.prevPage}>Prev</a> }
            </>
  }

  render() {
     return (
       <Swipe
       className="zine-container"
       onSwipeLeft={this.nextPage}
       onSwipeRight={this.prevPage}
	     tolerance={75}>
         <a className="zine-nav zine-nav--back" href="/">Home</a>
         {this.navRender()}
         {this.zineConfig.pages[this.state.currentPage]}
       </Swipe>
     );
  }
}
