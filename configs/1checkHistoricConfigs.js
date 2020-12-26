let candidates = [
'Jardeson de Araújo Arlindo',
'Luciano Meneses',
'Arthur Landim',
'Igor Silva',
'Dimas Victor',
'Lucas Fernandes',
'Anderson Perondi',
'Elizabeth Lucas',
'Isabely Costa',
'Leonarde Firmino',
'Samuel Duarte',
'Rodrigo Melo',
'Diego Brito',
'Gustavo David de Oliveira Souza',
'Caio Nogueira',
'Gabriel Costa',
'Gisele Nunes',
'Enzo Furlan',
'Nícolas Fonseca',
'Gustavo Mendes',
'Vitor Moura'
    
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