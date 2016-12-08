import Sequelize from 'sequelize';
import TaskDefinition from './task.jsx';

var models = [
    {
        name: 'Task',
        define: TaskDefinition
    }
];

var db = {};
db.sequelize = new Sequelize('projects', 'root', 'P@ssw0rd@123', {dialect: 'mysql'});
models.forEach(function(model){
    db[model.name] = model.define(db.sequelize, Sequelize.DataTypes);
});

export default db;
