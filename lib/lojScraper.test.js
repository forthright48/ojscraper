const assert = require('assert');
const lojScraper = require('./lojScraper');

const credential = {
    userId: '49033',
    password: 'j5ucq1h8',
}

describe('LOJ', function () {
    it('should return problem info', async function () {
        this.timeout(10000);
        const problemInfo = await lojScraper.getProblemInfo(1000, credential);
        assert.equal(problemInfo.title, "Greetings from LightOJ");
        assert.equal(problemInfo.problemID, 1000);
        assert.equal(problemInfo.platform, 'loj');
        assert.equal(problemInfo.link, 'http://www.lightoj.com/volume_showproblem.php?problem=1000');
    });

    it('should return user info', async function () {
        this.timeout(40000);
        let userInfo;
        try {
            userInfo = await lojScraper.getUserInfo(3058, credential);
        } catch (err) {
            assert.equal(err, null)
        }
        assert.equal(userInfo.platform, 'loj');
        assert.equal(userInfo.solveCount, 4)
        assert.equal(userInfo.solveList, [1000, 1001, 1006, 1136]);
    })
});
