const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");
const Category = require("../models/category");

exports.addProduct = async (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body });

  const { name, price, description, category, createdBy, quantity } = req.body;
  //   let productPictures = [];
  //   if (req.files.lenght > 0) {
  //     productPictures = req.files.map((file) => {
  //       return { img: file.filename };
  //     });
  //   }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures: req.files.map((file) => {
      return { img: file.filename };
    }),
    category,
    createdBy: req.user.id,
  });

  await product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};

exports.getProductsBySlug = async (req, res) => {
  const { slug } = req.params;
  await Category.findOne({ slug: slug })
    .select("_id type")
    .exec(async (error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        await Product.find({ category: category._id }).exec(
          (error, products) => {
            if (error) {
              return res.status(400).json({ error });
            }
            console.log(category.type);
            if (category.type) {
              if (products.length > 0) {
                res.status(200).json({
                  products,
                  priceRange: {
                    under5k: 5000,
                    under10k: 10000,
                    under20k: 20000,
                    under100k: 100000,
                  },
                  productsByPrice: {
                    under5k: products.filter(
                      (product) => product.price <= 5000
                    ),
                    under10k: products.filter(
                      (product) =>
                        product.price > 5000 && product.price <= 10000
                    ),
                    under20k: products.filter(
                      (product) =>
                        product.price > 10000 && product.price <= 20000
                    ),
                    under100k: products.filter(
                      (product) => product.price > 20000
                    ),
                  },
                });
              }
            }
          }
        );
      }
      // res.status(200).json({ category });
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
