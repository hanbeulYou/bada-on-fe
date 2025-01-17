import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'starList',
  storage: localStorage,
});

export const starListState = atom<string[]>({
  key: 'starListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
