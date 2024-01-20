import _isEqual from 'lodash/isEqual';
import usePrevious from './usePrevious';

const useHasChanged = (value) => {
   const prevVal = usePrevious(value);
   if (typeof value === 'object') {
      return !_isEqual(value, prevVal);
   }
   return prevVal !== value;
};

export default useHasChanged;