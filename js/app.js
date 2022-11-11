payload = {
    "actors": [{
        "name": "Bruce LEE",
        "image_url": "./images/personnalites/actors/bruce_lee.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": true
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Guillaume CANET",
        "image_url": "./images/personnalites/actors/guillaume_canet.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Guillaume CANET",
                "is_correct": true
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Jean RENO",
        "image_url": "./images/personnalites/actors/jean_reno.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Jean RENO",
                "is_correct": true
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Léonardo DICAPRIO",
        "image_url": "./images/personnalites/actors/leonardo_dicaprio.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Léonardo DICAPRIO",
                "is_correct": true
            }
        ]
    }],

    "politics": [{
        "name": "Charle MICHEL",
        "image_url": "./images/personnalites/politics/charle_michel.jpg",
        "choices": [{
                "description": "Charle MICHEL",
                "is_correct": true
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Jean-Luc MELANCHON",
        "image_url": "./images/personnalites/politics/jean_luc_melanchon.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Jean-Luc MELANCHON",
                "is_correct": true
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Rodrigo DURETE",
        "image_url": "./images/personnalites/politics/rodrigo_durete.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Rodrigo DURETE",
                "is_correct": true
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Ségolène ROYAL",
        "image_url": "./images/personnalites/politics/segolene_royal.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Ségolène ROYAL",
                "is_correct": true
            }
        ]
    }],
    "scientifics": [{
        "name": "Albert EINSTEIN",
        "image_url": "./images/personnalites/scientifics/albert_einstein.jpg",
        "choices": [{
                "description": "Albert EINSTEIN",
                "is_correct": true
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Galilée",
        "image_url": "./images/personnalites/scientifics/galilee.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Galilée",
                "is_correct": true
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "Nicols TESLA",
        "image_url": "./images/personnalites/scientifics/nicolas_tesla.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Nicolas TESLA",
                "is_correct": true
            },
            {
                "description": "Matt Ryan",
                "is_correct": false
            }
        ]
    }, {
        "name": "marie_curie",
        "image_url": "./images/personnalites/scientifics/marie_curie.jpg",
        "choices": [{
                "description": "Bruce LEE",
                "is_correct": false
            },
            {
                "description": "Peyton Manning",
                "is_correct": false
            },
            {
                "description": "Tom Brady",
                "is_correct": false
            },
            {
                "description": "Marie CURIE",
                "is_correct": true
            }
        ]
    }]
}

const INDEX_QUESTION_MAX = 3
var indexCurrentQuestion = 0;
var userScore = 0;
var userLevel = '0';
var levelQuestionList = [];
var killTimer = false;

function updateScore() {

    var txt_point = document.getElementById("txt_point");

    /* Récupère le dernier score du joueur */
    var derScore = location.search.substring(1).split("&")[0].split("=")[1];

    if (derScore == undefined) {
        derScore = 0;
    }

    if (window.localStorage) {
        // Sauvegarde en session storage
        var ss = window.sessionStorage.getItem('scoreJoueurSessionStorage') ? window.sessionStorage.getItem('scoreJoueurSessionStorage') : 0;
        // Sauvegarde en local storage
        var ls = window.localStorage.getItem('scoreJoueurLocalStorage') ? window.localStorage.getItem('scoreJoueurLocalStorage') : 0;
    }
    derScore = ls;

    txt_point.innerHTML = txt_point.innerHTML + derScore == 0 ? `POINT : 0` : `POINTS : ${derScore} / 4`;
}

