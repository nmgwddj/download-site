import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Progress } from 'antd'
import Qiniu from 'qiniu4js'

import Global from '../../startup/client/global'

class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSuccess: false,
      isUploading: false,
      progress: 0,
      fileUploader: null,
      currentTasks: []
    }
  }

  componentWillMount () {
    const DEVELOPMENT = Meteor.isDevelopment
    const { onChange, accept, fileType, value } = this.props
    const { UPLOAD_URL } = Global.qiniu
    const _this = this
    if (value) {
      onChange(value, true)
    }
    const fileUploader = new Qiniu.UploaderBuilder()
      .debug(true)
      .domain({http: `http://${UPLOAD_URL}`, https: `https://${UPLOAD_URL}`})
      .tokenShare(true)
      .chunk(false)
      .multiple(false)
      .accept(accept || ['*'])
      .tokenFunc(function (setToken) {
        const currentTask = _this.state.currentTasks[0]
        const extension = currentTask._file.name.split('.').pop()
        const prefix = DEVELOPMENT ? 'dev/' : ''
        let saveKey = ''

        if (fileType === 'images') {
          saveKey = `${prefix}images/$(year)-$(mon)-$(day)_$(hour)$(min)$(sec).${extension}`
        } else {
          saveKey = `${prefix}packages/${currentTask._file.name}`
        }

        Meteor.call('getUploadToken', saveKey, (err, token) => {
          if (!err) {
            setToken(token)
          }
        })
      })
      .listener({
        onStart: (tasks) => {
          this.setState({
            isUploading: true,
            currentTasks: tasks
          })
        },
        onTaskProgress: (progress) => {
          this.setState({ progress: progress._progress })
        },
        onTaskSuccess: (success) => {
          this.setState({ isSuccess: success._isSuccess })
        },
        onTaskFail: (task) => {
        },
        onTaskRetry: (task) => {
        },
        onFinish: (tasks) => {
          this.setState({ isUploading: false })
          onChange(tasks[0])
        }
      }).build()
    this.setState({ fileUploader })
  }

  render () {
    const { isUploading, progress, fileUploader } = this.state
    const { children, showProgress } = this.props

    return (
      <div onClick={() => { fileUploader.chooseFile() }} className='upload-container'>
        { children }
        { isUploading ? <Progress
          style={showProgress ? {} : { display: 'none' }}
          percent={progress}
          size='small'
          showInfo={false} /> : null }
      </div>
    )
  }
}

export default Upload
