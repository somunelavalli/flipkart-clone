const Category = require("../models/category");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  await cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (Category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getAllCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      const categoriesList = createCategories(categories);
      return res.status(200).json({ categoriesList });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };

      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    res.status(201).json({ updatedCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deletedCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deletedCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(200).json({ message: "Categories Deleted Seccessfully" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
