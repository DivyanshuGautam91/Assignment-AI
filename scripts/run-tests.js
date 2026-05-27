import { auditEngine } from '../src/services/auditEngine.js';

console.log('\n==================================================');
console.log('🧪 RUNNING SIFT AI COST ENGINE AUTOMATED TESTS');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    passCount++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    failCount++;
    console.log(`❌ [FAIL] ${message}`);
  }
}

// ----------------------------------------------------
// 1. ChatGPT Downgrade Rule Test
// ----------------------------------------------------
try {
  const input = {
    tools: [{ toolId: 'chatgpt', planId: 'team', seats: 2, monthlySpend: 60 }],
    teamSize: 10,
    primaryUseCase: 'mixed'
  };
  const result = auditEngine.run(input);
  const chatgptRec = result.recommendations.find(r => r.tool === 'ChatGPT');
  
  assert(
    chatgptRec !== undefined,
    'ChatGPT Team Overkill rule is successfully triggered for <= 2 seats.'
  );
  assert(
    chatgptRec?.monthlySavings === 20,
    `ChatGPT Team downgrade savings computed is $20 (Expected: $20, Found: $${chatgptRec?.monthlySavings || 0}).`
  );
} catch (e) {
  failCount++;
  console.error('❌ [CRASH] Test 1: ChatGPT Downgrade Rule crashed with error:', e);
}

// ----------------------------------------------------
// 2. Cursor Business Downgrade Test
// ----------------------------------------------------
try {
  const input = {
    tools: [{ toolId: 'cursor', planId: 'business', seats: 5, monthlySpend: 200 }],
    teamSize: 5, // < 10 team size triggers Business-to-Pro downgrade
    primaryUseCase: 'coding'
  };
  const result = auditEngine.run(input);
  const cursorRec = result.recommendations.find(r => r.tool === 'Cursor');
  
  assert(
    cursorRec !== undefined,
    'Cursor Business Overkill rule is successfully triggered for < 10 team members.'
  );
  assert(
    cursorRec?.monthlySavings === 100,
    `Cursor Business downgrade savings computed is $100 (Expected: $100, Found: $${cursorRec?.monthlySavings || 0}).`
  );
} catch (e) {
  failCount++;
  console.error('❌ [CRASH] Test 2: Cursor Business Downgrade crashed with error:', e);
}

// ----------------------------------------------------
// 3. Duplicate ChatGPT + Claude Test
// ----------------------------------------------------
try {
  const input = {
    tools: [
      { toolId: 'chatgpt', planId: 'plus', seats: 5, monthlySpend: 100 },
      { toolId: 'claude', planId: 'pro', seats: 5, monthlySpend: 100 }
    ],
    teamSize: 5,
    primaryUseCase: 'mixed'
  };
  const result = auditEngine.run(input);
  const duplicateRec = result.recommendations.find(r => r.tool === 'ChatGPT & Claude');
  
  assert(
    duplicateRec !== undefined,
    'Duplicate Conversational Stack rule is successfully triggered.'
  );
  assert(
    duplicateRec?.monthlySavings === 100,
    `Conversational overlap savings consolidated is $100 (Expected: $100, Found: $${duplicateRec?.monthlySavings || 0}).`
  );
} catch (e) {
  failCount++;
  console.error('❌ [CRASH] Test 3: Duplicate ChatGPT + Claude crashed with error:', e);
}

// ----------------------------------------------------
// 4. Seat Over-Allocation Test
// ----------------------------------------------------
try {
  const input = {
    tools: [{ toolId: 'chatgpt', planId: 'plus', seats: 15, monthlySpend: 300 }],
    teamSize: 10, // 5 excess seats
    primaryUseCase: 'writing'
  };
  const result = auditEngine.run(input);
  const idleRec = result.recommendations.find(r => r.tool === 'ChatGPT' && r.title.includes('Prune'));
  
  assert(
    idleRec !== undefined,
    'Idle Seat over-allocation rule is successfully triggered.'
  );
  assert(
    idleRec?.monthlySavings === 100,
    `Overallocated seats pruned savings computed is $100 (Expected: $100, Found: $${idleRec?.monthlySavings || 0}).`
  );
} catch (e) {
  failCount++;
  console.error('❌ [CRASH] Test 4: Seat Over-Allocation crashed with error:', e);
}

// ----------------------------------------------------
// 5. API Overspend Test
// ----------------------------------------------------
try {
  const input = {
    tools: [{ toolId: 'anthropic_api', planId: 'api', seats: 1, monthlySpend: 1000 }],
    teamSize: 10,
    primaryUseCase: 'coding'
  };
  const result = auditEngine.run(input);
  const apiRec = result.recommendations.find(r => r.tool === 'Anthropic API Direct');
  
  assert(
    apiRec !== undefined,
    'Direct API High-Usage prompt-caching rule is successfully triggered.'
  );
  assert(
    apiRec?.monthlySavings === 300,
    `Direct API prompt caching savings consolidated is $300 (Expected: $300, Found: $${apiRec?.monthlySavings || 0}).`
  );
} catch (e) {
  failCount++;
  console.error('❌ [CRASH] Test 5: API Overspend crashed with error:', e);
}

console.log('\n==================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('==================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
