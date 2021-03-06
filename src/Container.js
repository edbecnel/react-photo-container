import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';

class Container extends React.Component{
    constructor(){
	super();
	this.state = {
	    currentImage: 0,
	    containerWidth: 0
	};
	this.handleResize = this.handleResize.bind(this);
	this.closeLightbox = this.closeLightbox.bind(this);
	this.gotoNext = this.gotoNext.bind(this);
	this.gotoPrevious = this.gotoPrevious.bind(this);
	this.openLightbox = this.openLightbox.bind(this);
    }
    componentDidMount(){
	this.setState({containerWidth: Math.floor(this._container.clientWidth)})
        window.addEventListener('resize', this.handleResize);
    }
    componentDidUpdate(){
	if (this._container.clientWidth !== this.state.containerWidth){
	    this.setState({containerWidth: Math.floor(this._container.clientWidth)});
	}
    }
    componentWillUnmount(){
	 window.removeEventListener('resize', this.handleResize, false);
    }
    handleResize(e){
        this.setState({containerWidth: Math.floor(this._container.clientWidth)});
    }
    openLightbox(index, event){
        event.preventDefault();
        this.setState({
	    currentImage: index,
            lightboxIsOpen: true
        });
    }
    closeLightbox(){
        this.setState({
	    currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious(){
	this.setState({
	    currentImage: this.state.currentImage - 1,
	});
    }
    gotoNext(){
	this.setState({
	    currentImage: this.state.currentImage + 1,
	});
    }
	getRowLimit(){
	    var rowLimit = 1;
	    if(this.props.custom.length){
	        this.props.custom.forEach((c) => rowLimit = this.state.containerWidth >= c.width ? c.photoNb : rowLimit);
	    }
	    else{
	    	if(this.state.containerWidth >= 375){
		    	rowLimit = 2;
		    }
		    if (this.state.containerWidth >= 1024){
			    rowLimit = 3;
		    }
		}
		return rowLimit;

	}
    render(){
		var rowLimit = this.getRowLimit();
		var  photoPreviewNodes = [];
        var contWidth = this.state.containerWidth - (rowLimit * 4); /* 4px for margin around each image*/
        contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
        var remainder = this.props.photos.length % rowLimit;
        if (remainder) { // there are fewer than rowLimit photos in last row
          var lastRowWidth = Math.floor(this.state.containerWidth - (remainder * 4) - 2);
          var lastRowIndex = this.props.photos.length - remainder;
        }
	var lightboxImages = [];
        for (var i=0;i<this.props.photos.length;i+=rowLimit){
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspectRatio=0,
                totalAr=0,
                commonHeight = 0;
            for (var j=i; j<i+rowLimit; j++){
                if (j == this.props.photos.length){
                    break;
                }
		totalAr += this.props.photos[j].aspectRatio;
            }
            if (i === lastRowIndex) {
              commonHeight = lastRowWidth / totalAr;
            } else {
              commonHeight = contWidth / totalAr;
            }
            // run thru the same set of items again to give the common height
            for (var k=i; k<i+rowLimit; k++){
                if (k == this.props.photos.length){
                    break;
                }
		var src = this.props.photos[k].src;

		if (this.props.handlePhotoClick){
		    photoPreviewNodes.push(
			 <div key={k} style={style} onClick={this.props.handlePhotoClick.bind(this, k)}>
			    <img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" />
			 </div>
		    );
		}
		else{
		    lightboxImages.push(this.props.photos[k].lightboxImage);
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <a href="#" className={k} onClick={this.openLightbox.bind(this, k)}><img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" /></a>
			 </div>
		    );
		}
            }
        }
	return(
	    this.renderContainer(photoPreviewNodes, lightboxImages)
        );
    }
    renderContainer(photoPreviewNodes, lightboxImages){
	if (this.props.handlePhotoClick){
	    return(
		<div id="Container" className="clearfix" ref={(c) => this._container = c}>
		    {photoPreviewNodes}
		</div>
	    );
	}
	else{
	    return(
		<div id="Container" className="clearfix" ref={(c) => this._container = c}>
		    {photoPreviewNodes}
		    <Lightbox
			currentImage={this.state.currentImage}
			images={lightboxImages}
			isOpen={this.state.lightboxIsOpen}
			onClose={this.closeLightbox}
			onClickPrev={this.gotoPrevious}
			onClickNext={this.gotoNext}
			width={1600}
			showImageCount={this.props.lightboxShowImageCount}
			backdropClosesModal={this.props.backdropClosesModal}
			preloadNextImage={this.props.preloadNextImage}
		    />
		</div>
	    );
	}
    }
};
Container.displayName = 'Container';
Container.propTypes = {
    photos: function(props, propName, componentName){
	return React.PropTypes.arrayOf(
	    React.PropTypes.shape({
		src: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		aspectRatio: React.PropTypes.number.isRequired
	    })
	).isRequired.apply(this,arguments);
    },
    handlePhotoClick: React.PropTypes.func,
    custom: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            width: React.PropTypes.number.isRequired,
            photoNb: React.PropTypes.number.isRequired
        })
    )
};
Container.defaultProps = {
    lightboxShowImageCount: false,
    backdropClosesModal: true,
    preloadNextImage: true,
    custom: []
}
// Container image style
const style = {
   display: 'block',
   margin: 2,
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Container;
