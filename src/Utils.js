export function scoreDeclination(score){
    if (score % 10 === 0 && score >= 20){
      return score + ' очков'
    } else if (score % 10 === 1){
        return score + ' очко'
    } else if ((score > 20 && (score % 10 === 2 || score % 10 === 3 || score % 10 === 4)) || (score === 2 || score === 3 || score === 4)){
        return score + ' очка'
    } else{
        return score + ' очков'
    }
}

export function countRights(answers) {
    let rights = 0;
    for (let i = 0; i < answers.length; i++){
      if (answers[i] === 1){
        rights++
      }
    }
    return rights;
  }

export function ratingShift(answers){
    let rights = countRights(answers);
    let ratingShift = Math.round(rights - (answers.length - rights) * 0.5)
    return ratingShift; 
}

export function getCountry(countryCode){
    if (countryCode === 'ru'){
      return 'Россия'
    } else if (countryCode === 'world'){
      return 'Весь мир'
    }
  }