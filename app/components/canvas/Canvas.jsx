import React, { useEffect, useRef, useState } from 'react';

import { StyledCanvas } from './styles';

function Canvas(props) {
  const [isPenDown, setIsPenDown] = useState();
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    props.setCanvasContext(ctx);
    ctx.lineJoin = 'round';
    setIsPenDown(false);
  }, []);

  useEffect(() => {
    if (!props.canvasContext || !props.canvasImg) return;

    loadDrawing();
  }, [props.canvasContext, props.canvasImg]);

  const startPath = () => {
    const color = props.pen.color || '#000';
    const width = props.pen.width || 1;
    if (props.drawDisabled) return;

    props.canvasContext.strokeStyle = color;
    props.canvasContext.lineWidth = width;
    props.canvasContext.beginPath();
    setIsPenDown(true);
  };

  const relativeMousePos = e => {
    let rect = canvas.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawPath = e => {
    if (!isPenDown) return;

    let mousePos = relativeMousePos(e);

    props.canvasContext.lineTo(mousePos.x, mousePos.y);
    props.canvasContext.stroke();
  };

  const drawTouchPath = e => {
    let touchPos;

    if (e.touches.length > 1) return;
    if (!isPenDown) return;

    touchPos = relativeMousePos(e.touches[0]);
    props.canvasContext.lineTo(touchPos.x, touchPos.y);
    props.canvasContext.stroke();
  };

  const endPath = () => {
    if (props.drawDisabled) return;

    props.canvasContext.save();
    setIsPenDown(false);
  };

  const loadDrawing = () => {
    let img = new Image();

    img.onload = () => {
      props.canvasContext.drawImage(img, 0, 0);
      props.canvasContext.save();
    };

    img.setAttribute('src', props.canvasImg.replace(/\n|\r/g, ''));
  };

  return (
    <StyledCanvas
      onMouseDown={() => startPath()}
      onTouchStart={() => startPath()}
      onMouseMove={(e) => drawPath(e)}
      onTouchMove={(e) => drawTouchPath(e)}
      onMouseUp={() => endPath()}
      onTouchEnd={() => endPath()}
      background={props.background}
      left={props.position.left}
      top={props.position.top}
      width={props.width}
      height={props.height}
      ref={canvas}
    ></StyledCanvas>
  );
}

export default Canvas;
