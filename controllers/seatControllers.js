const { Theaters, Screens, Seats } = require("../models");

exports.createSeat = async (req, res) => {
  try {
    const { screen_id } = req.params;
    let { silver, gold, platinum, platinum_price,gold_price, silver_price } = req.body;
    
    platinum = parseInt(platinum);
    silver = parseInt(silver);
    gold = parseInt(gold);

    platinum_price = parseFloat(platinum_price);
    silver_price = parseFloat(silver_price);
    gold_price = parseInt(gold_price);

    if (req.user.role == "user") {
      return res.status(401).send("you are not permitted");
    }
    const screen_of_theater = await Screens.findOne({
      where: { screen_id: screen_id },
      include: [
        {
          model: Theaters,
          as: "theater",
          attributes: ["owner_id"],
          where: {
            owner_id: req.user.user_id,
          },
        },
      ],
    });

    if (screen_of_theater) {
      let data = [];
      let seat_type = "silver";
      let amount = silver_price;

      if (screen_of_theater.total_seats < silver + gold + platinum) {
        res.status(202).send("we dont'have enough seats");
      }
      else {
        for (let i = 1; i <= screen_of_theater.total_seats; i++) {
          if (i > silver) {
            seat_type = "gold";
            amount = gold_price;
          }
          if (i > gold + silver) {
            seat_type = "platinum";
            amount = platinum_price;
            console.log(amount);
          }
          data.push({
            seat_number: i,
            screen_id: screen_id,
            seat_type: seat_type,
            price: amount,
          });
        }
        const seats = await Seats.bulkCreate(data);
        res.status(200).send({ message: "Seat created successfully!", seats });
      }
    }
    else {
      res.status(404).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const { seat_id } = req.params;
    const seat = await Seats.findOne({
      where: { seat_id, isDeleted: 0 },
      raw: true,
    });

    if (!seat) {
      return res.status(404).send("Resource not found");
    }

    const screen_of_theater = await Screens.findOne({
      where: { screen_id: seat.screen_id, isDeleted: 0 },
      include: [
        {
          model: Theaters,
          as: "theater",
          attributes: ["owner_id"],
          where: {
            owner_id: req.user.user_id,
          },
        },
      ],
    });
    if (!screen_of_theater)
      return res.status(409).json({ message: "not authorized" });

    await Seats.update({ isDeleted: 1 }, { where: { seat_id } });
    res.status(200).json({ message: "deleted succesfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
