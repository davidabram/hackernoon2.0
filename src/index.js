import React from 'react';
import ReactDOM from 'react-dom';
import { writerUserAddress, submitStory } from './writer'
import { editorUserAddress, publishStory } from './editor'
import { initEvents } from './hackernoon'

const Index = class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      unpublished: [],
      published: [],
      title: 'The best story',
      text: 'This is a story!',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmitWriter = this.handleSubmitWriter.bind(this);
    this.handleSubmitEditor = this.handleSubmitEditor.bind(this);
  }

  componentWillMount() {
    initEvents(
      (result) => {
        this.setState({
          logs: [...this.state.logs, {id: `add-${result.storyId}`, message:`Story by user ${result.owner} with id ${result.storyId}`}],
          unpublished: [...this.state.unpublished, { id: result.storyId, author: result.owner, title: result.title, text: result.text}],
        });
      }, 
      (result) => {
      this.setState({
        logs: [...this.state.logs, {id: `publish-${result.storyId}`, message:`Story published by editor ${result.editor} with id ${result.storyId}`}],
        published: [...this.state.published, { id: result.storyId, author: result.owner, title: result.title, text: result.text}],
      });
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmitWriter(event) {
    submitStory(this.state.title, this.state.text);
    this.setState({
      title: '',
      text: '',
    })
    event.preventDefault();
  }

  handleSubmitEditor(storyId) {
    publishStory(storyId);
    this.setState({
      unpublished: this.state.unpublished.filter(t => t.id !== storyId),
    });
    event.preventDefault();
  }


  render() {
    const logs = this.state.logs.map(log => (<div key={log.id}>{log.message}</div>));
    const published = this.state.published.map(
      story => (
        <div key={story.id}>
          <div><h3>{story.title} by {story.author}</h3></div>
          <p>{story.text}</p>
        </div>
      )
    );
    const unpublished = this.state.unpublished.map(
      story => (
        <div key={story.id}>
          <div>{story.title} by {story.author} <button onClick={() => this.handleSubmitEditor(story.id)}>Publish</button></div>
          <div>{story.text}</div>
        </div>
      )
    );

    return (
      <div>
        <div>
          <h2>Writer</h2>
          <div>Writer address: {writerUserAddress}</div>
          <form onSubmit={this.handleSubmitWriter}>
            <label>title: <input value={this.state.title} onChange={this.handleTitleChange} type="text" placeholder="Enter the title" /></label>
            <br />
            <label>text: <textarea value={this.state.text} onChange={this.handleTextChange} type="text" name='story' cols="40" rows="5" placeholder="Enter the story" /></label>
            <input type="submit" disabled={!this.state.title.length > 0 || !this.state.text.length > 0} value="Submit the story" />
          </form>
        </div>
        <br />
        <div>
          <h2>Editor</h2>
          <div>Editor address: {editorUserAddress}</div>
          {unpublished.length > 0 ? unpublished : <div>No unpublished stories at the moment.</div>}
        </div>
        <br />
        <div>
          <h2>Published stories</h2>
          {published.length > 0 ? published : <div>No published stories at the moment.</div>}
        </div>
        <br />
        <div>
          <h2>Logs:</h2>
          {logs.length > 0 ? logs : <div>No logs at the moment.</div>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))

