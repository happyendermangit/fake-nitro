import findByProps from "../findByProps"

const patchSettingsErrorsSkipper = () => {
    findByProps("_dispatch").addInterceptor(event=>{
        if (event.type === "USER_SETTINGS_ACCOUNT_SUBMIT_FAILURE" || event.type === "USER_PROFILE_UPDATE_FAILURE"){
            findByProps("_dispatch").dispatch({
                type:"USER_SETTINGS_CLEAR_ERRORS"
            })
            findByProps("_dispatch").dispatch({
                type:"USER_SETTINGS_RESET_ALL_PENDING"
            })
            findByProps("_dispatch").dispatch({
                type: "CURRENT_USER_UPDATE"
            })
        }
    })
}

export default patchSettingsErrorsSkipper