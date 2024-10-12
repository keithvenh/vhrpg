export default function CharacterHud({ character, radius = 50, rectWidth = 10, rectHeight = 20, gap=5 }) {
  const totalHealth = parseInt(character.woundsThreshold);
  const health = totalHealth - parseInt(character.woundsCurrent);
  const totalStrain = parseInt(character.strainThreshold);
  const strain = totalStrain - parseInt(character.strainCurrent);
  const cx = 100; // Center X of the circle
  const cy = 100; // Center Y of the circle

  const outerRadius = radius + rectWidth + gap;

  const innerCircumference = 0.75 * 2 * Math.PI * radius;
  const outerCircumference = 0.75 * 2 * Math.PI * outerRadius;

  const maxArcHealth = Math.floor(innerCircumference / (rectHeight + gap));
  const arcGap = innerCircumference % (rectHeight + gap)
  const maxArcStrain = Math.floor(outerCircumference / (rectHeight + gap));
  const outerArcGap = outerCircumference % (rectHeight + gap);
  const angleStep = 270 / maxArcHealth; // Angle between each rectangle
  const outerAngleStep = 270 / maxArcStrain;
  
  // Function to calculate the position and rotation of each rectangle
  const getArcRectangleTransform = (index) => {
    const angle = 360 - angleStep * index; // Angle in degrees
    const radian = (angle * Math.PI) / 180; // Convert to radians
    
    // Calculate the rectangle's center point
    const x = cx + (radius + rectWidth) * Math.cos(radian) - rectWidth / 2; // Center the rectangle
    const y = cy + (radius + rectWidth) * Math.sin(radian) - rectHeight / 2; // Center the rectangle
    
    // Rotate the rectangle to align it with the circle's curve
    return `translate(${x}, ${y}) rotate(${angle}, ${rectWidth / 2}, ${rectHeight / 2})`;
  };

  const getStraightLineTransform = (index) => {
    console.log(index-maxArcHealth);
    const x = cx + (index - maxArcHealth) * (rectHeight + gap) - arcGap + gap;
    const y = cy + (radius); // Align the rectangles to the center horizontally
    return `translate(${x}, ${y}) rotate(90, ${rectWidth/2}, ${rectHeight/2})`;
  };

  // Function to calculate the position and rotation of each rectangle on the outer circle
  const getOuterArcRectangleTransform = (index) => {
    const angle = 360 - outerAngleStep * index; // Angle in degrees
    const radian = (angle * Math.PI) / 180; // Convert to radians
    
    const x = cx + (outerRadius + rectWidth + 2) * Math.cos(radian) - rectWidth / 2; // Adjusted x position for outer circle
    const y = cy + (outerRadius + rectWidth + 2) * Math.sin(radian) - rectHeight / 2; // Adjusted y position for outer circle
    
    return `translate(${x}, ${y}) rotate(${angle}, ${rectWidth / 2}, ${rectHeight / 2})`;
  };

  // Function for straight line extension for the outer circle
  const getOuterStraightLineTransform = (index) => {
    const x = (cx + (index - maxArcStrain) * (rectHeight + gap)) - outerArcGap;
    const y = cy + outerRadius;
    return `translate(${x}, ${y}) rotate(90, ${rectWidth / 2}, ${rectHeight / 2})`;
  };

  const dimensions = {
    height: (outerRadius * 2 + rectWidth * 4 + gap * 4),
    width: (outerRadius * 2 + rectWidth * 4 + gap * 4 + (rectHeight + gap) * 12)
  }

  return (
    <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
      {/* Draw the center circle */}
      <defs>
        <clipPath id="circleClip">
          <circle cx={cx} cy={cy} r={radius} />
        </clipPath>
      </defs>
      <image 
        href={`${character.imageURL}`} 
        x={cx - radius} 
        y={cy - radius} 
        width={radius * 2} 
        height={radius * 2} 
        preserveAspectRatio="xMidYMid meet" 
        clipPath="url(#circleClip)"
      />
      <text
        x={cx + radius}
        y={cy + radius - gap}
        dominantBaseline="alphabetic"
        textAnchor="start"
        fill="#fafafa"
        fontSize={radius * .5}
      >{character.name || character.displayName}</text>

      {/* Draw each health unit as a rectangle */}
      {Array.from({length: totalHealth}).map((_, index) => {
        const transform = index < maxArcHealth ? getArcRectangleTransform(index) : getStraightLineTransform(index);
        return (
          <rect
            key={index}
            width={rectWidth}
            height={rectHeight}
            fill={index < health ? 'green' : 'none'} // Color the filled health units green, others gray
            stroke='green'
            transform={transform} // Position and rotate the rectangle
          />
        )
      })}
      {Array.from({length: totalStrain}).map((_, index) => {
        const transform = index < maxArcStrain ? getOuterArcRectangleTransform(index) : getOuterStraightLineTransform(index);
        return (
          <rect
            key={index}
            width={rectWidth}
            height={rectHeight}
            fill={index < strain ? 'blue' : 'none'} // Color the filled health units blue, others gray
            stroke='blue'
            transform={transform} // Position and rotate the rectangle
          />
        )
      })}
    </svg>
  );
};