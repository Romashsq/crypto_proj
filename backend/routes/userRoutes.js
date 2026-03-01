
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "crypto-learning-secret-2024";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ success: false, error: "Все поля обязательны" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Пользователь с таким email или username уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      token,
      user: userObj,
      message: "Регистрация успешна",
    });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка сервера при регистрации" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username: email }] });
    if (!user) return res.status(401).json({ success: false, error: "Неверный email или пароль" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, error: "Неверный email или пароль" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ success: true, token, user: userObj, message: "Вход выполнен успешно" });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка сервера при входе" });
  }
});


router.get("/verify-auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    res.json({ success: true, user, message: "Токен валиден" });
  } catch (e) {
    console.error("VERIFY ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});


router.post("/user/save-course", auth, async (req, res) => {
  try {
    const { courseId, courseTitle, courseIcon, totalLessons } = req.body;
    if (!courseId) return res.status(400).json({ success: false, error: "courseId обязателен" });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    user.enrollInCourse({
      courseId,
      courseTitle,
      courseIcon,
      totalLessons: totalLessons || 1,
    });

    await user.save();

    res.json({
      success: true,
      message: "Курс сохранен",
      course: user.getCourseProgress(courseId),
    });
  } catch (e) {
    console.error("SAVE COURSE ERROR:", e);
    res.status(500).json({ success: false, error: e.message || "Ошибка сохранения курса" });
  }
});

router.get("/user/courses", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const courses = user.getAllCourses();

    res.json({
      success: true,
      courses,
      enrolledCourses: courses.length,
      completedCourses: courses.filter((c) => c.isCompleted).length,
    });
  } catch (e) {
    console.error("GET COURSES ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка получения курсов" });
  }
});

router.get("/user/check-course/:courseId", auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const isEnrolled = user.isCourseEnrolled(courseId);
    const progress = isEnrolled ? user.getCourseProgress(courseId) : null;

    // фронт местами ждёт isSaved — дадим оба поля
    res.json({ success: true, isEnrolled, isSaved: isEnrolled, progress });
  } catch (e) {
    console.error("CHECK COURSE ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка проверки курса" });
  }
});

router.post("/user/complete-lesson", auth, async (req, res) => {
  try {
    const { courseId, lessonId, score = 100 } = req.body;
    if (!courseId || lessonId === undefined) {
      return res.status(400).json({ success: false, error: "courseId и lessonId обязательны" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const result = user.completeLesson(courseId, Number(lessonId), Number(score) || 100);
    await user.save();

    res.json({
      success: true,
      message: "Урок завершен",
      ...result,
      user: { xp: user.xp, level: user.level },
    });
  } catch (e) {
    console.error("COMPLETE LESSON ERROR:", e);
    res.status(500).json({ success: false, error: e.message || "Ошибка завершения урока" });
  }
});

router.get("/user/course/:courseId/progress", auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const progress = user.getCourseProgress(courseId);
    if (!progress) return res.json({ success: true, isEnrolled: false, progress: null });

    res.json({ success: true, isEnrolled: true, progress });
  } catch (e) {
    console.error("COURSE PROGRESS ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка получения прогресса" });
  }
});

router.get("/user/overall-progress", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const courses = user.getAllCourses();

    const totalLessons = courses.reduce((sum, c) => sum + (c.totalLessons || 0), 0);
    const completedLessons = courses.reduce((sum, c) => sum + (c.completedLessons || 0), 0);

    const totalProgress =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const completedCourses = courses.filter((c) => c.isCompleted).length;
    const enrolledCourses = courses.length;

    return res.json({
      success: true,
      totalProgress,
      completedCourses,
      enrolledCourses,
      completedLessons,
      totalLessons,
      courses,         
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
    });
  } catch (e) {
    console.error("overall-progress error:", e);
    res.status(500).json({ success: false, error: "Ошибка получения прогресса" });
  }
});

router.get("/user/lesson-status/:courseId/:lessonId", auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    const course = user.courses.find((c) => c.courseId === courseId);
    if (!course) {
      return res.json({ success: true, status: "locked", canAccess: false, isCompleted: false });
    }

    const lessonNum = Number(lessonId);
    const lesson = course.lessons.find((l) => l.lessonId === lessonNum);

    const isCompleted = !!lesson?.completed;
    const canAccess = true;

    res.json({
      success: true,
      status: isCompleted ? "completed" : "available",
      canAccess,
      isCompleted,
    });
  } catch (e) {
    console.error("LESSON STATUS ERROR:", e);
    res.status(500).json({ success: false, error: "Ошибка статуса урока" });
  }
});

router.get("/my-courses", auth, async (req, res) => {
  req.url = "/user/courses";
  return router.handle(req, res);
});

router.post("/enroll-course", auth, async (req, res) => {
  try {
    const { courseId, courseTitle, courseIcon, totalLessons } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, error: "courseId обязателен" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, error: "Пользователь не найден" });

    user.enrollInCourse({
      courseId: String(courseId),
      courseTitle: courseTitle || String(courseId),
      courseIcon: courseIcon || "📚",
      totalLessons: Number(totalLessons) || 1,
    });

    await user.save();

    return res.json({
      success: true,
      message: "Курс успешно сохранен",
      courses: user.getAllCourses(),
    });
  } catch (e) {
    console.error("enroll-course error:", e);
    res.status(500).json({ success: false, error: e.message || "Ошибка записи на курс" });
  }
});

router.get("/check-enrollment/:courseId", auth, async (req, res) => {
  req.url = `/user/check-course/${req.params.courseId}`;
  return router.handle(req, res);
});

module.exports = router;