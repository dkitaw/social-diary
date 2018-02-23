import React from 'react';
import { connect } from 'react-redux';
import { StoryForm } from './StoryForm';
import { startAddStory } from '../actions/stories';

class AddStoryPage extends React.Component {
  onSubmitHandler = story => {
    this.props.startAddStory(story);
    this.props.history.push('/myStory');
  };
  render() {
    return (
      <div>
        <h3>Add Story</h3>
        <StoryForm
          submitBtnTitle="Create Story"
          onSubmit={this.onSubmitHandler}
        />
      </div>
    );
  }
}

const mapDispathToProps = dispatch => ({
  startAddStory: story => dispatch(startAddStory(story))
});
export default connect(undefined, mapDispathToProps)(AddStoryPage);
