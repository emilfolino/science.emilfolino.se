const db = require("../db/database.js");

const validate = {
    add: function(req, res) {
        if (req.body.aakronym && req.body.aakronym !== "") {
            db.run("INSERT INTO validate (aakronym, kmom, numberOfErrors)" +
                " VALUES (?, ?, ?)",
                req.body.aakronym,
                req.body.kmom,
                req.body.number_of_errors, (err) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "POST /validate",
                                title: "Database error",
                                detail: err.message
                            }
                        });
                    }

                    return res.status(201).json({
                        data: {
                            message: "Data was inserted"
                        }
                    });
                });
        } else {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/validate",
                    title: "no Anonymous acronym supplied",
                    detail: "no Anonymous acronym supplied"
                }
            });
        }
    },

    get: function(res) {
        db.all("SELECT aakronym, kmom, numberOfErrors as number_of_errors, stamp" +
            " FROM validate ORDER BY stamp ASC", (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "GET /validate",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.json( { data: rows } );
            });
    }
};

module.exports = validate;
