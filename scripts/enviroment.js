function loader() {

Indexer.deployed().then(function(deployed){indexer=deployed;});
web3.eth.getAccounts(function(err,res) { accounts = res; });
}
