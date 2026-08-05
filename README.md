# Effortless AI - Playwright Automation Framework

## Project Overview

This project contains an end-to-end automation framework developed using **Playwright** and **TypeScript** for automating the Signup workflow of the Effortless AI application.

Framework follows the **Page Object Model (POM)** design pattern for better maintainability, reusability, and scalability.

---

## Technology Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

## Project Structure

```
EffortlessAI-Playwright
│
├── config
├── constants
├── fixtures
├── pages
├── tests
├── utils
├── reports
├── screenshots
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Application Under Test

https://goeffortless.ai

---

## Automated Test Scenarios

### Test Case 1

**Verify user can navigate to Signup page**

Steps

- Launch Application
- Click Login
- Switch to Login Window
- Click Sign Up
- Verify Signup page is displayed

---

### Test Case 2

**Verify user can complete Signup successfully**

Steps

- Confirm Email
- Enter Personal Details
- Enter Business Details
- Create Password
- Verify successful account creation

---

### Test Case 3

**Verify mandatory field validation during Signup**

Steps

- Leave mandatory fields empty
- Click Continue
- Verify validation messages are displayed

---

## Framework Features

- Page Object Model
- Reusable Components
- Environment Configuration
- Dynamic Test Data
- HTML Report
- Screenshot on Failure
- Trace on Failure
- Cross Browser Support

---

## Installation

```bash
npm install
```

---

## Execute All Tests

```bash
npx playwright test
```

---

## Execute Specific Test

```bash
npx playwright test tests/auth/signup.spec.ts
npx playwright test --ui 
```

---

## Generate HTML Report

```bash
npx playwright show-report
```

---

## Author

**Balamurugan P**
QA Automation Engineer
