import React, { FC, useRef } from 'react';
import BottomSheet, { BottomSheetRef, Props } from './BottomSheet';
import BottomSheetContext from './context';

type PropsWithChildren = Props & { children: React.ReactNode };

const BottomSheetProvider: FC<PropsWithChildren> = ({ children, ...props }) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  // Initialize the context value directly with the ref's current methods
  const contextValue = {
    show: (params: Props) => bottomSheetRef.current?.show(params),
    hide: () => bottomSheetRef.current?.hide(),
  };

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      <BottomSheet ref={bottomSheetRef} {...props} />
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;