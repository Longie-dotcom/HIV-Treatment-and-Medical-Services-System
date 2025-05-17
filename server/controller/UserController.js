const User = require('../model/UserModel');
const Patient = require('../model/PatientModel');
const Doctor = require('../model/DoctorModel');
const Scheduler = require('../model/SchedulerModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ROLES = require('../constant/RoleUser');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User email does not exist' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    let roleInfo = {};
    if (user.role === ROLES.PATIENT) {
      const patient = await Patient.findOne({ user: user._id });
      roleInfo = patient;
    } else if (user.role === ROLES.DOCTOR) {
      const doctor = await Doctor.findOne({ user: user._id });
      roleInfo = doctor;
    } else if (user.role === ROLES.SCHEDULER) {
      const scheduler = await Scheduler.findOne({ user: user._id });
      roleInfo = scheduler;
    }

    const token = jwt.sign({
      email: user.email,
      _id: user._id,
      role: user.role,
      name: user.name,
      profilePic: user.profilePic,
      age: user.age,
      gender: user.gender,
      roleInfo: roleInfo
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res
      .cookie('token', token, {
        httpOnly: process.env.HTTP_ONLY === 'true',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: 'User login successfully' }, roleInfo);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error });
  }
}

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      age,
      gender,
      pregnancyStatus,
      sexualBehavior
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: passwordHash,
      age,
      gender,
      name,
      role
    });
    await newUser.save();
    let roledUser = {};
    if (role === ROLES.PATIENT) {
      roledUser = new Patient({
        user: newUser._id,
        pregnancyStatus,
        sexualBehavior
      });
      await roledUser.save();
    } else if (role === ROLES.DOCTOR) {
      roledUser = new Doctor({
        user: newUser._id,
      });
      await roledUser.save();
    } else if (role === ROLES.SCHEDULER) {
      roledUser = new Patient({
        user: newUser._id,
      });
      await roledUser.save();
    }

    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error });
  }
};