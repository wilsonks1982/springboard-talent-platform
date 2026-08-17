# Springboard Talent — Module 1 React Production Routing

React 18 + Webpack + Redux Toolkit + Chakra UI + React Router.

## Authentication behavior

1. On application startup, an access token in `sessionStorage` is validated with `GET /auth/me`.
2. Invalid/expired tokens are removed.
3. `/candidate/*` is protected by `ProtectedRoute`.
4. Unauthenticated users entering any candidate URL are redirected to `/login`.
5. Authenticated users entering `/login` are redirected to `/candidate`.
6. `/` redirects to `/candidate`, which then redirects unauthenticated users to `/login`.
7. Unknown routes fall back to `/`.

## Registration behavior

Registration is route-based:

`/register/welcome`
→ `/register/nda`
→ `/register/privacy`
→ `/register/account`
→ `/register/situation`
→ `/register/verification`
→ `/register/confirmation`

`RegistrationGuard` checks the current registration state before rendering a route.

The guard also calls:

`GET /api/v1/auth/registration/status`

when an authenticated registration context exists, so registration state is not dependent only on Redux/local state.

## Important production rule

Client-side route guards are UX/navigation controls, not a security boundary.

The Spring Boot backend must independently enforce:

- NDA and Privacy acceptance
- registration step transitions
- email/phone verification
- authorization for candidate APIs

For the exact UI order (NDA/Privacy before account creation) while `/auth/register` creates a `User`, the backend should eventually introduce a short-lived registration/draft token or registration-session resource. That lets the server persist pre-account progress without weakening the security boundary.

## API base URL

Set:

`REACT_APP_API_BASE_URL=http://localhost:8080/api/v1`

## APIs

POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
GET /auth/registration/status
POST /auth/email/verify
POST /auth/email/resend
POST /auth/phone/send-otp
POST /auth/phone/verify-otp
GET /consents/current
POST /consents
