const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('user').execute('read').on('actors');


ac.grant('admin').execute('create').on('actor');
ac.grant('admin').execute('read').on('actors');
ac.grant('admin').execute('read').on('actor');
ac.grant('admin').execute('update').on('actor');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('actor');

 exports.readAll = (requester) =>
 ac.can(requester.role).execute('read').sync().on('actors');
 exports.read = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('read').sync().on('actor');
 exports.update = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('update').sync().on('actor');
 exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.id, owner:data}).execute('delete').sync().on('actor');
  exports.create = (requester) =>
 ac.can(requester.role).execute('create').sync().on('actor');