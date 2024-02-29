import findByProps from "../findByProps"


const patchGetUserProfile = () => {
    
    window.profilePatchers = []
    const current_user_id = findByProps("getCurrentUser").getCurrentUser().id

    if (!findByProps('getUserProfile').getUserProfile_){
        findByProps('getUserProfile').getUserProfile_ = findByProps('getUserProfile').getUserProfile;
    }

    findByProps('getUserProfile').getUserProfile = function (userId) {
        let profile = findByProps('getUserProfile').getUserProfile_(userId);
        if (userId !== current_user_id || !profile) return profile;
        else {
            for (let profilePatcher of window.profilePatchers){
                profilePatcher(profile)
            }
            return profile;
        }
    };

}

export default patchGetUserProfile