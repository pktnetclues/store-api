const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = logoutUser;
