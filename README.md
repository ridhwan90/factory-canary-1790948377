# factory-canary-seed

Public Target repo for the AFK Software Factory MVP canary (KA-software-factory issue 96).
A tiny slug utility with Node's built-in test runner; `.factory/quality.yaml` declares the
deterministic commands and the required CI check. History on `main` is seed-only; all
implementation work arrives through Factory pull requests.

## API

### `camelCase(title)`

Converts a human title into camelCase: runs of whitespace or punctuation are
treated as word separators and removed, the first word is lowercased, and the
first letter of each subsequent word is capitalized.

```js
import { camelCase } from "./src/camel.js";

camelCase("hello factory world"); // "helloFactoryWorld"
camelCase("already-kebab-case"); // "alreadyKebabCase"
```

Throws a `TypeError` when `title` is not a string. Empty or separator-only
input returns `""`.

