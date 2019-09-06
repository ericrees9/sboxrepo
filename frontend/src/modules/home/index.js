import React, { PureComponent } from 'react'
import Snackbar from '../../components/snackbar'
import Button from '../../components/button'

import './home.css'
import Logo from '../../components/logo'

import { createFile } from '../../api/file'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.uploadFile = this.uploadFile.bind(this)
    this.onSnackbarClose = this.onSnackbarClose.bind(this)

    this.state = {
      isSnackbarOpen: false,
      isSuccess: true,
    }
  }

  uploadFile(e) {
    const file = e.target.files[0]
    createFile(file)
      .then((response) => {
        if (response && response.status === 200) {
          this.setState({ isSnackbarOpen: true, variant: "success", message: `${response.data.name} uploaded.` })
        } else if(response && response.status === 400) {
          this.setState({ isSnackbarOpen: true, variant: "warning", message: "File is too large. Must be under 10MB." })
        }
      })
  }

  onSnackbarClose(reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ isSnackbarOpen: false })
  }



  render() {
    return (
      <div className='home'>
        <Logo className='logo' />
        <input
          accept='*'
          style={{ display: 'none' }}
          id='outlined-button-file'
          type='file'
          onChange={this.uploadFile}
        />
        <label htmlFor='outlined-button-file'>
          <Button
            className='upload-button'
            variant='outlined'
            size='large'
            color='primary'
            component='span'
          >
            Upload File
          </Button>
        </label>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.onSnackbarClose}
          variant={this.state.variant}
          message={this.state.message}
        />
      </div>
    )
  }
}
Home.propTypes = {}
Home.defaultProps = {}
