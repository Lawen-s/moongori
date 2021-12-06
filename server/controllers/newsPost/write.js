const { newsPost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  const { category, content, location, img } = req.body;
  const payload = {
    category,
    content,
    location,
    img,
    user_Id: id,
  };
  try {
    const createPost = await newsPost.create(payload);
    const updatePost = await newsPost.findOne({
      where: { id: createPost.id },
    });
    return res.status(201).json({ data: updatePost, message: "create" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
