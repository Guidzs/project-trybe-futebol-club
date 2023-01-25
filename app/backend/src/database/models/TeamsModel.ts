import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});
