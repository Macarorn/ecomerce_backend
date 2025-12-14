# Tienda Backend (Express) — Sofia Bonilla

Servidor Express mínimo para endpoints de Categorías y Productos (CRUD).

Requisitos:
- Node.js >= 16
- npm

Instalación:
```bash
cd tienda-backend
npm install
```

Variables de entorno:
- Copiar `.env.example` a `.env` y completar si usarás Supabase.

Scripts:
- `npm run dev` — iniciar con nodemon
- `npm start` — iniciar con node

Endpoints principales:
- `GET /rest/v1/categorias`
- `GET /rest/v1/categorias/:id`
- `POST /rest/v1/categorias` (body: `{ nombre, descripcion? }`)
- `PUT /rest/v1/categorias/:id`
- `DELETE /rest/v1/categorias/:id`

- `GET /rest/v1/productos`
- `GET /rest/v1/productos/:id`
- `POST /rest/v1/productos` (body: `{ nombre, descripcion?, precio, categoriaId? }`)
- `PUT /rest/v1/productos/:id`
- `DELETE /rest/v1/productos/:id`

Documentación de ejemplos en `docs/endpoints.md`.
