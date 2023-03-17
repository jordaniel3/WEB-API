const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('user').execute('read').on('reviews');


ac.grant('admin').execute('create').on('review');
ac.grant('admin').execute('read').on('reviews');
ac.grant('admin').execute('read').on('review');
ac.grant('admin').execute('update').on('review');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('review');

 exports.readAll = (requester) =>
 ac.can(requester.role).execute('read').sync().on('reviews');
 exports.read = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('read').sync().on('review');
 exports.update = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('update').sync().on('review');
 exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.id, owner:data}).execute('delete').sync().on('review');
  exports.create = (requester) =>
 ac.can(requester.role).execute('create').sync().on('review');