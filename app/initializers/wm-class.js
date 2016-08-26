export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  requireNode('nwjs-hack').set_wmclass('conectar-educativo', true);
}

export default {
  name: 'wm-class',
  initialize
};
