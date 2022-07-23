# How to contribute:

Thank you for your interest in contributing to our project! We really appreciate your efforts. Below, we have listed
some rules and methods on how to contribute to the project that will ensure your changes are considered properly.

## Getting started:

Here is a basic overview of the workflow that we recommend you adhere to when trying to contribute to our repository:

1. Fork this repository and work on a feature you would like to implement/bug you would like to fix.
2. Once you have finished implementing your changes, and are satisfied with your work, send us a pull request.
3. After we receive your pull request, it will be reviewed to ensure your code meets our standards and once there are no
   issues, your changes can be merged into the repository!

### Step 1: Issue Creation

So, you've noticed an issue with the website, or have an idea for something you want to implement on our website. First
step is checking to see if someone else
already [raised the same issue](https://github.com/canvas-gamification/canvas-gamification-ui/issues).

If your issue is unique, then create an issue under
the [issues](https://github.com/canvas-gamification/canvas-gamification-ui/issues) tab of the repository while following
the appropriate template for your issue.

### Step 2: Fork the repository

Now that you have created an issue, fork the repository and make your changes to it. To learn more about forking, please
refer to Github's docs
on [forking a repository](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo).

Make sure that your system is set up for local development. You can refer to
the [README](https://github.com/canvas-gamification/canvas-gamification-ui#readme), or
the [Wiki](https://github.com/canvas-gamification/canvas-gamification-ui/wiki) to get started.

Make sure you write comprehensive unit tests for every feature you implement. Refer to
Angular's [official testing strategies](https://angular.io/guide/testing) and use the examples in the repositories to
build your tests. Testing strategies are different for [Components](https://angular.io/guide/testing-components-basics)
and for [Services](https://angular.io/guide/testing-services), so keep that in mind while writing tests for your code.

### Step 3: Make a Pull Request

So now you've implemented the feature or fixed the bug that you have raised an issue for. You're only a few steps away
from having your code merged into the master branch!

Before you make a pull request, make sure your code is solid and works on every browser/OS. Here's a brief checklist on
how you can make sure your code is up to standard:

- [ ] Make sure your code has the latest commits from `canvas-gamification-ui:master` and any merge conflicts are
  resolved
- [ ] Make sure your code is covered by Karma's coverage and is atleast yellow, but ideally green. Make sure you do the
  best you can to test all possible scenarios that might arise from your implementation.
- [ ] Make sure your code is linted through ESLint. To do so manually, enter `npm run lint` into a terminal window in
  the project's root folder. You should have no errors/warnings displayed on ESLint's report.
- [ ] Run unit tests on your code and make sure they all pass. To do so, type `npm run test` into a terminal window in
  the project's root folder.
- [ ] Ensure your code is free from unnecessary redundancies, and that you
  follow [Angular/TypeScript naming conventions and coding style](https://angular.io/guide/styleguide). There isn't a
  specific test for this that you can run, but we trust you to be responsible for this part :)
- [ ] Once you push your changes to the remote repository, you should see a Github Workflow being run. Ensure that your
  latest commit passes all checks in the workflow and you should be good to go!

**Note:** If you change the functionality of a feature in a way that makes the original tests for that feature fail,
then make sure to update the existing tests so that they accurately test the updated functionality that you implemented.

Once you have finished all of these tasks and are confident your code will work, you can submit a pull request from your
fork to our `master` branch. You have to fill out the pull request template and make sure you attach the appropriate
labels to the pull request as well.

Once you have submitted your pull request, all you have to do now is wait for one of our team members to review your
code, and make some comments if necessary. Once those comments are resolved, your code can be merged into `master` and
that's it!

### Done!

Thank you for your interest! We hope to see your changes soon!

Gamification Team <3
