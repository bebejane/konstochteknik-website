import '@/styles/index.scss';

export default async function RootLayout({ children, modals }: LayoutProps<'/'>) {
	return (
		<html lang='en'>
			<body id='root'>
				{modals}
				{children}
			</body>
		</html>
	);
}
