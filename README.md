# Project Name
Yan Flashcards
## Description
This project consists of two main parts: `yan-web` and `yan-api`.

- `yan-web`: A React-based frontend application.
- `yan-api`: A NestJS-based backend application.

## Prerequisites
- Node.js (version 16.x or higher)
- pnpm (version 8.x or higher)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yan-english/yan-monorepo.git
    cd yan-monorepo
    ```

2. Install dependencies for both `yan-web` and `yan-api`:
    ```sh
    cd packages/yan-web
    pnpm install
    cd ../yan-api
    pnpm install
    ```

## Running the Applications

### Running `yan-web`
```bash
pnpm run web:dev
```

### Running `yan-api`
```bash
$ pnpm run api:dev
```

