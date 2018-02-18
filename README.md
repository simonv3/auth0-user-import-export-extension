# Auth0 user import and export extension

This extension makes it possible to import and export users from Auth0, using JSON or CSV (complex or a list of e-mails).

This is a fork of the [Auth0 Extension](https://auth0.com/docs/extensions/user-import-export) with some things to sweeten the deal.

## Running

### Local Development

First create a `Client` (single page app) in your account. Then create a `config.json` file under `./server/` containing the following settings:

```json
{
  "EXTENSION_SECRET": "any-random-value-will-do",
  "AUTH0_DOMAIN": "YOUR_DOMAIN", // without "https://"
  "AUTH0_CLIENT_ID": "YOUR_CLIENT_ID",
  "AUTH0_CLIENT_SECRET": "YOUR_CLIENT_SECRET",
  "WT_URL": "http://localhost:3000/",
  "AUTH0_RTA": "https://auth0.auth0.com"
}
```

To run the extension locally:

```bash
npm install
npm run serve:dev
```

After that `ngrok` will expose the extension (Auth0 needs to reach out to the extension for authentication).

### Deployment

```
npm run build
```
