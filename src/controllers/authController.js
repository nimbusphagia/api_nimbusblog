import auth from '../services/authService.js'
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken } = await auth.login(email, password);
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

// logout
