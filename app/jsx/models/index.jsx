import Sequelize from 'sequelize';
import TaskDefinition from './task.jsx';

var db = {};
db.sequelize = new Sequelize('projects', 'root', 'P@ssw0rd@123', {dialect: 'mysql'});
db.Task = TaskDefinition(db.sequelize, Sequelize.DataTypes);
db.Task.associate(db);

export default db;
