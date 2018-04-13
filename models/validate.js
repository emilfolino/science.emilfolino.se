const validate = {
    add: function(req, res) {
        if (req.body.aakronym) {
            let timestamp = Math.floor(new Date() / 1000);

            return res.status(201).json({
                data: {
                    message: "Inserted validate data with timestamp: " + timestamp
                }
            });
        }

        return res.status(500).json({
            errors: {
                status: 500,
                source: "/validate",
                title: "no Anonymous acronym supplied",
                detail: "no Anonymous acronym supplied"
            }
        });
    }
};

module.exports = validate;
