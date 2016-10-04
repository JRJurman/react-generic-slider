import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
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
    this.updatePosition(this.state.currentPosition - 1);
    this.animate();
  }

  scrollRight() {
    this.updatePosition(this.state.currentPosition + 1);
    this.animate();
  }

  updatePosition(position) {
    const whole = position + this.state.visibleItems;

    if (this.props.isInfinite && position < 0) {
      this.setState({ currentPosition: whole });
    }

    if (this.props.isInfinite && whole > this.props.children.length) {
      this.setState({ currentPosition: 0 });
    }

    if (whole > this.props.children.length || position < 0) {
      return;
    }

    this.setState({ currentPosition: position });
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
  delay: 5000,
  visibleItems: 4,
};

export default Slider;
