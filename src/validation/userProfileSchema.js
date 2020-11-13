import * as yup from 'yup';

const userProfileSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .min(4, 'Username must be at least four characters long'),
})

export default userProfileSchema;