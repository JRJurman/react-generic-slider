# React Generic Slider
Responsive, css transitions based slider/gallery/carousel for react.js
Based on https://github.com/azimgd/react-image-slider

![](https://github.com/azimgd/react-image-slider/blob/master/docs/slider.gif?raw=true)

## Installation

```
npm install react-generic-slider
```

and add css file from `./node_modules/react-generic-slider/lib/slider.css`

## Example

```javascript
import React from 'react';
import Slider from 'react-simple-carousel';

export default React.createClass({
  render() {
    return (<Slider isInfinite={true} delay={5000}>
      <div> <img src={"https://placekitten.com/500/500"}/> </div>
      <div> <img src={"https://placekitten.com/501/500"}/> </div>
      <div> <img src={"https://placekitten.com/502/500"}/> </div>
      <div> <img src={"https://placekitten.com/503/500"}/> </div>
      <div> <img src={"https://placekitten.com/504/500"}/> </div>
      <div> <img src={"https://placekitten.com/505/500"}/> </div>
    </Slider>);
  }
});
```

## Demo

In order to run demo, execute:
```
cd example
npm install
npm start
```
and then navigate to *http://localhost:8080*

## License

The MIT License (MIT)

Copyright (c) 2016 React Image Slider &lt;me@azimgd.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
