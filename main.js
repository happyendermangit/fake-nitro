import findByProps from "./findByProps"
import patchCollectibles from "./features/Collectibles"
import patchColors from "./features/Colors"
import patchEmojisEveryWhere from "./features/EmojisEveryWhere"
import patchSettingsErrorsSkipper from "./patchers/SettingsErrorSkipper"
import patchGetUserProfile from "./patchers/getUserProfile"
import patchNitroBadge from "./patchers/nitroBadge"
import patchProfileThemes from "./features/ProfileThemes"

const Constants = {
    EMOJI_REGEX: /<a?:.+?:\d+>/gm,
    FAKE_NITRO_VERSION: "1",
    FAKE_NITRO_AUTHOR: "JS",
    FAKE_NITRO_EMOJI_REGEX: /https:\/\/cdn\.discordapp\.com\/emojis\/.*\..*\?size=96&quality=lossless&name=.*&fakeNitroV=\d+/gm,
    NITRO_TYPES: {
        NITRO_NULL: 0,
        NITRO_BASIC: 1,
        NITRO_BOOST: 2,
        NITRO_CLASSIC: 3
    },
    PATCH_NITRO_TYPE: () => { window.premiumType = Constants.NITRO_TYPES.NITRO_BOOST;findByProps("getCurrentUser").getCurrentUser().premiumType = Constants.NITRO_TYPES.NITRO_BOOST },
    CONVERT_TO_FAKE_EMOJIS: (text) => {
        const emojis = text.match(Constants.EMOJI_REGEX) ?? []
        for (let emoji of emojis){
            console.log(emoji.split(":"))
            let emojiLink = `https://cdn.discordapp.com/emojis/ID.EXT?size=96&quality=lossless&name=NAME&_id=ID_&type=TYPE&fakeNitroV=${Constants.FAKE_NITRO_VERSION}`
            let type = emoji.split(":")[0] === "<a" ? "animated" : "normal"
            if (type === "animated"){
                emojiLink = emojiLink.replace("EXT","gif")
                emojiLink = emojiLink.replace("NAME",emoji.split(":")[1])
                emojiLink = emojiLink.replace("ID",emoji.split(":")[2].replaceAll(">",""))
                emojiLink = emojiLink.replace("ID_",emoji.split(":")[2].replaceAll(">",""))
                emojiLink = emojiLink.replace("TYPE",type)
            }
            if (type === "normal"){
                emojiLink = emojiLink.replace("EXT","webp")
                emojiLink = emojiLink.replace("NAME",emoji.split(":")[1])
                emojiLink = emojiLink.replace("ID",emoji.split(":")[2].replaceAll(">",""))
                emojiLink = emojiLink.replace("ID_",emoji.split(":")[2].replaceAll(">",""))
                emojiLink = emojiLink.replace("TYPE",type)
            }
            text = text.replaceAll(emoji,emojiLink)

            
        }
        return text
    },
    CONVERT_TO_REAL_EMOJIS: (text) => {
        console.log(text)
        let emojisLinks = text.match(Constants.FAKE_NITRO_EMOJI_REGEX) ?? []
        for (let link of emojisLinks){
            const params = new URLSearchParams(link);
            if (params.get("fakeNitroV")){
                let formattedString = params.get("type") === "animated" ? "<a:" : "<:" 
                formattedString = formattedString + params.get("name") + ":" + params.get("_id") + ">"
                text = text.replace(link,formattedString)
            }
        }
        console.log(text)
        return text 
    }
}

Constants.PATCH_NITRO_TYPE()
patchGetUserProfile()
patchNitroBadge()
patchEmojisEveryWhere()
patchSettingsErrorsSkipper()
patchCollectibles()
patchColors()
patchProfileThemes()
export default Constants