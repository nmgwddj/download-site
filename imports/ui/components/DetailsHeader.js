import React from 'react'
import Clipboard from 'react-clipboard.js'
import { Meteor } from 'meteor/meteor'
import { withHandlers, compose } from 'recompose'
import { withTracker } from 'meteor/react-meteor-data'
import { Row, Col, Icon, Rate, Button, message } from 'antd'

import { ThunderURIEncode, ed2kLink, dateToString } from '../../lib/helpers'
import Users from '../../api/users/users'

const DetailsHeader = ({ pack, isReady, user, onDownloadFile, onSuccess }) => {
  return (
    <Row gutter={12} style={styles.header}>
      <Col span={4} style={styles.images}>
        <img style={styles.imageControl} src={pack.imageUrl} />
      </Col>
      <Col span={20}>
        <h1 style={styles.title}>{pack.title}</h1>
        <div style={styles.wrapper}>
          <span style={styles.auathor}>{isReady ? user.username : ''}</span>
          <span style={styles.divider} className='ant-divider' />
          <span style={styles.downloads}><Icon type='download' /> {pack.downloadTotal} 下载</span>
          <span style={styles.divider} className='ant-divider' />
          <span style={styles.size}><Icon type='database' /> {pack.size} K</span>
          <span style={styles.divider} className='ant-divider' />
          <span style={styles.size}>{dateToString(pack.createdAt)}</span>
          <span style={styles.divider} className='ant-divider' />
          <Rate style={styles.rating} disabled defaultValue={5} />
        </div>
        <div style={styles.summary}>
          {pack.summary}
        </div>
        { ed2kLink(pack.downloadUrl)
          ? <Clipboard
            data-clipboard-text={ThunderURIEncode(pack.downloadUrl)}
            onSuccess={() => onSuccess(pack._id)}
            style={styles.downloadButton}
          >
            电驴下载
          </Clipboard>
          : <Button
            type='primary' size='large'
            style={styles.download}
            onClick={() => onDownloadFile(pack.downloadUrl, pack._id)}
          >
            本地下载
          </Button> }

        <Clipboard
          data-clipboard-text={ThunderURIEncode(pack.downloadUrl)}
          onSuccess={() => onSuccess(pack._id)}
          style={styles.downloadButton}
        >
          <span>迅雷下载</span>
        </Clipboard>
      </Col>
    </Row>
  )
}

export default compose(
  withHandlers({
    onSuccess: () => (pkgId) => {
      message.success('复制地址成功，将地址粘贴到迅雷下载。')

      const downloadTime = window.localStorage.getItem(`download.mycode.net.cn_${pkgId}`)
      const currentTime = new Date()
      // 超过 30 分钟记一次次数
      if (currentTime.getTime() - downloadTime > 3600000 || !downloadTime) {
        window.localStorage.setItem(`download.mycode.net.cn_${pkgId}`, currentTime.getTime())
        Meteor.call('packages.update.downloadTotal', pkgId, (err, res) => {
          if (err) {
            console.log('更新下载次数失败！')
          }
        })
      }
    },
    onDownloadFile: () => (downloadUrl, pkgId) => {
      const a = document.createElement('a')
      const filename = downloadUrl.split('/').pop()
      a.href = downloadUrl
      a.download = filename
      a.click()

      const downloadTime = window.localStorage.getItem(`download.mycode.net.cn_${pkgId}`)
      const currentTime = new Date()
      // 超过 30 分钟记一次次数
      if (currentTime.getTime() - downloadTime > 3600000 || !downloadTime) {
        window.localStorage.setItem(`download.mycode.net.cn_${pkgId}`, currentTime.getTime())
        Meteor.call('packages.update.downloadTotal', pkgId, (err, res) => {
          if (err) {
            console.log('更新下载次数失败！')
          }
        })
      }
    }
  }),
  withTracker(({ pack }) => {
    const handleUser = Meteor.subscribe('users.one', pack.author)
    return {
      isReady: handleUser.ready(),
      user: Users.findOne(pack.author)
    }
  })
)(DetailsHeader)

const styles = {
  header: {
    backgroundColor: '#f0f2f5',
    padding: '25px 0'
  },
  images: {
    textAlign: 'center'
  },
  imageControl: {
    maxWidth: 150
  },
  title: {
    fontSize: 26,
    lineHeight: '26px',
    fontWeight: 400,
    marginBottom: 8
  },
  wrapper: {

  },
  auathor: {
    fontSize: 14,
    cursor: 'pointer',
    color: '#000'
  },
  downloads: {
    fontSize: 14,
    color: '#000'
  },
  size: {
    fontSize: 14,
    color: '#000'
  },
  divider: {
    backgroundColor: '#1e1e1e',
    margin: '0 20px'
  },
  rating: {
    fontSize: 14
  },
  summary: {
    margin: '20px 0',
    color: '#000',
    fontSize: 14,
    lineHeight: '21px',
    width: 608
  },
  download: {
    marginRight: 15,
    width: 120
  },
  downloadButton: {
    color: '#FFF',
    borderStyle: 'none',
    cursor: 'pointer',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    padding: '0 15px',
    fontSize: 16,
    borderRadius: 0,
    height: 40,
    width: 120
  }
}
