import findByProps from "../findByProps"
import Constants from "../main"

/** 
 * [DISPATCHER] Blocks UPDATE_BACKGROUND_GRADIENT_PRESET with presetId that is null 
 */

const patchColors = () => {
    findByProps("_dispatch").addInterceptor(event=>{
        if (event.type === "UPDATE_BACKGROUND_GRADIENT_PRESET" && event.presetId === null){
            event.type = null
        }
    })
}

export default patchColors