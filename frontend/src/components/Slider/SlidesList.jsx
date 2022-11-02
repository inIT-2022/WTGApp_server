import React, { useContext } from 'react';
import Slide from './Slide';
import { SliderContext } from './Slider';

export default function SlidesList() {
  const { slideNumber, items } = useContext(SliderContext);
  return (
    <div
      className='slide-list'
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((itemSrc, index) => (
        <Slide key={index} data={itemSrc} />
      ))}
    </div>
  );
}
