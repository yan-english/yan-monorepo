# Project Name
Yan Flashcards
## Description
This project consists of two main parts: `yan-web` and `yan-api`.

- `yan-web`: A React-based frontend application.
- `yan-api`: A NestJS-based backend application.

## Prerequisites
- Node.js (version 16.x or higher)
- pnpm (version 8.x or higher)
- Docker
## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yan-english/yan-monorepo.git
    cd yan-monorepo
    ```

2. Install dependencies for both `yan-web` and `yan-api`:
    ```sh
    pnpm install
    ```

## Running the Applications

### Running `yan-web`
```bash
pnpm run web:dev
```

### Running `yan-api`
1. Cd to yan-api folder and create a `.env` file in the `yan-api` directory with the content based on the `.env.example` file.


2. Run docker compose file to start the depens servives such as the dabase and the caching:
```bash
 docker compose up -d
```

3. Seed data to the database:
```bash
pnpm run init-data:seed
```
4. Start the API server:

```bash
 pnpm run start:dev
```

5. See the API documentation at `http://localhost:3000/docs`.

