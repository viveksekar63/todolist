/**
 * Models
 */
const Activity = require('../models/Activity');

/**
 * POST /activity/add
 * Create an activity.
 */
exports.createActivity = (req, res, next) => {
    const { activityName, style, activityStatus } = req.body;
    const newActivityObj = { activityName, style, activityStatus };
    const newActivity = new Activity(newActivityObj);
    newActivity.save((saveErr) => {
        if (saveErr) {
            return res.status(412).send({
                success: false,
                message: saveErr
            })
        }
        return res.status(200).json({
            success: true,
            message: "Activity created successful"
        });
    });
};

/**
 * GET /activity/:activityId
 * Find Activity based on id
 */
exports.getById = (req, res) => {
    Activity.findByActivityId(req.params.activityId).then((result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        return res.status(200).send({ status: false });
    });
};

/**
 * GET /activities
 * Get All activity List
 */
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Activity.list(limit, page).then((result) => {
        return res.status(200).send(result);
    })
};

/**
* DELETE /activity/:activityId
* Remove activity based on Activity Id
*/
exports.removeById = (req, res) => {
    Activity.removeByActivityId(req.params.activityId)
        .then((result) => {
            return res.status(200).send({ status: true, msg: "Deleted Successfully" });
        });
};

/**
 * DELETE /activities
 * Remove all activities
 */
exports.removeAllActivities = (req, res) => {
    Activity.deleteMany({})
        .then((result) => {
            return res.status(200).send({ status: true, msg: "All Activities Deleted Successfully" });
        });
};

/**
 * DELETE /activities
 * Remove all Completed activities
 */
exports.removeCompletedActivities = (req, res) => {
    Activity.deleteMany({ activityStatus: false })
        .then((result) => {
            return res.status(200).send({ status: true, msg: "All Completed Activities Deleted Successfully" });
        });
};

/**
 * PATCH /activity/:activityId
 * Update Completed Activity
 */
exports.patchActivity = (req, res) => {
    Activity.patchActivity(req.params.activityId, req.body).then((result) => {
        return res.status(200).send(result);
    });
};