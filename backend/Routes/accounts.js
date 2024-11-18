const express = require('express')
const {authMiddleware} = require('../middleware')
const router = express.Router();
const { Accounts, Users } = require('../db')

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
  console.log(req.body)
  
  const account = await Accounts.findOne({
    userId: req.user_id,
  });
  
    
  if (account.balance < Number(amount)) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount1 = await Users.findOne({
    username: to,
  });
  const toAccount = await Accounts.findOne({
    userId:toAccount1._id
  })
  console.log("to" +toAccount1)
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
console.log('what?')
  await Accounts.updateOne(
    {
      userId: req.user_id,
    },
    {
      $inc: {
        balance: -Number(amount),
      },
    }
  );

  await Accounts.updateOne(
    {
    userId: toAccount.userId,
    },
    {
      $inc: {
        balance: Number(amount),
      },
    }
  );

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router

