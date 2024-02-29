const patchNitroBadge = () => {
    window.profilePatchers.push(
        (profile) => {
            const allBadges = [
                {
                    "id": "premium",
                    "description": "Subscriber since Feb 28, 2024",
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