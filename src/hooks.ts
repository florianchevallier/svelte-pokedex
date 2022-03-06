import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import { getSession as getSessionFromApi } from './routes/api/_db';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');


	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = { username: session.username };
		}
	}

	const response = await resolve(event);

	return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return request?.locals?.user
		? {
			user: {
				username: request.locals.user.username,
			},
		}
		: {};
}