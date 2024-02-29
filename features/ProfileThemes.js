import findByProps from "../findByProps"
import Constants from "../main"

const patchProfileThemes = () => { 
    window.themeColors = null

    findByProps("_dispatch").addInterceptor(event=>{
        if (event.type === "USER_SETTINGS_ACCOUNT_SET_PENDING_THEME_COLORS"){
            window.themeColors = event.themeColors
        }
    })
    window.profilePatchers.push(
        (profile) => {
            profile.themeColors = window?.themeColors ?? null 
            return profile 
        } 
    )
}
export default patchProfileThemes