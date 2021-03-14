let candidates = [

    'Eduardo Farias',
    'João Silva'

        
]
    
    loopLimitator = candidates.length
    
    for (let i = 0; i < loopLimitator; i++) {
        
        loopedName = candidates[i]
    
        emptySpacesCount = (loopedName.match(/ /g) || []).length
    
        if (emptySpacesCount == 1) {
            
            reverseName = loopedName.split(' ').reverse().join(' ')
            candidates.splice((i), 0, reverseName)
            loopLimitator++
            i++
            
        }

    }
    
    module.exports = candidates