const { user } = require("../../models");
const { verify, sign } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const { nickname, address } = req.body;
  //const imgs = req.files
  //const imgs = req.files.map((el) => el.location).join(",");

  try {
    if (nickname) {
      await user.update({ nickname: nickname }, { where: { id: id } });
    }
    if (address) {
      await user.update({ address: address }, { where: { id: id } });
    }

    // if (imgs.length > 0 || imgs !== undefined) {
    //   imgs = imgs[0].location;
    //   await user.update({ img: imgs }, { where: { id: verified.id } });
    // }
    const userInfo = await user.findOne({
      where: id,
      attributes: [
        "id",
        "nickname",
        "email",
        "address",
        "img",
        "authState",
        "reliability",
      ],
    });
    console.log(userInfo);
    const token = sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });
    //console.log("userInfo-img;;;;", userInfo.dataValues.img.split(","));

    return res
      .status(200)
      .cookie("accesstoken", token, {
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .json({ data: userInfo, message: "successful modify info" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
