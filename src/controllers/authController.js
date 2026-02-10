import auth from '../services/authService.js'
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, user } = await auth.login(email, password);
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}

// logout
