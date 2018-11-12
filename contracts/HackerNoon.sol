pragma solidity ^0.4.24;

contract HackerNoon {

    struct Story {
        string title;
        string text;
        address owner;
    }

    mapping (address => uint[]) public storiesFromAccount;
    mapping (address => uint[]) public storiesPublishedByAccount;

    Story[] public stories;

    event StoryAdded(uint storyId, address owner, string title, string text);
    event StoryPublished(uint storyId, address owner, address editor, string title, string text);

    constructor () public {
    }

    function getStory(uint storyId) public view returns(string title, string text) {
        return (stories[storyId].title, stories[storyId].text);
    }

    function submitStory(string title, string text) public {
        Story memory story = Story(title, text, msg.sender);
        uint storyId = stories.push(story) - 1;
        storiesFromAccount[msg.sender].push(storyId);
        emit StoryAdded(storyId, msg.sender, title, text);
    }

    function publishStory(uint storyId) public {
        Story memory story = stories[storyId];
        storiesPublishedByAccount[msg.sender].push(storyId);
        emit StoryPublished(storyId, story.owner, msg.sender, story.title, story.text);
    }
}