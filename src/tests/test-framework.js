/**
 * Lightweight Zero-Dependency Testing Framework
 * Works seamlessly in both Node.js (CLI) and Modern Web Browsers.
 */

export class TestRunner {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
    this.stats = { total: 0, passed: 0, failed: 0, durationMs: 0 };
  }

  describe(name, fn) {
    const suite = { name, tests: [], passed: 0, failed: 0 };
    this.suites.push(suite);
    this.currentSuite = suite;
    fn();
    this.currentSuite = null;
  }

  it(description, fn) {
    if (!this.currentSuite) {
      throw new Error("Cannot define 'it' outside of 'describe' block.");
    }
    this.currentSuite.tests.push({ description, fn, passed: false, error: null, duration: 0 });
  }

  async run() {
    const startTime = Date.now();
    this.stats = { total: 0, passed: 0, failed: 0, durationMs: 0 };

    for (const suite of this.suites) {
      for (const test of suite.tests) {
        this.stats.total++;
        const testStart = Date.now();
        try {
          await test.fn();
          test.passed = true;
          suite.passed++;
          this.stats.passed++;
        } catch (err) {
          test.passed = false;
          test.error = err;
          suite.failed++;
          this.stats.failed++;
        }
        test.duration = Date.now() - testStart;
      }
    }

    this.stats.durationMs = Date.now() - startTime;
    return this.getReport();
  }

  getReport() {
    return {
      stats: this.stats,
      suites: this.suites
    };
  }

  printConsoleReport() {
    console.log(`\n======================================================`);
    console.log(`🚀 RUNNING DATA STRUCTURES & ALGORITHMS TEST SUITE`);
    console.log(`======================================================\n`);

    for (const suite of this.suites) {
      const suiteIcon = suite.failed === 0 ? '✅' : '❌';
      console.log(`${suiteIcon} ${suite.name} (${suite.passed}/${suite.tests.length} passed)`);

      for (const test of suite.tests) {
        if (test.passed) {
          console.log(`   ✓ ${test.description} (${test.duration}ms)`);
        } else {
          console.log(`   ✗ ${test.description} (${test.duration}ms)`);
          console.log(`     Error: ${test.error ? test.error.message : 'Unknown error'}`);
          if (test.error && test.error.stack) {
            const stackLines = test.error.stack.split('\n').slice(1, 3).join('\n');
            console.log(`     ${stackLines}`);
          }
        }
      }
      console.log('');
    }

    console.log(`======================================================`);
    console.log(`📊 TOTAL: ${this.stats.total} | PASSED: ${this.stats.passed} | FAILED: ${this.stats.failed} | TIME: ${this.stats.durationMs}ms`);
    console.log(`======================================================\n`);
  }
}

export const runner = new TestRunner();
export const describe = runner.describe.bind(runner);
export const it = runner.it.bind(runner);

export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      }
    },
    toEqual(expected) {
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(expected);
      if (actualStr !== expectedStr) {
        throw new Error(`Expected ${actualStr} to equal ${expectedStr}`);
      }
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    },
    toBeLessThan(expected) {
      if (!(actual < expected)) {
        throw new Error(`Expected ${actual} to be less than ${expected}`);
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be null`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be truthy`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be falsy`);
      }
    },
    toThrow() {
      let threw = false;
      try {
        actual();
      } catch (e) {
        threw = true;
      }
      if (!threw) {
        throw new Error(`Expected function to throw an error, but it did not.`);
      }
    }
  };
}
