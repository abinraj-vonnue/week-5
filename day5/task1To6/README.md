# Task Managet SPA

### This project is a single-page Task Management application built with TypeScript .

### It allows users to navigate between pages without reloading, manage task by adding , updating , deleting them.

### Data is persited in local storage.

### demo link : https://taskmanagerspa.netlify.app/

## Tech Stack

- Language : Typescript
- FrontEnd : HTML, CSS , TypeScript
- Testing : Jest
- Build tool : typescript compiler

## Typescript features used

- Type imports
- Generic
- Discriminated Unions
- Type aliases

## Folder Structure

```bash
root/
├── css
│   ├── base.css
│   ├── components.css
│   ├── main.css
│   └── pages.css
├── src
│   ├── components
│   │   ├── svg
│   │   │   ├── addSvg.ts
│   │   │   ├── binSvg.ts
│   │   │   ├── prioritySvg.ts
│   │   │   └── tickSvg.ts
│   │   ├── addButton.ts
│   │   ├── closeButton.ts
│   │   ├── completeButton.ts
│   │   ├── getTask.ts
│   │   ├── header.ts
│   │   ├── mainContent.ts
│   │   ├── modal.ts
│   │   ├── removeButton.ts
│   │   ├── stats.ts
│   │   └── tasks.ts
│   ├── listeners
│   │   ├── blur.ts
│   │   ├── click.ts
│   │   ├── key.ts
│   │   └── submit.ts
│   ├── routes
│   │   ├── home.ts
│   │   ├── login.ts
│   │   └── signUp.ts
│   ├── utilities
│   │   └── formValidator.ts
│   ├── navigate.ts
│   ├── register.ts
│   ├── router.ts
│   └── store.ts
├── tests
│   ├── components.test.ts
│   ├── formValidator.test.ts
│   ├── listeners.test.ts
│   ├── router.test.ts
│   ├── routes.test.ts
│   └── store.test.ts
├── .gitignore
├── index.html
├── jest.config.js
├── netlify.toml
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## How to run ?

### 1. clone the repo.

```bash
git clone git@github.com:abinraj-vonnue/week-5.git
cd day4/task1To7
```

### 2. Install packages

```bash
npm install
```

### 3. Compile the ts code

```bash
tsc
```

### 4. Run the index.html with liveServer

## How to test

```bash
npx jest
```

## Type Checking

```bash
tsc --noEmit
```
