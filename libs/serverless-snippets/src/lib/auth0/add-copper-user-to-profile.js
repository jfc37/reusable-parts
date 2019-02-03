function (user, context, callback) {
  const namespace = context.request.query.redirect_uri.replace('callback', '');
  context.idToken[namespace + 'user_metadata'] = user.user_metadata;
  context.idToken[namespace + 'app_metadata'] = user.app_metadata;
  callback(null, user, context);
}
