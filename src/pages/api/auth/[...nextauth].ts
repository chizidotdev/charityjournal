import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
// import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: 'Username',
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Enter username' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter password' },
      },
      async authorize(credentials) {
        if (credentials?.username === 'admin' && credentials.password === 'admin') {
          const user = await prisma.user.findUnique({
            where: {
              name: credentials.username,
            },
          });

          if (user) {
            return user;
          }

          throw new Error("User doesn't exist");
        }

        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: '/signin',
  // },
};

export default NextAuth(authOptions);
