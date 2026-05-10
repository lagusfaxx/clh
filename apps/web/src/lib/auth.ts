import NextAuth, { type DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import { prisma } from '@chile-historico/db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: 'VIEWER' | 'CONTRIBUTOR' | 'CURATOR' | 'ADMIN'
    } & DefaultSession['user']
  }
}

const providers = []
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  session: { strategy: 'database' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        // @ts-expect-error - role viene de PrismaAdapter
        session.user.role = user.role ?? 'VIEWER'
      }
      return session
    },
  },
})

export type AppRole = 'VIEWER' | 'CONTRIBUTOR' | 'CURATOR' | 'ADMIN'

export function hasRole(
  current: AppRole | undefined,
  required: AppRole,
): boolean {
  if (!current) return false
  const order: AppRole[] = ['VIEWER', 'CONTRIBUTOR', 'CURATOR', 'ADMIN']
  return order.indexOf(current) >= order.indexOf(required)
}
