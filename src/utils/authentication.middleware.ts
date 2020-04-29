import { NestMiddleware } from '@nestjs/common';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req, res, next) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://a4rb.auth0.com/.well-known/jwks.json',
      }),

      // audience: 'NickWasHere',
      issuer: 'https://a4rb.auth0.com/',
      algorithm: 'RS256',
    })(req, res, err => {
      if (err) {
        const status = err.status || 401;
        const message = 'Cannot process request. Error: ' + err.message;
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
