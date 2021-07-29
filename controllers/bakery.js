exports.getCakes = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        name: 'First Cake',
        comment: 'This is the first cake',
        imageUrl: 'images/cake.jpg',
        yumFactor: "5"
      }
    ]
  });
};

exports.createCake = (req, res, next) => {
  const name = req.body.name;
  const comment = req.body.comment;
  res.status(201).json({
    message: 'Cake created successfully',
    post: { id: new Date().toISOString(), name: name, comment: comment }
  });
};
