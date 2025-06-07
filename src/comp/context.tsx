import React from 'react';
import { BottomSheetRef } from './BottomSheet';

export type BottomSheetType = BottomSheetRef;
const BottomSheetContext = React.createContext<BottomSheetType>({ show: () => {}, hide: () => {} });
export default BottomSheetContext;