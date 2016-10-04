import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.setVisibleItems = this.setVisibleItems.bind(this);
    this.sliderStyle = this.sliderStyle.bind(this);
    this.isOpaque = this.isOpaque.bind(this);
    this.animate = this.animate.bind(this);

    this.state = {
      currentPosition: 0,
      interval: null
    };
  }

  componentDidMount() {
    this.animate();
    this.setVisibleItems(this.props.visibleItems);

    window.addEventListener('resize', this.setVisibleItems.bind(this, this.props.visibleItems));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setVisibleItems.bind(this, this.props.visibleItems));
  }

  scrollLeft() {
    const end = this.props.children.length - this.props.visibleItems;
    const beginning = 0;

    if (this.props.isInfinite && (this.state.currentPosition == beginning)) {
      this.setState({currentPosition: end});
    } else {
      if ((this.state.currentPosition - this.props.slidesToScroll) > beginning) {
        this.setState({currentPosition: this.state.currentPosition - this.props.slidesToScroll});
      }
      else {
        this.setState({currentPosition: beginning});
      }
    }
    this.animate();
  }

  scrollRight() {
    const end = this.props.children.length - this.props.visibleItems;
    const beginning = 0;

    if (this.props.isInfinite && (this.state.currentPosition == end)) {
      this.setState({currentPosition: beginning});
    } else {
      // if we're not at the end, and moving forward wouldn't put us after the end
      if ((this.state.currentPosition + this.props.slidesToScroll) < end) {
        this.setState({currentPosition: this.state.currentPosition + this.props.slidesToScroll});
      }
      else {
        this.setState({currentPosition: end});
      }
    }
    this.animate();
  }

  calculateShift(offset, amount) {
    return offset * amount;
  }

  setVisibleItems(visibleItems) {
    const windowWidth = window.innerWidth;

    if (windowWidth < 720) {
      this.setState({ visibleItems: 1 });
    } else {
      this.setState({ visibleItems });
    }
  }

  sliderStyle(classname) {
    const items = document.getElementsByClassName(classname);
    const itemWidth = (items[0]) ? items[0].offsetWidth : 0;
    const shift = this.calculateShift(itemWidth, this.state.currentPosition);
    const transform = `translateX(-${shift}px)`;

    return { transform };
  }

  isOpaque(key) {
    const nextPosition = this.state.visibleItems + this.state.currentPosition;
    const opaque = this.props.children.slice(this.state.currentPosition, nextPosition);

    return opaque.indexOf(this.props.children[key]) !== -1;
  }

  animate() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    if (!this.props.delay) {
      return false;
    }

    const interval = setInterval(this.scrollRight, this.props.delay);
    this.setState({ interval });
  }

  render() {
    const sliderStyle = this.sliderStyle('rsc-slider-item');
    const { visibleItems } = this.state;

    return (
      <div className="rsc-container">
        <div className="rsc-slider" style={sliderStyle}>
          {this.props.children.map((item, key) => {
            const itemClass = this.isOpaque(key) ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent';
            const imgWidth = 100 / visibleItems;

            return (<div className={itemClass} key={key} style={{'flex': `0 0 ${imgWidth}%`}}>
              {item}
            </div>);
          })}
        </div>
        {this.props.children.length > visibleItems ?
          <div>
            <div className="rsc-navigation rsc-navigation_left rsc-arrow_left" onClick={this.scrollLeft}></div>
            <div className="rsc-navigation rsc-navigation_right rsc-arrow_right" onClick={this.scrollRight}></div>
          </div>
        : null}
      </div>
    );
  }
}

Slider.defaultProps = {
  isInfinite: true,
  slidesToScroll: 1,
  delay: 5000,
  visibleItems: 4
};

export default Slider;
