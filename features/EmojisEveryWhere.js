import findByProps from "../findByProps"
import Constants from "../main"

const patchEmojisEveryWhere = () => { 
    const convertMessages = []

    findByProps("_dispatch").addInterceptor(event=>{
        
        /** Links converter to real emojis */

        if (["MESSAGE_CREATE"].includes(event.type)){
            event.message.content = Constants.CONVERT_TO_REAL_EMOJIS(event.message.content ?? "")
            event.message.embeds = event.message.embeds.filter(e=>e.type !== "image")
            convertMessages.push(event.message.id)
        }
        if ( event.type === "MESSAGE_UPDATE" && convertMessages.includes(event.message.id)){
            event.message.content = Constants.CONVERT_TO_REAL_EMOJIS(event.message.content ?? "")
            event.message.embeds = event.message.embeds.filter(e=>e.type !== "image")
        }
        if (event.type === "LOAD_MESSAGES_SUCCESS"){
            event.messages.forEach(message=>{
                message.content = Constants.CONVERT_TO_REAL_EMOJIS(message.content)
                message.embeds = message.embeds.filter(e=>e.type !== "image")        
            })
        }

        if (event.type === "TRACK" && event.event === "expression_picker_opened"){
            Constants.PATCH_NITRO_TYPE()
        }
    })

    /** Patch send message function */
    let mod = findByProps("sendMessage")
    /** save function if doesnt exist */
    mod.sendMsg = mod.sendMsg ?? mod.sendMessage

    mod.sendMessage = (channel_id,message_data) => {
        if (message_data.content.startsWith("!!fn_ignore")){
            mod.sendMsg(channel_id,message_data)
            return
        }
        message_data.content = Constants.CONVERT_TO_FAKE_EMOJIS(message_data.content)
        mod.sendMsg(channel_id,message_data)
    }
}
export default patchEmojisEveryWhere