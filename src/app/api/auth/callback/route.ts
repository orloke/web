import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const registerResponse = await api.post('/register', {
    code,
  })
  const { token } = registerResponse.data
  const expiredToken = 60 * 60 * 24 * 30
  const redirectUrl = new URL('/', req.url)
  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${expiredToken}`,
    },
  })
}