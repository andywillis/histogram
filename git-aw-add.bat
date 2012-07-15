git add .
git commit -m %1
git remote rm origin
git remote add origin git@github-public:andywillis/histogram.git
git push -u origin master