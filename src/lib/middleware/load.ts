export default async function load({ session, url }) {
  console.log('session', session);
  if (!session?.user) {
    if (url.pathname !== '/login') {
      return {
        status: 302,
        redirect: '/login'
      };
    }
  }
  if (session?.user && url.pathname === '/login') {
    return {
      status: 302,
      redirect: '/space'
    };
  }
  return {
    props: {
      user: session.user
    }
  };
}