import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import { slideRight } from '../animations';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<Layout>
			<SnackbarProvider maxSnack={3}>
				<LazyMotion features={domAnimation}>
					<AnimatePresence exitBeforeEnter>
						<m.div
							className="flex-1 basis-0"
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
			</SnackbarProvider>
		</Layout>
	);
}

export default MyApp;
