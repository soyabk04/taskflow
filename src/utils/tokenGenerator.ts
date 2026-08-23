import jwt from "jsonwebtoken";
import { ATJWTKEY, RTJWTKEY } from "../config/env.config.js";
import type { TokenPayload } from "../types/user.types.js";


export const tokenGenerator = (data: TokenPayload) => {
    const accessToken = jwt.sign(
        data,ATJWTKEY,{expiresIn: "15m",}
    );

    const refreshToken = jwt.sign(
        data,RTJWTKEY,{expiresIn: "7d",}
    );

    return {
        accessToken,
        refreshToken,
    };
};
export const verifyToken = (
  token: string,
  tokenType: "AT" | "RT"
) => {
  const secretKey =
    tokenType === "AT"
      ? ATJWTKEY
      : RTJWTKEY;

  return jwt.verify(token, secretKey);
};