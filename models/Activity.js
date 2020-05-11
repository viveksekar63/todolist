/**
 * Module Dependencies
 */
const mongoose = require('mongoose');

/**
 * Creating Activity Scheme Object
 */
const activitySchema = new mongoose.Schema({
    activityName: String,
    style: {
        italic: Boolean,
        bold: Boolean
    },
    activityStatus: Boolean
}, { timestamps: true });

/**
 * Created model objects assigned to related Constants
 */
const Activity = mongoose.model('Activity', activitySchema);

/**
 * find data based on the activity Id
 */
Activity.findByActivityId = (id) => {
    return Activity.findById(id).then((result) => {
        result = result.toJSON();
        result.activityId = result._id;
        result.status = true;
        delete result._id;
        delete result.__v;
        return result;
    }).catch((err) => {
        return {status:false};
    });
};

/**
 * List all Activities
 */
Activity.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Activity.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, activities) {
                if (err) {
                    reject(err);
                } else {
                    resolve(activities);
                }
            })
    });
};

/**
 * Remove By Activity Id
 */
Activity.removeByActivityId = (activityId) => {
    return new Promise((resolve, reject) => {
        Activity.deleteOne({_id: activityId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

/**
 * update completed Task 
 */
Activity.patchActivity = (id, activityData) => {
    return new Promise((resolve, reject) => {
        Activity.findById(id, function (err, activity) {
            if (err) reject(err);
            activity.activityStatus = activityData.activityStatus || false;
            activity.save(function (err, updatedActivity) {
                if (err) return reject(err);
                resolve(updatedActivity);
            });
        });
    })
};

/**
 * Exporting the models
 */
module.exports = Activity;
