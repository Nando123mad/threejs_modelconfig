/**
 * @author knee-cola / https://github.com/knee-cola
 * Original file URL: https://gist.github.com/knee-cola/37875bc4359609b96c9f329cd2a68fa1
 */

// This is a simple progressive image loader for Three.js
// It enables the smaller image files to be loaded first,
// before the big texture image is fully loaded.
//
// The images are loaded in the order they are passed
// to the loader
//
// Here's a simple example:
//
//     // defining an array of different sizes of images
//     // Hint: apart from degrading image resolution, smaller image files
//     //       can also be produced by increasing the JPG compression
//     var imageUrls = ['480p.jpg', '720p.jpg', '1080p.jpg', '2048p.jpg']:
//
//     // creating material - we call the loader function
//     var material = new THREE.MeshBasicMaterial({ map: THREE.ProgressiveImageLoader(imageUrls) })
//
//     var mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
//

(function() {

  THREE.ProgressiveImgLoader = function() { };

  var proto = THREE.ProgressiveImgLoader.prototype = Object.create( THREE.EventDispatcher.prototype );

  proto.load = function(images) {

    var self = this;

    var texture = new THREE.Texture();

    // create an image object
    var imageObj = self.imageObj = new Image(),
        loadingIx = 0;

    // this needs to be sit in order not to get "Tainted canvases may not be loaded." WebGL error
    imageObj.crossOrigin = "anonymous";

    imageObj.onload = function() {

      // [imageObj] is set to NULL when the object is disposed
      if(self.imageObj) {

        texture.image = imageObj;
        texture.needsUpdate = true;

        if(loadingIx < images.length) {
          self.dispatchEvent({type: 'progress', imageIndex: loadingIx});
          imageObj.src = images[loadingIx++];
        } else {
          self.dispatchEvent({type: 'done'});
          self.imageObj = null;
        }
      }

    }; // imageObj.onload = function() {...}

    // the loading process will begin after we set the [src] property
    imageObj.src = images[loadingIx++];

    return(texture);

  }; // proto.load = function(images) {...}

  proto.dispose = function() {
    // stop loading current image
    this.imageObj.src = '';
    this.imageObj = null;
  };

})();