import React from 'react'
import { Spin } from 'antd'

export default () =>
  <div style={styles.spin}>
    <Spin />
  </div>

const styles = {
  spin: {
    textAlign: 'center',
    minHeight: 300,
    lineHeight: '300px',
    // backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    marginBottom: 20,
    padding: '30px 50px',
    margin: '20px 0'
  }
}
