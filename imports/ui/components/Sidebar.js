import React from 'react'
import { Tag } from 'antd'

const Sidebar = ({ tags }) => {
  return (
    <div style={styles.sidebar}>
      <h4 style={styles.firstTitle}>标签</h4>
      { tags.length ? tags.map((tag, i) => (
        <Tag key={i} color='#108ee9'>{tag}</Tag>
      )) : null }
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
