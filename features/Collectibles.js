import findByProps from "../findByProps"
import Constants from "../main"

const patchCollectibles = () => {
    let avatarDeco = null
    let __ = Constants
    let profileEffectId = null
    let current_user_id = findByProps("getCurrentUser").getCurrentUser().id

    findByProps("_dispatch").addInterceptor(event=>{
        

        /** Collectibles for free! */

        // fake that you have all avatar deco's
        if (event.type === "COLLECTIBLES_PURCHASES_FETCH_SUCCESS"){
            const purchases = []
            for (let product of findByProps("getCategoryForProduct","getCategory").products
            ){
                let prod = product[1]
                prod.purchasedAt = new Date
                purchases.push(prod)
            }
            event.purchases = purchases
        }   

        if (event.type === "USER_SETTINGS_ACCOUNT_SET_PENDING_AVATAR_DECORATION"){
            avatarDeco = event.avatarDecoration
        }
        if (event.type === "USER_SETTINGS_ACCOUNT_SET_PENDING_PROFILE_EFFECT_ID"){
            window.profileEffectId = event.profileEffectId
        }

        if (event.type === "CURRENT_USER_UPDATE" || event.type === "CONNECTION_OPEN"){
            event.user = Object.assign(findByProps('getUserStoreVersion').getUser(findByProps('getCurrentUser').getCurrentUser().id), { avatarDecoration: avatarDeco,avatarDecorationData: avatarDeco });
            Constants.PATCH_NITRO_TYPE()
        }
        
    })

    window.profilePatchers.push(
        (profile) => {
            profile.profileEffectId = window?.profileEffectId ?? null 
            return profile 
        } 
    )
}

export default patchCollectibles