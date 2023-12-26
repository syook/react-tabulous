import React from 'react';

export const GridRoot = React.forwardRef(({ children }: any, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="gridRoot">
      {children}
    </div>
  );
});
