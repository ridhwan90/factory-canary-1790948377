# Plan — issue #1 (run 1)

Committed by factoryd from the accepted Plan Envelope (planning attempt 1): the approved Plan for the effective Brief (PRD 6.1). Canonical artifact: `specs/factory/issue-1.md`.

## Requirements

### 1. Brief · acceptanceCriteria[0]

Add optional maxWords parameter to slugify function with truncation functionality

- Intended changes:
  - Modify function signature to accept maxWords parameter
  - Add parameter validation for maxWords ≤ 0
  - Implement word array slicing based on maxWords value
  - Preserve existing behavior when maxWords is not provided or exceeds word count
- Risks:
  - Edge case handling for empty/word-less titles
  - Backward compatibility with existing 2-parameter calls
  - Performance impact of array slicing operation
- Validation evidence:
  - slugify('One Two Three Four', '-', 2) returns 'one-two'
  - All existing functionality remains unchanged
  - CI tests continue to pass

### 2. Brief · acceptanceCriteria[1]

Implement word count preservation behavior

- Intended changes:
  - Add logic to compare maxWords against total word count
  - Skip truncation when maxWords ≥ total words
  - Maintain exact existing behavior for untruncated cases
- Risks:
  - Accidental modification of normalization pipeline
  - Performance impact for long titles
- Validation evidence:
  - slugify('Hello World', '-', 10) returns 'hello-world'
  - All existing test cases pass unchanged

### 3. Brief · acceptanceCriteria[2]

Add error handling for invalid maxValues

- Intended changes:
  - Add maxWords validation to parameter checking
  - Throw RangeError for maxWords ≤ 0
  - Maintain consistent error handling pattern with existing validation
- Risks:
  - Inconsistent error messaging with existing validation
  - Breaking changes if error messages are consumed programmatically
- Validation evidence:
  - slugify('test', '-', 0) throws RangeError
  - slugify('test', '-', -1) throws RangeError
  - Existing error handling patterns remain unchanged

### 4. Brief · acceptanceCriteria[0]

Ensure complete backward compatibility

- Intended changes:
  - Preserve existing slugify(title, separator) behavior
  - Ensure slugify(title, separator, undefined) works identically
  - No changes to core normalization or joining logic
- Risks:
  - Accidental function signature changes breaking compatibility
  - Default parameter behavior changes
- Validation evidence:
  - All existing tests pass without modification
  - npm test produces identical results
  - Existing CI pipeline continues to pass
