import React from 'react'

const Star = ({
  color
}) => {
  return (
    <div>
      <svg
        baseProfile="tiny"
        height="35px"
        width="33px"
        id="Layer_1"
        version="1.2"
        viewBox="0 0 24 24"
        data-rating="1"
        fill={color || "gray"}
      >
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
};

export default Star;