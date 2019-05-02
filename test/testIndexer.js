var Indexer = artifacts.require('./Indexer.sol');

contract('Indexer', function (accounts) {

    var indexer;

    var owner = accounts[0];
    var indexerInstance;

    var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t';
    var tags = ['test'];
    var title = 'test app';
    var description = 'description test';

    beforeEach('instance for each test', async () => {
        indexer = await Indexer.new();
    });

    describe('add', function () {
        it('Add a website', function () {
            return Indexer.deployed().then(function (instance) {
                indexerInstance = instance;
                return indexerInstance.addWebSite(
                    hash,
                    tags,
                    title,
                    description,
                    { from: owner });
            }).then(function (event) {
                assert.equal(event.logs.length, 1, 'an event was triggered');
                assert.equal(event.logs[0].event, 'addWebSiteEvent', 'the event type is correct');
            });
        });
    });
    
    describe('get', function () {
        it('Get a website by tag', async () => {

            await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });
                
            var websites = await indexer.getWebSite(tags);
        });
    });

    /*it('Get a website', function(){
        return Indexer.deployed().then(function(instance){
            indexerInstance = instance;
            return indexerInstance.getWebSite(tag)
        }).then(function(result){
            assert.equal(result[0].storageHashs.indexOf(hash), -1);
        });
    });*/
});