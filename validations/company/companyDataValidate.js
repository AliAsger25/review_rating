const companyValSchema = require("../company/companyValSchema")
const { unlinkSync } = require("fs");

module.exports = {
    registerCompanyValidation: async (req, res, next) => {
        const value = await companyValSchema.companySchema.registerCompany.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            req.file ? unlinkSync(req.file.path) : null;
            next()
        }
    },
}
