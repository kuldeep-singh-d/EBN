# Store API Integration Guide

## Goal
Configure every API from the Postman collection into the Redux store using the same pattern already used in this project.

## Current architecture
- Routes are centralized in [src/store/apiRoutes.ts](src/store/apiRoutes.ts)
- API actions are dispatched through [src/store/apiActions.ts](src/store/apiActions.ts)
- Requests are handled by [src/store/middleware/api.ts](src/store/middleware/api.ts)
- Each feature has its own slice under [src/store/slices](src/store/slices)
- Reducers are registered in [src/store/reducer.ts](src/store/reducer.ts)

## How this project wires APIs
1. Add the endpoint path in [src/store/apiRoutes.ts](src/store/apiRoutes.ts)
2. Create or update a slice file under [src/store/slices](src/store/slices)
3. Inside the slice:
   - define state: `data`, `loading`, `error`
   - create `requested`, `success`, `failed`, `reset` reducers
   - export an action creator that dispatches `apiCallBegan`
4. Register the reducer in [src/store/reducer.ts](src/store/reducer.ts)

## Important middleware behavior
- The middleware sends requests with Axios and handles success/failure centrally.
- It automatically attaches a Bearer token from the login/register state if available.
- Base URL comes from `store.setEnvironment?.data?.domain` or `BASE_URL` from env.
- `isRowData: true` uses JSON content type; otherwise multipart/form-data is used.
- 401 and 503 errors are handled centrally.

## Existing API groups already implemented
- Auth: login, register, forgot password, resend OTP, verify OTP, reset password, registration OTP, logout
- Devices: list devices, create device, charging sessions
- Certificates: list certificates, certificate detail download

## Agent instructions for Postman collection
For every request in the Postman collection:
- Identify the domain (auth, devices, certificates, etc.)
- Map the endpoint to the correct route file and slice
- Add the route in [src/store/apiRoutes.ts](src/store/apiRoutes.ts)
- Create/update the slice with the same reducer pattern as [src/store/slices/auth/login.ts](src/store/slices/auth/login.ts) or [src/store/slices/devices/devices.ts](src/store/slices/devices/devices.ts)
- Use `apiCallBegan` with `method`, `url`, `data`, `params`, `onStart`, `onSuccess`, and `onFailed`
- Register the slice in [src/store/reducer.ts](src/store/reducer.ts)
- Keep the response handling consistent with existing slices

## Expected output
The final result should be a fully wired Redux integration for all Postman APIs, with:
- route definitions
- slice/action creators
- reducer registration
- working request/response handling through the existing middleware
