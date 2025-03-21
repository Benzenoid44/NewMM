from web3 import Web3
import json

# Connect to Ethereum
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

# Load the deployed contract ABI and address
with open("contract_address.txt", "r") as file:
    contract_address = file.read().strip()

with open("contract_abi.json", "r") as file:
    abi = json.load(file)

# Your address and private key (from Ganache)
my_address = "0x14E22aDFaBf230b18e529A7DB9AFc2d88851e69B"  # Replace with your Ethereum address
private_key = "0xad9b797841d96dbcecd451d28cc3a70a7c6170dd38d9f5015213c94b8806a478" #Replace with your private key

# Connect to the contract
contract = w3.eth.contract(address=contract_address, abi=abi)

# Add a new document (IPFS hash and name)
ipfs_hash = "bafkreiflo63i73mgkr3rdyyiiskwokkdpvutxiykoid4mrb4j5ssegnqvu"  # Replace with your IPFS hash
document_name = "Sample"  # Name of the document

# Build the transaction to add the document
nonce = w3.eth.get_transaction_count(my_address)
transaction = contract.functions.addReport(ipfs_hash, document_name).build_transaction(
    {"chainId": 1337, "from": my_address, "nonce": nonce, "gas": 3000000, "gasPrice": w3.to_wei("20", "gwei")}
)

# Sign and send the transaction
signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

print(f"Document added successfully! Transaction hash: {txn_hash.hex()}")
