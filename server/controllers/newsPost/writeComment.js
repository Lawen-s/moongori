const { comment, newsPost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;

  try {
    const payload = {
      newsPost_Id: req.body.newsPost_Id,
      comment: req.body.comment,
      user_Id: id,
    };
    await comment.create(payload);
    const updateComment = await comment.findAll({
      where: { newsPost_Id: req.body.newsPost_Id },
    });
    await newsPost.update(
      { comment_cnt: updateComment.length },
      { where: { id: req.body.newsPost_Id } }
    );
    return res.status(201).json({ data: updateComment, message: "create" });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};
