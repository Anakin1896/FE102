# app_backend — ASP.NET Core Setup Guide

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [PostgreSQL](https://www.postgresql.org/download/) (v14 or later recommended)
- [EF Core CLI tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

Install the EF Core CLI tools if not already installed:

```bash
dotnet tool install --global dotnet-ef
```

---

## 1. Database Setup

Make sure PostgreSQL is running locally with the following defaults (or adjust `appsettings.json` to match your setup):

| Setting  | Default value  |
|----------|----------------|
| Host     | `localhost`    |
| Port     | `5432`         |
| Database | `libTrackDb`   |
| Username | `postgres`     |
| Password | `postgres`     |

The connection string is in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=libTrackDb;Username=postgres;Password=postgres"
}
```

Update this if your PostgreSQL credentials differ.

---

## 2. Apply Migrations

From the `app_backend/` directory, run:

```bash
dotnet ef database update
```

This creates the `libTrackDb` database and applies all pending migrations.

---

## 3. Run the Backend

```bash
dotnet run
```

Or to use the HTTPS profile:

```bash
dotnet run --launch-profile https
```

The API will be available at:

- HTTP: `http://localhost:5232`
- HTTPS: `https://localhost:7186`

---

## 4. Swagger UI

When running in Development mode, Swagger UI is available at:

- `http://localhost:5232/swagger`

---

## API Endpoints

| Method | Route               | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/book`         | Get all books        |
| GET    | `/api/book/{id}`    | Get a book by ID     |
| POST   | `/api/book`         | Create a new book    |

### Book Model

```json
{
  "id": "guid (auto-generated)",
  "isbn": "string (max 20)",
  "title": "string (max 200)",
  "author": "string (max 150)",
  "quantity": "integer (>= 0)",
  "category": "string (max 100)",
  "qrPath": "string — path to generated QR code image"
}
```

A QR code image is automatically generated and saved to `wwwroot/qrcodes/` when a book is created.

---

## CORS

The backend allows requests from the following origins (configured in `Program.cs`):

- `http://localhost:5173` — Vite dev server (React frontend)
- `https://localhost:5173`
- `http://localhost:5232`
- `https://localhost:7186`

---

## Project Structure

```
app_backend/
├── Controller/         # API controllers
├── Data/               # EF Core DbContext
├── Migrations/         # EF Core migrations
├── Models/             # Entity models
├── Services/           # Business logic (QR code generation)
├── wwwroot/qrcodes/    # Generated QR code images
├── appsettings.json    # App configuration
└── Program.cs          # App entry point
```
