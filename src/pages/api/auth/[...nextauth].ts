import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '../../../env/server.mjs';

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
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        // Check if user exists in database
        const existingUser = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
        });

        if (existingUser) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Username',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          const user = await prisma.user.findFirst({
            where: {
              name: credentials.username,
            },
          });
          if (user) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#1db3a6', // Hex color code
    logo: '/charity.png', // Absolute URL to image
    buttonText: '', // Hex color code
  },
  // pages: {
  //   signIn: '/signin',
  // },
};

export default NextAuth(authOptions);
