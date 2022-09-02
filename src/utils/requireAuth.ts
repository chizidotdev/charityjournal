import { GetServerSidePropsContext, PreviewData } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { ParsedUrlQuery } from 'querystring';

export const requireAuth = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  cb: (session: Session | null) => any
) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return cb(session);
};
