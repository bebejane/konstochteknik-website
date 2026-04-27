import { useMedia } from 'react-use';
export const useIsMobile = (defaultState = false) => useMedia('(max-width: 740px)', defaultState);
