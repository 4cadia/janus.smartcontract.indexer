function add10() {
    for(let i = 0; i < 10; i++) {

        indexer.addWebSite("hash"[i],"tag","title"[i],"desc"[i], {from:eth.accounts[0]});
      }
}

