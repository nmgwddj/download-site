import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, withRouter, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Modal } from 'antd'
import { compose, withHandlers } from 'recompose'

import Types from '../../api/types/types'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Upload from '../pages/Upload'
import List from '../pages/List'
import Details from '../pages/Details'

import SearchInput from '../components/SearchInput'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

const MainLayout = ({ login, user, isReady, types, location, linkTo }) => {
  if (login) {
    return (
      <Route path='/login' render={() => <Login user={user} />} />
    )
  } else {
    return (
      <Layout id='main_layout' style={location.pathname.indexOf('/details') !== -1 ? { backgroundColor: '#FFF' } : {}}>
        <Header>
          <Link to='/'>
            <div style={styles.logo} className='logo'>
              <span style={styles.title}>当漏</span>
            </div>
          </Link>
          <Menu
            theme='dark'
            mode='horizontal'
            selectedKeys={[location.pathname]}
            defaultSelectedKeys={['/']}
            style={styles.menu}
            onClick={linkTo}
          >
            <Menu.Item key='/'>站点首页</Menu.Item>
            { isReady ? types.map(type => (
              <Menu.Item key={`/${type.slug}`}>{type.name}</Menu.Item>
            )) : null}
            { user ? null : <Menu.Item key='/login' style={styles.login}>
              <span><Icon type='upload' />我要上传</span>
            </Menu.Item> }
            { user ? <SubMenu title={<span><Icon type='user' />{user.username}</span>} style={styles.login}>
              <Menu.Item key='/packageAdd'>上传软件</Menu.Item>
              <Menu.Item key='logout'>退出登录</Menu.Item>
            </SubMenu> : null }
          </Menu>
        </Header>
        <Content style={styles.content}>
          { location.pathname !== '/packageAdd' &&
            location.pathname.indexOf('/details') === -1 &&
            location.pathname.indexOf('/packageEdit') === -1
            ? <SearchInput /> : null }
          <Route exact path='/' render={() => <Home user={user} />} />
          <Route path='/details/:packageId' render={() => <Details user={user} />} />
          <Route path='/packageAdd' render={() => <Upload user={user} />} />
          <Route path='/packageEdit/:packageId' render={() => <Upload user={user} />} />
          { isReady ? types.map(type => (
            <Route key={type._id} path={`/${type.slug}`} render={() => <List user={user} typeId={type._id} />} />
          )) : null}
        </Content>
        <Footer style={styles.footer}>
          <Link to='/'>当漏</Link> ©2018 Created by <a href='https://www.meteor.com/' target='_blank'>Meteor</a>
        </Footer>
      </Layout>
    )
  }
}

export default compose(
  withRouter,
  withHandlers({
    linkTo: ({ history }) => (item, key, keyPath) => {
      if (item.key === 'logout') {
        Meteor.logout()
        history.push('/')
      } else if (item.key === '/login') {
        Modal.info({
          title: '该功能即将开放，请耐心等待',
          content: (
            <div>
              <p>自定义上传功能正在开发测试中</p>
              <p>请耐心等待，我们将以最快的时间发布该功能</p>
            </div>
          ),
          onOk () {}
        })
      } else {
        history.push(item.key)
      }
    }
  }),
  withTracker(({ location }) => {
    const handleUser = Meteor.subscribe('users.current')
    const handleTypes = Meteor.subscribe('types.all')
    return {
      isReady: handleTypes.ready() && handleUser.ready(),
      login: location.pathname === '/login',
      types: Types.find().fetch(),
      user: Meteor.user()
    }
  })
)(MainLayout)

const styles = {
  logo: {
    width: 120,
    height: 32,
    lineHeight: '32px',
    backgroundSize: '32px 32px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url('/images/logo.png')",
    margin: '16px 24px 0 0',
    float: 'left'
  },
  title: {
    paddingLeft: 45,
    fontSize: 22,
    color: '#FFF'
  },
  menu: {
    width: 1160,
    margin: '0 auto',
    lineHeight: '64px'
  },
  content: {
    width: 1160,
    margin: '0 auto',
    marginTop: 30,
    backgrounColor: '#1e1e1e'
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#FFF'
  },
  login: {
    float: 'right',
    height: 64
  }
}
