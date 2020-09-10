const wrapper = document.getElementById('parallax-wrapper');
setMouseEvent(wrapper.children, 300);

function setMouseEvent(layers, maxShift) {
  /** 
   * topleft = 0:0
   * bottom right = max:max
   */ 
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    for (let i=0; i<layers.length; i++) {
      const layer = layers[i];
      const currentLayerMaxShift = maxShift / (i + 1);
      const coef = currentLayerMaxShift / window.innerWidth;
      
      const pointerPosition = {
        x: event.clientX,
        y: event.clientY
      };
      
      const currentLayerSpecs = layer.getBoundingClientRect();

      const attachLayerToPointer = {
        /**
         * Depends on the background shape, sometimes "/ 2" or none is needed in the end of "x: ..." and "y: ...".
         * TODO: Figure out the generic solution for all cases.
         */
        x: pointerPosition.x - currentLayerSpecs.width / 2,
        y: pointerPosition.y - currentLayerSpecs.height
      };

      layer.style.transform = `translate(${attachLayerToPointer.x * coef}px, ${attachLayerToPointer.y * coef}px)`;
    }
  }
}
