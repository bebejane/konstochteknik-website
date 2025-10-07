import '@/styles/index.scss';
import s from '../layout.module.scss';

export type LayoutProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<>
			<main className={s.main}>
				<article>{children}</article>
			</main>
		</>
	);
}
