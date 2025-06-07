import { useContext } from 'react';
import BottomSheetContext, { BottomSheetType } from './context';

const useBottomSheet = (): BottomSheetType => useContext(BottomSheetContext);
export default useBottomSheet;