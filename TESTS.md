# Automated Cost Engine Tests | Sift AI Spend Audit 🧪

This document provides complete instructions on running and verifying Sift AI's automated test suite.

---

## 🛠️ Test Runner Architecture

Sift features a clean, zero-dependency unit test runner located inside [run-tests.js](file:///c:/Assignment/scripts/run-tests.js).
It runs directly inside Node.js, utilizing ES Module imports to assert the mathematical validity and logic of our rule-based auditing engine (`src/services/auditEngine.js`).

To hook it up to the standard Node lifecycle, the script is registered in the `package.json` scripts block under the `test` command.

---

## 📊 Documented Test Cases

The test suite covers exactly **five critical cost engine rules**:

### 1. ChatGPT Downgrade Rule Test
* **Objective:** Verify that Sift correctly identifies small teams utilizing Team subscriptions.
* **Input Setup:** 2 seats on ChatGPT Team plan (billing $60/mo).
* **Expected Result:** Savings of **$20/mo** (pruning the $10/seat overkill rate to Pro/Plus pricing of $20/seat).
* **Assertion:** `savings === 20 && recommendation !== undefined`

### 2. Cursor Business Downgrade Test
* **Objective:** Ensure Cursor Business seats downgrade to Pro if the organization size is small.
* **Input Setup:** 5 seats on Cursor Business ($40/seat) with team size of 5.
* **Expected Result:** Savings of **$100/mo** (since Cursor Pro is $20/seat, saving $20/seat on 5 users).
* **Assertion:** `savings === 100 && recommendation !== undefined`

### 3. Duplicate Conversational setup Test
* **Objective:** Confirm conversational stack overlap rules.
* **Input Setup:** ChatGPT Plus (5 users, spend $100/mo) AND Claude Pro (5 users, spend $100/mo) concurrently.
* **Expected Result:** Savings of **$100/mo** (consolidating Claude Pro spend completely).
* **Assertion:** `savings === 100 && duplicateRec !== undefined`

### 4. Seat Over-Allocation Test
* **Objective:** Check if unassigned seats are pruned relative to actual employee headcount.
* **Input Setup:** 15 active seats on ChatGPT Plus (spend $300/mo) but only 10 declared employees (5 excess seats).
* **Expected Result:** Savings of **$100/mo** (5 unassigned seats * $20/seat).
* **Assertion:** `savings === 100 && idleRec !== undefined`

### 5. API Overspend Test
* **Objective:** Scans direct API tokens and estimates prompt caching savings.
* **Input Setup:** Anthropic API Monthly spend at $1000/mo.
* **Expected Result:** Savings of **$300/mo** (caching token usage reduction estimated at 30%).
* **Assertion:** `savings === 300 && apiRec !== undefined`

---

## ⚡ Running the Tests

To run the automated suite, execute the following command in your terminal:

```bash
npm test
```

### Expected Output
```text
> assignment@0.0.0 test
> node scripts/run-tests.js


==================================================
🧪 RUNNING SIFT AI COST ENGINE AUTOMATED TESTS
==================================================

✅ [PASS] ChatGPT Team Overkill rule is successfully triggered for <= 2 seats.
✅ [PASS] ChatGPT Team downgrade savings computed is $20 (Expected: $20, Found: $20).
✅ [PASS] Cursor Business Overkill rule is successfully triggered for < 10 team members.
✅ [PASS] Cursor Business downgrade savings computed is $100 (Expected: $100, Found: $100).
✅ [PASS] Duplicate Conversational Stack rule is successfully triggered.
✅ [PASS] Conversational overlap savings consolidated is $100 (Expected: $100, Found: $100).
✅ [PASS] Idle Seat over-allocation rule is successfully triggered.
✅ [PASS] Overallocated seats pruned savings computed is $100 (Expected: $100, Found: $100).
✅ [PASS] Direct API High-Usage prompt-caching rule is successfully triggered.
✅ [PASS] Direct API prompt caching savings consolidated is $300 (Expected: $300, Found: $300).

==================================================
📊 TEST SUITE SUMMARY: 10 PASSED, 0 FAILED
==================================================
```
