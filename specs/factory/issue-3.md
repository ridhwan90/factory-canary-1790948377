# Plan — issue #3 (run 7)

Committed by factoryd from the accepted Plan Envelope (planning attempt 22): the approved Plan for the effective Brief (PRD 6.1). Canonical artifact: `specs/factory/issue-3.md`.

## Requirements

### 1. Brief · acceptanceCriteria[0]

Add optional symbols parameter to map $→dollar, &→and, @→at before tokenization

- Intended changes:
  - Modify function signature to accept 4th optional symbols parameter (default false)
  - Add symbol mapping logic when symbols parameter is true
  - Pre-process title to replace $→dollar, &→and, @→at before normalization
  - Ensure mapped words participate in maxWords truncation
- Risks:
  - Performance impact of additional string replacement operations
  - Edge cases with complex symbol combinations or existing word matches
  - Accidental word boundary issues during symbol replacement
- Validation evidence:
  - slugify("Tom & Jerry", "-", 0, true) returns "tom-and-jerry"
  - slugify("$100 @ stake", "-", 0, true) returns "dollar-100-at-stake"

### 2. Brief · acceptanceCriteria[1]

The mapped words participate in maxWords truncation when both options are given

- Intended changes:
  - Ensure symbol-mapped words count toward maxWords limit
  - Preserve truncation logic after symbol preprocessing
  - Maintain consistent word counting across original and mapped words
- Risks:
  - Complex word counting when symbols create additional words
  - Edge cases with partial symbol replacements
  - Performance impact of combined symbol mapping and truncation
- Validation evidence:
  - slugify("A & B & C", "-", 2, true) returns "a-and-b"
  - Both original and mapped words count toward maxWords limit

### 3. Brief · acceptanceCriteria[2]

slugify('Tom & Jerry') (default) still returns 'tom-jerry'

- Intended changes:
  - Default symbols parameter to false preserving existing behavior
  - No changes to normalization, splitting, or joining logic when symbols=false
  - Maintain exact API compatibility for 1-3 parameter calls
- Risks:
  - Accidental changes to default behavior when symbols parameter is omitted
  - Default parameter behavior changes affecting existing code
- Validation evidence:
  - slugify("Tom & Jerry") still returns "tom-jerry"
  - slugify("Tom & Jerry", "-", 0) still returns "tom-jerry"
  - All existing test cases continue to pass unchanged

### 4. Brief · acceptanceCriteria[3]

All existing tests keep passing (npm test)

- Intended changes:
  - Ensure all existing test cases continue to pass without modification
  - Maintain backward compatibility with existing API
  - Preserve current normalization and splitting behavior
- Risks:
  - Test failures due to unintended behavior changes
  - Edge cases not covered by existing test suite
- Validation evidence:
  - npm test produces identical results
  - Existing CI pipeline continues to pass
  - No breaking changes to existing functionality

### 5. Planner-added

Add error handling for invalid symbols parameter

- Intended changes:
  - Add type validation for symbols parameter
  - Reject non-boolean values with TypeError
  - Maintain consistent error handling pattern with existing validation
- Risks:
  - Inconsistent error messaging with existing validation patterns
  - Breaking changes if error messages are consumed programmatically
- Validation evidence:
  - slugify("test", "-", 0, "invalid") throws TypeError
  - slugify("test", "-", 0, null) throws TypeError
  - Existing error handling patterns remain unchanged
