Package.describe({
  name: 'jorisroling:isotope',
  summary: 'Meteor implementation of Isotope',
  version: '1.0.1',
  git: 'https://github.com/jorisroling/meteor-isotope.git'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.1");
  api.use(
      [
        'templating',
        'underscore@1.0.0',
        'isotope:isotope@2.1.0_1',
        'mrt:jquery-imagesloaded@0.0.2'
      ]
  );
  api.add_files([
      'isotope.html',
      'isotope.js',
      'isotope.css'
    ], 'client'
  );
});
