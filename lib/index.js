var _ = require('lodash');

var AclChecker = function() {
  var lists = {};

  function makeArray(item) {
    return _.isArray(item) ? item : [item];
  };

  function addPermissionsToRoleResource(role, resource, permissions) {
    if(!lists[role] || !lists[role][resource]) {
      if(!lists[role]) {
        lists[role] = {};
      }

      lists[role][resource] = [];
    }
    lists[role][resource] = _.union(lists[role][resource], permissions);
  };

  function removePermissionsFromRoleResource(role, resource, permissions) {
    if(!lists[role] || !lists[role][resource]) {
      return;
    }

    lists[role][resource] = _.remove(lists[role][resource], function(permission) {
      permissions.indexOf(permission) === -1;
    });
  };

  function arrayAllow(roles, resources, permissions) {
    roles = makeArray(roles);
    resources = makeArray(resources);
    permissions = makeArray(permissions);

    roles.forEach(function(role) {
      resources.forEach(function(resource) {
        addPermissionsToRoleResource(role, resource, permissions);
      })
    });
  };

  function objectAllow(permissions) {
    if(_.isObject(permissions)) {
      _.forEach(permissions, function(resources, role) {
        _.forEach(resources, function(permissions, resource) {
          addPermissionsToRoleResource(role, resource, permissions);
        });
      });
    }
  };

  function arrayRemoveAllow(roles, resources, permissions) {
    roles = makeArray(roles);
    resources = makeArray(resources);
    permissions = makeArray(permissions);

    roles.forEach(function(role) {
      resources.forEach(function(resource) {
        removePermissionsFromRoleResource(role, resource, permissions);
      })
    });
  };

  function objectRemoveAllow(permissions) {
    if(_.isObject(permissions)) {
      _.forEach(permissions, function(resources, role) {
        _.forEach(resources, function(permissions, resource) {
          removePermissionsFromRoleResource(role, resource, permissions);
        });
      });
    }
  };

  function getRoleResourcePermissions(role, resource) {
    if(!lists[role] || (resource && !lists[role][resource])) {
      return undefined;
    }

    if(resource) {
      return lists[role][resource];
    } else {
      return lists[role];
    }
  };

  function arrayIsAllowed(roles, resources, permissions, all) {
    roles = makeArray(roles);
    resources = makeArray(resources);
    permissions = makeArray(permissions);

    var isValid;

    roles.forEach(function(role) {
      resources.forEach(function(resource) {
        permissions.forEach(function(permission) {
          if(isValid === true || (all === true && isValid === false)) {
            return;
          }

          if(lists[role] && lists[role][resource]) {
            isValid = lists[role][resource].indexOf(permission) !== -1;
          } else {
            isValid = false;
          }
        });
      });
    });

    return isValid;
  };

  function objectIsAllowed(permissions, all) {
    var isValid;

    _.forEach(permissions, function(resources, role) {
      _.forEach(resources, function(permissions, resource) {
        _.forEach(permissions, function(permission) {
          if(isValid === true || (all === true && isValid === false)) {
            return;
          }

          if(lists[role] && lists[role][resource]) {
            isValid = lists[role][resource].indexOf(permission) !== -1;
          } else {
            isValid = false;
          }
        });
      });
    });

    return isValid;
  };

  this.allow = function(roles, resources, permissions) {
    if(_.isArray(roles) || _.isString(roles)) {
      arrayAllow(roles, resources, permissions);
    } else {
      objectAllow(roles);
    }
  };

  this.removeAllow = function(roles, resources, permissions) {
    if(_.isArray(roles) || _.isString(roles)) {
      arrayRemoveAllow(roles, resources, permissions);
    } else {
      objectRemoveAllow(roles);
    }
  };

  this.isAllowed = function(roles, resources, permission) {
    if(_.isArray(roles) || _.isString(roles)) {
      return arrayIsAllowed(roles, resources, permission, false);
    } else {
      return objectIsAllowed(roles, false);
    }
  };

  this.allIsAllowed = function(roles, resources, permission) {
    if(_.isArray(roles) || _.isString(roles)) {
      return arrayIsAllowed(roles, resources, permission, true);
    } else {
      return objectIsAllowed(roles, true);
    }
  };

  this.getRoleResourcePermissions = function(role, resource) {
    return getRoleResourcePermissions(role, resource);
  };

  return this;
};

module.exports = AclChecker;
