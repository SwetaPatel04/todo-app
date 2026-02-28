// Import test and expect from Playwright
// test = defines a test case
// expect = checks if something is true
const { test, expect } = require('@playwright/test');

// This is the URL of our live app on Azure
// We will test the live version of our app
const APP_URL = 'https://orange-field-04b13e90f.2.azurestaticapps.net';
// ⚠️ Replace with your actual Azure URL!

// ─────────────────────────────────────
// TEST 1 — Check page loads correctly
// ─────────────────────────────────────
test('page loads with correct title', async ({ page }) => {
  // page = a browser window controlled by Playwright
  
  // Open our app in the browser
  await page.goto(APP_URL);
  
  // Check the page title is correct
  // toContainText checks if the text exists on page
  await expect(page.locator('h1')).toContainText('My Todo App');
  
  console.log('✅ Test 1 Passed — Page loaded correctly!');
});

// ─────────────────────────────────────
// TEST 2 — Check input box exists
// ─────────────────────────────────────
test('input box is visible', async ({ page }) => {
  
  // Open our app
  await page.goto(APP_URL);
  
  // Check input box is visible on page
  // locator finds an element on the page
  await expect(page.locator('#taskInput')).toBeVisible();
  
  console.log('✅ Test 2 Passed — Input box is visible!');
});

// ─────────────────────────────────────
// TEST 3 — Check adding a task works
// ─────────────────────────────────────
test('can add a task', async ({ page }) => {
  
  // Open our app
  await page.goto(APP_URL);
  
  // Find the input box and type a task
  // fill() types text into an input box
  await page.locator('#taskInput').fill('Learn Playwright');
  
  // Click the Add Task button
  await page.locator('button').first().click();
  
  // Check the task appears in the list
  // taskList is our ul element
  await expect(page.locator('#taskList')).toContainText('Learn Playwright');
  
  console.log('✅ Test 3 Passed — Task added successfully!');
});

// ─────────────────────────────────────
// TEST 4 — Check deleting a task works
// ─────────────────────────────────────
test('can delete a task', async ({ page }) => {
  
  // Open our app
  await page.goto(APP_URL);
  
  // Add a task first
  await page.locator('#taskInput').fill('Task to delete');
  await page.locator('button').first().click();
  
  // Click the delete button
  // last() gets the last button which is our delete button
  await page.locator('.delete-btn').first().click();
  
  // Check the task is removed from list
  await expect(page.locator('#taskList'))
        .not.toContainText('Task to delete');
  
  console.log('✅ Test 4 Passed — Task deleted successfully!');
});

// ─────────────────────────────────────
// TEST 5 — Check task counter works
// ─────────────────────────────────────
test('task counter updates correctly', async ({ page }) => {
  
  // Open our app
  await page.goto(APP_URL);
  
  // Check counter starts at 0
  await expect(page.locator('#counter'))
        .toContainText('Total Tasks: 0');
  
  // Add a task
  await page.locator('#taskInput').fill('Counter test task');
  await page.locator('button').first().click();
  
  // Check counter updated to 1
  await expect(page.locator('#counter'))
        .toContainText('Total Tasks: 1');
  
  console.log('✅ Test 5 Passed — Counter works correctly!');
});