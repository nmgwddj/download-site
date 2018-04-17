import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { Card, Icon, Rate } from 'antd'

import Users from '../../api/users/users'

const { Meta } = Card

const PackageCard = ({ isReady, user, packageId, title, imageUrl, author, downloadTotal, rating = 5 }) => {
  const cover = <div style={styles.cover}>
    <img
      style={styles.image}
      src={imageUrl || '/images/default_icon.png'}
    />
  </div>

  const description = <div>
    <div style={styles.container}>
      <span style={styles.author}>{isReady ? user.username : ''}</span>
      <span style={styles.installs}>
        <Icon style={styles.icon} type='cloud-download' />{downloadTotal}
      </span>
    </div>
    <Rate style={styles.rating} disabled defaultValue={rating} />
  </div>

  return (
    <Link to={`/details/${packageId}`}>
      <Card
        hoverable
        loading={!isReady}
        style={styles.card}
        bodyStyle={styles.body}
        cover={cover}
      >
        <Meta
          style={styles.meta}
          title={<span style={styles.title}>{title}</span>}
          description={description}
        />
      </Card>
    </Link>
  )
}

export default withTracker(({ author }) => {
  const handleUser = Meteor.subscribe('users.one', author)
  const user = Users.findOne(author)
  return {
    isReady: handleUser.ready(),
    user
  }
})(PackageCard)

const styles = {
  card: {
    width: 182,
    float: 'left',
    marginRight: 10,
    marginTop: 16,
    marginLeft: 1
  },
  cover: {
    textAlign: 'center',
    height: 108,
    lineHeight: '70px',
    padding: '16px 0'
  },
  image: {
    position: 'relative',
    top: 1,
    backgroundSize: 'cover',
    maxWidth: '85%',
    maxHeight: 72
  },
  body: {
    padding: '0 10px 10px 10px'
  },
  meta: {

  },
  title: {
    display: 'block',
    textAlign: 'center',
    color: 'inherit',
    fontWeight: 600
  },
  container: {
    overflow: 'auto'
  },
  author: {
    fontSize: 12,
    float: 'left',
    color: '#767676'
  },
  installs: {
    fontSize: 12,
    float: 'right',
    color: '#767676'
  },
  icon: {
    marginRight: 3
  },
  rating: {
    fontSize: 9,
    marginBottom: 12
  }
}
