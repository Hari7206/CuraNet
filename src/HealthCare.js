import react , { useState, useEffect } from 'react';
import {ethers , BrowserProvider} from "ethers";

const Healthcare =  () => {
const [accountAdress , setAccountAdress] = useState("");
const contractAddress = "0xf623467d481Aed716C821659B9e293995713e1D1";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "patient_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "patient_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatment",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "addPateintRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "autorizeByOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "record_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "patient_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatment",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorizePerson",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "patient_id",
				"type": "uint256"
			}
		],
		"name": "fetchPatientRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "record_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "patient_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "treatment",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct Record[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
useEffect(() => {
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use CuraNet.");
            return;
        }

      //connect wallet to my app 
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
            chainId: "0xaa36a7"  // chainId for Sepolia testnet
        }]
      })
      const signer  = await provider.getSigner();
      setAccountAdress(await signer.getAddress());

      // connect with smart contract
      const smartContract = new ethers.Contract(contractAddress, contractABI, provider);

      const owner = await smartContract.getOwner();
      console.log("Contract Owner Address:", owner);
    };

    connectWallet();
}, []);

    return (
        <div className='container'>
            <h1 className="title">HealthCare Application</h1>
            <p className='account-info'>Connected Account: </p>
            <p className='owner-info'>You are the contract owner</p>

            <div className='form-section'>
                <h2>Fetch Patient Records</h2>
                <input className='input-field' type='text' placeholder='Enter Patient ID' value="" onChange="" />
                <button className='action-button' onClick="">Fetch Records</button>
            </div>

            <div className="form-section">
                <h2>Add Patient Record</h2>
                <input className='input-field' type='text' placeholder='pateint name' value="" onChange="" />
                <input className='input-field' type='text' placeholder='Diagnosis' value="" onChange="" />
                <input className='input-field' type='text' placeholder='Treatment' value="" onChange="" />
                <button className='action-button' onClick="">Add Records</button>

            </div>
            <div className="form-section">
                <h2>Authorize HealthCare Provider</h2>
                <input className='input-field' type="text" placeholder='Provider Address' value="" onChange="" />
                <button className='action-button' onClick="">Authorize Provider</button>
            </div>

            {/* <div className='records-section'>
                <h2>Patient Records</h2>
                {patientRecords.map((record, index) => (
                    <div key={index}>
                        <p>Record ID: {record.recordID.toNumber()}</p>
                        <p>Diagnosis: {record.diagnosis}</p>
                        <p>Treatment: {record.treatment}</p>
                        <p>Timestamp: {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
                    </div>
                ))}
            </div> */}

        </div>

    )

}

export default Healthcare;