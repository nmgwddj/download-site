import React from 'react'
import { Tabs, Icon, Row, Col } from 'antd'

import Sidebar from './Sidebar'

const TabPane = Tabs.TabPane

const DetailsContent = ({ pack }) => {
  return (
    <Tabs defaultActiveKey='description' style={styles.content}>
      <TabPane tab={<span><Icon type='exception' />软件简介</span>} key='description'>
        <Row gutter={24}>
          <Col span={16}>
            <div className='package-description' dangerouslySetInnerHTML={{ __html: pack.description }}>
              {/*  */}
            </div>
          </Col>
          <Col span={8}>
            <Sidebar pack={pack} />
          </Col>
        </Row>
      </TabPane>
      {/* <TabPane tab={<span><Icon type='message' />评分评论</span>} key='comment'>
        {pack.description}
      </TabPane> */}
    </Tabs>
  )
}

export default DetailsContent

const styles = {
  content: {
    marginTop: 10
  }
}
