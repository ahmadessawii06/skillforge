'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.addColumn('CVs', 'filePath', {
            type: DataTypes.STRING
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('CVs', 'filePath');
    }
};