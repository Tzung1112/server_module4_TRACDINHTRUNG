import jwt from 'jsonwebtoken';

export default {
    createToken: function (data: any, time: any) {
        // time(ms)
        try {
            return jwt.sign(
                data
                , String(process.env.JWT_KEY)
                , { expiresIn: `${time}` });
        } catch (err) {
            return false
        }
    },
    verifyToken: function (token: any) {
        let result;
        try {
            jwt.verify(token, String(process.env.JWT_KEY), function (err: any, decoded: any) {
                if (err) {
                    result = false
                } else {
                    result = decoded
                }
            });
            return result;
        } catch (err) {
            return false;
        }

    }
}