const Product = require('../models/productModel');
const { getPostData } = require('../utils');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ products: products }));
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// // Static data creation
// async function createProduct(req, res) {
//   try {
//     const product = {
//       name: 'Test Product',
//       desc: 'Lorem ipsum test desc Lorem ipsum test desc Lorem ipsum test desc Lorem ipsum test desc',
//     };

//     const newProduct = await Product.create(product);
//     res.writeHead(201, { 'Content-Type': 'application/json' });
//     return res.end(JSON.stringify(newProduct));
//   } catch (error) {
//     console.log(error);
//   }
// }
// --------------------------------------------------------

// Dynamic data creation
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, desc } = JSON.parse(body);

    const product = {
      name,
      desc,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      const body = await getPostData(req);

      const { name, desc } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        desc: desc || product.desc,
      };

      const updatedProduct = await Product.update(id, productData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Product ${id} has been removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
