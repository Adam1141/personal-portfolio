import dayjs from 'dayjs';
import { IronSession } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from 'next';

if (process.env.SECRET === undefined)
	throw new Error('Session secret is undefined!!!');

export const sessionOptions = {
	password: process.env.SECRET,
	cookieName: 'tiger',
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		maxAge: 24 * 60 * 60,
	},
};

export function withSessionRoute(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
	P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
	handler: (
		context: GetServerSidePropsContext,
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
	return withIronSessionSsr(handler, sessionOptions);
}

// this is a temporary fix until iron-session supports
// accessing session object inside of middleware.
// must call this before access validations in all API routes
export async function sessionValidityCheck(session: IronSession) {
	// return true if and only if session is ok/valid
	if (session?.validUntil && dayjs(session.validUntil).isBefore(dayjs())) {
		await session.destroy();
	}
	if (session?.isAdmin === true) return true;
	return false;
}
