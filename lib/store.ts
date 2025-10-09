import { create } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

export interface StoreState {
	showMenu: boolean;
	showAbout: boolean;
	project?: ProjectRecord;
	category: 'art' | 'tech' | undefined;
	setShowMenu: (showMenu: boolean) => void;
	setProject: (project: ProjectRecord) => void;
	setShowAbout: (showAbout: boolean) => void;
	setCategory: (category: 'art' | 'tech' | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
	showMenu: false,
	showAbout: false,
	project: undefined,
	category: undefined,
	setShowMenu: (showMenu) => set({ showMenu }),
	setProject: (project) => set({ project }),
	setShowAbout: (showAbout) => set({ showAbout }),
	setCategory: (category: 'art' | 'tech' | undefined) => set({ category }),
}));

export { shallow, useStore, useShallow };
