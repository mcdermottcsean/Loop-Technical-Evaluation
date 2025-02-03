import { test } from '@playwright/test';
import { DemoApp } from '../pages/demoapp';
import fs from 'fs';

test.describe.configure({ mode: 'serial' });

// Read the JSON file containing test cases
const testCases: Record<string, TestCase> = JSON.parse(fs.readFileSync('./tests/test_cases.json', 'utf8'));
for (const [key, testCase] of Object.entries(testCases)) {

  // Test that login works, tickets are in their expected column, and tickets include expected tags
  test(`${key} - Data Driven Test using JSON file`, async ({ page }) => {
    
    // Initialize demo app object
    const demoApp = new DemoApp(page);

    // Log into demo app
    await demoApp.login();
    
    // Navigate to the application based on the test case data
    await demoApp.navigateToPage(testCase.Application);
    
    // Confirm column and verify the ticket details based on the test case
    await demoApp.confirmColumn(testCase.Ticket, testCase.Column);

    // Verify that the expected tags are included
    await demoApp.verifyTags(testCase.Ticket, testCase.Tags);
  });
}

interface TestCase {
  Application: string;
  Ticket: string;
  Column: string;
  Tags: string[];
}