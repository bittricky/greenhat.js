let childProcess = require('child_process');

/**
 * getCurrentDate Returns a String for a given date
 * @param  {Object} startDate the date object
 * @return {String}           the date string
 */
function getCurrentDate(startDate) {
  startDate.setDate(startDate.getDate() - 1);
  let dateStr = startDate.toString();
  let dateArr = dateStr.split(' ').slice(0, 5);
  let temp = dateArr[3];
  dateArr[3] = dateArr[4];
  dateArr[4] = temp;
  return `${dateArr.join(' ')} -0400`;
}

/**
 * commit returns the shell command to commit in git
 * @param  {String} currentDate the given date string
 * @return {String}             the commit string
 */
function commit(currentDate) {
	return "echo '"
		+ currentDate
		+ Math.floor((Math.random() * 1000000) + 1)
		+ "' > realwork.txt; git add realwork.txt; GIT_AUTHOR_DATE='"
		+ currentDate
		+ "' GIT_COMMITTER_DATE='"
		+ currentDate
		+ "' git commit -m 'update'; git push";
}

/**
 * main Commits with a random # of commits to a repository with this file
 */
function main() {
  let options = process.argv.slice(2);
  let n;
  let startDate;

  if (options.length < 1 || options.length > 2) {
    console.error('ERROR::: BAD INPUT');
  }

  n = parseInt(options[0]);
  startDate = options.length > 1 ? new Date(options[1]) : new Date();
  console.log('STARTING....');

  let i = 0;
  while (i <= n) {
    let currentDate = getCurrentDate(startDate)
    let numberCommits = Math.floor((Math.random() * 10) + 1);
    console.log('CONTRIBUTION FOR DATE: ', currentDate);
    for (let i = 0; i < numberCommits; i++) {
      cli = commit(currentDate);
      stdout = childProcess.execSync(cli, {
        encoding: 'UTF-8'
      });
    }

    i += 1
  }

  console.log('....DONE');
  cli = "git rm realwork.txt; git commit -m 'delete'; git push";

  stdout = childProcess.execSync(cli, {
      encoding: 'UTF-8'
  });

  console.log(stdout);
}

main();
