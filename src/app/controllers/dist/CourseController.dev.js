"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Course = require('../models/Course');

var _require = require('../../util/mongoose'),
    mongooseToObject = _require.mongooseToObject;

var CourseController =
/*#__PURE__*/
function () {
  function CourseController() {
    _classCallCheck(this, CourseController);
  }

  _createClass(CourseController, [{
    key: "show",
    //[GET]/
    value: function show(req, res, next) {
      Course.findOne({
        slug: req.params.slug
      }).then(function (course) {
        res.render('courses/show', {
          course: mongooseToObject(course)
        });
      })["catch"](next);
    } //[GET] /courses/create

  }, {
    key: "create",
    value: function create(req, res, next) {
      res.render('courses/create');
    } //[POST] /courses/store

  }, {
    key: "store",
    value: function store(req, res, next) {
      var formData = req.body;
      formData.image = "https://img.youtube.com/vi/".concat(req.body.videoId, "/sddefault.jpg");
      var course = new Course(formData);
      course.save().then(function () {
        return res.redirect('/me/stored/courses');
      })["catch"](function (error) {
        next;
      });
    } //[GET] /courses/edits

  }, {
    key: "edit",
    value: function edit(req, res, next) {
      Course.findById(req.params.id).then(function (course) {
        return res.render('courses/edit', {
          course: mongooseToObject(course)
        });
      })["catch"](next);
    } //[PUT] /courses/:id

  }, {
    key: "update",
    value: function update(req, res, next) {
      Course.updateOne({
        _id: req.params.id
      }, req.body).then(function () {
        return res.redirect('/me/stored/courses');
      })["catch"](next);
    } //[DELETE] /courses/:id

  }, {
    key: "delete",
    value: function _delete(req, res, next) {
      Course["delete"]({
        _id: req.params.id
      }).then(function () {
        return res.redirect('back');
      })["catch"](next);
    } //[DELETE] /courses/:id/forceDelete

  }, {
    key: "forceDelete",
    value: function forceDelete(req, res, next) {
      Course.deleteOne({
        _id: req.params.id
      }).then(function () {
        return res.redirect('back');
      })["catch"](next);
    } //[PATCH] /courses/:id/restore

  }, {
    key: "restore",
    value: function restore(req, res, next) {
      Course.restore({
        _id: req.params.id
      }).then(function () {
        return res.redirect('back');
      })["catch"](next);
    } //PATCH /courses/handle-form-actions

  }, {
    key: "handleFormActions",
    value: function handleFormActions(req, res, next) {
      switch (req.body.action) {
        case 'delete':
          Course["delete"]({
            _id: {
              $in: req.body.courseIds
            }
          }).then(function () {
            return res.redirect('back');
          })["catch"](next);
          break;

        default:
          res.json({
            message: 'Action is invalid'
          });
      }
    }
  }]);

  return CourseController;
}();

module.exports = new CourseController();