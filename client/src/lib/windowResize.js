import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from './useDebounce';
import { calculateScale } from './';

export default (scaleRef) => {
  const [scale, setScale] = useState(
    useSelector(state => state.scale)
  );
  const delayedScale = useDebounce(scale, 200);

  useEffect(() => {
    const handleResize = () => setScale( calculateScale(scaleRef) );

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scaleRef])

  return delayedScale;
}