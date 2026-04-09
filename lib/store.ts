import { create } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

export interface StoreState {
	showMenu: boolean;
	showAbout: boolean;
	color: string;
	projectId: string | null;
	project?: AllProjectsQuery['allProjects'][number];
	index: number;
	category: 'art' | 'tech' | null;
	h2Override: string | null;
	setShowMenu: (showMenu: boolean) => void;
	setProject: (project: AllProjectsQuery['allProjects'][number] | null) => void;
	setProjectId: (projectId: string | null) => void;
	setColor: (color: string) => void;
	setShowAbout: (showAbout: boolean) => void;
	setCategory: (category: 'art' | 'tech' | undefined) => void;
	setIndex: (index: number) => void;
	setH2Override: (text: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
	showMenu: false,
	showAbout: false,
	project: null,
	index: 0,
	category: null,
	h2Override: null,
	color: 'var(--black)',
	projectId: null,
	setShowMenu: (showMenu) => set({ showMenu }),
	setProject: (project) => set({ project }),
	setProjectId: (projectId) => set({ projectId }),
	setColor: (color?: string) => set({ color: color ?? null }),
	setShowAbout: (showAbout) => set({ showAbout }),
	setCategory: (category) => set({ category, index: 0 }),
	setIndex: (index) => set({ index }),
	setH2Override: (h2Override) => set({ h2Override }),
}));

export { shallow, useStore, useShallow };
