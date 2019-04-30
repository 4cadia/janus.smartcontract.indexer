var indexerContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_storageHash","type":"string"},{"name":"_tag","type":"string"},{"name":"_title","type":"string"},{"name":"_description","type":"string"}],"name":"addWebSite","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tag","type":"string"}],"name":"getWebSite","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_tag","type":"string"}],"name":"addWebSiteEvent","type":"event"}]);
var indexer = indexerContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b50611376806100206000396000f3fe608060405260043610610046576000357c0100000000000000000000000000000000000000000000000000000000900480636f8146341461004b578063ab2de90614610074575b600080fd5b34801561005757600080fd5b50610072600480360361006d919081019061116a565b6100b1565b005b34801561008057600080fd5b5061009b60048036036100969190810190611129565b61021d565b6040516100a89190611263565b60405180910390f35b6000836040518082805190602001908083835b6020831015156100e957805182526020820191506020810190506020830392506100c4565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206080604051908101604052808681526020018581526020018481526020018381525090806001815401808255809150509060018203906000526020600020906004020160009091929091909150600082015181600001908051906020019061018592919061102e565b5060208201518160010190805190602001906101a292919061102e565b5060408201518160020190805190602001906101bf92919061102e565b5060608201518160030190805190602001906101dc92919061102e565b505050507f253a6afdc831af5adff33c9264425bf30dedee877694784f7a78779045e7eab18360405161020f9190611263565b60405180910390a150505050565b6060600080836040518082805190602001908083835b6020831015156102585780518252602082019150602081019050602083039250610233565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390209050606060008090505b828054905081101561083057600083828154811015156102b157fe5b9060005260206000209060040201905060008214156105835760606105596020604051908101604052806000815250836000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103785780601f1061034d57610100808354040283529160200191610378565b820191906000526020600020905b81548152906001019060200180831161035b57829003601f168201915b5050505050846001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104155780601f106103ea57610100808354040283529160200191610415565b820191906000526020600020905b8154815290600101906020018083116103f857829003601f168201915b5050505050856002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104b25780601f10610487576101008083540402835291602001916104b2565b820191906000526020600020905b81548152906001019060200180831161049557829003601f168201915b5050505050866003018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561054f5780601f106105245761010080835404028352916020019161054f565b820191906000526020600020905b81548152906001019060200180831161053257829003601f168201915b505050505061083b565b9050600061056682610f19565b9050606061057660028385610f2a565b9050809550505050610822565b600061058e84610f19565b9050606061059e60018387610f2a565b905061081d81846000018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561063c5780601f106106115761010080835404028352916020019161063c565b820191906000526020600020905b81548152906001019060200180831161061f57829003601f168201915b5050505050856001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106d95780601f106106ae576101008083540402835291602001916106d9565b820191906000526020600020905b8154815290600101906020018083116106bc57829003601f168201915b5050505050866002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107765780601f1061074b57610100808354040283529160200191610776565b820191906000526020600020905b81548152906001019060200180831161075957829003601f168201915b5050505050876003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108135780601f106107e857610100808354040283529160200191610813565b820191906000526020600020905b8154815290600101906020018083116107f657829003601f168201915b505050505061083b565b945050505b508080600101915050610295565b508092505050919050565b606080869050606086905060608690506060869050606086905060606040805190810160405280600181526020017f2c00000000000000000000000000000000000000000000000000000000000000815250905060608251825185518451885186518b5188518e5101010101010101016040519080825280601f01601f1916602001820160405280156108dd5781602001600182028038833980820191505090505b5090506060819050600080905060008090505b89518110156109a357898181518110151561090757fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002838380600101945081518110151561096657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506108f0565b508360008151811015156109b357fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028282806001019350815181101515610a1257fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060008090505b8851811015610afb578881815181101515610a5f57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383806001019450815181101515610abe57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610a48565b50836000815181101515610b0b57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028282806001019350815181101515610b6a57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060008090505b8751811015610c53578781815181101515610bb757fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383806001019450815181101515610c1657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610ba0565b50836000815181101515610c6357fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028282806001019350815181101515610cc257fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060008090505b8651811015610dab578681815181101515610d0f57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383806001019450815181101515610d6e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610cf8565b50836000815181101515610dbb57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028282806001019350815181101515610e1a57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060008090505b8551811015610f03578581815181101515610e6757fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028383806001019450815181101515610ec657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610e50565b5081995050505050505050505095945050505050565b600060608290508051915050919050565b6060806001858503016040519080825280601f01601f191660200182016040528015610f655781602001600182028038833980820191505090505b50905060008090505b858503811115156110225783600187830103815181101515610f8c57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028282815181101515610fe557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610f6e565b50809150509392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061106f57805160ff191683800117855561109d565b8280016001018555821561109d579182015b8281111561109c578251825591602001919060010190611081565b5b5090506110aa91906110ae565b5090565b6110d091905b808211156110cc5760008160009055506001016110b4565b5090565b90565b600082601f83011215156110e657600080fd5b81356110f96110f4826112b2565b611285565b9150808252602083016020830185838301111561111557600080fd5b6111208382846112e9565b50505092915050565b60006020828403121561113b57600080fd5b600082013567ffffffffffffffff81111561115557600080fd5b611161848285016110d3565b91505092915050565b6000806000806080858703121561118057600080fd5b600085013567ffffffffffffffff81111561119a57600080fd5b6111a6878288016110d3565b945050602085013567ffffffffffffffff8111156111c357600080fd5b6111cf878288016110d3565b935050604085013567ffffffffffffffff8111156111ec57600080fd5b6111f8878288016110d3565b925050606085013567ffffffffffffffff81111561121557600080fd5b611221878288016110d3565b91505092959194509250565b6000611238826112de565b80845261124c8160208601602086016112f8565b6112558161132b565b602085010191505092915050565b6000602082019050818103600083015261127d818461122d565b905092915050565b6000604051905081810181811067ffffffffffffffff821117156112a857600080fd5b8060405250919050565b600067ffffffffffffffff8211156112c957600080fd5b601f19601f8301169050602081019050919050565b600081519050919050565b82818337600083830152505050565b60005b838110156113165780820151818401526020810190506112fb565b83811115611325576000848401525b50505050565b6000601f19601f830116905091905056fea265627a7a72305820caa4ef616b0a8a39cab4dcda9ed2064385f8e852ecfebe911aaac9326021cfc86c6578706572696d656e74616cf50037', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })