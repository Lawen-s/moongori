const { newsPost, user, comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;

  let postInfo = await newsPost.findOne({
    where: { id: postId },
    include: [
      { model: user, attributes: ["nickname", "address", "img"] },
      {
        model: comment,
        attributes: ["comments", "createdAt"],
        include: { model: user, attributes: ["nickname", "address", "img"] },
      },
    ],
  });
  //글을 쓴 작성자가 자신의 글을 클릭하는 경우 조회수 증가 X
  if (id) {
    if (postInfo.user_Id !== id) {
      await newsPost.update(
        { view: postInfo.view + 1 },
        {
          where: { id: postId },
        }
      );
      postInfo = await newsPost.findOne({
        where: { id: postId },
        include: [
          { model: user, attributes: ["nickname", "address", "img"] },
          {
            model: comment,
            attributes: ["comments", "createdAt"],
            include: {
              model: user,
              attributes: ["nickname", "address", "img"],
            },
          },
        ],
      });
      return res.status(200).json({ data: postInfo });
    } else {
      return res.status(200).json({ data: postInfo });
    }
  }
  await newsPost.update(
    { view: postInfo.view + 1 },
    {
      where: { id: postId },
    }
  );
  postInfo = await newsPost.findOne({
    where: { id: postId },
    include: [
      { model: user, attributes: ["nickname", "address", "img"] },
      {
        model: comment,
        attributes: ["comments", "createdAt"],
        include: { model: user, attributes: ["nickname", "address", "img"] },
      },
    ],
  });
  return res.status(200).json({ data: postInfo });
};
