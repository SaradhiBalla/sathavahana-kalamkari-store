# Sathavahana Kalamkari House

Production-oriented e-commerce foundation for heritage-inspired Kalamkari textiles and artwork.

## Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS 4, App Router
- **Backend:** Spring Boot 4, Java 21+, Spring MVC, Spring Data JPA, Flyway
- **Infrastructure:** PostgreSQL 18 and Redis through Docker Compose

## Run locally

Start infrastructure:

```bash
copy .env.example .env
# Replace the placeholder password and token secret in .env
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
For Compose, copy the root `.env.example` to `.env`; never commit the resulting `.env`.

## Container images

The backend and frontend each use a multi-stage Dockerfile. Build and run the complete
stack with:

```bash
docker compose build
docker compose up -d
docker compose ps
```

The runtime images run as non-root users and expose healthchecks. The backend health
endpoint is `http://localhost:8080/actuator/health`; Compose waits for PostgreSQL and
the backend before starting the frontend. Database and Redis ports are published for
local development; remove those port mappings or restrict them at the deployment edge
in production.

## Operations and release checklist

Before each release:

1. Set a unique, randomly generated `AUTH_TOKEN_SECRET` (at least 32 characters),
   database password, and `CORS_ALLOWED_ORIGINS`; set `AUTH_COOKIE_SECURE=true` behind
   HTTPS.
2. Review dependency and container scan results from CI. Do not ship images with
   high/critical vulnerabilities unless the exception is documented and approved.
3. Build images from the tagged commit, record the image digests, and run
   `docker compose config` with the production environment before deployment.
4. Confirm PostgreSQL backups and restore testing, migration ownership, TLS termination,
   log/metric collection, and alerting for failed healthchecks.
5. Deploy the backend first, verify `/actuator/health`, then roll out the frontend.
   Keep the previous image available for rollback.

Routine operations:

```bash
docker compose ps
docker compose logs --tail=200 backend
docker compose exec postgres pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"
docker compose down
```

For rollback, redeploy the previously recorded image tags/digests and do not run
destructive database changes manually. Flyway migrations are applied by the backend;
take a backup before deploying a release that contains migrations.

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
- Phase 3 commerce foundation with guest browser carts, persistent customer carts, stock-validated cart mutations, transactional checkout, COD/mock payment abstraction, coupon validation, payment records, shipments, return requests, wishlists, and verified-purchase reviews
- Checkout re-reads product pricing and inventory on the backend, uses idempotency keys, and clears the customer cart only after successful order/payment persistence
- Phase 4 growth foundation with in-app notifications, notification preferences, development email delivery logging, back-in-stock subscriptions, scheduled abandoned-cart detection, recently viewed products, rule-based recommendations, search/analytics events, admin analytics CSV export, and validated local media metadata storage

Production payment/shipping/email providers, refresh-token rotation/revocation, cloud image storage, media reordering/CDN optimization, and full date-range dashboard visualizations remain explicit extension points. Admin settings intentionally exclude infrastructure and secret configuration. Guest carts are browser-backed until login; customer cart merge and full shipment/return administration require further provider/business-rule integration.

### Authentication endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

Set `AUTH_TOKEN_SECRET` to a random value of at least 32 characters outside local development. The local seed account is `demo@kalamkari.house` with password `password`.
