const express = require('express')
const {authMiddleware} = require('../middleware')
const router = express.Router();
const { Accounts } = require('../db')

router.get('/balance',authMiddleware, async (req, res) => {
console.log(req.user_id)
    const details = await Accounts.findOne({
        userId: req.user_id
    })

    res.json({
        balance: details.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Accounts.findOne({
    userId: req.user_id,
  });
    console.log(account.balance, amount);
  if (account.balance < Number(amount)) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Accounts.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Accounts.updateOne(
    {
      userId: req.user_id,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Accounts.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router

