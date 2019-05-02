var Indexer = artifacts.require('./Indexer.sol');
const truffleAssert = require('truffle-assertions');

contract('Indexer', function (accounts) {

    var indexer;

    var owner = accounts[0];
    var indexerInstance;

    var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t';
    var tags = ['tag'];
    var twoTags = ['tag1', 'tag2'];
    var title = 'test app';
    var description = 'description test';

    beforeEach('instance for each test', async () => {
        indexer = await Indexer.new();
    });

    describe('add', function () {

       it('should not add a existing website', async () => {
            
            await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });
            
            truffleAssert.reverts(
                indexer.addWebSite(
                    hash,
                    tags,
                    title,
                    description,
                    { from: owner }),
                'website exists');
        });

        it('add a website', function () {
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
        it('get a unexisting website by tag', async () => {
                
            var websites = await indexer.getWebSite(tags);

            assert.equal(websites.length, 15, 'the result must be 15 positions')
            assert.equal(websites[0], '', 'result must be empty');
        });

        it('get a website by tag', async () => {

            await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });
                
            var websites = await indexer.getWebSite(tags);

            assert.equal(websites.length, 15, 'the result must be 15 positions')
            assert.equal(websites[0].split(';')[0], hash, 'hash must be equal');
            assert.equal(websites[0].split(';')[1], title, 'hash must be equal');
            assert.equal(websites[0].split(';')[2], description, 'hash must be equal');
        });

        it('get a website by two different tags', async () => {

            await indexer.addWebSite(
                'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u',
                twoTags,
                'title1',
                'desc1',
                { from: owner });

            await indexer.addWebSite(
                'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2j',
                twoTags,
                'title2',
                'desc2',
                { from: owner });

            var websitesTwoTags = await indexer.getWebSite(twoTags);

            assert.equal(websitesTwoTags.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTwoTags[0].split(';')[0], 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u', 'hash must be equal');
            assert.equal(websitesTwoTags[0].split(';')[1], 'title1', 'hash must be equal');
            assert.equal(websitesTwoTags[0].split(';')[2], 'desc1', 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[0], 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2j', 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[1], 'title2', 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[2], 'desc2', 'hash must be equal');

            await indexer.addWebSite(
                'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2a',
                tags,
                'title3',
                'desc3',
                { from: owner });
                
            var websitesTag = await indexer.getWebSite(tags);

            assert.equal(websitesTag.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTag[0].split(';')[0], 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2a', 'hash must be equal');
            assert.equal(websitesTag[0].split(';')[1], 'title3', 'hash must be equal');
            assert.equal(websitesTag[0].split(';')[2], 'desc3', 'hash must be equal');
        });
    });
});