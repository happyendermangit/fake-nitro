const patchNitroBadge = () => {
    window.profilePatchers.push(
        (profile) => {
            const allBadges = [
                {
                    "id": "premium",
                    "description": `Subscriber since ${new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
                    "icon": "2ba85e8026a8614b640c2837bcdfe21b",
                    "link": "https://discord.com/settings/premium"
                }
            ]
            const currentBadges = new Set(profile.badges.map((x) => x.id));
            for (let badge of [...allBadges]) {
                if (currentBadges.has(badge.id)) continue;
                else {
                    profile.badges.push(badge);
                    currentBadges.add(badge.id);
                }
            }
            profile.premiumType = window.premiumType

        } 
    )

}
export default patchNitroBadge
