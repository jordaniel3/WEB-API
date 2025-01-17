const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
 .on('user', ['*', '!password', '!passwordSalt']);
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update')
 .on('user', ['firstName', 'lastName', 'username', 'password']);
 ac.grant('user').condition({Fn:'EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('user');

ac.grant('admin').execute('read').on('user');
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('update').on('user');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('user');

 exports.readAll = (requester) =>
 ac.can(requester.role).execute('read').sync().on('Users');
 exports.read = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('read').sync().on('user');
 exports.update = (requester, data) =>
 ac.can(requester.role).context({requester:requester.id, owner:data}).execute('update').sync().on('user');
 exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.id, owner:data}).execute('delete').sync().on('user');