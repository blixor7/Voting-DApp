const config = require('../config.json')

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
  // Fetch accounts from wallet - these are unlocked
  const accounts = await ethers.getSigners()

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork()
  console.log("Using chainId:", chainId)

  // Fetch deployed tokens
  const ReusableVotingContract = await ethers.getContractAt('ReusableVotingContract', config[chainId].ReusableVotingContract.address)
  console.log(`ReusableVotingContract fetched: ${ReusableVotingContract.address}\n`)

  // Fetch the deployed exchange
//   const exchange = await ethers.getContractAt('Exchange', config[chainId].exchange.address)
//   console.log(`Exchange fetched: ${exchange.address}\n`)

  //Vote event data
  //TODO: later refactor this

  // Give tokens to account[1]
  const owner = accounts[0]; //owner
  const user1 = accounts[1]; //user1
  const user2 = accounts[2]; //user2
  const user3 = accounts[3]; //user3
  const user4 = accounts[4]; //user4
  const user5 = accounts[5]; //user5

  // create few voting events as a owner
//   await ReusableVotingContract.connect(owner).startVotingEvent("Best Fruit", ["Apple", "Banana"]);
//   await ReusableVotingContract.connect(owner).startVotingEvent("Best Vegetable", ["Tomato", "Brinjal"]);
//   await ReusableVotingContract.connect(owner).startVotingEvent("Best Animated Show", ["Rick and Morty", "South Park", "Family Guy", "American Dad"]);

  //As a user1 vote
  await ReusableVotingContract.connect(user1).vote(0,0);//Best Fruit -> Apple
  await ReusableVotingContract.connect(user1).vote(1,0);//Best Vegetable -> Tomato
  await ReusableVotingContract.connect(user1).vote(2,1);//Best Animated Show -> South Park
  console.log(`user1 voted\n`);

  //As a user2 vote
  await ReusableVotingContract.connect(user2).vote(0,1);//Best Fruit -> Banana
  await ReusableVotingContract.connect(user2).vote(1,0);//Best Vegetable -> Tomato
  //Best Animated Show -> NOT VOTED
  console.log(`user2 voted\n`);

  //As a user3 vote
  // await ReusableVotingContract.connect(user3).vote(0,0);//Best Fruit -> Apple
  // await ReusableVotingContract.connect(user3).vote(1,1);//Best Vegetable -> Brinjal
  // await ReusableVotingContract.connect(user3).vote(2,1);//Best Animated Show -> South Park
  // console.log(`user3 voted\n`);

  // //As a user4 vote
  // await ReusableVotingContract.connect(user4).vote(0,1);//Best Fruit -> Banana
  // await ReusableVotingContract.connect(user4).vote(1,0);//Best Vegetable -> Tomato
  // await ReusableVotingContract.connect(user4).vote(2,1);//Best Animated Show -> South Park
  // console.log(`user4 voted\n`);

  // //As a user5 vote
  // await ReusableVotingContract.connect(user5).vote(0,0);//Best Fruit -> Apple
  // //Best Vegetable -> NOT VOTED
  // await ReusableVotingContract.connect(user5).vote(2,3);//Best Animated Show -> American Dad
  // console.log(`user5 voted\n`);












//   // user1 transfers 10,000 mETH...
//   let transaction, result
//   transaction = await mETH.connect(sender).transfer(receiver.address, amount)
//   console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)

//   // Set up exchange users
//   const user11 = accounts[0]
//   const user22 = accounts[1]
//   amount = tokens(10000)

//   // user1 approves 10,000 Dapp...
//   transaction = await DApp.connect(user1).approve(exchange.address, amount)
//   await transaction.wait()
//   console.log(`Approved ${amount} tokens from ${user1.address}`)

//   // user1 deposits 10,000 DApp...
//   transaction = await exchange.connect(user1).depositToken(DApp.address, amount)
//   await transaction.wait()
//   console.log(`Deposited ${amount} Ether from ${user1.address}\n`)

//   // User 2 Approves mETH
//   transaction = await mETH.connect(user2).approve(exchange.address, amount)
//   await transaction.wait()
//   console.log(`Approved ${amount} tokens from ${user2.address}`)

//   // User 2 Deposits mETH
//   transaction = await exchange.connect(user2).depositToken(mETH.address, amount)
//   await transaction.wait()
//   console.log(`Deposited ${amount} tokens from ${user2.address}\n`)

//   /////////////////////////////////////////////////////////////
//   // Seed a Cancelled Order
//   //

//   // User 1 makes order to get tokens
//   let orderId
//   transaction = await exchange.connect(user1).makeOrder(mETH.address, tokens(100), DApp.address, tokens(5))
//   result = await transaction.wait()
//   console.log(`Made order from ${user1.address}`)

//   // User 1 cancels order
//   orderId = result.events[0].args.id
//   transaction = await exchange.connect(user1).cancelOrder(orderId)
//   result = await transaction.wait()
//   console.log(`Cancelled order from ${user1.address}\n`)

//   // Wait 1 second
//   await wait(1)

//   /////////////////////////////////////////////////////////////
//   // Seed Filled Orders
//   //

//   // User 1 makes order
//   transaction = await exchange.connect(user1).makeOrder(mETH.address, tokens(100), DApp.address, tokens(10))
//   result = await transaction.wait()
//   console.log(`Made order from ${user1.address}`)

//   // User 2 fills order
//   orderId = result.events[0].args.id
//   transaction = await exchange.connect(user2).fillOrder(orderId)
//   result = await transaction.wait()
//   console.log(`Filled order from ${user1.address}\n`)

//   // Wait 1 second
//   await wait(1)

//   // User 1 makes another order
//   transaction = await exchange.makeOrder(mETH.address, tokens(50), DApp.address, tokens(15))
//   result = await transaction.wait()
//   console.log(`Made order from ${user1.address}`)

//   // User 2 fills another order
//   orderId = result.events[0].args.id
//   transaction = await exchange.connect(user2).fillOrder(orderId)
//   result = await transaction.wait()
//   console.log(`Filled order from ${user1.address}\n`)

//   // Wait 1 second
//   await wait(1)

//   // User 1 makes final order
//   transaction = await exchange.connect(user1).makeOrder(mETH.address, tokens(200), DApp.address, tokens(20))
//   result = await transaction.wait()
//   console.log(`Made order from ${user1.address}`)

//   // User 2 fills final order
//   orderId = result.events[0].args.id
//   transaction = await exchange.connect(user2).fillOrder(orderId)
//   result = await transaction.wait()
//   console.log(`Filled order from ${user1.address}\n`)

//   // Wait 1 second
//   await wait(1)

//   /////////////////////////////////////////////////////////////
//   // Seed Open Orders
//   //

//   // User 1 makes 10 orders
//   for(let i = 1; i <= 10; i++) {
//     transaction = await exchange.connect(user1).makeOrder(mETH.address, tokens(10 * i), DApp.address, tokens(10))
//     result = await transaction.wait()

//     console.log(`Made order from ${user1.address}`)

//     // Wait 1 second
//     await wait(1)
//   }

//   // User 2 makes 10 orders
//   for (let i = 1; i <= 10; i++) {
//     transaction = await exchange.connect(user2).makeOrder(DApp.address, tokens(10), mETH.address, tokens(10 * i))
//     result = await transaction.wait()

//     console.log(`Made order from ${user2.address}`)

//     // Wait 1 second
//     await wait(1)
//   }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
