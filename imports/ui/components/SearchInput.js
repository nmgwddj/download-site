import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Input, AutoComplete, Button, Icon } from 'antd'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter } from 'react-router-dom'
import { withHandlers, withState, compose } from 'recompose'
import _ from 'lodash'

import Packages from '../../api/packages/packages'
import Types from '../../api/types/types'

const { Option } = AutoComplete

const SearchInput = ({ isReady, types, packages, onChange, onSearch }) => {
  const dataSource = isReady ? packages.map(pack => (
    <Option key={pack._id} text={pack.title}>
      {pack.title}
      <span className='global-search-item-count'>{_.find(types, { _id: pack.type }).name}</span>
    </Option>
  )) : []

  return (
    <div style={styles.searchContainer}>
      <h1 style={styles.description}>针对技术人员的软件下载，让下载更专注</h1>
      <AutoComplete
        className='global-search'
        size='large'
        style={styles.searchInput}
        dataSource={dataSource}
        onChange={onChange}
        onSelect={onSearch}
        placeholder='搜索你想要的工具'
        optionLabelProp='text'
        defaultActiveFirstOption={false}
      >
        <Input
          suffix={(
            <Button className='search-btn' size='large' type='primary'>
              <Icon type='search' />
            </Button>
          )}
        />
      </AutoComplete>
    </div>
  )
}

export default compose(
  withRouter,
  withState('searchTerm', 'setSearchTerm', null),
  withHandlers({
    onChange: ({ setSearchTerm }) => (value) => {
      setSearchTerm(value)
    },
    onSearch: ({ history, location }) => (value, option) => {
      if (value) {
        const { text } = option.props
        history.replace(`${location.pathname}?searchTerm=${encodeURIComponent(text)}`)
      } else {
        history.replace(`${location.pathname}`)
      }
    }
  }),
  withTracker(({ searchTerm }) => {
    const handlePackages = Meteor.subscribe('packages.all', searchTerm, 10)
    const handleTypes = Meteor.subscribe('types.all')
    const query = {}

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')
      Object.assign(query, {
        title: regex
      })
    }

    return {
      isReady: handlePackages.ready() && handleTypes.ready(),
      packages: Packages.find(query, { limit: 10 }).fetch(),
      types: Types.find().fetch()
    }
  })
)(SearchInput)

const styles = {
  searchContainer: {
    marginBottom: 20
  },
  description: {
    fontWeight: 300,
    marginBottom: 20,
    textAlign: 'center'
  },
  searchInput: {
    width: 768,
    marginLeft: 185
  }
}
