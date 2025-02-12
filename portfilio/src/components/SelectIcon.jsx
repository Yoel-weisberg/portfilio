import React from 'react';
import { MdCheckCircleOutline, MdOutlineCircle } from 'react-icons/md';

export default function SelectIcon({
  selected,
  onClick,
  color = 'white',
  size = '24px',
}) {
  const Icon = selected ? MdCheckCircleOutline : MdOutlineCircle;

  return (
    <div onClick={onClick} className="absolute top-0 right-0 p-1 bg-transparent border-none cursor-pointer">
      <Icon
        color={color}
        size={size}
        className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]"
        focusable={false}
        aria-hidden="true"
      />
    </div>
  );
}

