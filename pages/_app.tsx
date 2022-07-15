import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import { slideRight } from '../animations';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<SnackbarProvider maxSnack={3}>
			<Layout>
				<LazyMotion features={domAnimation}>
					<AnimatePresence exitBeforeEnter>
						<m.div
							id='_app-transition-wrapper'
							className="flex w-full flex-1 basis-0 flex-col overflow-hidden"
							key={router.route.concat(slideRight.name)}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={slideRight.variants}
							transition={slideRight.transition}
						>
							<Component key={router.pathname} {...pageProps} />
						</m.div>
					</AnimatePresence>
				</LazyMotion>
			</Layout>
		</SnackbarProvider>
	);
}

export default MyApp;
