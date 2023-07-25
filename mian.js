const lenghtSlider = document.getElementById('slider'),
      generateBtn = document.getElementById('generate-button')
      copyBtn = document.getElementById('copy-pass'),
      generatedPassword = document.getElementById('generatedPass');
      options = document.querySelectorAll('.option input'),
      copyIndicator = document.querySelector('.copy-indicator'),
      passAnalyzer = document.querySelector('.pass-analyzer');

const characters = {
    lowercase : 'abcdefghijklmnopqrstuvwxyz',
    uppercase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers : '0123456789',
    symbols: '^!$%&|{}()[]:;.,*+-#@<>',

}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = '',
    excludeDuplicates = false;
    passLenght = lenghtSlider.value;
    options.forEach(option => {
        if(option.checked){
            if (option.id !== 'spaces') {       
                staticPassword += characters[option.id];
            } else if(option.id === 'spaces'){
                staticPassword += '  '+staticPassword+'  ';
            } else{
                excludeDuplicates = true;
            }
        }
    });
    for (let i = 0; i < passLenght ; i++) {
        randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
    }
    generatedPassword.value = randomPassword;
}
const copyPass = () => {
    generatedPassword.select();
    navigator.clipboard.writeText(generatedPassword.value);

    const removeElement = () => {
        copyIndicator.style.display = 'none'
    }
    if (copyIndicator) {
        copyIndicator.style.display = 'block';
        
        setTimeout(removeElement, 2000);
    }
} 

const updatePassAnalyzer = () => {
    passAnalyzer.id = lenghtSlider.value <= 8 ? 'weak' : lenghtSlider.value <= 16 ? 'medium' : 'strong';
}

const updateSlider = () => {
    document.getElementById('pass-lenght').innerText = lenghtSlider.value;
    updatePassAnalyzer();
}
updateSlider();
lenghtSlider.addEventListener('input',updateSlider);
generateBtn.addEventListener('click',generatePassword);
copyBtn.addEventListener('click',copyPass)