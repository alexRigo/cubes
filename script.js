class Game {
    constructor() {
        this.numbersCell = 4;
        this.sizeCell = 250;
        this.colorVariable = 0.25;
        this.level = 1;
        this.time = 28;
        this.grid = document.querySelector('.grid');
        this.bestScore = localStorage.getItem('best');
        this.timerWidth = 500;
        this.timerInterval = null;
        
        this.init();
    }
    
    init() {
        this.renderBestScore();
        this.generateCell();
        this.startTimer();
        this.changeTheme();
    }
    
    changeTheme() {
        const checkbox = document.querySelector(".themeCheck");
        const body = document.querySelector("body");
        const info = document.querySelector(".info");
        const switchButton = document.querySelector(".switch");
        
        const applyDarkTheme = () => {
            body.style.backgroundColor = "black";
            info.style.color = "white";
            switchButton.style.backgroundColor = "white";
        };
        
        const applyLightTheme = () => {
            body.style.backgroundColor = "white";
            info.style.color = "black";
            switchButton.style.backgroundColor = "white";
        };
        
        const handleThemeChange = () => {
            if (checkbox.checked) {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        };
        
        checkbox.addEventListener("click", handleThemeChange);
    }

    renderBestScore() {
        document.querySelector('.bestScoreNumber').innerHTML = this.bestScore;
    }
    
    generateCell() {
        this.grid.innerHTML = '';
        for (let i = 0; i < this.numbersCell; i++) {
            let btn = document.createElement('button');
            btn.style.width = this.sizeCell + 'px';
            btn.style.height = this.sizeCell + 'px';
            this.grid.appendChild(btn);
        }

        let numbers = [];

        for (let i = 0; i < 4; i++) {
            let min = 0;
            let max = 190;
            let random = Math.random() * (max - min) + min;
            let trunc = Math.trunc(random);

            numbers.push(trunc);
        }

        let cases = document.querySelectorAll('button')

        cases.forEach(element => {
            element.style.backgroundColor = `rgba(${numbers[0]}, ${numbers[1]}, ${numbers[2]}, ${numbers[3]})`;
        })
  
        let min = 0;
        let max = this.numbersCell;
        let random = Math.random() * (max - min) + min;
        let trunc = Math.trunc(random);

        cases[trunc].style.backgroundColor = `rgba(${numbers[0]}, ${numbers[1]}, ${numbers[2]}, ${this.colorVariable})`;
        cases[trunc].classList.add("good");
        this.play();
    }
  
    play() {
        document.querySelector('.timer').style.display = 'block';

        let cases = document.querySelectorAll('button')
        cases.forEach(element => {
            element.addEventListener('click', () => {
                if (element.classList.contains("good")) {
                    this.level += 1;
                    document.querySelector(".score").innerHTML = "LEVEL " + this.level;
                    this.changeSettings();
                } else {
                    this.numbersCell = 4;
                    this.sizeCell = 250;
                    this.colorVariable = 0.25;
                    document.querySelector(".score").innerHTML = "LEVEL " + this.level;
                    this.grid.innerHTML = '';
                    this.grid.innerHTML = "PERDU!"
                    this.stopTimer();
                    this.playAgain();
                }
            })
        })
    }
  
    changeSettings() {
        if (this.colorVariable >= 0.92) {
            this.colorVariable = 0.92;
        } else {
            this.colorVariable += 0.04;
        }

        if (this.level >= 5) {
            this.numbersCell = 6;
            this.sizeCell = 200;
        }
        if (this.level >= 10) {
            this.numbersCell = 12;
            this.sizeCell = 140;
        }
        if (this.level >= 20) {
            this.numbersCell = 20;
            this.sizeCell = 120;
        }
        if (this.level >= 30) {
            this.numbersCell = 42;
            this.sizeCell = 80;
        }
        if (this.level >= 40) {
            this.numbersCell = 90;
            this.sizeCell = 50;
        }
        if (this.level >= 60) {
            this.numbersCell = 182;
            this.sizeCell = 35;
        }

        this.timerWidth = 500
        this.generateCell();
    }
  
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timerWidth -= 1;
        document.querySelector('.timer').style.width = this.timerWidth + "px";
        if (this.timerWidth === 0) {
            this.stopTimer();
            this.playAgain();
        }
      }, this.time);
    }
  
    stopTimer() {
        clearInterval(this.timerInterval);
    }
  
    playAgain() {
        let score = this.level;

        if (score > this.bestScore) {
            document.querySelector('.bestScoreNumber').innerHTML = score;
            localStorage.setItem('best', score);
        }

        this.grid.innerHTML = '';
        this.grid.innerHTML = "PERDU! <br>  <button type='input' class='play'>REJOUER</button>"
        document.querySelector('.timer').style.display = 'none';
        document.querySelector('.play').addEventListener('click', () => {
            window.location.reload();
        })
    }
  }
  
  const game = new Game();
  