# Plan — issue #5 (run 8)

Committed by factoryd from the accepted Plan Envelope (planning attempt 26): the approved Plan for the effective Brief (PRD 6.1). Canonical artifact: `specs/factory/issue-5.md`.

## Requirements

### 1. Brief · desiredBehavior

Implement a pure named camelCase helper with whitespace and punctuation separator collapsing, first-word lowercasing, subsequent-initial capitalization, empty-input handling and TypeError validation; preserve existing tests.

- Intended changes:
  - Create src/camel.js independently of slugify.
  - Split whitespace and ASCII punctuation runs, discard empty tokens, lowercase the first token and capitalize only subsequent initials.
  - Add behavioral tests and README API documentation.
- Risks:
  - Empty tokens can corrupt capitalization; reusing slugify introduces unwanted normalization.
  - Lowercasing subsequent word suffixes would exceed the stated transformation.
- Validation evidence:
  - Planned: tests for mixed punctuation, whitespace, separator-only strings, mixed case and invalid arguments.
  - Planned: full npm test and direct ESM API smoke; no project code was executed during planning.

### 2. Brief · keyInterfaces[0]

Named export camelCase(title: string): string throws TypeError for non-string input.

- Intended changes:
  - Export camelCase directly from src/camel.js.
  - Validate typeof title before processing, matching the existing title-validation convention.
- Risks:
  - Incorrect export shape or coercion would violate the API.
- Validation evidence:
  - Planned: named-import tests and direct ESM smoke assert outputs and TypeError.

### 3. Brief · keyInterfaces[1]

Use the built-in Node test runner through npm test and existing test-directory discovery.

- Intended changes:
  - Create test/camel.test.js using node:test and node:assert/strict.
  - Retain the existing package test script.
- Risks:
  - Incorrect naming or another runner could prevent discovery.
- Validation evidence:
  - Planned: npm test discovers new camel tests alongside the ten existing slug tests.

### 4. Brief · acceptanceCriteria[0]

camelCase("hello factory world") returns "helloFactoryWorld".

- Intended changes:
  - Implement whitespace token conversion and add the exact equality assertion.
- Risks:
  - Incorrect capitalization or retained separators.
- Validation evidence:
  - Planned: exact assertion passes in npm test and direct API smoke.

### 5. Brief · acceptanceCriteria[1]

camelCase("  multiple   spaces here ") returns "multipleSpacesHere", dropping separator runs and leading/trailing separators.

- Intended changes:
  - Discard empty tokens from separator splitting.
  - Add the exact assertion plus tabs/newlines coverage.
- Risks:
  - Leading empty tokens could change first-word capitalization.
- Validation evidence:
  - Planned: exact equality assertion and whitespace-boundary tests pass.

### 6. Brief · acceptanceCriteria[2]

camelCase("already-kebab-case") returns "alreadyKebabCase".

- Intended changes:
  - Include hyphens in separator handling and add the exact assertion.
- Risks:
  - Whitespace-only splitting would retain hyphens.
- Validation evidence:
  - Planned: exact assertion and repeated/mixed punctuation tests pass.

### 7. Brief · acceptanceCriteria[3]

camelCase("") returns "".

- Intended changes:
  - Handle zero tokens explicitly and test empty and separator-only input.
- Risks:
  - Accessing a nonexistent first token could throw.
- Validation evidence:
  - Planned: empty and separator-only equality assertions pass.

### 8. Brief · acceptanceCriteria[4]

Non-string arguments, including number, null and undefined, throw TypeError.

- Intended changes:
  - Validate without coercion before string operations.
  - Test numbers, null, undefined, omitted arguments, booleans, objects, arrays and boxed strings.
- Risks:
  - Coercion or premature method access could produce incorrect behavior or exception types.
- Validation evidence:
  - Planned: assert.throws checks TypeError for each invalid input; direct smoke checks representative cases.

### 9. Brief · acceptanceCriteria[5]

npm test passes with all pre-existing tests unmodified.

- Intended changes:
  - Add camel tests without modifying test/slug.test.js or its source implementation.
- Risks:
  - Global side effects or configuration changes could break existing behavior or discovery.
- Validation evidence:
  - Planned: full npm test passes existing and new tests; implementation diff confirms existing tests remain unchanged.

### 10. Brief · outOfScope[0]

Do not modify the existing slug conversion utility or its behavior.

- Intended changes:
  - Leave src/slug.js unchanged and implement camel conversion independently.
- Risks:
  - Shared tokenization could introduce normalization or maxWords regressions.
- Validation evidence:
  - Planned: existing slug tests pass unchanged and implementation diff contains no slug source changes.

### 11. Brief · outOfScope[1]

Unicode/diacritic normalization remains unspecified and is not required.

- Intended changes:
  - Do not add normalization or accent stripping.
  - Avoid documentation or tests promising Unicode semantics.
- Risks:
  - Copying slugify's normalization pipeline would introduce unintended behavior.
- Validation evidence:
  - Planned: implementation review confirms no normalization pipeline or added Unicode contract.

### 12. Brief · outOfScope[2]

No other case conversions, CLI entry point, new dependencies or test-runner configuration.

- Intended changes:
  - Limit implementation changes to src/camel.js, test/camel.test.js and README.md.
- Risks:
  - Unnecessary packaging or runner changes would expand scope.
- Validation evidence:
  - Planned: implementation diff confirms unchanged package, CI and quality configuration, no extra entry points, and successful npm test.
