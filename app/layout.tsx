import '@/styles/index.scss';
import { DraftModeContentLink } from 'next-dato-utils/components';

export type LayoutProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<html lang='en'>
			<body id='root'>{children}</body>
			<DraftModeContentLink />
		</html>
	);
}
