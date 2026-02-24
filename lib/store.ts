import { create } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

export interface StoreState {
	showMenu: boolean;
	showAbout: boolean;
	project?: ProjectRecord;
	index: number;
	category: 'art' | 'tech' | undefined;
	/** [Added by assistant] Temporary h2 text override when hovering nav "Konst"/"Teknik"; cleared on mouse out. */
	h2Override: string | null;
	setShowMenu: (showMenu: boolean) => void;
	setProject: (project: ProjectRecord) => void;
	setShowAbout: (showAbout: boolean) => void;
	setCategory: (category: 'art' | 'tech' | undefined) => void;
	setIndex: (index: number) => void;
	setH2Override: (text: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
	showMenu: false,
	showAbout: false,
	project: undefined,
	index: 0,
	category: undefined,
	h2Override: null,
	setShowMenu: (showMenu) => set({ showMenu }),
	setProject: (project) => set({ project }),
	setShowAbout: (showAbout) => set({ showAbout }),
	setCategory: (category: 'art' | 'tech' | undefined) => set({ category, index: 0 }),
	setIndex: (index) => set({ index }),
	setH2Override: (h2Override) => set({ h2Override }),
}));

export { shallow, useStore, useShallow };
