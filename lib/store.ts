import { create } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

export interface StoreState {
	showMenu: boolean;
	showAbout: boolean;
	showThumbnails: boolean;
	project: AllProjectsQuery['allProjects'][number] | null;
	index: number;
	filter: 'art' | 'tech' | null;
	setShowMenu: (showMenu: boolean) => void;
	setProject: (project: AllProjectsQuery['allProjects'][number] | null) => void;
	setShowAbout: (showAbout: boolean) => void;
	setIndex: (index: number) => void;
	setFilter: (filter: 'art' | 'tech' | null) => void;
	setShowThumbnails: (showThumbnails: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
	showMenu: false,
	showAbout: false,
	showThumbnails: true,
	project: null,
	index: 0,
	filter: null,
	setProject: (project) => set({ project }),
	setShowMenu: (showMenu) => set({ showMenu }),
	setShowAbout: (showAbout) => set({ showAbout }),
	setIndex: (index) => set({ index }),
	setShowThumbnails: (showThumbnails) => set({ showThumbnails }),
	setFilter: (filter) => set({ filter, index: 0, showThumbnails: true }),
}));

export { shallow, useStore, useShallow };
