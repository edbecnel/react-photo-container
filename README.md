# React Responsive Photo Container
A responsive React photo container component.

## Demo

[http://anediaz.github.io/react-photo-container/](http://anediaz.github.io/react-photo-container/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Use

```jsx
import React from 'react';
import Container from 'react-photo-container';

export default class Sample extends React.Component {
    render() {
	return (
	    <Container photos={PHOTO_SET} />
	);
    }
}

const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1_small.jpg',
    width: 681,
    height: 1024,
    aspectRatio: 1.5,
    lightboxImage:{
	src: 'http://example.com/example/img1_large.jpg',
	srcset: [
	  'http://example.com/example/img1_1024.jpg 1024w',
	  'http://example.com/example/img1_800.jpg 800w',
	  'http://example.com/example/img1_500.jpg 500w',
	  'http://example.com/example/img1_320.jpg 320w',
	]
    }
  },
  {
    src: 'http://example.com/example/img2_small.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
	src: 'http://example.com/example/img2_large.jpg',
	srcset: [
	  'http://example.com/example/img2_1024.jpg 1024w',
	  'http://example.com/example/img2_800.jpg 800w',
	  'http://example.com/example/img2_500.jpg 500w',
	  'http://example.com/example/img2_320.jpg 320w',
	]
    }
  }
];

```

### Container properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | Required. Array of objects (photos)
handlePhotoClick | func  | undefined  | Optional. Defines handler for photo click, if undefined Lightbox is displayed by default
custom | object  | {mobile: 2, desktop: 3}  | Optional. Defines number of photos per line for different screen sizes
lightboxShowImageCount | boolean | false | Optional.  Displays at the bottom of the photo index of total images. Eg. "5 of 20"
backdropClosesModal | boolean | true | Optional. Clicking on backdrop closes the modal

### Photos properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. The src value of the container image
width | number  | undefined  | Required. Width of the container image
height  | number  | undefined | Required. Height of the container image
aspectRatio | number | undefined | Required. Aspect ratio of the container image (width / height)
lightboxImage | object | undefined | Required by default.  If handlePhotoClick is undefined, Optional. See below for prop details.

### lightboxImage prop properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. Image used for the lightbox
srcset     |       array    |       undefined    |       Optional.  Array of srcsets for the lightbox
caption     |       string    |       undefined    |       Optional.  Caption for the lightbox image

## Lightbox
This component uses [React Images](https://github.com/jossmac/react-images) for Lightbox functionality.  I've incorporated what I think to be useful Lightbox properties in context of a container into this component.
