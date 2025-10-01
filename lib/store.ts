import { create } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

export interface StoreState {
	showMenu: boolean;
	showAbout: boolean;
	project?: ProjectRecord;
	setShowMenu: (showMenu: boolean) => void;
	setProject: (project: ProjectRecord) => void;
	setShowAbout: (showAbout: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
	showMenu: false,
	showAbout: false,
	project: undefined,
	setShowMenu: (showMenu) => set({ showMenu }),
	setProject: (project) => set({ project }),
	setShowAbout: (showAbout) => set({ showAbout }),
}));

export { shallow, useStore, useShallow };
