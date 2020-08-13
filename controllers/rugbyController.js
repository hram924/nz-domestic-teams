const fs = require('fs');

const teams = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/rugbyteams.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`team id is: ${val}`);

  if (req.params.id * 1 > teams.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTeams = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: teams.length,
    data: {
      teams
    }
  });
};

exports.getTeams = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const team = teams.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      team
    }
  });
};

exports.createteam = (req, res) => {

  const newId = team[team.length - 1].id + 1;
  const newTeam = Object.assign({ id: newId }, req.body);

  teams.push(newteam);

  fs.writeFile(
    `${__dirname}/dev-data/data/teams-simple.json`,
    JSON.stringify(teams),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          team: newteam
        }
      });
    }
  );
};

exports.updateteam = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      team: '<Updated team here...>'
    }
  });
};

exports.deleteteam = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
