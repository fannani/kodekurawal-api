import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function setTokens(user: any): Tokens {
  const accessUser = {
    id: user._id,
    role: user.role,
  };
  const accessToken = sign(
    { user: accessUser },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 15 * 60,
    }
  );
  const refreshUser = {
    id: user._id,
    role: user.role,
    count: user.token_count,
  };
  const refreshToken = sign(
    { user: refreshUser },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
}

type Auth = {
  user: any;
};

export function validateAccessToken(token: any): Auth | null {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET as string) as Auth;
  } catch {
    return null;
  }
}

export function validateRefreshToken(token: any): Auth | null {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET as string) as Auth;
  } catch {
    return null;
  }
}

export async function validateTokensMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.headers['x-refresh-token'];
  const accessToken = req.headers['x-access-token'];
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid refresh token
    const user = await User.findById(decodedRefreshToken.user.id);
    // valid user and user token not invalidated
    if (!user || user.token_count !== decodedRefreshToken.user.count)
      return next();
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const userTokens = setTokens(user);
    res.set({
      'Access-Control-Expose-Headers': 'x-access-token,x-refresh-token',
      'x-access-token': userTokens.accessToken,
      'x-refresh-token': userTokens.refreshToken,
    });
    return next();
  }
  return next();
}
