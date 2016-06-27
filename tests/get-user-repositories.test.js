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
  const state = {};

  it('should get username for user-id 7034093', (done) => {
    getUsersSinceId(7034093)
      .then(getFirst)
      .then((user) => state.username = user.login)
      .then(() => done())
      .catch(done);
  });

  it('should get first repository name', (done) => {
    expect(state.username).to.be.a('string', "No select user");
    getRepositoriesForUser(state.username)
      .then(repos => state.repos = repos)
      .then(getFirst)
      .then(repo => state.repo = repo.name)
      .then(() => done())
      .catch(done);
  });

  it('should get repository contributors', (done) => {
    expect(state.repo).to.be.a('string', "No selected repository");
    expect(state.username).to.be.an('string', "No selected user");
    getContributorsForRepository(state.username, state.repo)
      .then(contributors => contributors.should.have.length.above(0))
      .then(() => done())
      .catch(done);
  });
});
