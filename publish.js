
const ghpages = require('gh-pages');

const options =  {
    src: ['**/*', '.nojekyll'],
    repo: 'https://github.com/rolandbernard/marvin.git',
};

ghpages.publish('build', options, err => {
    if (err) {
        console.log(err);
    }
});

