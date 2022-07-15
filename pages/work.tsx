import { m } from 'framer-motion';
import Head from 'next/head';
import ProjectsList from '../components/ProjectsList';
import { PROJECTS_LIST } from '../constants';

const Work = () => {
	return (
		<>
			<Head>
				<title>Work - Projects I&apos;ve worked on lately</title>
				<meta
					name="description"
					content={`Here you can see some projects that I have worked on lately.`}
				/>
			</Head>
			<m.div className="flex flex-1 basis-0 flex-col overflow-hidden">
				<ProjectsList projects={PROJECTS_LIST} />
			</m.div>
		</>
	);
};

export default Work;
