import { sign, verify } from 'jsonwebtoken';

export const ACCESS_TOKEN_SECRET = 'kemasposecenggondokaccesstoken';
export const REFRESH_TOKEN_SECRET = 'kemasposecenggondokrefreshtoken';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function setTokens(user: any): Tokens {
  const accessUser = {
    id: user._id,
    role: user.role,
  };
  const accessToken = sign({ user: accessUser }, ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60,
  });
  const refreshUser = {
    id: user._id,
    role: user.role,
    count: user.token_count,
  };
  const refreshToken = sign({ user: refreshUser }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
}

export function validateAccessToken(token: any) {
  try {
    return verify(token, ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
}

export function validateRefreshToken(token: any) {
  try {
    return verify(token, REFRESH_TOKEN_SECRET);
  } catch {
    return null;
  }
}
