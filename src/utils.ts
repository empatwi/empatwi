import { useCallback, useEffect, useState } from 'react';

export const useContainerDimensions = (ref: React.RefObject<JSX.Element>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDimensions = useCallback(() => {
    return {
      // @ts-ignore
      width: ref?.current?.offsetWidth,
      // @ts-ignore
      height: ref?.current?.offsetHeight,
    };
  }, [ref]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref?.current) setDimensions(getDimensions());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getDimensions, ref]);

  return dimensions;
};
