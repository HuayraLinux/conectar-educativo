import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:network', 'Unit | Service | network', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);

  return new Ember.RSVP.Promise((success) => {
    let url = "ftp://speedtest:speedtest@ftp.otenet.gr/test1Mb.db";

    service.download(url,
      (progress) => {
        console.log(progress);
      }, (/*result*/) => {
        success();
      });

  });
});
