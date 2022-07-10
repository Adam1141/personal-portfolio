import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import { slideRight } from '../animations';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<Layout>
			<LazyMotion features={domAnimation}>
				<AnimatePresence exitBeforeEnter>
					<m.div
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
	);
}

export default MyApp;
