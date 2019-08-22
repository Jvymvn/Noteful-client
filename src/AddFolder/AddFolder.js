import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'


export default class AddFolder extends Component {
  static defaultProps = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input type='text' name='folder-name' />
          </div>
          <div>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
