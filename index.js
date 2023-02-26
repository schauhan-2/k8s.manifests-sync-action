const core = require('@actions/core')
const github = require('@actions/github')


const main = async() => {
    try {
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const token = core.getInput('token', { required: true });
        const filePath = 'https://github.com/schauhan-2/k8s.manifests-sync-action/blob/main/README.md'
        const context = github.context;
        const message = 'This is made by the action bot.'

        const octokit = new github.getOctokit({
            auth: token
          })

        let commitList = await octokit.request('GET /repos/{owner}/{repo}/commits?path={filePath}', {
            owner: owner,
            repo: repo,
            filePath: filePath,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        
        console.log("Hello")

        const new_comment = octokit.issues.createComment({
            ...context.repo,
            issue_number: context.payload.issue_number,
            body: message
        });

        console.log("Jello")
         
    } catch (error) {
      core.setFailed(error.message);
    }
}

main();