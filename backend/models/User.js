const mongoose = require('mongoose');


const simpleLessonSchema = new mongoose.Schema({
  lessonId: Number,
  completed: { type: Boolean, default: false },
  completedAt: Date,
  score: { type: Number, default: 0 }
}, { _id: false });


const simpleCourseSchema = new mongoose.Schema({
  courseId: String,
  courseTitle: String,
  courseIcon: { type: String, default: '📚' },
  enrolledAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  completedLessons: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lessons: [simpleLessonSchema]
}, { _id: false });

const simpleUserSchema = new mongoose.Schema({

  fullName: String,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },

  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },

  courses: [simpleCourseSchema],

  totalCompletedLessons: { type: Number, default: 0 },
  enrolledCourses: { type: Number, default: 0 },
  completedCourses: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

simpleUserSchema.methods.enrollInCourse = function (courseData) {
  let { courseId, courseTitle, courseIcon, totalLessons } = courseData;

  const normalizedId = String(courseId ?? "").trim().toLowerCase();
  if (!normalizedId) throw new Error("courseId is required");

  // Проверяем — если курс уже есть, просто возвращаем без изменений
  const alreadyEnrolled = (this.courses || []).some(
    (c) => String(c.courseId ?? "").trim().toLowerCase() === normalizedId
  );

  if (alreadyEnrolled) {
    return this; // курс уже существует, дублирование не допускаем
  }

  this.courses.push({
    courseId: normalizedId,
    courseTitle: courseTitle || `Course ${normalizedId}`,
    courseIcon: courseIcon || "📚",
    enrolledAt: new Date(),
    lastAccessed: new Date(),
    completedLessons: 0,
    totalLessons: Number(totalLessons) || 1,
    percentage: 0,
    lessons: [],
  });

  this.enrolledCourses = this.courses.length;
  return this;
};

simpleUserSchema.methods.completeLesson = function (courseId, lessonId, score = 100) {
  const normalizedCourseId = String(courseId ?? "").trim().toLowerCase();
  const normalizedLessonId = Number(lessonId);

  const course = (this.courses || []).find(
    (c) => String(c.courseId ?? "").trim().toLowerCase() === normalizedCourseId
  );

  if (!course) {
    throw new Error(`Course ${normalizedCourseId} not found`);
  }

  if (!Array.isArray(course.lessons)) {
    course.lessons = [];
  }

  let lesson = course.lessons.find((l) => Number(l.lessonId) === normalizedLessonId);

  if (!lesson) {
    course.lessons.push({ lessonId: normalizedLessonId, completed: false, score: 0 });
    lesson = course.lessons[course.lessons.length - 1]; // берём Mongoose subdocument, а не plain object
  }

  if (!lesson.completed) {
    lesson.completed = true;
    lesson.completedAt = new Date();
    lesson.score = Number(score) || 0;

    course.completedLessons = course.lessons.filter((l) => l.completed).length;
    course.totalLessons = Math.max(Number(course.totalLessons) || 0, course.lessons.length);

    course.percentage =
      course.totalLessons > 0
        ? Math.round((course.completedLessons / course.totalLessons) * 100)
        : 0;

    course.lastAccessed = new Date();

    this.totalCompletedLessons = (Number(this.totalCompletedLessons) || 0) + 1;
    this.xp = (Number(this.xp) || 0) + 100;
    this.level = Math.floor(this.xp / 1000) + 1;

    if (course.percentage === 100) {
      this.completedCourses = (this.courses || []).filter((c) => Number(c.percentage) === 100).length;
    }
  }

  return {
    courseProgress: {
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      percentage: course.percentage,
    },
    xpEarned: 100,
    newXp: this.xp,
    newLevel: this.level,
  };
};

simpleUserSchema.methods.getCourseProgress = function(courseId) {
  const course = this.courses.find(c => c.courseId === courseId);
  
  if (!course) return null;
  
  return {
    courseId: course.courseId,
    courseTitle: course.courseTitle,
    courseIcon: course.courseIcon,
    completedLessons: course.completedLessons,
    totalLessons: course.totalLessons,
    percentage: course.percentage,
    enrolledAt: course.enrolledAt,
    lastAccessed: course.lastAccessed,
    isEnrolled: true
  };
};

simpleUserSchema.methods.isCourseEnrolled = function(courseId) {
  const normalizedId = String(courseId ?? "").trim().toLowerCase();
  return this.courses.some(
    (c) => String(c.courseId ?? "").trim().toLowerCase() === normalizedId
  );
};

simpleUserSchema.methods.getAllCourses = function() {
  return this.courses.map(course => ({
    courseId: course.courseId,
    courseTitle: course.courseTitle,
    courseIcon: course.courseIcon,
    completedLessons: course.completedLessons,
    totalLessons: course.totalLessons,
    percentage: course.percentage,
    enrolledAt: course.enrolledAt,
    lastAccessed: course.lastAccessed,
    isCompleted: course.percentage === 100
  }));
};

module.exports = mongoose.model('SimpleUser', simpleUserSchema);