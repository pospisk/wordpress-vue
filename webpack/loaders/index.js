const loaders = [
    require('./vue'), 
    require('./babel'), 
    require('./postcss'), 
    require('./files'), 
    require('./fonts'),
    {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
    }
];

module.exports = loaders;
