import '@/styles/index.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

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
