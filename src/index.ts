import * as dotenv from "dotenv";
import { config } from "./config";
import { ethers } from "ethers";
import MyToken from "../abis/MyToken.json";
import { MyToken__factory } from "./contracts";

dotenv.config();

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_HOST);

  const wallet = ethers.Wallet.fromMnemonic(config.mnemonic).connect(provider);

  const myToken = MyToken__factory.connect(MyToken.address, wallet);

  const myBalance = await myToken.balanceOf(wallet.address);

  console.log(`My balance of MyToken: ${myBalance}`);

  const transaction = await myToken.transfer(
    ethers.Wallet.createRandom().address,
    ethers.utils.parseEther("10")
  );

  const waitTransactionConfirmations = 1;
  const receipt = await transaction.wait(waitTransactionConfirmations);

  console.log("Transaction Receipt", receipt);
})();
