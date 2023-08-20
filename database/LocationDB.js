const database = require('./database.js')

const getLocations = (idUser, callback) => {
    const query = "SELECT d.*, MAX(IFNULL(y.idUser = ?, 0)) AS isFavourite FROM diadiem d LEFT JOIN yeuthich y ON d.id = y.idDiaDiem WHERE d.hienThi = 'True' GROUP BY d.id";
    database.connection.query(query, [idUser], function (err, result, fields) {
        if (err) {
            return callback(err, null);
        }

        return callback(null, result);
    })
}

const getFavouriteLocations = (idUser, callback) => {
    const query = "SELECT d.*, IFNULL(y.idUser = ?, 0) AS isFavourite FROM diadiem d INNER JOIN yeuthich y ON d.id = y.idDiaDiem where y.idUser = ? AND d.hienThi = 'True'"
    database.connection.query(query, [idUser, idUser], function (err, result, fields) {
        if (err) {
            return callback(err, null);
        }

        return callback(null, result);
    })
}

const removeFavouriteLocation = (idUser, idLocation, callback) => {
    const query = 'DELETE FROM yeuthich WHERE idUser = ? and idDiaDiem = ?'
    database.connection.query(query, [idUser, idLocation], function (err, result, fields) {
        if (err) {
            return callback(err, null);
        }

        return callback(null, { status: result.affectedRows > 0 })
    });
}

const addFavouriteLocation = (idUser, idLocation, callback) => {
    const query = 'INSERT INTO yeuthich (idUser, idDiaDiem) VALUES (?, ?)'
    database.connection.query(query, [idUser, idLocation], function (err, result, fields) {
        if (err) {
            return callback(err, null);
        }

        return callback(null, { status: result.affectedRows > 0 })
    });
};

module.exports = {
    getLocations,
    getFavouriteLocations,
    removeFavouriteLocation,
    addFavouriteLocation
}