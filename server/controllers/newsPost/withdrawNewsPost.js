const { newsPost, comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;

  const postOne = await newsPost.findOne({
    where: { id: postId },
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    await newsPost.destroy({
      where: { id: postId },
    });
    return res.status(200).json({ message: "success withdrawal" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
