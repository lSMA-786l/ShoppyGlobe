// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;

  // Clear (optional)
  await db.collection('products').deleteMany({});
  await db.collection('users').deleteMany({});
  await db.collection('cartitems').deleteMany({});

  // Products
  const products = [
    { name: 'Essence Mascara Lash Princess', description: 'Volumizing mascara known for long-lasting results.', price: 9.99, stockQuantity: 120, thumbnail: 'https://picsum.photos/seed/mascara/800/600' },
    { name: 'Eyeshadow Palette with Mirror', description: 'Versatile range of shades with built-in mirror.', price: 19.99, stockQuantity: 45, thumbnail: 'https://picsum.photos/seed/palette/800/600' },
    { name: 'Powder Canister', description: 'Lightweight translucent setting powder.', price: 14.99, stockQuantity: 80, thumbnail: 'https://picsum.photos/seed/powder/800/600' },
    { name: 'Classic Tee', description: 'Comfortable cotton tee for everyday wear.', price: 19.99, stockQuantity: 200, thumbnail: 'https://picsum.photos/seed/tee/800/600' }
  ];
  const prodResult = await db.collection('products').insertMany(products);

  // Users (passwords hashed)
  const usersPlain = [
    { name: 'Alice', email: 'alice@example.com', password: 'Password123' },
    { name: 'Bob',   email: 'bob@example.com',   password: 'Password123' }
  ];
  const users = await Promise.all(usersPlain.map(async u => ({
    name: u.name,
    email: u.email,
    password: await bcrypt.hash(u.password, 10)
  })));
  const userResult = await db.collection('users').insertMany(users);

  // Cart items (Alice)
  const aliceId = userResult.insertedIds['0'];
  const p1 = prodResult.insertedIds['0'];
  const p2 = prodResult.insertedIds['1'];
  await db.collection('cartitems').insertMany([
    { userId: aliceId, productId: p1, quantity: 2 },
    { userId: aliceId, productId: p2, quantity: 1 }
  ]);

  console.log(`Inserted ${products.length} products`);
  console.log(products);

  console.log('Seeding finished');
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
