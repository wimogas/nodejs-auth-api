import firebase from '../config/firebase-config';

class AuthMiddleware {
    async authenticate(req, res, next) {

        const token = req.headers.authorization.split(' ')[1]

        try {
            const decodeValue = await firebase.auth().verifyIdToken(token)
            if (decodeValue) {
                return next()
            } else {
                return res.json({
                    message:"Unauthorized"
                })
            }
        } catch(e) {
            console.log(e)
            return res.json({
                message: "Internal Error"
            })
        }
    }
}

export default new AuthMiddleware();