# Ecommerce Backend

Backend desarrollado en Node.js con Express.

## Endpoints — Categorías

- GET /rest/v1/categorias
- GET /rest/v1/categorias/:id
- POST /rest/v1/categorias
- PUT /rest/v1/categorias/:id
- DELETE /rest/v1/categorias/:id

## Endpoints — Productos

- GET /rest/v1/productos
- GET /rest/v1/productos/:id
- POST /rest/v1/productos
- PUT /rest/v1/productos/:id
- DELETE /rest/v1/productos/:id

## Ejemplo POST Producto

```json
{
  "nombre": "Camisa",
  "descripcion": "Camisa azul",
  "precio": 45000,
  "stock": 10,
  "imagen_url": "https://img.com/camisa.png",
  "categoria_id": 1
}
