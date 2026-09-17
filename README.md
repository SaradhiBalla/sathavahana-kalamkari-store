# Sathavahana Kalamkari House

Production-oriented e-commerce foundation for heritage-inspired Kalamkari textiles and artwork.

## Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS 4, App Router
- **Backend:** Spring Boot 4, Java 21+, Spring MVC, Spring Data JPA, Flyway
- **Infrastructure:** PostgreSQL 18 and Redis through Docker Compose

## Run locally

Start infrastructure:

```bash
docker compose up -d
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend is available at `http://localhost:3000`.

Run the API with Maven installed:

```bash
cd backend
mvn spring-boot:run
```

The API is available at `http://localhost:8080`, with catalog endpoints under `/api/v1`.

## Configuration

Copy `frontend/.env.example` to `frontend/.env.local` when using a non-default API URL. Database credentials are configured through `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD`.

## Current capabilities

- Responsive branded storefront
- SEO metadata and static product generation
- Full 16-product typed catalog
- Product detail routes
- Local cart experience and checkout form foundation
- Product, category, cart, and order API vertical slice
- PostgreSQL migrations and Redis local infrastructure
- DTO-based backend responses and structured API errors
- Registration and login endpoints with BCrypt password hashing
- Short-lived signed access tokens issued through an HttpOnly cookie (Bearer tokens remain supported for API clients)
- Logout endpoint and credential-aware CORS for the browser client
- Phase 2 admin workspace with permission-aware dashboard, product/category operations, inventory adjustments, customer and order operations, audit logs, reports, and safe store settings
- Flyway migrations for inventory transactions, order status history, audit logs, category archival, and admin settings
- Server-side pagination/search for admin product and customer lists, with transactional non-negative inventory adjustments and validated order transitions

Payment-provider integration, refresh-token rotation/revocation, email verification, cloud image storage, product image upload/reordering, and date-bucketed analytics remain explicit extension points. Admin settings intentionally exclude infrastructure and secret configuration.

### Authentication endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

Set `AUTH_TOKEN_SECRET` to a random value of at least 32 characters outside local development. The local seed account is `demo@kalamkari.house` with password `password`.
