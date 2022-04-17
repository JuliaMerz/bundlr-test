import Bundlr, { WebBundlr } from '@bundlr-network/client';
import fs from 'fs';
import path from 'path';

const BUNDLR_NODE_URL = "http://node1.bundlr.network"
const BUNDLR_DEVNET_URL = "http://devnet.bundlr.network"

function configureBundlrServer(fundingSecretKey: Uint8Array|string, bundlrNetwork: string, options?: any) {
  if(options == undefined)
    options = {};
  let bundlrOptions = options;
  if(bundlrNetwork=="devnet"){
    bundlrNetwork = BUNDLR_DEVNET_URL;
    if(options.providerUrl == undefined){
      bundlrOptions.providerUrl = "https://api.devnet.solana.com";
    }
    // if someone passes in devnet and doesn't specify, we protect them by automatically
    // setting the correct RPC endpoint.
  }

  if(bundlrNetwork=="mainnet")
    bundlrNetwork = BUNDLR_NODE_URL;

  return new Bundlr(bundlrNetwork.toString(), "solana", fundingSecretKey, bundlrOptions);
}


async function uploadItemBundlr(item:any, bundlr:any):Promise<string> {
  const json = JSON.stringify(item);

  const price = await bundlr.getPrice((new TextEncoder().encode(json)).length);
  // Get your current balance
  const balance = await bundlr.getLoadedBalance();
  console.log("bundlr price, balance", price.toString(), balance.toString());
  // If you don't have enough balance for the upload
  //Bundlr pricing issue fallback.
  if (price.isGreaterThan(balance)) {
      // integerValue(0) means round up
      const amount:number = price.minus(balance).multipliedBy(1.1).integerValue(0).toNumber()
      console.log("attempting to increase funding by", amount);
      // We multiply by 1.1 to make sure we don't run out of funds
      await bundlr.fund(amount);
  }

  console.log("funded")
  // Create, sign and upload the transaction
  const transaction = bundlr.createTransaction(json);
  console.log("bunldr transaction", transaction);

  await transaction.sign();
  const id = transaction.id;
  console.log("pre upload");
  return transaction.upload().then((result:any)=>{
    console.log("bundlr output", id, result);
    return id;
  });

}

// const TEST_WALLET = process.env.TEST_WALLET as string
const raw = fs.readFileSync(path.resolve('./teSTqPs5vf1xCfR5vh5w8kBjm8rMHnH52tF1wPLHzu3.json'), 'utf8');
const bundlr = configureBundlrServer(Buffer.from(JSON.parse(raw)), "devnet");

const tx = uploadItemBundlr("{test: []}", bundlr);
