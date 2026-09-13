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

Authentication, payment-provider integration, cloud image storage, and admin workflows remain explicit extension points rather than being represented as completed production integrations.
