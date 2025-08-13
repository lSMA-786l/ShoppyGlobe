# ShoppyGlobe Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Products
- `GET /api/products` : Fetch all products
- `GET /api/products/:id` : Fetch product by ID

### Cart
- `POST /api/cart` : Add product to cart (requires JWT)
- `PUT /api/cart/:productId` : Update cart item quantity (requires JWT)
- `DELETE /api/cart/:productId` : Remove product from cart (requires JWT)

### User Authentication
- `POST /api/register` : Register a new user
- `POST /api/login` : Login and receive JWT token

## Authentication
- Cart routes require JWT authentication. Include the token in the `Authorization` header as `Bearer <token>`.

## MongoDB Setup
- Ensure MongoDB is running locally or provide a connection string in environment variables.
- Collections: `products`, `cartitems`, `users`

## Testing
- Use ThunderClient or Postman to test endpoints.
- Example ThunderClient collection is in `tests/thunder-collection.json`.

## Screenshots
- Include screenshots of MongoDB collections and ThunderClient tests in your submission.

## Comments
- Code is commented for clarity. See controllers, models, and middleware for details.