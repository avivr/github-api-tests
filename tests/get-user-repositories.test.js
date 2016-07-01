const chai = require('chai');
const { assert, expect } = chai;
chai.should();

const {
  getFirst,
  getUsersSinceId,
  getRepositoriesForUser,
  getContributorsForRepository,
} = require('./api-units');

describe("Verify user\'s repository has any contributor", function() {
  this.timeout(5000);
  this.slow(1000);

  const state = {};
  state.passed = true;

  afterEach(function() {
    state.passed = state.passed &&
    (this.currentTest.state === "passed");
  });

  beforeEach(function() {
    if (!state.passed) {
      return this.currentTest.skip();
    }
  });

  it('should get username for user-id 7034093', function() {
    return getUsersSinceId(7034093)
      .then(getFirst)
      .then((user) => state.username = user.login);
  });

  it('should get first repository name', function() {
    return getRepositoriesForUser(state.username)
      .then(repos => state.repos = repos)
      .then(getFirst)
      .then(repo => state.repo = repo.name);
  });

  it('should get repository contributors', function() {
    return getContributorsForRepository(state.username, state.repo)
      .then(contributors => contributors.should.have.length.above(0));
  });
});
