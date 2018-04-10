import React, { Component } from 'react';
import SlideOne from './slides/slideOne';
import SlideTwo from './slides/slideTwo';
import SlideThree from './slides/slideThree';
import SlideFour from './slides/slideFour';

class Landing extends Component {
  constructor(props){
    super(props);

    this.state = {
      slideCount: 1
    }

    this.nextSlide = this.nextSlide.bind(this);

  }

componentDidMount(){
  setInterval(() => {
  this.nextSlide()

  }, 3000);
}
componentWillUnmount() {
  clearInterval(this.setInterval);
}

  nextSlide(){
    const next = this.state.slideCount + 1
    if(this.state.slideCount === 4){
      this.setState({slideCount: 1})
    }else{
    this.setState({ slideCount: next })
    }
  }


  render() {
    return (
      <section className="Landing">

      { this.state.slideCount === 1 ? <SlideOne /> : null }
      { this.state.slideCount === 2 ? <SlideTwo /> : null }
      { this.state.slideCount === 3 ? <SlideThree /> : null }
      { this.state.slideCount === 4 ? <SlideFour /> : null }
      </section>
    );
  }
}

export default Landing;
