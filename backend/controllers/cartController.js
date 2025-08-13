const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCart = async (req, res, next) => {
  try {
    const items = await CartItem.find({ userId: req.user.id }).populate('productId');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart items.' });
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Product and valid quantity required.' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    let item = await CartItem.findOne({ userId: req.user.id, productId });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ userId: req.user.id, productId, quantity });
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart.' });
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity required.' });
    }
    const item = await CartItem.findOneAndUpdate(
      { userId: req.user.id, productId: req.params.productId },
      { quantity },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Cart item not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart item.' });
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.findOneAndDelete({ userId: req.user.id, productId: req.params.productId });
    if (!item) return res.status(404).json({ message: 'Cart item not found.' });
    res.json({ message: 'Item removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove cart item.' });
  }
};