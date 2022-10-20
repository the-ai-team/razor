module.exports = {
  onPreBuild: ({ utils }) => {
    const currentProject = 'client';
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const projectHasChanged = projectChanged(
      currentProject,
      lastDeployedCommit,
      latestCommit,
    );
    if (!projectHasChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected by the latest changes`,
      );
    }
  },
};

const projectChanged = (currentProject, fromHash, toHash) => {
  const execSync = require('child_process').execSync;
  const getAffected = `nx print-affected --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();
  //get the list of changed projects from the output
  const changedProjects = JSON.parse(output).projects;
  if (changedProjects.find(project => project === currentProject)) {
    return true;
  } else {
    return false;
  }
};
