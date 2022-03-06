import cookie from "cookie";
import { getSession } from "./_db";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  if (cookies && cookies.session_id) {
    const session = await getSession(cookies.session_id);
    return {
      status: 200,
      body: session
    };
  }
  return {
    status: 204,
  };
};