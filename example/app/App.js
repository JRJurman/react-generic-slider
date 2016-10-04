import React from 'react';
import Slider from '../../src/slider';

class App extends React.Component {
  render() {

    return (<Slider isInfinite={true} slidesToScroll={2} visibleItems={3} delay={5000}>
      <div> <h1>Cat 0</h1> <img src={"https://placekitten.com/500/500"}/> </div>
      <div> <h1>Cat 1</h1> <img src={"https://placekitten.com/501/500"}/> </div>
      <div> <h1>Cat 2</h1> <img src={"https://placekitten.com/502/500"}/> </div>
      <div> <h1>Cat 3</h1> <img src={"https://placekitten.com/503/500"}/> </div>
      <div> <h1>Cat 4</h1> <img src={"https://placekitten.com/504/500"}/> </div>
      <div> <h1>Cat 5</h1> <img src={"https://placekitten.com/505/500"}/> </div>
      <div> <h1>Cat 6</h1> <img src={"https://placekitten.com/506/500"}/> </div>
      <div> <h1>Cat 7</h1> <img src={"https://placekitten.com/507/500"}/> </div>
    </Slider>)
  }
}

export default App;
