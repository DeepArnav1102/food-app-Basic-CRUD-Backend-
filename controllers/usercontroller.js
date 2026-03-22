// get user info

const getUserInfoController = async (req, res) => {
    return res.status(200).send(
        {success: true,
        message: 'User info retrieved successfully',
        userId: req.body.id });
}

module.exports = { getUserInfoController };