import json
from web3 import Web3
from solcx import compile_standard, install_solc

# Install and set the Solidity compiler version
install_solc("0.8.0")

# Read the contract file
with open("ReportContract.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {"ReportContract.sol": {"content": contract_source_code}},
        "settings": {
            "outputSelection": {
                "*": {"*": ["abi", "evm.bytecode", "evm.sourceMap"]}
            }
        },
    },
    solc_version="0.8.0",
)

# Save compiled contract to a file
with open("compiled_code.json", "w") as file:
    json.dump(compiled_sol, file)

# Get bytecode and ABI from the compiled contract
bytecode = compiled_sol["contracts"]["ReportContract.sol"]["ReportContract"]["evm"]["bytecode"]["object"]
abi = compiled_sol["contracts"]["ReportContract.sol"]["ReportContract"]["abi"]

# Connect to Ganache or any local Ethereum provider
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
chain_id = 5777 # Ganache network ID (change it if using another network)
my_address = "0x14E22aDFaBf230b18e529A7DB9AFc2d88851e69B"  # Replace with your Ethereum address
private_key = "0xad9b797841d96dbcecd451d28cc3a70a7c6170dd38d9f5015213c94b8806a478"  # Replace with your private key

# Deploy the contract
ReportContract = w3.eth.contract(abi=abi, bytecode=bytecode)
nonce = w3.eth.get_transaction_count(my_address)

transaction = ReportContract.constructor().build_transaction(
    {
        "chainId": chain_id,
        "from": my_address,
        "nonce": nonce,
        "gas": 3000000,
        "gasPrice": w3.to_wei("20", "gwei"),
    }
)

signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
# txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

# Print contract address
contract_address = txn_receipt.contractAddress
print(f"Contract Deployed at {contract_address}")

# Save contract address for future use
with open("contract_address.txt", "w") as file:
    file.write(contract_address)

with open("contract_abi.json", "w") as file:
    json.dump(abi, file)
