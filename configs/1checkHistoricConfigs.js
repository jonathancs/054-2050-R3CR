let candidates = [
    
]

loopLimitator = candidates.length

for (let i = 0; i < loopLimitator; i++) {
    let loopedName = candidates[i]

    let emptySpacesCount = (loopedName.match(/ /g) || []).length

    if (emptySpacesCount > 1) {
        let pickLastWord = loopedName.lastIndexOf(" ")
        loopedName = loopedName.substring(0, pickLastWord)
        candidates.splice((i + 1), 0, loopedName)
        loopLimitator++
    }
}

module.exports = candidates