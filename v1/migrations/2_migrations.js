const ERC20 = artifacts.require("ERC20")
const DEX = artifacts.require("DEX")

const toWei = (number) => {
  return web3.utils.toWei(web3.utils.toBN(number), "ether")
}

module.exports  = async function (deployer) {
  await deployer.deploy(ERC20, "Dai", "DAI", toWei(10**10))
  const dai = await ERC20.deployed()
  await deployer.deploy(ERC20, "ChainLink", "LINK", toWei(10**6))
  const link = await ERC20.deployed()
  await deployer.deploy(ERC20, "Compound", "COMP", toWei(10**4))
  const comp = await ERC20.deployed()

  await deployer.deploy(DEX, [dai.address, link.address, comp.address])
  const dex = await DEX.deployed()

  await dai.transfer(dex.address, toWei(10**10))
  await link.transfer(dex.address, toWei(10**6))
  await comp.transfer(dex.address, toWei(10**4))
}