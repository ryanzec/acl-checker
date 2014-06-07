var AclChecker = require('../lib');
var expect = require('chai').expect;

describe('acl checker', function() {
  describe('checking permissions', function() {
    describe('invalidate', function() {
      it('unset permissions', function*() {
        var acl = new AclChecker();
        var results = acl.isAllowed('guest', 'post', 'read');

        expect(results).to.be.false;
      });

      it('all of many permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed('guest', 'post', [
          'create',
          'delete'
        ])).to.be.false;
      });

      it('one of many permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed('guest', 'post', [
          'create',
          'update'
        ])).to.be.false;
      });

      it('all of many resources/permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed('guest', [
          'post',
          'comment'
        ], [
          'create',
          'delete'
        ])).to.be.false;
      });

      it('one of many resources/permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed('guest', [
          'post',
          'comment'
        ], [
          'create',
          'update'
        ])).to.be.false;
      });

      it('all of many roles/resources/permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'create',
          'delete'
        ])).to.be.false;
      });

      it('one of many role/resources/permissions are unset', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'create',
          'update'
        ])).to.be.false;
      });

      it('all of many roles/resources/permissions are unset by object', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed({
          guest: {
            post: [
              'create',
              'delete'
            ],
            comment: [
              'create',
              'delete'
            ]
          },
          blogger: {
            post: [
              'create',
              'delete'
            ],
            comment: [
              'create',
              'delete'
            ]
          }
        })).to.be.false;
      });

      it('one of many role/resources/permissions are unset by object', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed({
          guest: {
            post: [
              'create',
              'update'
            ],
            comment: [
              'create',
              'delete'
            ]
          },
          blogger: {
            post: [
              'create',
              'delete'
            ],
            comment: [
              'create',
              'delete'
            ]
          }
        })).to.be.false;
      });
    });

    describe('validate', function() {
      it('set permission', function*() {
        var acl = new AclChecker();

        acl.allow('guest', 'post', 'read');

        expect(acl.isAllowed('guest', 'post', 'read')).to.be.true;
      });

      it('one of many permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed('guest', 'post', [
          'read',
          'delete'
        ])).to.be.true;
      });

      it('all of many permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed('guest', 'post', [
          'read',
          'update'
        ])).to.be.true;
      });

      it('one of many resources/permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed('guest', [
          'post',
          'comment'
        ], [
          'read',
          'delete'
        ])).to.be.true;
      });

      it('all of many resources/permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed('guest', [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ])).to.be.true;
      });

      it('one of many roles/resources/permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'delete'
        ])).to.be.true;
      });

      it('all of many role/resources/permissions are set', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ])).to.be.true;
      });

      it('one of many roles/resources/permissions are set by object', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.isAllowed({
          guest: {
            post: [
              'read',
              'delete'
            ],
            comment: [
              'create',
              'delete'
            ]
          },
          blogger: {
            post: [
              'create',
              'delete'
            ],
            comment: [
              'create',
              'delete'
            ]
          }
        })).to.be.true;
      });

      it('all of many role/resources/permissions are set by object', function*() {
        var acl = new AclChecker();

        acl.allow([
          'guest',
          'blogger'
        ], [
          'post',
          'comment'
        ], [
          'read',
          'update'
        ]);

        expect(acl.allIsAllowed({
          guest: {
            post: [
              'read',
              'update'
            ],
            comment: [
              'read',
              'delete'
            ]
          },
          blogger: {
            post: [
              'read',
              'delete'
            ],
            comment: [
              'read',
              'delete'
            ]
          }
        })).to.be.true;
      });
    });
  });

  describe('adding permissions', function() {
    it('should be able to work with strings', function*() {
      var acl = new AclChecker();

      acl.allow('guest', 'post', 'read');

      expect(acl.getRoleResourcePermissions('guest', 'post')).to.deep.equal([
        'read'
      ]);
    });

    it('should be able to work with arrays', function*() {
      var acl = new AclChecker();

      acl.allow([
        'guest',
        'blogger'
      ], [
        'post',
        'comment'
      ], [
        'read',
        'update'
      ]);

      expect(acl.getRoleResourcePermissions('guest', 'post')).to.deep.equal([
        'read',
        'update'
      ]);
      expect(acl.getRoleResourcePermissions('blogger', 'comment')).to.deep.equal([
        'read',
        'update'
      ]);
      expect(acl.getRoleResourcePermissions('guest', 'post')).to.deep.equal([
        'read',
        'update'
      ]);
      expect(acl.getRoleResourcePermissions('blogger', 'comment')).to.deep.equal([
        'read',
        'update'
      ]);
      expect(acl.getRoleResourcePermissions('guest', 'post')).to.deep.equal([
        'read',
        'update'
      ]);
      expect(acl.getRoleResourcePermissions('blogger', 'comment')).to.deep.equal([
        'read',
        'update'
      ]);
    });

    it('should be able to work with an object', function*() {
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
      var acl = new AclChecker();

      acl.allow(permissions);

      expect(acl.isAllowed('guest', 'post', 'read')).to.be.true;
      expect(acl.isAllowed('blogger', 'comment', 'approve')).to.be.true;
      expect(acl.isAllowed('admin', 'comment', 'delete')).to.be.true;

      expect(acl.isAllowed('guest', 'post', 'create')).to.be.false;
      expect(acl.isAllowed('blogger', 'comment', 'delete')).to.be.false;
    });
  });

  describe('removing permissions', function() {
    it('should be able to work with strings', function*() {
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
      var acl = new AclChecker();

      acl.allow(permissions);
      acl.removeAllow('guest', 'post', 'read');
      acl.removeAllow('blogger', 'comment', 'approve');
      acl.removeAllow('admin', 'comment', 'delete');

      expect(acl.isAllowed('guest', 'post', 'read')).to.be.false;
      expect(acl.isAllowed('blogger', 'comment', 'approve')).to.be.false;
      expect(acl.isAllowed('admin', 'comment', 'delete')).to.be.false;
    });

    it('should be able to work with arrays', function*() {
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
      var removePermissions = {
        guest: {
          post: [
            'read'
          ]
        },
        blogger: {
          comment: [
            'approve'
          ]
        },
        admin: {
          comment: [
            'delete'
          ]
        }
      };
      var acl = new AclChecker();

      acl.allow(permissions);
      acl.removeAllow([
        'guest',
        'blogger',
        'admin'
      ], [
        'post',
        'comment'
      ], [
        'read',
        'approve'
      ]);

      expect(acl.isAllowed('guest', 'post', 'read')).to.be.false;
      expect(acl.isAllowed('blogger', 'comment', 'approve')).to.be.false;
      expect(acl.isAllowed('admin', 'comment', 'delete')).to.be.false;
    });

    it('should be able to work with an object', function*() {
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
      var removePermissions = {
        guest: {
          post: [
            'read'
          ]
        },
        blogger: {
          comment: [
            'approve'
          ]
        },
        admin: {
          comment: [
            'delete'
          ]
        }
      };
      var acl = new AclChecker();

      acl.allow(permissions);
      acl.removeAllow(removePermissions);

      expect(acl.isAllowed('guest', 'post', 'read')).to.be.false;
      expect(acl.isAllowed('blogger', 'comment', 'approve')).to.be.false;
      expect(acl.isAllowed('admin', 'comment', 'delete')).to.be.false;
    });
  });

  describe ('getting permissions', function() {
    it('should return undefined when trying to get user resources', function*() {
      var acl = new AclChecker();

      expect(acl.getRoleResourcePermissions('guest')).to.be.undefined;
    });

    it('should return undefined when trying to get unset permissions', function*() {
      var acl = new AclChecker();

      expect(acl.getRoleResourcePermissions('guest', 'post')).to.be.undefined;
    });

    it('should return resources and permission when passing a role', function*() {
      var acl = new AclChecker();
      acl.allow({
        blogger: {
          post: [
            'create',
            'read',
            'update'
          ],
          comment: [
            'create',
            'read',
            'approve'
          ]
        }
      });

      expect(acl.getRoleResourcePermissions('blogger')).to.deep.equal({
        post: [
          'create',
          'read',
          'update'
        ],
        comment: [
          'create',
          'read',
          'approve'
        ]
      });
    });

    it('should return permission when passing a role and resource', function*() {
      var acl = new AclChecker();
      acl.allow({
        blogger: {
          post: [
            'create',
            'read',
            'update'
          ],
          comment: [
            'create',
            'read',
            'approve'
          ]
        }
      });

      expect(acl.getRoleResourcePermissions('blogger', 'comment')).to.deep.equal([
        'create',
        'read',
        'approve'
      ]);
    });
  });
});
