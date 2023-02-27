import { publish } from 'gh-pages';

publish(
    'build',
    {
        branch: 'gh-pages',
        repo: 'git@github.com:leocaseiro/groove-score.git',
        user: {
            name: 'Leo Caseiro',
            email: 'leobok@gmail.com'
        },
        dotfiles: true
    },
    () => {
        console.log('deploy oh gh-pages complete!');
        console.log('Go to https://leocaseiro.github.io/groove-score/');
    }
);
