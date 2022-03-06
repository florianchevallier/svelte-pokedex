import { serialize } from "cookie";
import { createSession, getUserByUsername } from "./_db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const body = await request.json();
  const user = await getUserByUsername(body.user);

  if (!user) {
    return {
      status: 400,
      body: {
        message: 'Invalid username or password'
      }
    }
  }

  if (body.password === user.password) {
    const { id } = await createSession(user.username);
    return {
      status: 204,
      headers: {
        'Set-Cookie': serialize('session_id', id, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // one week
        }),
      },
    };
  } else {
    return {
      status: 400,
      body: {
        message: 'Invalid username or password'
      }
    }
  }
};