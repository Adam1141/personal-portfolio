import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import { slideRight } from '../animations';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<SnackbarProvider maxSnack={3}>
			<Layout>
				<LazyMotion features={domAnimation}>
					<AnimatePresence exitBeforeEnter>
						<m.div
							id="_app-transition-wrapper"
							className="flex w-full flex-1 basis-0 flex-col overflow-hidden"
							key={router.route.concat(slideRight.name)}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={slideRight.variants}
							transition={slideRight.transition}
						>
							<Head>
								<meta charSet="UTF-8" />
								<meta name="keywords" content="portfolio, adam hussein, full stack, developer" />
								<meta name="author" content="Adam Hussein" />
								<meta name="viewport" content="width=device-width, initial-scale=1.0" />
								<title>Adam&apos;s Portfolio</title>
								<link rel="shortcut icon" href="/favicon/favicon.ico" />
								<link
									rel="apple-touch-icon"
									sizes="180x180"
									href="/favicon/apple-touch-icon.png"
								/>
								<link
									rel="icon"
									type="image/png"
									sizes="32x32"
									href="/favicon/favicon-32x32.png"
								/>
								<link
									rel="icon"
									type="image/png"
									sizes="16x16"
									href="/favicon/favicon-16x16.png"
								/>
							</Head>
							<Component key={router.pathname} {...pageProps} />
						</m.div>
					</AnimatePresence>
				</LazyMotion>
			</Layout>
		</SnackbarProvider>
	);
}

export default MyApp;
