# managed-upload-reproduction

To reproduce:
1. Install dependencies `npm i`
2. Replace satellite id with your (test) Juno satellite
3. Run `node index.mjs`

Resulting error:
```
Error: Call was rejected:
  Request ID: 3728322b8ddd3bd0da8e04f32694160e2b46bb32706218ede30392b770b3cb5b
  Reject code: 5
  Reject text: Error from Canister njz5m-nyaaa-aaaal-ajola-cai: Canister called `ic0.trap` with message: Caller not allowed to upload data..
Consider gracefully handling failures from this canister or altering the canister to handle exceptions. See documentation: http://internetcomputer.org/docs/current/references/execution-errors#trapped-explicitly
```
