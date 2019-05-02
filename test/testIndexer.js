var Indexer = artifacts.require('./Indexer.sol');
const truffleAssert = require('truffle-assertions');

contract('Indexer', function (accounts) {

    var indexer;

    var owner = accounts[0];

    beforeEach('instance for each test', async () => {
        indexer = await Indexer.new({ from: owner });
    });

    afterEach(async () => {
        await casino.kill({ from: owner });
    });

    describe('add', function () {

        it('should not add a existing website', async () => {
            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2s';
            var tags = ['tag1'];
            var title = 'title1';
            var description = 'desc1';

            var tx = await indexer.addWebSite(
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

            truffleAssert.eventNotEmitted(tx, 'addWebSiteEvent');
        });

        it('add a website', async () => {
            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2x';
            var tags = ['tag2'];
            var title = 'title2';
            var description = 'desc2';

            let tx = await indexer.addWebSite(
                hash,
                tags,
                title,
                description,
                { from: owner });

            truffleAssert.eventEmitted(tx, 'addWebSiteEvent');
        });
    });

    describe('get', function () {
        it('get a unexisting website by tag', async () => {

            var tags = ['unexistingTag'];

            var websites = await indexer.getWebSite(tags);

            assert.equal(websites.length, 15, 'the result must be 15 positions')
            assert.equal(websites[0], '', 'result must be empty');
        });

        it('get a website by tag', async () => {

            var hash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2h';
            var tags = ['tag3'];
            var title = 'title3';
            var description = 'desc3';

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

            var hashWebSite1 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2u';
            var tagsWebSite1 = ['tag4'];
            var titleWebSite1 = 'title4';
            var descriptionWebSite1 = 'desc4';

            await indexer.addWebSite(
                hashWebSite1,
                tagsWebSite1,
                titleWebSite1,
                descriptionWebSite1,
                { from: owner });

            var websites1 = await indexer.getWebSite(tagsWebSite1);

            var hashWebSite2 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2j';
            var tagsWebSite2 = ['tag5'];
            var titleWebSite2 = 'title5';
            var descriptionWebSite2 = 'desc5';

            await indexer.addWebSite(
                hashWebSite2,
                tagsWebSite2,
                titleWebSite2,
                descriptionWebSite2,
                { from: owner });

            var hashWebSite2 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2j';
            var tagsWebSite2 = ['tag5'];
            var titleWebSite2 = 'title5';
            var descriptionWebSite2 = 'desc5';

            await indexer.addWebSite(
                hashWebSite2,
                tagsWebSite2,
                titleWebSite2,
                descriptionWebSite2,
                { from: owner });

            var websitesTwoTags = await indexer.getWebSite(['tag4', 'tag5']);

            assert.equal(websitesTwoTags.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTwoTags[0].split(';')[0], hashWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags[0].split(';')[1], titleWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags[0].split(';')[2], descriptionWebSite1, 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[0], hashWebSite2, 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[1], titleWebSite2, 'hash must be equal');
            assert.equal(websitesTwoTags[1].split(';')[2], descriptionWebSite2, 'hash must be equal');

            var hashWebSite3 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2a';
            var tagsWebSite3 = ['tag6'];
            var titleWebSite3 = 'title6';
            var descriptionWebSite3 = 'desc6';

            await indexer.addWebSite(
                hashWebSite3,
                tagsWebSite3,
                titleWebSite3,
                descriptionWebSite3,
                { from: owner });

            var websitesTag = await indexer.getWebSite(tagsWebSite3);

            assert.equal(websitesTag.length, 15, 'the result must be 15 positions')
            assert.equal(websitesTag[0].split(';')[0], hashWebSite3, 'hash must be equal');
            assert.equal(websitesTag[0].split(';')[1], titleWebSite3, 'hash must be equal');
            assert.equal(websitesTag[0].split(';')[2], descriptionWebSite3, 'hash must be equal');
        });
    });
});