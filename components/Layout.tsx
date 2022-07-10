import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<div className="main-container h-screen w-screen overflow-y-auto overflow-x-hidden bg-gray-900">
			<div className="mx-auto h-full w-full max-w-6xl">
				<Navbar />
				<div className="w-full h-[100%-16]">{children}</div>
			</div>
		</div>
	);
}
