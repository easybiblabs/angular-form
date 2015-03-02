var fs = require('fs');

gulp = require('gulp');
paths = {
  'src': './src/'
};

fs.readdirSync('./gulp/tasks/').forEach(function(task) {
  require('./tasks/' + task);
});
