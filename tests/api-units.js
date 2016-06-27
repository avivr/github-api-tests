const chai = require('chai');
const request = require("supertest-as-promised");
const { assert, expect } = chai;
chai.should();

const baseRequest = request('https://api.github.com');

function getUsersSinceId(userId) {
  return baseRequest
    .get(`/users?since=${userId}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(function(result) {
      const users = result.body;
      expect(users).to.be.an('Array', "Couldn't get users");
      return users;
    });
}

const getFirst = items => items[0];

function getRepositoriesForUser(username) {
  return baseRequest
    .get(`/users/${username}/repos`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(function(result) {
      const repos = result.body;
      expect(repos).to.be.an('Array', "Couldn't get repositories");
      return repos;
    });
}

function getContributorsForRepository(username, repository) {
  return baseRequest
    .get(`/repos/${username}/${repository}/contributors`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(function(result) {
      const contributors = result.body;
      expect(contributors).to.be.an('Array', "Couldn't get contributors");
      return contributors;
    });
}

module.exports = {
  getFirst,
  getUsersSinceId,
  getRepositoriesForUser,
  getContributorsForRepository,
};
