export default function(sequelize, DataTypes) {
      var Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods : {
      associate : function(models) {
          console.log('Associating ... Tasks');
      }
    }
  });

  return Task;
};

