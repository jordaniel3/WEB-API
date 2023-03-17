const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('user').execute('read').on('movies');

ac.grant('admin').execute('create').on('movie');
ac.grant('admin').execute('read').on('movies');
ac.grant('admin').execute('read').on('movie');
ac.grant('admin').execute('update').on('movie');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('movie');

 exports.readAll = (requester) =>
 ac.can(requester.role).execute('read').sync().on('movies');
 exports.read = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('read').sync().on('movie');
 exports.update = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('update').sync().on('movie');
 exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.id, owner:data}).execute('delete').sync().on('movie');
  exports.create = (requester) =>
 ac.can(requester.role).execute('create').sync().on('movie');