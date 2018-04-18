import React from 'react'
import { Tag, Table } from 'antd'

import { dateToString } from '../../lib/helpers'

const { Column } = Table

const Sidebar = ({ pack }) => {
  const { tags, version, createdAt, updatedAt, history } = pack
  const dataSource = [{
    version: <strong>{version}</strong>,
    createdAt: <strong>{dateToString(createdAt)}</strong>
  }]

  if (Array.isArray(history)) {
    history.map(item => dataSource.push({
      version: item.version,
      createdAt: item.createdAt
    }))
  }

  return (
    <div style={styles.sidebar}>
      <h4 style={styles.firstTitle}>标签</h4>
      { tags.length ? tags.map((tag, i) => (
        <Tag key={i} color='#108ee9'>{tag}</Tag>
      )) : null }
      <h4 style={styles.title}>历史版本</h4>
      <Table dataSource={dataSource} showHeader={false} pagination={false} size='small' bordered={false}>
        <Column
          title=''
          dataIndex='version'
          key='version'
        />
        <Column
          title=''
          dataIndex='createdAt'
          key='createdAt'
        />
      </Table>
    </div>
  )
}

export default Sidebar

const styles = {
  firstTitle: {
    fontSize: 16
  },
  title: {
    marginTop: 20,
    fontSize: 16
  },
  sidebar: {
    //
  }
}
