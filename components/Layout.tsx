import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<div className="h-screen w-screen overflow-hidden bg-gray-900">
			<div className="mx-auto h-full w-full max-w-6xl">
				<Navbar />
				{children}
			</div>
		</div>
	);
}
