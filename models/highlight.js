const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");
const initHighlightModel = (sequelize, DataTypes) => {
	const Highlight = sequelize.define(
		"Highlight",
		{
			num: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			bookId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			pageNum: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			text: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			startContainer: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			endContainer: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			startOffset: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			endOffset: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
			underscored: false,
			paranoid: true,
			charset: "utf8",
			collate: "utf8_general_ci",
			indexes: [
				{
					fields: ["pageNum"],
				},
			],
		}
	);

	Highlight.associate = (models) => {
		Highlight.belongsTo(models.Book, { foreignKey: "bookId", targetKey: "id" });
		Highlight.belongsToMany(models.User, { through: "User_Highlight" });
	};

	// Highlight.sync({ force: true })
	// 	.then(() => {
	// 		console.log("Highlight table created");
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error creating Highlight table", error);
	// 	});
	// Highlight.sync({ alter: true });

	return Highlight;
};

module.exports = initHighlightModel(sequelize, DataTypes);
