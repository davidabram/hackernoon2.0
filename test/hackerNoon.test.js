const HackerNoon = artifacts.require('HackerNoon');

contract('HackerNoon', (accounts) => {
  let hackerNoon;

  beforeEach(async () => {
    hackerNoon = await HackerNoon.new();
  })

  it('Should have an address for HackerNoon', async () => {
    assert(HackerNoon.address);
  });

  it('Should create a new story', async () => {
    const newStoryTitle = 'New Story';
    const newStoryBody = 'I am a brand new story';
    const tx = await hackerNoon.submitStory(newStoryTitle, newStoryBody, { from: accounts[0] });
    assert.equal(tx.logs[0].args.storyId.toNumber(), 0);
  })

  it('Should create and return the story', async () => {
    const newStoryTitle = 'New Story';
    const newStoryBody = 'I am a brand new story';
    const tx = await hackerNoon.submitStory(newStoryTitle, newStoryBody, { from: accounts[0] });
    const result = await hackerNoon.getStory(tx.logs[0].args.storyId.toNumber(), { from: accounts[1] });
    assert.equal(result[0], newStoryTitle);
    assert.equal(result[1], newStoryBody);
  })

  it('Should create and publish the story', async () => {
    const newStoryTitle = 'New Story';
    const newStoryBody = 'I am a brand new story';
    const tx1 = await hackerNoon.submitStory(newStoryTitle, newStoryBody, { from: accounts[0] });
    const tx2 = await hackerNoon.publishStory(tx1.logs[0].args.storyId.toNumber(), { from: accounts[1] });
    const result = await hackerNoon.getStory(tx2.logs[0].args.storyId.toNumber(), { from: accounts[2] });
    assert.equal(result[0], newStoryTitle);
    assert.equal(result[1], newStoryBody);
    assert.equal(await hackerNoon.storiesFromAccount(accounts[0], tx1.logs[0].args.storyId.toNumber()), 0);
    assert.equal(await hackerNoon.storiesPublishedByAccount(accounts[1], tx2.logs[0].args.storyId.toNumber()), 0);
  })

})
