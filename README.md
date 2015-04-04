**No longer maintained**

# ACL Checker

This is a NodeJS module that allows you to setup roles/resources/permissions and then allows you to check to see if a role has a particular permission for a resource.

# Installation

You can install this using npm:

```
npm install acl-checker
```

# Quick Guide

First thing you need to do is create a instance of the ACL class:

```javascript
var AclChecker = require('acl-checker');
var acl = new AclChecker();
```

## Setup Allowable Permissions

Next you have to load roles/resources/permissions.  You can do this a few different way, all which use the `allow()` method.

### Strings

You can use simple strings where you pass the role, resource, and then permissions:

```javascript
acl.allow('guest', 'post', 'read');
```

This will give the `guest` roles the `read` permission on the `post` resources.

### Arrays

Same parameters as strings but using arrays.  It will give all the permissions to all the resources, for all the roles, for example:

```javascript
acl.allow([
  'blogger',
  'admin'
], [
  'post',
  'comment'
], [
  'create',
  'read'
]);
```

This will give the `blogger` and `admin` roles the `create` and `read` permissions for both the `post` and `comment` resources.

You can also mix and match strings and arrays:

```javascript
acl.allow([
  'blogger',
  'admin'
], 'post', [
  'create',
  'read'
]);
```

### Object

You can also use an object with `allow()`.  The object would be structure like:

```
roleName:
  resourceName:
    [permissions]
```

Defining however many you want, for example:

```javascript
var permissions = {
  guest: {
    post: [
      'read'
    ],
    comment: [
      'create',
      'read'
    ]
  },
  blogger: {
    post: [
      'create',
      'read',
      'update',
      'delete'
    ],
    comment: [
      'create',
      'read',
      'approve'
    ]
  },
  admin: {
    post: [
      'create',
      'read',
      'update',
      'delete'
    ],
    comment: [
      'create',
      'read',
      'update',
      'delete',
      'approve'
    ]
  }
};

acl.allow(permissions);
```

### Where Does The Data Come From?

This library is designed very specifically to handle the task of validating permissions on roles and resources, it does nothing with get or retrieving that data.

It is up to your application to prodive the data where it uses low level libraries like [node-mysql](https://github.com/felixge/node-mysql) or [node_redis](https://github.com/mranney/node_redis) or using an Object Mapper like [Simple ORM](https://github.com/simple-orm), [Bookshelf](http://bookshelfjs.org/), or [Mongoose](http://mongoosejs.com/) or a combination.  You have full control in how the ACL data is retrieve and stored.

## Removing Permissions

To remove permission, use the `removeAllow()` method which has the same structure as the `allow()` method.

```javascript
acl.removeAllow('guest', 'post', 'read');

acl.removeAllow('guest', [
  'post',
  'comment'
], 'read');

acl.removeAllow({
  guest: {
    post: [
      'read'
    ]
  }
});
```

## Checking Permission

To check if a permission is valid, use the either `isAllowed()` or `allIsAllowed()` method which has the same structure as the `allow()` method.

`isAllowed()` requires just one of the permission to be valid while `isAllAllowed()` requires all permissions to be valid.

```javascript
acl.isAllowed('guest', 'post', 'read');

acl.isAllowed('guest', [
  'post',
  'comment'
], 'read');

acl.allIsAllowed({
  guest: {
    post: [
      'read'
    ]
  }
});
```

# LICENSE

MIT
