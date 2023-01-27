import React, {useRef, useState, useEffect} from 'react';
import Tooltip from "@mui/material/Tooltip";
import "./EllipsisText.sass";

const EllipsisText = ({children, className}) => {
  const [isOverflowed, setIsOverflow] = useState(false);
  const textElementRef = useRef();

  useEffect(() => {
    setIsOverflow(textElementRef.current.scrollWidth > textElementRef.current.clientWidth);
  }, []);

  return (
    <Tooltip
      classes={{tooltip: "ellipsis-text-tooltip"}}
      disableHoverListener={!isOverflowed}
      title={children}>
      <span ref={textElementRef} className={className ? className : ""}>{children}</span>
    </Tooltip>
  )
}

export default EllipsisText