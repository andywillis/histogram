git add .
git commit -m %1
git remote rm origin
git remote add origin git@github.com:urbanwhaleshark/histogram.git
git push -u origin master