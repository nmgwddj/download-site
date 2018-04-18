import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Form, Input, Select, Radio, Button, Card, message, Switch } from 'antd'
import { withRouter } from 'react-router-dom'
import { withHandlers, withState, compose } from 'recompose'
import { withTracker } from 'meteor/react-meteor-data'

import Types from '../../api/types/types'
import Uploader from './Uploader'
import Global from '../../startup/client/global'
import RichEditor from './RichEditor'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const UploadForm = ({
  form,
  types,
  isReady,
  isEdit,
  pack,
  downloadType,
  setDownloadType,
  imageUrl,
  setImageUrl,
  downloadUrl,
  setDownloadUrl,
  setFileSize,
  downloadFile,
  handleSubmit
}) => {
  const { getFieldDecorator } = form
  const { DOMAIN_NAME } = Global.qiniu

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 4
      }
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormItem
        {...formItemLayout}
        label='软件名称'
        extra='完整的软件名称包含名字、版本号、32为还是64位等，中间用空格分割'
      >
        {getFieldDecorator('title', {
          rules: [{
            required: true, message: '请输入软件名称'
          }],
          initialValue: isEdit ? pack.title : ''
        })(
          <Input placeholder='输入软件的完整名称' />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件类型'
      >
        {getFieldDecorator('type', {
          rules: [{
            required: true, message: '请选择软件类型'
          }],
          initialValue: isEdit ? pack.type : null
        })(
          <Select placeholder='选择软件所属的分类'>
            { isReady ? types.map(type => <Option key={type._id} value={type._id}>{type.name}</Option>) : null }
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件图片'
        extra='图片文件宽高建议不超过 200px，最好正方形。否则下载界面显示可能会将图片压缩或拉伸导致图片显示不清晰。'
      >
        <div className='dropbox'>
          {getFieldDecorator('imageUrl', {
            rules: [{
              required: true, message: '请上传软件图片'
            }],
            getValueFromEvent: (task, hasUrl) => {
              if (hasUrl) {
                setImageUrl(task)
                return task
              }
              const imageUrl = `${DOMAIN_NAME}${task._result.key}`
              setImageUrl(imageUrl)
              return imageUrl
            },
            initialValue: isEdit ? pack.imageUrl : null
          })(
            <Uploader showProgress accept={['image/*']} fileType='images'>
              { imageUrl
                ? <Card bodyStyle={styles.bodyStyle}><img src={imageUrl} style={styles.image} /></Card>
                : <div style={styles.upload}>上传图片</div>}
            </Uploader>
          )}
        </div>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件地址'
        extra='若文件过大且已经有成熟的迅雷或电驴下载链接，请使用外部链接，若软件比较小而且没有合适的下载链接建议使用本地上传。
               若软件是绿色软件，请先将程序进行 zip 压缩，禁止使用 7z、rar 格式进行压缩。若非绿色软件建议直接上传安装程序不需要二次压缩打包'
      >
        <RadioGroup
          defaultValue={downloadType}
          onChange={(event) => setDownloadType(event.target.value)}
        >
          <RadioButton value={0}>本地上传</RadioButton>
          <RadioButton value={1}>外部链接</RadioButton>
        </RadioGroup>

        {getFieldDecorator('downloadUrl', {
          rules: [{
            required: true, message: '请填写软件下载地址'
          }],
          getValueFromEvent: (task, hasUrl) => {
            if (hasUrl) {
              setDownloadUrl(task)
              return task
            }

            if (downloadType) {
              return task.target.value
            }

            const downloadUrl = `${DOMAIN_NAME}${task._result.key}`
            const fileSize = task._file.size
            setDownloadUrl(downloadUrl)
            setFileSize(fileSize)
            return downloadUrl
          },
          initialValue: isEdit ? pack.downloadUrl : null
        })(
          downloadType
            ? <Input placeholder='输入迅雷或电驴下载链接' />
            : <Uploader showProgress>
              { downloadUrl ? <Card>{downloadUrl}</Card> : <div style={styles.upload}>上传软件</div>}
            </Uploader>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件版本'
      >
        {getFieldDecorator('version', {
          rules: [{
            required: true, message: '请输入软件版本'
          }],
          initialValue: isEdit ? pack.version : ''
        })(
          <Input placeholder='在这里输入本次上传的软件版本信息' />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件摘要'
      >
        {getFieldDecorator('summary', {
          rules: [{
            required: true, message: '请输入软件摘要'
          }],
          initialValue: isEdit ? pack.summary : ''
        })(
          <TextArea
            placeholder='在这里输入一些软件的简单摘要信息'
            autosize={{ minRows: 6, maxRows: 10 }}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件标签'
      >
        {getFieldDecorator('tags', {
          rules: [{
            required: true, message: '请输入软件标签'
          }],
          initialValue: isEdit ? pack.tags : []
        })(
          <Select
            mode='tags'
            placeholder='添加标签'
            style={{ width: '100%' }}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label='软件描述'
      >
        {getFieldDecorator('description', {
          rules: [{
            required: true, message: '请输入软件描述'
          }],
          initialValue: isEdit ? pack.description : ''
        })(
          <RichEditor />
        )}
      </FormItem>
      { isEdit ? <FormItem
        {...formItemLayout}
        label='更新版本'
      >
        {getFieldDecorator('update', {
          rules: [{
            required: false, message: '请选择是否更新版本'
          }]
        })(
          <Switch />
        )}
      </FormItem> : null }
      <FormItem {...tailFormItemLayout}>
        <Button
          type='primary'
          size='large'
          htmlType='submit'
        >
          { isEdit ? '更新软件' : '添加软件' }
        </Button>
      </FormItem>
    </Form>
  )
}

export default compose(
  Form.create(),
  withRouter,
  withState('downloadType', 'setDownloadType', 0),
  withState('imageUrl', 'setImageUrl', null),
  withState('downloadUrl', 'setDownloadUrl', null),
  withState('fileSize', 'setFileSize', 0),
  withHandlers({
    handleSubmit: ({ history, fileSize, isEdit, pack, form }) => (event) => {
      event.preventDefault()
      form.validateFields((error, values) => {
        if (!error) {
          Object.assign(values, {
            size: fileSize
          })
          const action = isEdit ? 'edit' : 'add'
          Meteor.call(`packages.${action}`, values, pack._id, (err, res) => {
            if (!err) {
              message.success('添加成功')
              history.push('/')
            } else {
              message.error(err.message)
            }
          })
        }
      })
    }
  }),
  withTracker(() => {
    const handleTypes = Meteor.subscribe('types.all')
    return {
      isReady: handleTypes.ready(),
      types: Types.find().fetch()
    }
  })
)(UploadForm)

const styles = {
  bodyStyle: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 180,
    maxHeight: 180,
    border: '1px solid #ccc',
    backgroundColor: '#FFF',
    padding: 8
  },
  upload: {
    border: '1px dashed #d9d9d9',
    cursor: 'pointer',
    borderRadius: 4,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: '30px 0',
    backgroundColor: '#fafafa'
  }
}
