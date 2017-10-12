import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
  input: 'src/main-aot.js',
  output: {
    file: 'aot/dist/build.js', // output a single application bundle
    format: 'iife'
  }, 
  sourceMap: false,
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: [
          'node_modules/rxjs/**',
          'node_modules/angular2-jwt/**',
          'node_modules/graphql/**',
          'node_modules/graphql-tag/**',
          'node_modules/graphql-anywhere/**',
          'node_modules/apollo-link-core/**',
          'node_modules/apollo-client/**',
          'node_modules/ts-md5/**',
          'node_modules/is-retina/**'
        ]
      }),
      uglify()
  ]
};