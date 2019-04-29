var Indexer = artifacts.require('./Indexer.sol');

contract('Indexer', function (accounts) {

    var indexer;

    var owner = accounts[0];
    var indexerInstance;

    var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t';
    var tag = 'test';
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
                    tag,
                    title,
                    description,
                    { from: owner });
            }).then(function (event) {
                assert.equal(event.logs.length, 1, 'an event was triggered');
                assert.equal(event.logs[0].event, 'addWebSiteEvent', 'the event type is correct');
                assert.equal(event.logs[0].args._tag, tag, 'the tag is correct');
            });
        });
    });

    describe('get', function () {
        it('Get a website by tag', async () => {

            console.log('get 1');

            await indexer.addWebSite(
                hash,
                tag,
                title,
                description,
                { from: owner });

            console.log('get 2');

            console.log('get 3');
            var website = await indexer.getWebSite(tag);
            console.log('get 4');

            console.log(website);
            console.log(website[0]);
            console.log(website[1]);
            console.log(website[2]);
            console.log(website[3]);
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