import React from 'react';
import { BlogForm } from './BlogForm';
import { connect } from 'react-redux';
import { editBlog, deleteBlog } from '../actions/blogs';

class EditBlogPage extends React.Component {
  onDeleteHandle = () => {
    if (!window.confirm('are you sure to delete?')) return;
    console.log('delete');
    this.props.deleteBlog(this.props.blog.id);
    this.props.history.push('/');
  };
  onSubmitHandle = blog => {
    this.props.editBlog(this.props.blog.id, blog);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h4>Edit Blog</h4>
        <BlogForm
          blog={this.props.blog}
          submitBtnTitle="Edit Blog"
          onSubmit={this.onSubmitHandle}
        />
        <button onClick={this.onDeleteHandle}>Delete Blog</button>
      </div>
    );
  }
}

const mapStateToProp = (state, props) => {
  const blog = state.blogs.find(e => e.id === +props.match.params.id);
  return { blog };
};

const mapDispatchToProp = dispatch => ({
  editBlog: (id, updates) => dispatch(editBlog(id, updates)),
  deleteBlog: id => dispatch(deleteBlog(id))
});

export default connect(mapStateToProp, mapDispatchToProp)(EditBlogPage);