function startPlay() {

    /* Récupère le niveau sélectionné dans l'adresse du navigateur */
    userLevel = location.search.substring(1).split("&")[0].split("=")[1];

    /* Récupère la liste des questions en fonction du niveau */
    switch (userLevel) {
        case '1':
            levelQuestionList = payload['actors'];
            break;
        case '2':
            levelQuestionList = payload['politics'];
            break;
        case '3':
            levelQuestionList = payload['scientifics'];
            break;
        default:
            throw '🎃🎃🎃 Error user choice';
    }

    initPage3Component(indexCurrentQuestion);

    var rb1 = document.getElementById("rep_1");
    rb1.addEventListener('change', function(e) {
        if (this.checked) {
            if (levelQuestionList[indexCurrentQuestion].choices[0].is_correct) {
                userScore++;
            }
            indexCurrentQuestion++;
            killTimer = true;
            this.checked = false;
            if (indexCurrentQuestion > INDEX_QUESTION_MAX) { partyEnded(userScore); } else {
                initPage3Component(indexCurrentQuestion);
            }
        }
    });

    var rb2 = document.getElementById("rep_2");
    rb2.addEventListener('change', function(e) {
        if (this.checked) {
            if (levelQuestionList[indexCurrentQuestion].choices[1].is_correct) {
                userScore++;
            }
            indexCurrentQuestion++;
            killTimer = true;
            this.checked = false;
            if (indexCurrentQuestion > INDEX_QUESTION_MAX) { partyEnded(userScore); } else {
                initPage3Component(indexCurrentQuestion);
            }
        }
    });
    var rb3 = document.getElementById("rep_3");
    rb3.addEventListener('change', function(e) {
        if (this.checked) {
            if (levelQuestionList[indexCurrentQuestion].choices[2].is_correct) {
                userScore++;
            }
            indexCurrentQuestion++;
            killTimer = true;
            this.checked = false;
            if (indexCurrentQuestion > INDEX_QUESTION_MAX) { partyEnded(userScore); } else {
                initPage3Component(indexCurrentQuestion);
            }
        }
    });
    var rb4 = document.getElementById("rep_4");
    rb4.addEventListener('change', function(e) {
        if (this.checked) {
            if (levelQuestionList[indexCurrentQuestion].choices[3].is_correct) {
                userScore++;
            }
            indexCurrentQuestion++;
            killTimer = true;
            this.checked = false;
            if (indexCurrentQuestion > INDEX_QUESTION_MAX) { partyEnded(userScore); } else {
                initPage3Component(indexCurrentQuestion);
            }
        }
    });
}

function initPage3Component(indexQuestion) {
    /* Met à jour l'affichage du questionnaire */
    var questionPicture = document.getElementById("picture");
    questionPicture.setAttribute('src', levelQuestionList[indexCurrentQuestion].image_url);
    questionPicture.setAttribute('alt', levelQuestionList[indexCurrentQuestion].name);

    document.getElementById("rbAnswer1").innerHTML = levelQuestionList[indexCurrentQuestion].choices[0].description;
    document.getElementById("rbAnswer2").innerHTML = levelQuestionList[indexCurrentQuestion].choices[1].description;
    document.getElementById("rbAnswer3").innerHTML = levelQuestionList[indexCurrentQuestion].choices[2].description;
    document.getElementById("rbAnswer4").innerHTML = levelQuestionList[indexCurrentQuestion].choices[3].description;

    document.getElementById("rep_1").value = levelQuestionList[indexCurrentQuestion].choices[0].is_correct;
    document.getElementById("rep_2").value = levelQuestionList[indexCurrentQuestion].choices[1].is_correct;
    document.getElementById("rep_3").value = levelQuestionList[indexCurrentQuestion].choices[2].is_correct;
    document.getElementById("rep_4").value = levelQuestionList[indexCurrentQuestion].choices[3].is_correct;

    // Initialise l'appel de la progressbar
    progressBar();
}

function partyEnded(_userScore) {

    if (window.localStorage) {
        // Sauvegarde en session storage
        window.sessionStorage.setItem('scoreJoueurSessionStorage', _userScore);
        // Sauvegarde en local storage
        window.localStorage.setItem('scoreJoueurLocalStorage', _userScore);
    }

    document.getElementById("idScoreP3").value = _userScore;
    document.forms["Page3Form1"].submit();
}

function sendUserLevel1() {
    document.forms["Page2Form1"].submit();
}

function sendUserLevel2() {
    document.forms["Page2Form2"].submit();
}

function sendUserLevel3() {
    document.forms["Page2Form3"].submit();
}

function progressBar() {

    var elemBack = document.getElementById("myProgress");
    elemBack.style.backgroundColor = "#d0d0d0";

    var elem = document.getElementById("myBar");
    var width = 100;
    var id = setInterval(frame, 1000);

    function frame() {
        if (width < 1 || killTimer == true) {
            clearInterval(id);

            if (killTimer == false) {
                indexCurrentQuestion++;
                if (indexCurrentQuestion < INDEX_QUESTION_MAX) {
                    initPage3Component(indexCurrentQuestion);
                }
            }
            killTimer = false;

        } else {
            width -= 3.33;
            elem.style.width = width + '%';
            elem.innerHTML = (width / 3.3333).toFixed(0) + "s";
        }
    }
}